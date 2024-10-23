import {
    ActivityIndicator,
    Alert,
    FlatList,
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

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            console.log('\n\n\n\n\n\n\n\n\n\n\n')
            console.log("sspecialityCode: ", specialityCode)
            console.log('\n\n\n\n\n\n\n\n\n\n\n')
            let newDate = new Date()
            if (useUserSate.getState().user != null) {
                setUser(useUserSate.getState().user)
                setPatientData(useUserSate.getState().user)
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
                    })
                }
            }
            getPatientPolicyData()
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
        }, [])
    )

    const getPatientPolicyData = async () => {
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

    const bookAppointment = (interval: any, responsible: any) => {
        console.log("iinterval: ", interval)
        console.log("rresponsible: ", responsible)
        if (patientData == null || Object.keys(patientData).length <= 0) {
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
                        setDoctorGender(response.data.gender)
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

                            scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                                .then((response2) => {
                                    // setAppointmentEntry(true)
                                    setDoctorScheduleData(response2.data)
                                    branchService.find(+branchId)
                                        .then((response3) => {
                                            router.push({
                                                pathname: "/SlotsConfirmationPage",
                                                params: {
                                                    city: response3.data.city,
                                                    branch: response3.data.name,
                                                    fromSpeciality: fromSpeciality,
                                                    department: department,
                                                    speciality: speciality,
                                                    specialityCode: specialityCode,
                                                    callCenterFlow: callCenterFlow,
                                                    devices: JSON.stringify([]),
                                                    responsible: responsible,
                                                    mobileOrOnline: interval,
                                                    shift: 'Both',
                                                    gender: response.data.gender,
                                                }
                                            })
                                        })
                                        .catch((error) => {
                                            console.log("branch not found: ", error)
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

    function selectSubService(item: any, responsible: any, devices: any, mobileOrOnline: any) {
        console.log("item: ", item)
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


    var appointmentsRender: any = []
    var appointmentsRowRender: any = []

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Appointment Type")} isPushBack={true} />
                {/* <View className="pt-8 ">
                    <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View> */}
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
                                                <View className="w-full flex flex-col items-start gap-2 font-semibold text-lg text-gray-800">
                                                    <Text>
                                                        {locale == "ar" ? item.subServiceNameAr : item.subServiceNameEn}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default AppointmentType;

const styles = StyleSheet.create({});
