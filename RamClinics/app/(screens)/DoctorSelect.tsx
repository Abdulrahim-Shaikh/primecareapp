import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, View, Alert, Image, Button } from "react-native";
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

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const DoctorSelect = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline, shift, gender, slotSearchDate, selectedSlot, reservedSlots, doctorList, callCenterDoctorFlow, callCenterDoctor } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [doctors, setDoctors] = useState(JSON.parse(doctorList.toString()));
    const [slot, setSlot] = useState(selectedSlot);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [searchDate, setSearchDate] = useState(moment(slotSearchDate).toDate());
    const [loggedIn, setLoggedIn] = useState(useUserSate.getState().loggedIn);
    const { branches, setBranches } = useBranches();
    const [slotsReserved, setSlotsReserved] = useState(JSON.parse(reservedSlots.toString()));
    const [patient, setPatient] = useState<any>(null)
    const [loader, setLoader] = useState(false);
    const [displayedDoctor, setDisplayedDoctor] = useState<any>({});
    const [minimalDoctorInfo, setMinimalDoctorInfo] = useState<any>({});
    const [locale, setLocale] = useState(i18n.locale);
    const [appointmentExists, setAppointmentExists] = useState(false);
    const [confirmAppointmentModal, setConfirmAppointmentModal] = useState(false);
    const [appointmentToConfirm, setAppointmentToConfirm] = useState<any>(null);

    const showDoctor = (item: any) => {
        setMinimalDoctorInfo(item)
        resourceService.find(item.id)
            .then((response) => {
                // console.log("item: ", item)
                // console.log("\n\n\nresponse: ", Object.keys(response.data))
                setDisplayedDoctor(response.data)
                console.log("\n\n\n\nresourceServiceList: ", response.data.resourceServiceList)
            })
            .catch((error) => {
                console.error("resourceService error: ", error.response)
            })
    }

    useFocusEffect(
        useCallback(() => {
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
                    // setPatient(response.data)
                    // console.log("\n\n\n\n\n\npatientService.patientDetails response.data: ", response.data.length)
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

        // let branchResponse = await branchService.findAll();
        let branchId = branches.find((branch: any) => branch.name === doctor?.primaryBranch)?.id;
        console.log("\n\n\n\nslotsReserved: ", slotsReserved)
        let slotGroupIds
        if (+callCenterDoctorFlow) {
            slotGroupIds = slotsReserved.flat().map((slot: any) => slot.id).join('$')
        } else {
            slotGroupIds = slotsReserved.flat().filter((slotDoc: any) => slotDoc.id == doctor?.id).map((slot: any) => slot.slotId).join('$')
        }

        console.log("slotGroupIds: ", slotGroupIds)

        slotService.slotsByIds(slotGroupIds)
            .then((response) => {
                console.log("arrararararesponse.data: ", response.data)
                let app: any = {}
                app.slots = [...response.data]
                let start, end;
                if (app.slots) {
                    start = app.slots[0].startTime
                    end = app.slots[app.slots.length - 1].endTime
                }
                app.mrno = patient.mrno
                app.patientId = useUserSate.getState().user.id
                app.patientName = useUserSate.getState().user.firstName + " " + useUserSate.getState().user.lastName
                app.practitionerName = doctor.name
                app.practitionerId = doctor.id
                app.branchName = doctor.primaryBranch
                app.department = department;
                app.speciality = speciality;
                app.gender = patient.gender
                app.age = patient.age || patient.ageText
                app.mobileNo = useUserSate.getState().user.mobile
                app.nationality = patient.nationality
                app.nationalId = patient.nationalId
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
                app.createdBy = useUserSate.getState().user.name + " - PrimeCare Mobile App";
                app.updatedBy = "Booked on PrimeCare Mobile App on " + moment(new Date).format('DD-MMM-YYYY hh:mm A');
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
                            // Alert.alert('Appointment already exists', 'You already have an appointment in the selected slot interval!')
                            setLoader(false)
                            Alert.alert('Appointment already exists', 'You already have an appointment in the selected slot interval!', [
                                {
                                    onPress: () => router.back(),
                                    text: 'OK',
                                    style: 'default'
                                },
                            ])
                        } else {
                            console.log("app: ", app)
                            appointmentService.bookAppointmentBySource("CallCenter", "NewFlow", app)
                                .then((response) => {
                                    setLoader(false)
                                    console.log("appointmentService response: ", response)
                                    // setLoader(false)
                                    Alert.alert('Success', 'Appointment has been booked successfully', [
                                        {
                                            onPress: () => router.back(),
                                            text: 'OK',
                                            style: 'default'
                                        },
                                    ],
                                    )
                                })
                                .catch((error) => {
                                    // setLoader(false)
                                    setLoader(false)
                                    console.error("appointmentService error", error.response?.data.errors[0].msg)
                                    Alert.alert("Appointment booking failed", error.response?.data.errors[0].msg,
                                        [
                                            {
                                                onPress: () => router.back(),
                                                text: 'OK',
                                                style: 'default'
                                            },
                                        ]

                                    )
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
                        setLoader(false)
                        console.error("getAppointmentsBySlotId error: ", error.response)
                        // Alert.alert('Appointment booking failed', 'Failed to book appointment!')
                        Alert.alert('Appointment booking failed', 'Failed to book appointment!', [
                            {
                                onPress: () => router.back(),
                                text: 'OK',
                                style: 'default'
                            },
                        ])
                    })
            })
            .catch((error) => {
                setLoader(false)
                // Alert.alert("Appointment booking failed", "There might be an existing appointment in the selected slot interval or with the same doctor!")
                Alert.alert('Appointment booking failed', 'Failed to book appointment!', [
                    {
                        onPress: () => router.back(),
                        text: 'OK',
                        style: 'default'
                    },
                ])
                console.log("slotService error: ", error)
            })

    }

    function selectDoctor(item: any) {
        setSelectedDoctor(item)
        console.log("item: ", item)
        if (!loggedIn) {
            Alert.alert('Patient not found', 'You need to Sign in to book an appointment', [
                { text: 'BACK', style: 'default' }, { text: 'SIGN IN', onPress: () => router.push('/SignIn'), style: 'default' },],)
        } else {
            setAppointmentToConfirm(item)
            setConfirmAppointmentModal(true)
            // Alert.alert(
            //     `${item.name},  ${branch}, ${city},`,
            //     // 'Doctor ' + item.name,
            //     'Date: ' + moment(searchDate).format("DD-MMM-YYYY") + "\nTime: " + selectedSlot,
            //     [
            //         { text: 'Cancel', style: 'default' },
            //         {
            //             text: 'Confirm',
            //             onPress: () => {
            //                 loggedIn ? bookAppointment(item) : router.push("/SignIn");
            //             },
            //             style: 'default'
            //         },
            //     ],
            // )
        }
    }


    let resourceServiceListRender: any = []
    displayedDoctor.resourceServiceList?.forEach((item: any) => {
        console.log("\n\nitem: ", item)
        resourceServiceListRender.push(
            <View className="pt-5" key={item.id}>
                <View className="p-4 rounded-2xl border bg-white border-pc-primary flex flex-row justify-start items-center">
                    <View>
                        <Text className="text-pc-primary p-4 rounded-full">
                            {/* <MaterialCommunityIcons name="close-box" size={24} /> */}
                            <FontAwesome name="calendar-check-o" color={'#3B2314'} size={24} />
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-base font-semibold">{item.serviceName}</Text>
                    </View>
                </View>
            </View>
        )
    })



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
                                                    {item.name} {item.nationality}
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
                                <View className="flex justify-center flex-wrap">
                                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SefNqxMPw23P5tFdlgwEe9cfcdnf7d-Law&s' }} style={{ width: 100, height: 100 }} />
                                    <Text className="pt-3 text-2xl">{displayedDoctor.name}</Text>
                                </View>
                            </View>
                            <View className="flex flex-row grid grid-cols-2 gap-4">
                                <View className="flex flex-col">
                                    <View className="flex flex-row items-center gap-4 pt-6">
                                        <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                            <MaterialCommunityIcons
                                                name="office-building"
                                                size={30}
                                                color={"#84cc16"}
                                            />
                                        </View>
                                        <View className="flex flex-col">
                                            <Text>Department</Text>
                                            <Text className="font-bold text-xl">{displayedDoctor.department}</Text>
                                        </View>
                                    </View>
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
                                <View className="flex flex-col">
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
                                        <Text className="font-bold text-xl">{displayedDoctor.graduation ? "." + displayedDoctor.qualification + "." : 'Unknown'}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                displayedDoctor.resourceServiceList != null && Object.keys(displayedDoctor).includes('resourceServiceList') && displayedDoctor.resourceServiceList.length > 0 &&
                                <View className="pt-16">
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
                        {/* <Pressable className="absolute top-3 right-3" onPress={() => {
                    setMobileEmptyVisible(false)
                    router.back()
                    }}>
                    <AntDesign name="closecircle" size={24} color="#3B2314" />
                    </Pressable> */}
                        {/* <Text className="text-xl font-bold text-center mb-4 mt-7">Note</Text> */}
                        {/* // Alert.alert(
            //     `${item.name},  ${branch}, ${city},`,
            //     // 'Doctor ' + item.name,
            //     'Date: ' + moment(searchDate).format("DD-MMM-YYYY") + "\nTime: " + selectedSlot,
            //     [
            //         { text: 'Cancel', style: 'default' },
            //         {
            //             text: 'Confirm',
            //             onPress: () => {
            //                 loggedIn ? bookAppointment(item) : router.push("/SignIn");
            //             },
            //             style: 'default'
            //         },
            //     ],
            // ) */}
                        <Text className="text-xl font-bold text-center mb-2 mt-1">{appointmentToConfirm?.name}, {branch}, {city}</Text>
                        <Text className="text-xl text-center mb-4">Date: {moment(searchDate).format("DD-MMM-YYYY") + "\nTime: " + selectedSlot}</Text>
                        <View className=" flex-row justify-end gap-5 items-center py-4">
                            <Pressable onPress={() => {
                                setConfirmAppointmentModal(false)
                            }} >
                                <Text> Cancel </Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setConfirmAppointmentModal(false)
                                loggedIn ? bookAppointment(appointmentToConfirm) : router.push("/SignIn");
                            }}>
                                <Text> Confirm </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} animationType="fade" visible={appointmentExists} onRequestClose={() => setAppointmentExists(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        {/* <Pressable className="absolute top-3 right-3" onPress={() => {
                    setMobileEmptyVisible(false)
                    router.back()
                    }}>
                    <AntDesign name="closecircle" size={24} color="#3B2314" />
                    </Pressable> */}
                        {/* <Text className="text-xl font-bold text-center mb-4 mt-7">Note</Text> */}
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
            {/* <Modal
                style={{ height: '100%' }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={styles.centeredView} className="w-full">
                        <View style={styles.modalView} className="w-full">
                            <Pressable className="absolute top-3 right-3" onPress={() => setModalVisible(!modalVisible)}>
                                <AntDesign name="closecircle" size={24} color="#3B2314" />
                            </Pressable>
                            <SafeAreaView className="w-full">
                                <ScrollView className="w-full">
                                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SefNqxMPw23P5tFdlgwEe9cfcdnf7d-Law&s' }} style={{ width: 100, height: 100 }} />
                                    <Text className="pt-3 text-2xl" style={styles.modalText}>{displayedDoctor.name}</Text>
                                    <Separator />
                                    <View className="w-full flex flex-col">
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                            <View className="pt-72 pl-2 flex flex-row absolute inset-y-0 left-0">
                                <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                    <MaterialCommunityIcons
                                        name="stethoscope"
                                        size={30}
                                        color={"#84cc16"}
                                    />
                                </View>
                                <View className="flex">
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal> */}
        </SafeAreaView >
    )
}
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//         height: '100%',
//         width: '100%',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         height: '100%',
//         width: '100%',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     separator: {
//         marginVertical: 8,
//         borderBottomColor: '#3B2314',
//         borderBottomWidth: StyleSheet.hairlineWidth,
//     },
// });
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