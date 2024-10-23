import {
    Alert,
    Button,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
    FlatList,
    Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { useRouter, router, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import BookAppointment from "../(tabs)/BookAppointment";
import appointmentService from "../../domain/services/AppointmentService";
import moment from 'moment';
import branchService from "../../domain/services/BranchService";
import { useUserSate } from "../../domain/state/UserState";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import scheduleService from "../../domain/services/ScheduleService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#d4d4d8',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;


const ScheduleAppointment = () => {
    let loggedIn = useUserSate.getState().loggedIn;
    const router = useRouter();
    const { branchId, department, speciality, doctor, resourceId, date, params, patientData, patientPolicyData } = useLocalSearchParams();

    // const doctorScheduleData = params ? JSON.parse(params.toString()) : {}
    const [doctorScheduleData, setDoctorScheduleData] = useState(params ? JSON.parse(params.toString()) : {})
    const [patientDataJson, setPatientDataJson] = useState(patientData ? JSON.parse(patientData.toString()) : {})
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [slotSearchDate, setSlotSearchDate] = useState(new Date());
    const [dateString, setDateString] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [patientPolicyDataJson, setPatientPolicyDataJson] = useState(patientPolicyData ? JSON.parse(patientPolicyData.toString()) : {})
    // const defaultStatus = doctorScheduleData.status ? doctorScheduleData.status : "Booked"
    const [slots, setSlots] = useState([])
    const [loader, setLoader] = useState(false)
    const [defaultStatus, setDefaultStatus] = useState(doctorScheduleData.status ? doctorScheduleData.status : "Booked")
    const [day, setDay] = useState("1");
    const [selectedSlot, setSelectedSlot] = useState<any>()
    const [slotStartTime, setSlotStartTime] = useState("");
    const [slotEndTime, setSlotEndTime] = useState("");
    const [slotStatus, setSlotStatus] = useState("");
    const [slotName, setSlotName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [city, setCity] = useState("");
    const [selectedSlots, setSelectedSlots] = useState(new Set<number>());
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);


    let fromDateAux = new Date();
    let toDateAux = new Date();

    useEffect(() => {
        setSelectedSlots(new Set<number>())
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nparams: ", params)
        if (params == null || params == "" || params.length <= 0) {
            Alert.alert('Note', 'Doctor Schedule not found', [
                {
                    text: 'BACK',
                    onPress: () => router.back(),
                    style: 'default'
                },
            ],
            )
        }
        let slotsAux: any = Object.values(JSON.parse(params.toString()).slots)[0]
        if (slotsAux == null || slotsAux.length <= 0) {
            Alert.alert('Note', 'No slots found for this date and doctor', [
                {
                    text: 'BACK',
                    onPress: () => router.back(),
                    style: 'default'
                },
            ],
            )
        } else {
            console.log("\n\n\n\nslotsAux: ", slotsAux)
            slotsAux.sort((a: any, b: any) => a.slotName - b.slotName)
            let validSlots: any = []
            let tempDate = moment(slotSearchDate).format("YYYY-MM-DD")
            let currentTimeInstance = moment();
            slotsAux.forEach((slot: any) => {
                console.log("one: ", moment(slot.startTime))
                console.log("two: ", moment(currentTimeInstance))
                console.log(moment(slot.startTime).isSameOrAfter(moment(currentTimeInstance)))
                // console.log(moment(moment(`${tempDate} ${slot.startTime.trim()}`, "YYYY-MM-DD hh:mm A")).isSameOrAfter(moment(currentTimeInstance)))
                console.log("\n")
                if (moment(slot.startTime).isSameOrAfter(moment(currentTimeInstance))) {
                    validSlots.push(slot)
                }
                slot.selected = false
            })
            if (validSlots == null || validSlots.length <= 0) {
                console.log("empty valid slots")
                setSlots([])
            } else {
                let sortedTimeSlots = slotsAux.sort((a: any, b: any) => {
                    return moment(`${date} ${a.startTime.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${date} ${b.startTime.trim()}`, "YYYY-MM-DD hh:mm A"))
                })
                setSlots(sortedTimeSlots)
            }

            // for (let slot of slotsAux) {
            //     const currentTimeInstance = moment();
            //     const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
            //     if (moment(slotTimeInstance).isAfter(currentTimeInstance)) {
            //     }
            // }
            setDoctorScheduleData(JSON.parse(params.toString()))
            if (patientData == null || patientData == "" || patientData.length <= 0) {
                Alert.alert('Patient Not Found', 'You need to Sign in first', [
                    {
                        text: 'BACK',
                        onPress: () => router.back(),
                        style: 'default'
                    },
                    {
                        text: 'SIGN IN',
                        onPress: () => router.push('/SignIn'),
                        style: 'default'
                    },
                ],
                )
            } else {
                setPatientDataJson(JSON.parse(patientData.toString()))
                if (patientPolicyData == null || patientPolicyData == "" || patientPolicyData.length <= 0) {
                    Alert.alert("Patient Policy Not Found")
                } else {
                    setPatientPolicyDataJson(JSON.parse(patientPolicyData.toString()))
                    // console.log("\n\n\n\npatientPolicyData: ", patientPolicyDataJson)
                    branchService.find(Number(branchId))
                        .then((response) => {
                            console.log("response.data: ", response.data)
                            setCity(response.data.city)
                            setBranchName(response.data.name)
                        })
                        .catch((error) => {
                            console.log("\n\n\nerror: ", error)
                        })
                }
            }
        }
    }, [])


    function onDateChange(selectedDate: any) {
        let timestamp = new Date(selectedDate.timestamp)
        setSlotSearchDate(new Date(selectedDate.timestamp))
        setDateString(moment(selectedDate.timestamp).format("YYYY-MM-DD"))
        let requestBody: any = [{
            date: dateString,
            day: +moment(timestamp).format("D"),
            resourceIds: [resourceId],
            wday: moment(timestamp).format("dddd").substring(0, 3)
        }]
        scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
            .then((response) => {
                console.log("recieved")
                setDoctorScheduleData(response.data[0])
                let slotsAux: any = Object.values(JSON.parse(params.toString()).slots)[0]
                if (slotsAux == null || slotsAux.length <= 0) {
                    Alert.alert('Note', 'No slots found for this date and doctor', [
                        {
                            text: 'BACK',
                            onPress: () => router.back(),
                            style: 'default'
                        },
                    ],
                    )
                } else {
                    slotsAux.sort((a: any, b: any) => a.slotName - b.slotName)
                    console.log("sssslotsAux: ", slotsAux)
                    let validSlots: any = []
                    let tempDate = moment(new Date(selectedDate.timestamp)).format("YYYY-MM-DD")
                    let currentTimeInstance = moment();
                    slotsAux.forEach((slot: any) => {
                        console.log("\n\n\nslot: ", slot.startTime)
                        if (moment(moment(`${tempDate} ${slot.startTime.trim()}`, "YYYY-MM-DD hh:mm A")).isSameOrAfter(moment(currentTimeInstance))) {
                            validSlots.push(slot)
                        }
                        slot.selected = false
                    })
                    if (validSlots == null || validSlots.length <= 0) {
                        console.log("empty valid slots")
                        setSlots([])
                    } else {
                        setSlots(validSlots)
                    }
                }
            })
            .catch((err) => {
                Alert.alert('Note', 'Doctor Schedule not found', [
                    {
                        text: 'OK',
                        style: 'default',
                        onPress: () => router.back(),
                    },
                ],
                )
                console.log(err);
            })
    }

    function selectSlot(slot: any) {
        console.log("slot: ", slot)
        setSelectedSlot(slot)
        setSlotStatus(slot.status)
        setSlotName(slot.slotName)
        setSlotStartTime(slot.startTime)
        setSlotEndTime(slot.endTime)
        let tempMap = selectedSlots
        if (selectedSlots.has(slot)) {
            selectedSlots.delete(slot)
            setSelectedSlots(tempMap)
            if (loggedIn) {
                bookAppointment(slot)
            } else {
                Alert.alert('Patient Not Found', 'You need to Sign in first', [
                    {
                        text: 'BACK',
                        onPress: () => router.back(),
                        style: 'default'
                    },
                    {
                        text: 'SIGN IN',
                        onPress: () => router.push('/SignIn'),
                        style: 'default'
                    },
                ],
                )
            }
        } else {
            tempMap.add(slot)
            setSelectedSlots(tempMap)
            if (loggedIn) {
                bookAppointment(slot)
            } else {
                Alert.alert('Patient Not Found', 'You need to Sign in first', [
                    {
                        text: 'BACK',
                        onPress: () => router.back(),
                        style: 'default'
                    },
                    {
                        text: 'SIGN IN',
                        onPress: () => router.push('/SignIn'),
                        style: 'default'
                    },
                ],
                )
            }
        }
        console.log("selectedSlots: ", selectedSlots)
    }

    function statusChange(selectedStatus: any) {
        setDefaultStatus(selectedStatus)
    }

    const bookAppointment = (selectedSlot: any) => {
        setLoader(true)
        let today = (new Date()).toISOString();
        let scheduleId = Object.values(doctorScheduleData.scheduleId)[0]
        let aptDate = Object.values(doctorScheduleData.date)[0]
        let appointmentDate = moment(aptDate || "").format("YYYY-MM-DDTHH:mm:ss")
        console.log("\n\n\npatientDataJson: ", patientDataJson)

        let temporaryPayload: any = {
            mrno: patientDataJson.mrno,
            age: +patientDataJson.age,
            appointmentDate: appointmentDate,
            branchId: +branchId,
            branchName: branchName,
            cardNo: patientPolicyDataJson.cardNo,
            className: patientPolicyDataJson.className,
            createdBy: patientDataJson.firstName + " " + patientDataJson.lastName,
            createdDate: today,
            department: department,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
            gender: patientDataJson.gender,
            hisStatus: defaultStatus,
            history: [
                {
                    status: defaultStatus,
                    updatedBy: patientDataJson.firstName + " " + patientDataJson.lastName,
                    updatedDate: today
                }
            ],
            mobileNo: patientDataJson.mobileNumber,
            nationalId: patientDataJson.nationalId,
            nationality: patientDataJson.nationality,
            patientId: patientDataJson.id,
            patientName: patientDataJson.firstName + " " + patientDataJson.lastName,
            policyName: patientPolicyDataJson.policyName,
            policyNo: patientPolicyDataJson.policyNo,
            practitionerId: doctorScheduleData.practitionerId,
            practitionerName: doctorScheduleData.name,
            remarks: null,
            requestByPatient: null,
            shift: null,
            slots: [],
            speciality: speciality,
            status: 'pending',
            visitType: 'Checkup',
            walkIn: null,
            source: "CallCenter - PrimeCare Mobile App",
            flowType: "CallCenter - NewFlow",
        }

        if (selectedSlots != null && selectedSlots.size > 0) {
            selectedSlots.forEach((slot: any) => {
                temporaryPayload.slots.push({
                    endTime: slot.startTime,
                    scheduleId: scheduleId,
                    slotId: slot.slotId,
                    slotName: slot.slotName,
                    startTime: slot.endTime,
                    status: slot.status
                })
            })
        }

        console.log("\n\n\ntemporaryPayloadd: ", temporaryPayload)
        console.log("\n\n\n")
        console.log("\n\n\n")



        // appointmentService.bookAppointmentBySource("CallCenter", "NewFlow", temporaryPayload)
        // .then((response) => {
        //     console.log("hello")
        //     setLoader(false)
        //     Alert.alert('Success', 'Appointment has been booked successfully', [
        //         {
        //             text: 'OK',
        //             style: 'default'
        //         },
        //     ],
        //     )
        // })
        // .catch((error) => {
        //     setLoader(false)
        //     console.log("appointmentService error", error)
        // })

        appointmentService.save(temporaryPayload)
            .then((response) => {
                Alert.alert('Success', 'Appointment has been booked successfully', [
                    {
                        text: 'OK',
                        style: 'default'
                    },
                ],
                )
            })
            .catch((error) => {
                console.log("appointmentService error", error)
            })
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6 pt-20">
                <HeaderWithBackButton title="Available Appointments" isPushBack={true} />
                <View className="py-4 gap-4 flex justify-center">
                    <View style={{ flex: 1 }}>
                        <Calendar
                            current={moment(slotSearchDate).format('YYYY-MM-DD')}
                            minDate={moment().format('YYYY-MM-DD')}
                            markedDates={{
                                [dateString]: { selected: true, marked: true, selectedColor: '#3B2314' },
                            }}
                            theme={{
                                todayTextColor: 'rgb(132 204 22)',
                            }}
                            onDayPress={(day: any) => { setDateString(day.dateString); onDateChange(day) }}
                        />
                    </View>
                    <View className="pl-2 pr-2">
                        <View className="p-4 border border-pc-primary rounded-2xl w-full mt-4" >
                            <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-pc-primary pb-4">
                                <View className="flex flex-row justify-start items-center ">
                                    <View className="bg-pc-primary rounded-lg overflow-hidden mr-3 ">
                                        {/* <Image source={item.img} /> */}
                                    </View>

                                    <View>
                                        <Text className="text-base font-medium pb-2">
                                            Policy No: {patientPolicyDataJson.policyNo}
                                        </Text>
                                        <View className="flex-row items-center">
                                            {/* <Text className="">{patientPolicyDataJson.name} - </Text> */}
                                            <View>
                                                <Text
                                                    className="text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md">
                                                    Card No: {patientPolicyDataJson.cardNo}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text className="text-[12px] pt-2">
                                            {/* <Text>
                                            <AntDesign name="star" color={"#ffab00"} />
                                        </Text> */}
                                            {/* {patientPolicyDataJson.rating} */}
                                            {/* <Text>
                                            <Entypo name="dot-single" />
                                        </Text> */}
                                            <Text className="text-pc-primary">
                                                <AntDesign name="clockcircle" />
                                                {patientPolicyDataJson.startDate != null ? " " + new Date(patientPolicyDataJson.startDate).toLocaleTimeString() : ' No start date'} -
                                                {patientPolicyDataJson.endDate != null ? " " + new Date(patientPolicyDataJson.endDate).toLocaleTimeString() : ' No end date'}
                                                {/* {new Date(patientPolicyDataJson.endDate).toLocaleTimeString()} */}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                                <View className=" border border-pc-primary p-2 rounded-md ">
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={24}
                                        color={"rgb(132 204 22)"}
                                    />
                                    {/* <Ionicons name="heart-outline" size={16} color={"rgb(132 204 22)"} /> */}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="flex mt-3 flex-col px-4">
                        {/* <View className="border rounded-xl mb-3">
                            <Picker
                                selectedValue={selectedSlot} onValueChange={(itemValue) => { slotChange(itemValue); }} className="h-12 border border-pc-primary">
                                <Picker.Item label="Select Shift" value="" />
                                {slots.map((slot: any) => (
                                    <Picker.Item key={slot.id} label={slot.slotName} value={slot.slotName} />
                                ))}
                            </Picker>
                        </View> */}
                        <View className="border rounded-xl">
                            <Picker
                                selectedValue={defaultStatus} onValueChange={(itemValue) => { statusChange(itemValue); }} className="h-12">
                                <Picker.Item label="Select Status" value="" />
                                {['Booked', 'Confirmed'].map((branch: any) => (
                                    <Picker.Item key={branch} label={branch} value={branch} />
                                ))}
                            </Picker>
                        </View>
                    </View>


                    <View>
                        {
                            slots.length <= 0 ?
                                <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No slots available for selected date")}</Text>
                                :
                                <FlatList
                                    data={slots}
                                    numColumns={3}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ marginHorizontal: "auto" }}
                                    extraData={selectedSlots}
                                    renderItem={({ item }) => {
                                        return (
                                            <View className="flex flex-row p-1 m-1 w-32 h-32">
                                                <Pressable
                                                    onPress={() => {
                                                        // console.log("item: ", item)
                                                        Alert.alert(
                                                            // 'Doctor ' + doctor, 'Date: ' + moment(fromDate).format("DD-MMM-YYYY") + " -\nSlot: " + item.slotName, 
                                                            // 'Doctor ' + item.name,
                                                            `${doctor},  ${branchName}, ${city},`,
                                                            'Date: ' + moment(fromDate).format("DD-MMM-YYYY") + "\nTime: " + item.slotName,
                                                            [
                                                                {
                                                                    text: 'Confirm',
                                                                    onPress: () => {
                                                                        loggedIn ? selectSlot(item) : router.push("/SignIn");
                                                                    },
                                                                    style: 'default'
                                                                },
                                                                {
                                                                    text: 'Cancel',
                                                                    style: 'default'
                                                                },
                                                            ])

                                                    }}
                                                    className={`border p-2 rounded-lg w-full ${selectedSlots.has(item) ? "border-lime-500" : "border-pc-primary"}`}
                                                >
                                                    <View className="py-2 items-center">
                                                        <Ionicons name="time" size={36} color={"#3B2314"} />
                                                    </View>
                                                    <Text className="text-sm font-semibold text-center text-pc-primary pt-3 pb-2">{item.slotName}</Text>
                                                </Pressable>
                                            </View>
                                        )
                                    }}
                                />
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScheduleAppointment;
