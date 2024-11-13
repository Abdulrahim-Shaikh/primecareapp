import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, View, Alert, Image, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React, { useCallback, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import moment from "moment";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserSate } from "../../domain/state/UserState";
import slotService from "../../domain/services/SlotService";
import appointmentService from "../../domain/services/AppointmentService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import patientService from "../../domain/services/PatientService";
import * as Localization from 'expo-localization'
import { I18n } from "i18n-js";
import translations from "../../constants/locales/ar";
import http from "../../domain/services/core/HttpService";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const DoctorSelect = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline, shift, gender, slotSearchDate, selectedSlot, reservedSlots, doctorList, callCenterDoctorFlow, callCenterDoctor, scheduleId } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [doctors, setDoctors] = useState(JSON.parse(doctorList.toString()));
    const [slot, setSlot] = useState(selectedSlot);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [searchDate, setSearchDate] = useState(moment(slotSearchDate).toDate());
    const [loggedIn, setLoggedIn] = useState(useUserSate.getState().loggedIn);
    const { branches, changeBranches } = useBranches();
    const [slotsReserved, setSlotsReserved] = useState(JSON.parse(reservedSlots.toString()));
    const [patient, setPatient] = useState<any>(null)
    const [loader, setLoader] = useState(false);
    const [displayedDoctor, setDisplayedDoctor] = useState<any>({});
    const [minimalDoctorInfo, setMinimalDoctorInfo] = useState<any>({});
    const [locale, setLocale] = useState(i18n.locale);
    const [appointmentExists, setAppointmentExists] = useState(false);
    const [confirmAppointmentModal, setConfirmAppointmentModal] = useState(false);
    const [appointmentToConfirm, setAppointmentToConfirm] = useState<any>(null);
    const [appointmentServiceError, setAppointmentServiceError] = useState<any>(null);
    const [appointmentServiceErrorText, setAppointmentServiceErrorText] = useState<any>(null);
    const [appointmentFailed, setAppointmentFailed] = useState<any>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [patientNotFoundModal, setPatientNotFoundModal] = useState(false);
    const [doctorScheduleNotFoundModal, setDoctorScheduleNotFoundModal] = useState(false);
    const [appointmentBranch, setAppointmentBranch] = useState<any>({});

    const showDoctor = (item: any) => {
        setMinimalDoctorInfo(item)
        resourceService.find(item.id)
            .then((response) => {
                setDisplayedDoctor(response.data)
                // console.log("\n\n\n\nresourceServiceList: ", response.data.resourceServiceList)
            })
            .catch((error) => {
                console.error("resourceService error: ", error.response)
            })
    }

    useFocusEffect(
        useCallback(() => {
            if (branch != null) {
                for (let i of branches) {
                    console.log("\n\ni: ", i.name)
                    if (i.name == branch) {
                        setAppointmentBranch(i)
                        break;
                    }
                }
                setAppointmentBranch(branches.filter((branch: any) => branch.name === branch)[0])
                console.log("branch: ", branches.filter((branch: any) => branch.name === branch)[0])
            }
            console.log("\n\nuser: ", useUserSate.getState())
            console.log("callCenterDoctor: ", callCenterDoctor)
            patientService.patientDetails(useUserSate.getState().user.firstName)
                .then((response) => {
                    for (let i of response.data) {
                        if (i.id == useUserSate.getState().user.id) {
                            setPatient(i)
                            break;
                        }
                    }
                })
                .catch((error) => {
                    console.log("\n\n\n\n\n\npatientService.getByPatientId error: ", error)
                })
            console.log("useUserSate.getState().user: ", useUserSate.getState().user)
            if (+callCenterDoctorFlow) {
                resourceService.find(+callCenterDoctor)
                    .then((response) => {
                        console.log("response.data: ", response.data)
                        setDoctors([response.data])
                    })
                    .catch((error: any) => {
                        console.log("resourceService.find error: ", error.response)
                    })
            } else {
                setDoctors(JSON.parse(doctorList.toString()))
            }
            setSlot(selectedSlot)
            setSlotsReserved(JSON.parse(reservedSlots.toString()))
            setSearchDate(moment(slotSearchDate).toDate())
            setLoggedIn(useUserSate.getState().loggedIn)
        }, [])
    )

    const bookAppointment = async (doctor: any) => {

        setLoader(true)

        let branchId = branches.find((branch: any) => branch.name === doctor?.primaryBranch)?.id;
        console.log("\n\n\n\nslotsReserved: ", slotsReserved)
        let slotGroupIds
        if (+callCenterDoctorFlow) {
            slotGroupIds = slotsReserved.flat().map((slot: any) => slot.id).join('$')
        } else {
            slotGroupIds = slotsReserved.flat().filter((slotDoc: any) => slotDoc.id == doctor?.id).map((slot: any) => slot.slotId).join('$')
        }

        let app: any = {}
        let today = moment().locale('en').utcOffset('Asia/Riyadh').format().slice(0, 19);

        app.branchId = branchId;
        app.branchName = doctor.primaryBranch

        // to be checked later 
        app.cardNo = '0'
        app.className = null

        app.age = patient.age || patient.ageText
        app.appointmentDate = moment(searchDate).locale('en').utcOffset('Asia/Riyadh').format().slice(0, 19);
        app.createdBy = useUserSate.getState().user.firstName + " " + useUserSate.getState().user.lastName + " - PrimeCare Mobile App";
        app.createdDate = today;
        app.department = department;
        app.gender = patient.gender
        app.hisStatus = "Booked";
        app.history = [
            {
                status: "Booked",
                updatedBy: `Booked by ${useUserSate.getState().user.firstName + " " + useUserSate.getState().user.lastName} via PrimeCare Mobile app on ${moment(new Date).format('DD-MMM-YYYY hh:mm A')}`,
                updatedDate: (new Date).toISOString()
            }
        ];
        app.mobileNo = useUserSate.getState().user.mobile
        app.mrno = patient.mrno
        app.nationalId = patient.nationalId
        app.nationality = patient.nationality
        app.patientId = useUserSate.getState().user.id
        app.patientName = useUserSate.getState().user.firstName + " " + useUserSate.getState().user.lastName
        app.policyName = "Cash Plan"
        app.policyNo = "C0001";
        app.practitionerId = doctor.id
        app.practitionerName = doctor.name
        app.remarks = null
        app.requestByPatient = null
        app.shift = shift || null
        app.speciality = speciality;
        app.status = "pending"
        app.visitType = "Checkup"
        app.walkIn = null
        app.bookedFrom = "PrimeCare Mobile App"
        if (+callCenterDoctorFlow) {
            let slots: any = [];
            let start: any, end: any;
            if (slotsReserved) {
                start = slotsReserved[0][0].startTime
                end = slotsReserved[slotsReserved.length - 1][0].endTime
            }
            slotsReserved.forEach((slot: any) => {
                if (slot[0].status == 'busy') {
                    slot[0].overbooked = true;
                } else {
                    slot[0].status = 'busy';
                }
                slots.push({
                    slotId: slot[0].id,
                    scheduleId: +scheduleId,
                    status: slot[0].status,
                    slotName: slot[0].slotName,
                    startTime: slot[0].startTime,
                    endTime: slot[0].endTime
                })
            })
            app.slots = slots;
            app.endTime = end;
            app.startTime = start;
            setLoader(true)
            console.log("calling appointmentService.bookAppointmentBySource")
            appointmentService.bookAppointmentBySource(app)
                .then((response) => {
                    console.log("success: ")
                    setLoader(false)
                    console.log("appointmentService response: ", response.data)
                    setBookingSuccess(true)
                })
                .catch((error) => {
                    console.log("failed: ", error.response)
                    setLoader(false)
                    console.error("appointmentService error", error.response?.data.errors[0].msg)
                    setAppointmentServiceErrorText(error.response?.data.errors[0].msg)
                    setAppointmentServiceError(true)
                })
        } else {
            slotService.slotsByIds(slotGroupIds)
                .then((response) => {
                    console.log("arrararararesponse.data: ", response.data)
                    app.slots = [...response.data]
                    let start, end;
                    if (app.slots) {
                        start = app.slots[0].startTime
                        end = app.slots[app.slots.length - 1].endTime
                    }
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
                    app.endTime = end;
                    app.startTime = start;
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
                                setLoader(false)
                                setAppointmentExists(true)
                            } else {
                                console.log("appppp: ", app)
                                appointmentService.bookAppointmentBySource(app)
                                    .then((response) => {
                                        setLoader(false)
                                        console.log("appointmentService response: ", response)
                                        setBookingSuccess(true)
                                    })
                                    .catch((error) => {
                                        // setLoader(false)
                                        setLoader(false)
                                        console.error("appointmentService error", error.response?.data.errors[0].msg)
                                        setAppointmentServiceErrorText(error.response?.data.errors[0].msg)
                                        setAppointmentServiceError(true)
                                    })
                            }
                        })
                        .catch((error: any) => {
                            setLoader(false)
                            console.error("getAppointmentsBySlotId error: ", error.response)
                            setAppointmentFailed(true)
                        })
                })
                .catch((error) => {
                    setLoader(false)
                    setAppointmentFailed(true)
                })
        }


    }

    function selectDoctor(item: any) {
        console.log("selectDoctor: ", item)
        setSelectedDoctor(item)
        if (!loggedIn) {
            setPatientNotFoundModal(true)
        } else {
            setAppointmentToConfirm(item)
            setConfirmAppointmentModal(true)
        }
    }


    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Booking Confirmation" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    {/* <Text className="text-xl font-bold">Selected Appointment: {slotSearchDate} - {selectedSlot}</Text> */}
                    {doctors.map((item: any) => (
                        <View
                            key={`key: ${item.id}`}
                            className="p-4 border border-pc-primary rounded-2xl w-full mt-4"
                        >
                            <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-pc-primary pb-4">
                                <View className="flex flex-row justify-start items-center ">
                                    <View>
                                        <View className="flex flex-row justify-between">
                                            <View>
                                                <Text className="pb-4 text-base font-medium pb-2">
                                                    {item.name} - {item.nationality}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text className="pb-4 text-base font-medium pb-2">
                                                    {moment(slotSearchDate).format("DD-MMM-YYYY")}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="w-full flex flex-row justify-between items-center gap-2">
                                            <View className="flex-row gap-2">
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
                                            <View className="flex justify-end">
                                                <Text className="text-pc-primary">
                                                    <AntDesign name="clockcircle" /> from {selectedSlot}
                                                </Text>
                                            </View>
                                        </View>

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
                                <Pressable
                                    onPress={() => {
                                        console.log("toggleiing")
                                        console.log("modalVisible: ", modalVisible)
                                        showDoctor(item)
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center" >
                                        Doctor Information
                                    </Text>
                                </Pressable>
                                <Pressable>
                                    <Text
                                        onPress={() => selectDoctor(item)}
                                        className="bg-[#3B2314] text-white border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                                        Confirm Booking
                                    </Text>
                                </Pressable>
                                {/* <Pressable
                                >
                                    <Text
                                        className="bg-[#3B2314] text-white border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                                        Confirm Booking
                                    </Text>
                                </Pressable> */}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <View className="flex flex-row border-b border-dashed border-pc-primary pb-6 justify-center">
                                <View className="flex items-center justify-center flex-wrap">
                                    <Image source={{ uri: 
                                        displayedDoctor.photo == null || displayedDoctor.photo == '' ?
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SefNqxMPw23P5tFdlgwEe9cfcdnf7d-Law&s' 
                                        : http.getURL() + 'resource/file/' + displayedDoctor.photo
                                    }} style={{ width: 100, height: 100 }} />
                                    <Text className="pt-3 text-2xl">{displayedDoctor.name}</Text>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="account-outline"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Gender</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.gender}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="stethoscope"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Speciality</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.speciality}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="flag-variant"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Nationality</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.nationality || minimalDoctorInfo.nationality || 'Unknown'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="professional-hexagon"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Professional Classification</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.professionalClassification || 'Unknown'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="certificate"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Qualification</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.qualification || 'Unknown'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="account-tie-hat-outline"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Graduation</Text>
                                        <Text className="font-bold text-xl">{displayedDoctor.graduation ? displayedDoctor.qualification: 'Unknown'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex flex-row items-center gap-4 pt-6">
                                    <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <MaterialCommunityIcons
                                            name="account-tie-hat-outline"
                                            size={30}
                                            color={"#84cc16"}
                                        />
                                    </View>
                                    <View className="flex flex-col">
                                        <Text>Consultation Fees</Text>
                                        <View className="flex flex-row justify-start">
                                            <Text className="font-bold text-xl flex flex-row justify-start">{'\uFDFC'} {displayedDoctor.consultationFee ? displayedDoctor.consultationFee: 'Unknown'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                displayedDoctor.resourceServiceList != null && Object.keys(displayedDoctor).includes('resourceServiceList') && displayedDoctor.resourceServiceList.length > 0 &&
                                <View className="pt-8">
                                    <Text>Doctor Services: </Text>
                                    {/* 951507876 */}
                                    <View className="pt-3">
                                        <FlatList
                                            contentContainerStyle={{ gap: 9 }}
                                            data={displayedDoctor.resourceServiceList}
                                            keyExtractor={(item: any, index) => "key" + index}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View className="w-full">
                                                        <Pressable
                                                            className="flex flex-row border border-pc-primary rounded-lg p-3 shadow-sm bg-white"
                                                        // onPress={() => { selectSubService(item, item.responsible, item.devices, item.mobileOrOnline) }}
                                                        // onPress={() => { selectSpeciality(item, item.code, item.name, item.services) }}
                                                        >
                                                            <View className="rounded-full bg-white flex justify-center items-center w-18 h-18 border border-gray-200">
                                                                {/* <Image source={specialityIcon} style={{ width: 50, height: 50 }} /> */}
                                                                <MaterialCommunityIcons
                                                                    name="stethoscope"
                                                                    size={30}
                                                                    color={"#3b2314"}
                                                                />
                                                            </View>
                                                            <View className="w-full px-4 flex justify-center gap-3">
                                                                <View className="w-full flex flex-col items-start gap-2 font-semibold text-lg text-gray-800">
                                                                    <Text>
                                                                        {locale == "ar" ? item.serviceNameAr : item.serviceName}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </Pressable>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>
                                    {/* {resourceServiceListRender} */}
                                </View>
                            }
                        </ScrollView>

                        <Button color="#3B2314" title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={confirmAppointmentModal} onRequestClose={() => setConfirmAppointmentModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="information-outline"
                                size={60}
                                color={"#737373"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-2 mt-1">{appointmentToConfirm?.name}, {branch}, {appointmentBranch?.district}, {city}</Text>
                        <Text className="text-xl text-center mb-4">{i18n.t('Date')}: {moment(searchDate).format("DD-MMM-YYYY") + "\nTime: " + selectedSlot}</Text>
                        <View className=" flex-row justify-between gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setConfirmAppointmentModal(false)
                            }} >
                                <Text> {i18n.t('Cancel')} </Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setConfirmAppointmentModal(false)
                                loggedIn ? bookAppointment(appointmentToConfirm) : router.push("/SignIn");
                            }}>
                                <Text> {i18n.t('Confirm')} </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={bookingSuccess} onRequestClose={() => setBookingSuccess(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="check-circle-outline"
                                size={60}
                                color={"#84CC16"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-4 pt-3">{i18n.t('Success - Appointment booked successfully')}</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setBookingSuccess(false)
                                router.back()
                            }}>
                                <Text> {i18n.t('Ok')} </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={appointmentFailed} onRequestClose={() => setAppointmentFailed(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={60}
                                color={"#EF4444"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-2 mt-1">{i18n.t('Appointment booking failed')}</Text>
                        <Text className="text-xl text-center mb-4">Failed to save appointment</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setAppointmentFailed(false)
                                router.back()
                            }}>
                                <Text> Ok </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={appointmentServiceError} onRequestClose={() => setAppointmentServiceError(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={60}
                                color={"#EF4444"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-2 mt-1">Appointment booking failed</Text>
                        <Text className="text-xl text-center mb-4">{appointmentServiceErrorText}</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setAppointmentServiceError(false)
                                router.back()
                            }}>
                                <Text> Ok </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={appointmentExists} onRequestClose={() => setAppointmentExists(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="information-outline"
                                size={60}
                                color={"#737373"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-2 mt-1">Appointment already exists</Text>
                        <Text className="text-xl font-bold text-center mb-4">You already have an appointment in the selected slot interval!</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setAppointmentExists(false)
                                router.back()
                            }}>
                                <Text> Ok </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={doctorScheduleNotFoundModal} onRequestClose={() => {
                setDoctorScheduleNotFoundModal(false)
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={60}
                                color={"#EF4444"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-4 pt-3">Doctor schedule not found</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setDoctorScheduleNotFoundModal(false)
                            }} >
                                <Text> Back </Text>
                                <MaterialCommunityIcons
                                    name="chevron-left"
                                    size={24}
                                    color={"#dc2626"}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={patientNotFoundModal} onRequestClose={() => setPatientNotFoundModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <View className="flex flex-row justify-center">
                            <MaterialCommunityIcons
                                name="close-circle-outline"
                                size={60}
                                color={"#EF4444"}
                            />
                        </View>
                        <Text className="text-xl font-bold text-center mb-2 mt-1">Patient Not Found</Text>
                        <Text className="text-xl font-bold text-center mb-4">You need to Sign in to book an appointment</Text>
                        <View className=" flex-row justify-between gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setPatientNotFoundModal(false)
                            }} >
                                <Text> Back </Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setPatientNotFoundModal(false)
                                router.push('/SignIn')
                            }}>
                                <Text> Sign in </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>





            <Modal visible={loader} transparent={true} animationType="fade" onRequestClose={() => {
                setLoader(!loader);
            }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            </Modal>

        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxHeight: '100%', // Ensure the modal doesn't exceed screen height
    },
    scrollContent: {
        paddingVertical: 10,
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
    },
});
export default DoctorSelect;