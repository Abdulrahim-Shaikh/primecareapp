import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import resourceService from "../../domain/services/ResourceService";
import * as Localization from 'expo-localization'
import { I18n } from "i18n-js";
import translations from "../../constants/locales/ar";
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useUserSate } from "../../domain/state/UserState";
import doctorService from "../../domain/services/DoctorService";
import moment from "moment";
import scheduleService from "../../domain/services/ScheduleService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import branchService from "../../domain/services/BranchService";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const AppointmentType = () => {

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const { branchId, city, fromSpeciality, department, callCenterFlow, specialityCode, speciality, subServices, callCenterDoctorFlow, resourceId } = useLocalSearchParams();
    const [subServicesList, setSubServicesList] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [user, setUser] = useState(useUserSate.getState().user);
    const [patientData, setPatientData] = useState(useUserSate.getState().user)
    const [loader, setLoader] = useState(false);
    const [patientPolicyData, setPatientPolicyData] = useState({})
    const [mobile, setMobile] = useState("");
    const [doctorScheduleData, setDoctorScheduleData] = useState([])
    const [date, setDate] = useState(new Date());  // State for start date
    const [specialityList, setSpeciality] = useState("");
    const [doctorGender, setDoctorGender] = useState("");
    const [serviceResponsible, setServiceResponsible] = useState("");
    const [slotInterval, setSlotInterval] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [doctorScheduleNotFoundModal, setDoctorScheduleNotFoundModal] = useState(false);
    const [mainSpeciality, setMainSpeciality] = useState<any>();
    const [signInModal, setSignInModal] = useState(false);
    const [policyNotFound, setPolicyNotFound] = useState(false);


    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            setMainSpeciality(speciality)
            if (useUserSate.getState().user != null) {
                setUser(useUserSate.getState().user)
                setPatientData(useUserSate.getState().user)
                if (useUserSate.getState().user.mobile != null) {
                    setMobile(useUserSate.getState().user.mobile)
                }
            }
            if (useUserSate.getState().user != null && useUserSate.getState().user.mobile != null) {
                setMobile(useUserSate.getState().user.mobile)
                setPatientData(useUserSate.getState().user)
            }
            changeLocale(language)
            changeLanguage(language)
            if (+callCenterDoctorFlow) {
                if (resourceId != null) {
                    resourceService.find(+resourceId).then((response) => {
                    })
                }
            }
            getPatientPolicyData()
            if (subServices == null || subServices == undefined || subServices == "") {
                setDoctorScheduleNotFoundModal(true)
            } else {
                setSubServicesList(JSON.parse(subServices.toString()))
            }
        }, [])
    )

    const getPatientPolicyData = async () => {
        if (useUserSate.getState().loggedIn == false) {
            setSignInModal(true)
        } else {
            patientPolicyService.byPatientId(user.id)
                .then((response: any) => {
                    setPatientPolicyData(response.data[0])
                })
                .catch((error) => {
                    console.log("patientPolicyService.byPatientId() error: ", error)
                })
        }
    }

    const bookAppointment = (interval: any, responsible: any) => {
        if (patientData == null || Object.keys(patientData).length <= 0) {
            setSignInModal(true)
        } else {
            if (patientPolicyData == null || Object.keys(patientPolicyData).length <= 0) {
                setPolicyNotFound(true)
            } else {
                doctorService.find(+resourceId)
                    .then((response) => {
                        setDoctorGender(response.data.gender)
                        let speciality = response.data.speciality;
                        let doctorName = response.data.name;
                        setSpeciality(response.data.speciality);
                        if (department != null && date != null && speciality != null && doctorName != null) {
                            branchService.find(+branchId)
                                .then((response3) => {
                                    router.push({
                                        pathname: "/SlotsConfirmationPage",
                                        params: {
                                            city: response3.data.city,
                                            branchID: branchId,
                                            branch: response3.data.name,
                                            fromSpeciality: fromSpeciality,
                                            department: department,
                                            speciality: mainSpeciality == null || mainSpeciality == "" ? speciality : mainSpeciality,
                                            specialityCode: specialityCode,
                                            callCenterFlow: callCenterFlow,
                                            devices: JSON.stringify([]),
                                            responsible: responsible,
                                            mobileOrOnline: interval,
                                            shift: 'Both',
                                            gender: response.data.gender,
                                            resourceId: resourceId,
                                            callCenterDoctorFlow: callCenterDoctorFlow,
                                        }
                                    })
                                })
                                .catch((error) => {
                                    console.log("branch not found: ", error)
                                })
                            // let dateString = moment(date).format("YYYY-MM-DD");
                            // let requestBody: any = [{
                            //     date: dateString,
                            //     day: +moment(date).format("D"),
                            //     resourceIds: [resourceId],
                            //     wday: moment(date).format("dddd").substring(0, 3)
                            // }]

                            // scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                            //     .then((response2) => {
                            //         setDoctorScheduleData(response2.data)
                            //     })
                            //     .catch((err) => {
                            //         setDoctorScheduleNotFoundModal(true)
                            //         console.log(err);
                            //     })
                        }
                    })
            }

        }
    }

    function selectSubService(item: any, responsible: any, devices: any, mobileOrOnline: any) {
        setModalVisible(true)
        setSlotInterval(mobileOrOnline)
        setServiceResponsible((responsible == null || responsible == "" || responsible == undefined) ? "Doctor" : responsible)
        if (+callCenterDoctorFlow) {
            bookAppointment(mobileOrOnline, responsible)
        } else {
            router.push({
                pathname: "/CityPage",
                params: {
                    branchId: null,
                    fromSpeciality: fromSpeciality,
                    department: department,
                    callCenterFlow: callCenterFlow,
                    specialityCode: specialityCode,
                    speciality: speciality,
                    responsible: (responsible == null || responsible == "" || responsible == undefined) ? "Doctor" : responsible,
                    devices: JSON.stringify(devices),
                    mobileOrOnline: mobileOrOnline,
                    callCenterDoctorFlow: 0
                }
            })
        }
    }


    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Appointment Type")} isPushBack={true} />
                <View className="pt-8">
                    {
                        loader && <ActivityIndicator size="large" color="#454567" />
                    }
                </View>
                <View className="flex-row flex-wrap">
                    {
                        (subServicesList == null || subServicesList.length === 0) && !loader &&
                        <Text className="w-full text-center text-lg text-gray-600">{i18n.t("No appointments found")}</Text>
                    }
                    <View className="flex-1 space-y-4 ">
                        <FlatList
                            contentContainerStyle={{ gap: 9 }}
                            data={subServicesList}
                            keyExtractor={(item: any, index) => "key" + index}
                            renderItem={({ item }) => {
                                return (
                                    <View className="w-full">
                                        <Pressable
                                            className="flex flex-row border border-pc-primary rounded-lg p-3 shadow-sm bg-white"
                                            onPress={() => { selectSubService(item, item.responsible, item.devices, item.mobileOrOnline) }}
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
                                                <View className="w-full flex flex-row flex-wrap justify-between items-start gap-2 font-semibold text-xl text-gray-800">
                                                    <View>
                                                        <Text>
                                                            {item.subServiceNameEn}
                                                            {/* {locale == "ar" ? item.subServiceNameAr : item.subServiceNameEn} */}
                                                        </Text>
                                                    </View>
                                                    <View className="flex pr-6 flex-row justify-end flex-wrap">
                                                        <Text>
                                                            {item.subServiceNameAr}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
                <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => {
                    setLoader(!modalVisible);
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                </Modal>
                <Modal transparent={true} animationType="fade" visible={doctorScheduleNotFoundModal} onRequestClose={() => {
                    setDoctorScheduleNotFoundModal(false)
                    setLoader(false)
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
                            <Text className="text-xl font-bold text-center mb-4 mt-1">{i18n.t('Doctor schedule not found')}</Text>
                            <View className=" flex-row justify-end gap-5 items-center py-4">
                                <Pressable onPress={() => {
                                    setDoctorScheduleNotFoundModal(false)
                                    setLoader(false)
                                }} >
                                    <Text> {i18n.t('Back')} </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal transparent={true} animationType="fade" visible={signInModal} onRequestClose={() => setSignInModal(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View className="bg-white p-6 rounded-lg w-4/5 relative">
                            <View className="flex flex-row justify-center">
                                <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={60}
                                    color={"#EF4444"}
                                />
                            </View>
                            <Text className="text-xl font-bold text-center mb-2 mt-1">{i18n.t('Patient Not Found')}</Text>
                            <Text className="text-xl font-bold text-center mb-4">{i18n.t('You need to Sign in first')}</Text>
                            <View className=" flex-row justify-between gap-5 items-center py-4">
                                <Pressable onPress={() => {
                                    setSignInModal(false)
                                    router.back()
                                }} >
                                    <Text> {i18n.t('Back')} </Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    setSignInModal(false)
                                    router.push('/SignIn')
                                }}>
                                    <Text> {i18n.t('Sign In')} </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal transparent={true} animationType="fade" visible={policyNotFound} onRequestClose={() => setPolicyNotFound(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View className="bg-white p-6 rounded-lg w-4/5 relative">
                            <View className="flex flex-row justify-center">
                                <MaterialCommunityIcons
                                    name="close-circle-outline"
                                    size={60}
                                    color={"#EF4444"}
                                />
                            </View>
                            <Text className="text-xl font-bold text-center mb-2 pt-3">{i18n.t('Patient Policy data not found')}</Text>
                            <View className=" flex-row justify-end gap-5 items-center py-4">
                                <Pressable onPress={() => {
                                    setPolicyNotFound(false)
                                }} >
                                    <Text> {i18n.t('Ok')} </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView >
    );
};

export default AppointmentType;

const styles = StyleSheet.create({});
