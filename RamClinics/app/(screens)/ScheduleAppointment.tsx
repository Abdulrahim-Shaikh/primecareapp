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

const ScheduleAppointment = () => {
    let loggedIn = useUserSate.getState().loggedIn;
    const router = useRouter();
    const { branchId, department, speciality, doctor, date, params, patientData, patientPolicyData } = useLocalSearchParams();

    // const doctorScheduleData = params ? JSON.parse(params.toString()) : {}
    const [doctorScheduleData, setDoctorScheduleData] = useState(params ? JSON.parse(params.toString()) : {})
    const [patientDataJson, setPatientDataJson] = useState(patientData ? JSON.parse(patientData.toString()) : {})
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [patientPolicyDataJson, setPatientPolicyDataJson] = useState(patientPolicyData ? JSON.parse(patientPolicyData.toString()) : {})
    // const defaultStatus = doctorScheduleData.status ? doctorScheduleData.status : "Booked"
    const [slots, setSlots] = useState([])
    const [defaultStatus, setDefaultStatus] = useState(doctorScheduleData.status ? doctorScheduleData.status : "Booked")
    const [day, setDay] = useState("1");
    const [selectedSlot, setSelectedSlot] = useState<any>()
    const [slotStartTime, setSlotStartTime] = useState("");
    const [slotEndTime, setSlotEndTime] = useState("");
    const [slotStatus, setSlotStatus] = useState("");
    const [slotName, setSlotName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [selectedSlots, setSelectedSlots] = useState(new Set<number>());


    let fromDateAux = new Date();
    let toDateAux = new Date();

    useEffect(() => {
        setSelectedSlots(new Set<number>())
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
            slotsAux.forEach((slot: any) => {slot.selected = false})
            let validSlots: any = []
            // for (let slot of slotsAux) {
            //     const currentTimeInstance = moment();
            //     const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
            //     if (moment(slotTimeInstance).isAfter(currentTimeInstance)) {
            //     }
            // }
            setSlots(slotsAux)
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
                            setBranchName(response.data.name)
                        })
                        .catch((error) => {
                            console.log("\n\n\nerror: ", error)
                        })
                }
            }
        }
    }, [])

    function selectSlot(slot: any) {
        let tempMap = selectedSlots
        if (selectedSlots.has(slot)) {
            selectedSlots.delete(slot)
            setSelectedSlots(tempMap)
            // setSelectedSlots(selectedSlots.delete(slot.slotId))
        } else {
            tempMap.add(slot)
            setSelectedSlots(tempMap)
        }
        console.log("selectedSlots: ", selectedSlots)
    }

    function slotChange(selectedSlot: any) {
        setSelectedSlot(selectedSlot)
        setSlotStatus(selectedSlot.status)
        setSlotName(selectedSlot.slotName)
        setSlotStartTime(selectedSlot.startTime)
        setSlotEndTime(selectedSlot.endTime)
    }

    function statusChange(selectedStatus: any) {
        setDefaultStatus(selectedStatus)
    }

    const bookAppointment = () => {
        let today = moment().format("YYYY-MM-DDTHH:mm:ss");
        let scheduleId = Object.values(doctorScheduleData.scheduleId)[0]
        let aptDate = Object.values(doctorScheduleData.date)[0]
        let appointmentDate = moment(aptDate ? aptDate : "").format("YYYY-MM-DDTHH:mm:ss")

        let temporaryPayload: any = {
            mrno: patientDataJson.mrno,
            age: +patientDataJson.age,
            appointmentDate: appointmentDate,
            branchId: +branchId,
            branchName: branchName,
            cardNo: patientPolicyDataJson.cardNo,
            className: patientPolicyDataJson.className,
            createdBy: "ibrahim",
            createdDate: today,
            department: department,
            startTime: slotStartTime,
            endTime: slotEndTime,
            gender: patientDataJson.gender,
            hisStatus: defaultStatus,
            history: [
                {
                    status: defaultStatus,
                    updatedBy: 'ibrahim',
                    updatedDate: "2024-09-30T14:52:21.531Z"
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
            slots: [
                // {
                //     endTime: slotStartTime,
                //     scheduleId: scheduleId,
                //     slotId: 6900196,
                //     slotName: slotName,
                //     startTime: slotEndTime,
                //     status: slotStatus
                // }
            ],
            speciality: speciality,
            status: 'pending',
            visitType: 'Checkup',
            walkIn: null
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

        let temporaryPayload2 = {
            "mrno": "KHO-AQRPNT100001",
            "patientId": "PNT100001",
            "patientName": "Abdulrahim  Shaikh",
            "gender": "Male",
            "age": 21,
            "mobileNo": "594951370",
            "nationality": "India",
            "department": "Dental",
            "speciality": "General Dentist",
            "appointmentDate": "2024-09-30T00:00:00",
            "branchName": "Ram Buhairah",
            "branchId": 593482,
            "policyNo": "C0001",
            "policyName": "Cash Plan",
            "createdBy": "ibrahim",
            "visitType": "Checkup",
            "status": "pending",
            "hisStatus": "Booked",
            "slots": [
                { "slotId": 6900196, "scheduleId": 6889360, "status": "busy", "slotName": "20:30-20:35", "startTime": "2024-09-30T20:30:00", "endTime": "2024-09-30T20:35:00" },
            ],
            "nationalId": null,
            "practitionerName": "waari hussain",
            "practitionerId": 25937,
            "shift": null,
            "walkIn": null,
            "requestByPatient": null,
            "remarks": null,
            "history": [
                { "status": "Booked", "updatedBy": "ibrahim", "updatedDate": "2024-09-30T14:52:21.531Z" }
            ],
            "startTime": "2024-09-30T20:30:00",
            "endTime": "2024-09-30T20:45:00",
            "className": null,
            "cardNo": "0",
            "createdDate": "2024-09-30T17:52:21"
        }
        // console.log("\n\n\ntemporaryPayload2: ", temporaryPayload2)
        console.log("\n\n\n")

        appointmentService.save(temporaryPayload)
            .then((response) => {
                // console.log("response appointmentService save: ", response)

                Alert.alert('Success', 'Appointment has been booked successfully', [
                    {
                        text: 'OK',
                        // onPress: () => router.push({
                        //     pathname: "/BookAppointment",
                        // }),
                        style: 'default'
                    },
                ],
                )
                // router.push({
                //     pathname: "/BookAppointment",
                // })
                // console.log("appointmentService response: ", response)
            })
            .catch((error) => {
                // router.push({
                //     pathname: "/BookAppointment",
                // })
                console.log("appointmentService error", error)
            })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={"rgb(132 204 22)"}
                            onPress={() => router.back()}
                        />
                        <Text className="text-2xl font-semibold">Schedule Appointment</Text>
                    </View>
                </View>
                <View className="py-8 gap-4 flex justify-center">
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

                    <View className="flex mt-3 flex-col px-8">
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
                        {/* <TouchableOpacity onPress={
                            () => {
                                Alert.alert('Doctor ' + doctor, 'Date: ' + new Date(fromDate).toLocaleDateString() + " -\nSlot: " + new Date(fromDate).toLocaleTimeString() + '  to  ' + new Date(toDate).toLocaleTimeString(), [
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            loggedIn ? bookAppointment() : router.push("/SignIn");
                                        },
                                        style: 'default'
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'default'
                                    },
                                ])
                            }
                        }
                            className="flex flex-row justify-between items-center pt-2 gap-4 ">
                            <Text className="flex-1 text-white border border-pc-primary px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                                Confirm Book
                            </Text>
                        </TouchableOpacity> */}
                    </View>


                    <View>
                        <FlatList
                            data={slots}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginHorizontal: "auto" }}
                            extraData={selectedSlots}
                            renderItem={({item}) => {
                                return (
                                <View className="flex flex-row p-1 m-1 w-32 h-32">
                                    <Pressable
                                        onPress={() => {
                                            selectSlot(item)
                                        }}
                                        // className="border border-pc-primary p-2 rounded-lg w-full"
                                        className={`border p-2 rounded-lg w-full ${selectedSlots.has(item)? "border-lime-500" : "border-pc-primary" }`}
                                        >
                                        <View className="py-2 items-center">
                                            <Ionicons name="time" size={36} color={"#3B2314"} />
                                        </View>
                                        <Text className="text-sm font-semibold text-center text-pc-primary pt-3 pb-2">{item.slotName}</Text>
                                    </Pressable>
                                </View>
                                )
                            }}
                            // renderItem={({ item }) => {
                            // )}
                        />
                    </View>

                    <View className="flex flex-col px-2">
                        {/* <View className="border rounded-xl mb-3">
                            <Picker
                                selectedValue={selectedSlot} onValueChange={(itemValue) => { slotChange(itemValue); }} className="h-12 border border-pc-primary">
                                <Picker.Item label="Select Shift" value="" />
                                {slots.map((slot: any) => (
                                    <Picker.Item key={slot.id} label={slot.slotName} value={slot.slotName} />
                                ))}
                            </Picker>
                        </View> */}
                        {/* <View className="border rounded-xl mb-2">
                            <Picker
                                selectedValue={defaultStatus} onValueChange={(itemValue) => { statusChange(itemValue); }} className="h-12">
                                <Picker.Item label="Select Gender" value="" />
                                {['Booked', 'Confirmed'].map((branch: any) => (
                                    <Picker.Item key={branch} label={branch} value={branch} />
                                ))}
                            </Picker>
                        </View> */}
                        <TouchableOpacity onPress={
                            () => {
                                Alert.alert('Doctor ' + doctor, 'Date: ' + new Date(fromDate).toLocaleDateString() + " -\nSlot: " + new Date(fromDate).toLocaleTimeString() + '  to  ' + new Date(toDate).toLocaleTimeString(), [
                                    {
                                        text: 'Confirm',
                                        onPress: () => {
                                            loggedIn ? bookAppointment() : router.push("/SignIn");
                                        },
                                        style: 'default'
                                    },
                                    {
                                        text: 'Cancel',
                                        style: 'default'
                                    },
                                ])
                            }
                        }
                            className="flex flex-row justify-between items-center pt-2 gap-4 ">
                            <Text className="flex-1 text-white border border-pc-primary px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                                Confirm Book
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScheduleAppointment;
