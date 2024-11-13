import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, ScrollView, Text, View, ActivityIndicator, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React, { useEffect, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useBranches } from "../../domain/contexts/BranchesContext";
import scheduleService from "../../domain/services/ScheduleService";
import { useSpecialities } from "../../domain/contexts/SpecialitiesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const SlotsConfirmationPage = () => {

    const { city, branchID, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline, shift, gender, resourceId, callCenterDoctorFlow } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [slotsAvailable, setSlotsAvailable] = useState(new Map<string, Array<number>>())
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [slotSearchDate, setSlotSearchDate] = useState(new Date());
    const [dateString, setDateString] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [doctorListPageRoute, setDoctorListPageRoute] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [loader, setLoader] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [allSlots, setAllSlots] = useState([])
    const [branchId, setBranchId] = useState(null)
    const { branches, changeBranches } = useBranches();
    const { allSpecialities, changeSpecialities } = useSpecialities();
    const [mainResourceId, setMainResourceId] = useState<any>("")
    const [doctorScheduleNotFoundModal, setDoctorScheduleNotFoundModal] = useState(false);
    const [scheduleId, setScheduleId] = useState<any>("")


    var slotsRender = [];

    useEffect(() => {
        // setDevicesList(JSON.parse(devices.toString()))
        setMainResourceId(JSON.parse(resourceId.toString()))
        let today = moment().format("YYYY-MM-DD");
        setSlotsAvailable(new Map<string, Array<number>>())
        if (+callCenterDoctorFlow) {
            searchDoctorFlow(today)
        } else {
            search(today)
        }
    }, []);

    const selectSlot = async (slot: any) => {
        setSelectedSlot(slot)
        setDoctorListPageRoute(true)

        const timeSlots = Object.keys(allSlots);
        let today = moment(slotSearchDate).format("YYYY-MM-DD");
        const sortedTimeSlots: any = timeSlots.sort((a, b) => {
            return moment(`${today} ${a.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${today} ${b.trim()}`, "YYYY-MM-DD hh:mm A"))
        })

        let iterations = +mobileOrOnline / 5
        let reservedSlots: any = []
        for (let i = 0; i < sortedTimeSlots.length; i++) {
            if (sortedTimeSlots[i] == slot[0]) {
                for (let j = i; j < i + iterations; j++) {
                    reservedSlots.push(allSlots[sortedTimeSlots[j]])
                }
                break;
            }
        }


        router.push({
            pathname: "/DoctorSelect",
            params: {
                city: city,
                branch: branch,
                fromSpeciality: fromSpeciality,
                department: department,
                speciality: speciality,
                specialityCode: specialityCode,
                callCenterFlow: callCenterFlow,
                devices: JSON.stringify(devicesList),
                responsible: responsible,
                mobileOrOnline: mobileOrOnline,
                shift: shift,
                gender: gender,
                slotSearchDate: moment(slotSearchDate).format("YYYY-MM-DD"),
                selectedSlot: slot[0],
                reservedSlots: JSON.stringify(reservedSlots),
                doctorList: JSON.stringify(slot[1]),
                callCenterDoctorFlow: callCenterDoctorFlow,
                callCenterDoctor: resourceId,
                scheduleId: scheduleId,
            }
        })
    }

    function searchDoctorFlow(date: any) {
        let subServiceSlotInterval = +mobileOrOnline
        setLoader(true)
        if (resourceId != undefined && resourceId != null && resourceId != "" && +resourceId != -1) {
            let requestBody: any = [{
                date: moment(new Date(date)).format('YYYY-MM-DD'),
                day: +moment(new Date(date)).format("D"),
                resourceIds: [+resourceId],
                wday: moment(new Date(date)).format("dddd").substring(0, 3)
            }]
            let branchId = null
            for (let b of branches) {
                if (b.name == branch) {
                    branchId = b.id
                    setBranchId(branchId)
                    scheduleService.getDoctorSchedule(branchID, department, speciality, "true", requestBody)
                        .then((response) => {
                            if (response.data[0].scheduleId == null || Object.keys(response.data[0].scheduleId).length == 0) {
                                setDoctorScheduleNotFoundModal(true)
                            } else {
                                let scheduleId = response.data[0].scheduleId[+moment(new Date(date)).format("D")]
                                setScheduleId(scheduleId)
                                scheduleService.find(+scheduleId)
                                    .then((response) => {
                                        setLoader(true)
                                        let masterObj: any = {}
                                        for (let i of response.data.slots) {
                                            let date = new Date(i.startTime);
                                            let timestr = moment(date).format("hh:mm A")
                                            masterObj[timestr] = [i]
                                        }
                                        let slots: any = masterObj
                                        setAllSlots(masterObj)
                                        const currentTimeInstance = moment();
                                        // const currentTimeInstance = moment(date).format("YYYY-MM-DD hh:mm A");
                                        // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
                                        let slotsAvailableAux: Map<string, Array<any>> = new Map<string, Array<number>>()
                                        let pastSlotLimit: Map<number, any> = new Map<number, any>()
                                        let pastSlotLimitAux: Map<number, any> = new Map<number, any>()
                                        const timeSlots = Object.keys(masterObj);
                                        const sortedTimeSlots = timeSlots.sort((a, b) => {
                                            return moment(`${date} ${a.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${date} ${b.trim()}`, "YYYY-MM-DD hh:mm A"))
                                        })

                                        let slotsAvailableAux2: Map<string, Array<any>> = new Map<string, Array<number>>()


                                        for (let slot of sortedTimeSlots) {
                                            const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
                                            if (moment(slotTimeInstance).isSameOrAfter(moment(currentTimeInstance))) {
                                                let schedules = slots[slot]
                                                if (schedules != null && schedules.length > 0) {
                                                    for (let doctorSchedule of schedules) {
                                                        if (pastSlotLimit.has(mainResourceId)) {
                                                            let previousSlotString = pastSlotLimitAux.get(mainResourceId)
                                                            let upperLimitTimeInstance = pastSlotLimit.get(mainResourceId)
                                                            if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
                                                                if (slotsAvailableAux.has(previousSlotString)) {
                                                                    slotsAvailableAux.set(previousSlotString, [...(slotsAvailableAux.get(slot) || []), doctorSchedule])
                                                                    slotsAvailableAux2 = slotsAvailableAux;
                                                                } else {
                                                                    slotsAvailableAux.set(previousSlotString, [doctorSchedule])
                                                                    slotsAvailableAux2 = slotsAvailableAux;
                                                                }
                                                                if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                                                    pastSlotLimit.set(mainResourceId, slotTimeInstance)
                                                                    pastSlotLimitAux.set(mainResourceId, slot)
                                                                    continue;
                                                                }
                                                            }
                                                            if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
                                                                pastSlotLimitAux.delete(mainResourceId)
                                                                pastSlotLimit.delete(mainResourceId)
                                                            }
                                                        } else {
                                                            if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                                                pastSlotLimitAux.set(mainResourceId, slot)
                                                                pastSlotLimit.set(mainResourceId, slotTimeInstance)
                                                            }
                                                        }
                                                    }
                                                }
                                                // } else {
                                            }
                                        }
                                        setLoader(false)
                                        setSlotsAvailable(slotsAvailableAux2)
                                    })
                                    .catch((error) => {
                                        console.error("error: ", error.response)
                                        console.error("error: ", error)
                                    })
                            }
                        })
                        .catch((error) => {
                            console.log("getDoctorSchedule error: ", error.response)
                            setDoctorScheduleNotFoundModal(true)
                        })

                    break;
                }
            }
        }
    }

    const search = (date: any) => {
        setLoader(true)
        let subServiceSlotInterval = +mobileOrOnline
        let deviceCode: any = ""
        for (let device of devicesList) {
            deviceCode += device.deviceCode + ","
        }

        let tempSpecialityCode = ""
        if (specialityCode == undefined || specialityCode == null || specialityCode == "") {
            tempSpecialityCode = allSpecialities.find((s: any) => s.name == speciality)
        }
        let cityBranch = ""
        if (city == undefined || city == null || city == "") {
            cityBranch = branches.find((b: any) => b.name == branch).city
        }
        let tempResponsible: any = (responsible == undefined || responsible == null || responsible == "") ? "Doctor" : responsible
        resourceService.getResourceByLiveSlotSpeciality(specialityCode ?? tempSpecialityCode, date, branch, shift, city ?? cityBranch, deviceCode, tempResponsible)
            .then((response) => {
                setLoader(true)
                let slots: any = response.data;
                setAllSlots(response.data)
                const currentTimeInstance = moment();
                let slotsAvailableAux: Map<string, Array<any>> = new Map<string, Array<number>>()
                let pastSlotLimit: Map<number, any> = new Map<number, any>()
                let pastSlotLimitAux: Map<number, any> = new Map<number, any>()
                const timeSlots = Object.keys(slots);
                const sortedTimeSlots = timeSlots.sort((a, b) => {
                    return moment(`${date} ${a.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${date} ${b.trim()}`, "YYYY-MM-DD hh:mm A"))
                })

                let slotsAvailableAux2: Map<string, Array<any>> = new Map<string, Array<number>>()

                let lastSlot = ''

                for (let slot of sortedTimeSlots) {
                    lastSlot = slot
                    const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
                    if (moment(slotTimeInstance).isSameOrAfter(moment(currentTimeInstance))) {
                        let schedules = slots[slot]
                        if (schedules != null && schedules.length > 0) {
                            for (let doctorSchedule of schedules) {
                                if (pastSlotLimit.has(doctorSchedule.id)) {
                                    let previousSlotString = pastSlotLimitAux.get(doctorSchedule.id)
                                    let upperLimitTimeInstance = pastSlotLimit.get(doctorSchedule.id)
                                    if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
                                        if (slotsAvailableAux.has(previousSlotString)) {
                                            slotsAvailableAux.set(previousSlotString, [...(slotsAvailableAux.get(slot) || []), doctorSchedule])
                                            slotsAvailableAux2 = slotsAvailableAux;
                                        } else {
                                            slotsAvailableAux.set(previousSlotString, [doctorSchedule])
                                            slotsAvailableAux2 = slotsAvailableAux;
                                        }
                                        if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                            pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                            pastSlotLimitAux.set(doctorSchedule.id, slot)
                                            continue;
                                        }
                                    }
                                    if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
                                        pastSlotLimitAux.delete(doctorSchedule.id)
                                        pastSlotLimit.delete(doctorSchedule.id)
                                    }
                                } else {
                                    if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                        pastSlotLimitAux.set(doctorSchedule.id, slot)
                                        pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                    }
                                }
                            }
                        }
                    }
                }
                const slotTimeInstance = moment(`${date} ${lastSlot.trim()}`, "YYYY-MM-DD hh:mm A");
                let schedules = slots[lastSlot]
                for (let doctorSchedule of schedules) {
                    if (pastSlotLimit.has(doctorSchedule.id)) {
                        let previousSlotString = pastSlotLimitAux.get(doctorSchedule.id)
                        if (slotsAvailableAux.has(previousSlotString)) {
                            slotsAvailableAux.set(previousSlotString, [...(slotsAvailableAux.get(lastSlot) || []), doctorSchedule])
                            slotsAvailableAux2 = slotsAvailableAux;
                        } else {
                            slotsAvailableAux.set(previousSlotString, [doctorSchedule])
                            slotsAvailableAux2 = slotsAvailableAux;
                        }
                        if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                            pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                            pastSlotLimitAux.set(doctorSchedule.id, lastSlot)
                            continue;
                        }
                    }
                }
                setLoader(false)
                setSlotsAvailable(slotsAvailableAux2)
            })
            .catch((error) => {
                setLoader(false)
                console.log("getResourceByLiveSlotSpeciality failed ", error.response)
            })
    }

    function onDateChange(selectedDate: any) {
        setSlotSearchDate(new Date(selectedDate.timestamp))
        setDateString(moment(selectedDate.timestamp).format("YYYY-MM-DD"))

        if (+callCenterDoctorFlow) {
            searchDoctorFlow(moment(new Date(selectedDate.timestamp)).format("YYYY-MM-DD"))
        } else {
            search(moment(new Date(selectedDate.timestamp)).format("YYYY-MM-DD"))
        }
        // search(moment(new Date(selectedDate.timestamp)).format("YYYY-MM-DD"))
    };

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Available Appointments" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <View style={{ flex: 1 }}>
                        <Calendar
                            current={moment(slotSearchDate).format('YYYY-MM-DD')}
                            minDate={moment().format('YYYY-MM-DD')}
                            markedDates={{
                                [dateString]: { selected: true, marked: true, selectedColor: '#3B2314' },
                            }}
                            onDayPress={(day: any) => { setDateString(day.dateString); onDateChange(day) }}
                            theme={{
                                todayTextColor: 'rgb(132 204 22)',
                            }}
                        />
                    </View>
                    <View className="pt-3">
                        {
                            loader && <ActivityIndicator size="large" color="#454567" />
                        }
                    </View>
                    {
                        Array.from(slotsAvailable).length == 0 && !loader
                            ?
                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No slots available for selected date")}</Text>
                            :
                            <View className="flex-row pb-8">
                                <FlatList
                                    data={Array.from(slotsAvailable)}
                                    numColumns={3}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ marginHorizontal: "auto" }}
                                    renderItem={({ item }) => (
                                        <View className="flex flex-row p-1 m-1 w-32">
                                            <Pressable
                                                onPress={() => {
                                                    selectSlot(item)
                                                }}
                                                className="bg-[#3B2314] border border-pc-primary p-2 rounded-lg w-full">
                                                {/* <View className="py-2 items-center">
                                                    <Ionicons name="time" size={36} color={"#3B2314"} />
                                                </View> */}
                                                <Text className="text-sm text-white font-semibold text-center text-pc-primary pt-3 pb-2">{item[0]}</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                />
                            </View>
                    }
                </View>
                <Modal transparent={true} animationType="fade" visible={doctorScheduleNotFoundModal} onRequestClose={() => {
                    setDoctorScheduleNotFoundModal(false)
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View className="bg-white p-6 rounded-lg w-4/5 relative">
                            <View className="flex flex-row justify-center">
                                <MaterialCommunityIcons
                                    name="information-outline"
                                    size={60}
                                    color={"#737373"}
                                />
                            </View>
                            <Text className="text-xl font-bold text-center mb-4 mt-1">Schedules not found for {moment(slotSearchDate).format("DD-MMMM-yyyy")} for</Text>
                            <View className=" flex-row justify-between gap-5 items-center py-4">
                                <Pressable onPress={() => {
                                    setDoctorScheduleNotFoundModal(false)
                                    router.back()
                                }} >
                                    <Text> Back </Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    setDoctorScheduleNotFoundModal(false)
                                }} >
                                    <Text> Ok </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SlotsConfirmationPage;