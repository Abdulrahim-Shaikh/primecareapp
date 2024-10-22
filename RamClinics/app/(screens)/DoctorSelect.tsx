import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React, { useCallback, useEffect, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import moment, { Moment } from "moment";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useUserSate } from "../../domain/state/UserState";
import branchService from "../../domain/services/BranchService";
import slotService from "../../domain/services/SlotService";
import appointmentService from "../../domain/services/AppointmentService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import { Calendar } from "react-native-calendars";

const Separator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

const DoctorSelect = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, callOrReception, shift, gender, slotSearchDate, selectedSlot, reservedSlots, doctorList } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [doctors, setDoctors] = useState(JSON.parse(doctorList.toString()));
    const [slot, setSlot] = useState(selectedSlot);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [searchDate, setSearchDate] = useState(moment(slotSearchDate).toDate());
    const [loggedIn, setLoggedIn] = useState(useUserSate.getState().loggedIn);
    const { branches, setBranches } = useBranches();
    const [slotsReserved, setSlotsReserved] = useState(JSON.parse(reservedSlots.toString()));

    useFocusEffect(
        useCallback(() => {
            console.log("city: ", city)
            setDoctors(JSON.parse(doctorList.toString()))
            setSlot(selectedSlot)
            setSlotsReserved(JSON.parse(reservedSlots.toString()))
            setSearchDate(moment(slotSearchDate).toDate())
            setLoggedIn(useUserSate.getState().loggedIn)
        }, [])
    )

    const bookAppointment = async (doctor: any) => {

        // let branchResponse = await branchService.findAll();
        let branchId = branches.find((branch: any) => branch.name === doctor?.primaryBranch)?.id;
        let slotGroupIds = slotsReserved.flat().filter((slotDoc: any) => slotDoc.id == doctor?.id).map((slot: any) => slot.slotId).join('$')

        slotService.slotsByIds(slotGroupIds)
            .then((response) => {
                console.log("arrararararesponse.data: ", response.data)
                console.log("useUserSate.getState().user: ", useUserSate.getState().user)
                let app: any = {}
                app.slots = [...response.data]
                let start, end;
                if (app.slots) {
                    start = app.slots[0].startTime
                    end = app.slots[app.slots.length - 1].endTime
                }
                app.mrno = useUserSate.getState().user.mrno
                app.patientId = useUserSate.getState().user.id
                app.patientName = useUserSate.getState().user.firstName + " " + useUserSate.getState().user.lastName
                app.practitionerName = doctor.name
                app.practitionerId = doctor.id
                app.branchName = doctor.primaryBranch
                app.department = department;
                app.speciality = speciality;
                app.gender = useUserSate.getState().user.gender
                app.age = Math.ceil(useUserSate.getState().user.age)
                app.mobileNo = useUserSate.getState().user.mobile
                app.nationality = useUserSate.getState().user.country
                app.nationalId = useUserSate.getState().user.nationalityId
                app.branchId = branchId;
                app.status = "pending"
                app.hisStatus = "Booked";
                app.startTime = start;
                app.endTime = end;
                app.policyNo = "C0001";
                app.policyName = "Cash Plan"
                let today = moment().locale('en').utcOffset('Asia/Riyadh').format().slice(0, 19);
                app.appointmentDate = moment(searchDate).locale('en').utcOffset('Asia/Riyadh').format().slice(0, 19);
                let slots: any = [];
                if (app.hisStatus !== 'Waiting') {
                    app.slots.forEach((slot: any) => {
                        if (slot.status == 'busy') {
                            slot.overbooked = true;
                        } else {
                            slot.status = 'busy';
                        }
                        slots.push({
                            slotId: slot.id,
                            status: slot.status,
                            slotName: slot.slotName,
                            startTime: slot.startTime,
                            endTime: slot.endTime
                        });
                    });
                }
                app.slots = slots;
                app.history = [];
                app.createdBy = useUserSate.getState().user.name;
                app.createdDate = today;
                app.source = "CallCenter - PrimeCare Mobile App"
                app.flowType = "CallCenter - NewFlow"
                let history: any = {};
                history.status = "Booked";
                history.updatedBy = useUserSate.getState().user.name;
                history.updatedDate = new Date();
                app.history.push(history);
                let slotsApi: any[] = [];
                slots.forEach((slot: any) => {
                    slotsApi.push(slot.slotName);
                })

                console.log("slotsApi: ", slotsApi)
                console.log("app.branchId: ", app.branchId)
                console.log("moment(app.appointmentDate).format('yyyy-MM-DD'): ", moment(app.appointmentDate).format("yyyy-MM-DD"))
                console.log("app.practitionerId: ", app.practitionerId)
                appointmentService.getAppointmentsBySlotId(slotsApi, app.branchId, moment(app.appointmentDate).format("yyyy-MM-DD"), app.practitionerId)
                    .then((response: any) => {
                        if (Object.keys(response.data).length > 0) {
                            Alert.alert('Appointment already exists', 'You already have an appointment in the selected slot interval!')
                        } else {
                            console.log("app: ", app)
                            appointmentService.bookAppointmentBySource("CallCenter", "NewFlow", app)
                                .then((response) => {
                                    // setLoader(false)
                                    Alert.alert('Success', 'Appointment has been booked successfully', [
                                        {
                                            text: 'OK',
                                            style: 'default'
                                        },
                                    ],
                                    )
                                })
                                .catch((error) => {
                                    // setLoader(false)
                                    console.log("appointmentService error", error)
                                })
                            // appointmentService.save(app)
                            //     .then((response: any) => {
                            //         console.log("appointmentService.save: ", response)
                            //         Alert.alert('Appointment booked', 'Appointment has booked successfully!')
                            //     })
                            //     .catch((error: any) => {
                            //         console.log("appointmentService.save error: ", error)
                            //         Alert.alert('Appointment booking failed', 'Failed to book appointment!')
                            //     })
                        }
                    })
                    .catch((error: any) => {
                        console.log("getAppointmentsBySlotId error: ", error)
                        Alert.alert('Appointment booking failed', 'Failed to book appointment!')
                    })
            })
            .catch((error) => {
                Alert.alert("Appointment booking failed", "There might be an existing appointment in the selected slot interval or with the same doctor!")
                console.log("slotService error: ", error)
            })

    }

    function selectDoctor(item: any) {
        setSelectedDoctor(item)
        console.log("item: ", item)
        if (!loggedIn) {
            Alert.alert('Patient not found', 'You need to Sign in to book an appointment', [
                { text: 'BACK', style: 'default' },
                { text: 'SIGN IN', onPress: () => router.push('/SignIn'), style: 'default' },
            ],
            )
        } else {
            Alert.alert(
                `${item.name},  ${branch}${city},`,
                // 'Doctor ' + item.name,
                'Date: ' + moment(searchDate).format("DD-MMM-YYYY") + " -\nSlot: " + selectedSlot,
                [
                    { text: 'Cancel', style: 'default' },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            loggedIn ? bookAppointment(item) : router.push("/SignIn");
                        },
                        style: 'default'
                    },
                ],
            )
        }
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Booking Confirmation" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <Text className="text-xl font-bold">Selected Appointment: {slotSearchDate} - {selectedSlot}</Text>
                    <Separator />
                    {doctors.map((item: any) => (
                        <View
                            key={`key: ${item.id}`}
                            className="p-4 border border-pc-primary rounded-2xl w-full mt-4"
                        >
                            <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-pc-primary pb-4">
                                <View className="flex flex-row justify-start items-center ">
                                    <View>
                                        <Text className="text-base font-medium pb-2">
                                            {item.name} - {item.nationality}
                                        </Text>
                                        <View className="flex-row items-center gap-2">
                                            <View>
                                                <Text
                                                    className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                                                    {item.speciality}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text
                                                    className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                                                    {item.gender}
                                                </Text>
                                            </View>
                                            {/* <View>
                                                <Text
                                                    className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                                                    {item.hisStatus}
                                                </Text>
                                            </View> */}
                                        </View>

                                        <Text className="text-[12px] pt-2">
                                            {/* <Text> <AntDesign name="star" color={"#ffab00"} /> </Text>
                                            Id: {item.empId}
                                            <Text>
                                                <Entypo name="dot-single" />
                                            </Text> */}
                                            <Text className="text-pc-primary">
                                                <AntDesign name="clockcircle" /> from {selectedSlot}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>

                                {/* <View className=" border border-pc-primary p-2 rounded-md ">
                                    <Ionicons
                                        name="heart-outline"
                                        size={16}
                                        color={"rgb(132 204 22)"}
                                    />
                                </View> */}
                            </View>
                            <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                >
                                    <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center" >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text
                                        onPress={() => selectDoctor(item)}
                                        className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                                        Book Appointment
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}
export default DoctorSelect;