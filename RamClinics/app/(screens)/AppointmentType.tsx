import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { doctorSpecialityData2, myAppoinmentData, servicesList } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";
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

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const AppointmentTypePage = () => {

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const { branchId, city, fromSpeciality, department, callCenterFlow, specialityCode, speciality, subServices, callCenterDoctorFlow, resourceId } = useLocalSearchParams();
    const [subServicesList, setSubServicesList] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [user, setUser] = useState(useUserSate.getState().user);
    const [patientData, setPatientData] = useState(useUserSate.getState().user)
    const [patientPolicyData, setPatientPolicyData] = useState({})
    const [mobile, setMobile] = useState("");
    const [doctorScheduleData, setDoctorScheduleData] = useState([])
    const [date, setDate] = useState(new Date());  // State for start date
    const [specialityList, setSpeciality] = useState("");

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            let newDate = new Date()
            console.log("\n\n\n\nmomentdateday", moment(newDate).format("dddd"))
            if (useUserSate.getState().user != null) {
                setUser(useUserSate.getState().user)
                setPatientData(useUserSate.getState().user)
                // console.log("useUserSate.getState().user: ", useUserSate.getState().user)
                if (useUserSate.getState().user.mobile != null) {
                    const mobile = useUserSate.getState().user.mobile
                    setMobile(useUserSate.getState().user.mobile)
                }
            }
            if (useUserSate.getState().user != null && useUserSate.getState().user.mobile != null) {
                const mobile = useUserSate.getState().user.mobile
                setMobile(useUserSate.getState().user.mobile)
                setPatientData(useUserSate.getState().user)
            }
            changeLocale(language)
            changeLanguage(language)
            if (+callCenterDoctorFlow) {
                if (resourceId != null) {
                    resourceService.find(+resourceId).then((response) => {
                        // console.log("doctor response.data: ", response.data)
                    })
                }
            }
            getPatientPolicyData()
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nsubServices: ", subServices)
            if (subServices == null || subServices == undefined || subServices == "") {
                Alert.alert('Note', 'Doctor Schedule not found', [
                    {
                        text: 'OK',
                        // onPress: () => router.back(),
                        style: 'default'
                    },
                ],
                )
                router.back()
            } else {
                setSubServicesList(JSON.parse(subServices.toString()))
            }
            console.log("subServices: ", subServices)
        }, [])
    )

    const getPatientPolicyData = async () => {
        console.log("user: ", user)
        if (useUserSate.getState().loggedIn == false) {
            Alert.alert('Patient Not Found', 'You need to Sign in first', [
                {
                    text: 'BACK',
                    style: 'default'
                },
                {
                    text: 'SIGN IN',
                    onPress: () => router.push('/SignIn'),
                    style: 'default'
                },
            ])
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

    const bookAppointment = () => {
        console.log("bookAppointment")
        if (patientData == null || Object.keys(patientData).length <= 0) {
            console.log("here")
            Alert.alert('Patient Not Found', 'You need to Sign in first', [
                {
                    text: 'BACK',
                    style: 'default'
                },
                {
                    text: 'SIGN IN',
                    onPress: () => router.push('/SignIn'),
                    style: 'default'
                },
            ])
        } else {
            if (patientPolicyData == null || Object.keys(patientPolicyData).length <= 0) {
                Alert.alert('Note', 'Patient Policy data not found', [
                    {
                        text: 'OK',
                        // onPress: () => router.push({
                        //     pathname: "/BookAppointment",
                        // }),
                        style: 'default'
                    },
                ],
                )
            } else {
                doctorService.find(+resourceId)
                    .then((response) => {
                        // need to be checked
                        // let branchId = response.data.branchId[0];

                        // setDoctorName(response.data.name);
                        // setBranchId(response.data.branchId[0]); // set first branchId from patient branch list if below API gives error
                        // branchService.getBranchByName(response.data.primaryBranch)
                        //   .then((response) => {
                        //     setBranchId(response.data.id);
                        //     if (department != null && date != null && specialityList != null && doctorName != null) {
                        //       let dateString = moment(date).format("YYYY-MM-DD");
                        //       let today = moment().format("YYYY-MM-DD");
                        //       let requestBody: any = [{
                        //         date: dateString,
                        //         day: 2,
                        //         resourceIds: [id],
                        //         wday: "Mon"
                        //       }]
                        //       scheduleService.getDoctorSchedule(branchId, department, specialityList, "false", requestBody)
                        //         .then((response) => {
                        //           setDoctorScheduleData(response.data)
                        //         })
                        //         .catch((err) => {
                        //           console.log(err);
                        //         })
                        //     }
                        //   })
                        //   .catch((error) => {
                        //     console.log("errorrrr: ", error)
                        //   })
                        let speciality = response.data.speciality;
                        let doctorName = response.data.name;
                        setSpeciality(response.data.speciality);
                        if (department != null && date != null && speciality != null && doctorName != null) {
                            let dateString = moment(date).format("YYYY-MM-DD");


                            // serious issue
                            let requestBody: any = [{
                                date: dateString,
                                day: +moment(date).format("D"),
                                resourceIds: [resourceId],
                                wday: moment(date).format("dddd").substring(0, 3)
                            }]

                            console.log("branchId: ", branchId)
                            console.log("department: ", department)
                            console.log("speciality: ", speciality)
                            console.log("requestBody: ", requestBody)
                            scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                                .then((response) => {
                                    // setAppointmentEntry(true)
                                    setDoctorScheduleData(response.data)
                                    router.push({
                                        pathname: "/ScheduleAppointment/",
                                        params: {
                                            branchId: branchId,
                                            department: department,
                                            speciality: speciality,
                                            doctor: doctorName,
                                            resourceId: resourceId,
                                            date: (new Date(date)).toString(),
                                            params: JSON.stringify(response.data[0]),
                                            patientData: JSON.stringify(patientData),
                                            patientPolicyData: JSON.stringify(patientPolicyData)
                                        }
                                    })
                                })
                                .catch((err) => {
                                    Alert.alert('Note', 'Doctor Schedule not found', [
                                        {
                                            text: 'OK',
                                            style: 'default'
                                        },
                                    ],
                                    )
                                    console.log(err);
                                })
                        }
                    })
            }

        }
    }

    function selectSubService(responsible: any, devices: any, callOrReception: any) {
        if (+callCenterDoctorFlow) {
            bookAppointment()
        } else {
            console.log("devices: ", devices)
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
                    callOrReception: callOrReception,
                    callCenterDoctorFlow: 0
                }
            })
        }
    }


    var appointmentsRender: any = []
    var appointmentsRowRender: any = []

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Appointment Type")} isPushBack={true} />
                {/* <View className="pt-8 ">
                    <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View> */}
                <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
                    {subServicesList.map(({ subServiceNameEn, subServiceNameAr, responsible, callOrReception, devices }, idx) => (
                        <Pressable
                            onPress={() => { selectSubService(responsible, devices, callOrReception) }}
                            className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4 bg-[rgb(59,35,20)]"
                            key={idx}
                        >
                            <View className="p-3 rounded-md border border-pc-primary bg-white">
                                <MaterialCommunityIcons
                                    name="bullseye"
                                    size={36}
                                    color={"#3b2314"}
                                />
                                {/* <Image source={specialityIcon} /> */}
                            </View>
                            <Text className="text-base font-semibold pt-3 text-white">{subServiceNameEn}</Text>
                            <Text className="text-base font-semibold text-white">{subServiceNameAr}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default AppointmentTypePage;

const styles = StyleSheet.create({});
