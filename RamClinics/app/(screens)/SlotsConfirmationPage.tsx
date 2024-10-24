import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React, { useEffect, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import moment, { Moment } from "moment";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DoctorSelect from "./DoctorSelect";
import { Calendar } from "react-native-calendars";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useBranches } from "../../domain/contexts/BranchesContext";
import scheduleService from "../../domain/services/ScheduleService";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const SlotsConfirmationPage = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline, shift, gender, resourceId, callCenterDoctorFlow } = useLocalSearchParams();
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


    var slotsRender = [];

    useEffect(() => {
        // setDevicesList(JSON.parse(devices.toString()))
        console.log("\n\n\n\n")
        console.log("city: ", city)
        console.log("branch: ", branch)
        console.log("fromSpeciality: ", fromSpeciality)
        console.log("department: ", department)
        console.log("speciality: ", speciality)
        console.log("specialityCode: ", specialityCode)
        console.log("callCenterFlow: ", callCenterFlow)
        console.log("devices: ", devices)
        console.log("responsible: ", responsible)
        console.log("mobileOrOnline: ", mobileOrOnline)
        console.log("shift: ", shift)
        console.log("gender: ", gender)
        console.log("callCenterDoctorFlow: ", callCenterDoctorFlow)
        console.log("\n\n\n\n")
        let today = moment().format("YYYY-MM-DD");
        setSlotsAvailable(new Map<string, Array<number>>())
        if (+callCenterDoctorFlow) {
            searchDoctorFlow(today)
        } else {
            search(today)
        }
    }, []);

    const selectSlot = async (slot: any) => {
        console.log("slot[0]: ", slot[0])
        setSelectedSlot(slot)
        setDoctorListPageRoute(true)

        const timeSlots = Object.keys(allSlots);
        let today = moment().format("YYYY-MM-DD");
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

        // console.log("slotsAvailable.get(selectedSlot): ", slotsAvailable.get(selectedSlot))
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
            }
        })
    }

    function searchDoctorFlow(date: any) {
        let subServiceSlotInterval = +mobileOrOnline
        console.log("inside here")
            if (resourceId != undefined && resourceId != null && resourceId != "" && +resourceId != -1) {
                let requestBody: any = [{
                    date: dateString,
                    day: +moment(date).format("D"),
                    resourceIds: [+resourceId],
                    wday: moment(date).format("dddd").substring(0, 3)
                }]
                let branchId = null
                for (let b of branches) {
                    console.log("branch.name: ", b.name)
                    if (b.name == branch) {
                        branchId = b.id
                        setBranchId(branchId)
                        console.log("branchId: ", branchId)
                        console.log("department: ", department)
                        console.log("speciality: ", speciality)
                        console.log("requestBody: ", requestBody)
                        scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                            .then((response) => {
                                console.log("doctorSchedule response: ", response.data)
                                let scheduleId = response.data[0].scheduleId[+moment(date).format("D")]
                                scheduleService.find(+scheduleId)
                                    .then((response) => {
                                        console.log("scheduleService.find response: ", response.data.slots)
                                        setLoader(true)
                                        let masterObj: any = {}
                                        for (let i of response.data.slots) {
                                            let date = new Date(i.startTime);
                                            let timestr = moment(date).format("hh:mm A")
                                            masterObj[timestr] = [i]
                                        }
                                        console.log("masterObj: ", masterObj)
                                        let slots: any = masterObj
                                        setAllSlots(masterObj)
                                        // console.log("moment: ", moment())
                                        // console.log("moment2: ", new Date())
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
                                                // } else {
                                            }
                                        }
                                        setLoader(false)
                                        setSlotsAvailable(slotsAvailableAux2)
                                        // console.log("slotsAvailableAux2: ", slotsAvailableAux2)
                                    })
                                    .catch((error) => {
                                        console.error("error: ", error.response)
                                        console.error("error: ", error)
                                    })
                            })
                            .catch((error) => {
                                console.log("getDoctorSchedule error: ", error.response)
                            })

                        break;
                    }
                }
            }
    }

    const search = (date: any) => {
        console.log("here in service flow")
        setLoader(true)
        let subServiceSlotInterval = +mobileOrOnline
        // console.log("subServiceSlotInterval: ", subServiceSlotInterval)
        let deviceCode: any = ""
        for (let device of devicesList) {
            deviceCode += device.deviceCode + ","
        }

        console.log("specialityCode: ", specialityCode)
        console.log("date: ", date)
        console.log("branch: ", branch)
        console.log("shift: ", shift)
        console.log("city: ", city)
        console.log("deviceCode: ", deviceCode)
        console.log("responsible: ", responsible)
        let tempResponsible: any = (responsible == undefined) ? "" : responsible
        resourceService.getResourceByLiveSlotSpeciality(specialityCode, date, branch, shift, city, deviceCode, tempResponsible)
            .then((response) => {
                console.log("\n\nresourceService.getResourceByLiveSlotSpeciality response: ", response.data)
                setLoader(true)
                let slots: any = response.data;
                setAllSlots(response.data)
                // console.log("moment: ", moment())
                // console.log("moment2: ", new Date())
                const currentTimeInstance = moment();
                // const currentTimeInstance = moment(date).format("YYYY-MM-DD hh:mm A");
                // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
                let slotsAvailableAux: Map<string, Array<any>> = new Map<string, Array<number>>()
                let pastSlotLimit: Map<number, any> = new Map<number, any>()
                let pastSlotLimitAux: Map<number, any> = new Map<number, any>()
                const timeSlots = Object.keys(slots);
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
                        // } else {
                    }
                }
                setLoader(false)
                setSlotsAvailable(slotsAvailableAux2)
                // console.log("slotsAvailableAux2: ", slotsAvailableAux2)
            })
            .catch((error) => {
                setLoader(false)
                console.log("getResourceByLiveSlotSpeciality failed ", error.response)
            })
    }

    function onDateChange(selectedDate: any) {
        setSlotSearchDate(new Date(selectedDate.timestamp))
        setDateString(moment(selectedDate.timestamp).format("YYYY-MM-DD"))
        console.log("moment(slotSearchDate).format('YYYY-MM-DD'): ", moment(slotSearchDate).format("YYYY-MM-DD"))
        search(moment(new Date(selectedDate.timestamp)).format("YYYY-MM-DD"))
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
                    {/* <View
                        className="flex flex-row justify-between items-center pt-2 gap-4 ">
                        <Text className="flex-1 text-white border border-pc-primary px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                            On: {dateString}
                        </Text>
                    </View> */}
                    <View className="pt-3">
                        {
                            loader && <ActivityIndicator size="large" color="#454567" />
                        }
                    </View>
                    {/* <View>
                        <Text>{isDatePickerOpen}</Text>
                        {isDatePickerOpen && (
                            <DateTimePicker value={slotSearchDate} mode="date" display="default" onChange={onDateChange} />
                        )}
                    </View> */}


                    {
                        Array.from(slotsAvailable).length == 0 && !loader
                            ?
                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No slots available for selected date")}</Text>
                            :
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
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SlotsConfirmationPage;