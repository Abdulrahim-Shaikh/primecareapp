import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithBackButton from '../../components/ui/HeaderWithBackButton';
import Searchbox from '../../components/ui/Searchbox';
import DoctorCard from '../../components/ui/DoctorCard';
import doctorService from '../../domain/services/DoctorService';
import resourceService from '../../domain/services/ResourceService';
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useDoctors } from '../../domain/contexts/DoctorsContext';
import branchService from '../../domain/services/BranchService';
import appointmentService from '../../domain/services/AppointmentService';
import { useUserSate } from '../../domain/state/UserState';
import { useBranches } from '../../domain/contexts/BranchesContext';
import moment from 'moment';

const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const BranchDoctor = () => {

    const [searchValue, setSearchValue] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);

    const { branchId, fromSpeciality, department, specialityCode, speciality, callCenterDoctorFlow } = useLocalSearchParams();
    const [doctorsData, setDoctorsData] = useState([]);
    const [loader, setLoader] = useState(true);
    const { doctors, changeDoctors } = useDoctors();
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [showLast3Appointments, setShowLast3Appointments] = useState(false);
    const [patientData, setPatientData] = useState(useUserSate.getState().user)
    const { branches, setBranches } = useBranches();
    const [recentAppointments, setRecentAppointments] = useState<any>([]);

    const generalDentistry = 'General Dentistry';
    const generalDentistrySpecialityCode = 'GP';

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {

            changeLocale(language)
            changeLanguage(language)
            setLoader(true);
            appointmentService.getAppointments(patientData.id, branchId)
                .then((response) => {
                    // console.log("response: ", response.data)
                    const sortedAppointments = response.data.sort((a: any, b: any) => {
                        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                        // return moment(new Date(a.startTime)).format("ddd DD-MM-YYYY hh:mm").diff(moment(new Date(a.startTime)).format("ddd DD-MM-YYYY hh:mm"))
                    })
                    // console.log("sortedTimeSlots: ", sortedTimeSlots)
                    // for (let i of sortedTimeSlots) {
                    //     console.log("\n\ni: ", i)
                    // }
                    let last3Appointments: any = []
                    let last3AppointmentDoctors: any = new Map<any, any>()
                    for (let i = sortedAppointments.length - 1; i >= 0; i--) {
                        // console.log("\n\nsortedAppointments[i]: ", sortedAppointments[i])
                        if (sortedAppointments[i].hisStatus != 'Cancelled') {
                            if (!last3AppointmentDoctors.has(sortedAppointments[i].practitionerId)) {
                                last3AppointmentDoctors.set(sortedAppointments[i].practitionerId, sortedAppointments[i])
                                last3Appointments.push(sortedAppointments[i])
                                if (last3AppointmentDoctors.length >= 3) {
                                    break;
                                }
                            }
                            // resourceService.find(sortedAppointments[i].practitionerId)
                            // .then((response) => {
                            // console.log("last3Appointments.length: ", last3Appointments.length)
                            //     last3Appointments.push(response.data)
                            // })
                        }
                    }
                    for (let i of last3Appointments) {
                        console.log("\n\ni: ", i)
                        resourceService.find(i.practitionerId)
                            .then((response) => {
                                last3AppointmentDoctors.set(i.practitionerId, response.data)
                                setRecentAppointments([...last3AppointmentDoctors.values()])
                            })
                    }
                    // let last3AppointmentDoctors: any = new Map<any, any>()
                    // let last3AppointmentDoctors: any = new Set<any>()
                    // for (let i of last3Appointments) {
                    //     if(!last3AppointmentDoctors.has(i.practitionerId)) {
                    //         resourceService.find(i.practitionerId)
                    //             .then((response) => {
                    //                 last3AppointmentDoctors.set(i.practitionerId, response.data)
                    //                 setRecentAppointments([...last3AppointmentDoctors.values()])
                    //             })
                    //     }
                    // }
                })

            if (+callCenterDoctorFlow) {
                let doctorsByBranch: any = []
                let generalDentistryDoctors: any = []
                doctors.map((doctor: any) => {
                    if (doctor.department == department && doctor.branchId.includes(+branchId) && (doctor.specialityCode.includes(specialityCode) || doctor.speciality == speciality)) {
                        doctorsByBranch.push(doctor)
                    }
                    if (doctor.department == department && doctor.branchId.includes(+branchId) && (doctor.specialityCode.includes(generalDentistrySpecialityCode) || doctor.speciality == generalDentistry)) {
                        generalDentistryDoctors.push(doctor)
                    }
                })
                // if (doctorsByBranch.length === 0) {
                //     doctors.map((doctor: any) => {
                //     })
                // }
                console.log("doctorsByBranch: ", doctorsByBranch)
                setDoctorsData(doctorsByBranch.length === 0 ? generalDentistryDoctors : doctorsByBranch)
                setLoader(false)
            } else {
                if (branchId != null && department != null && speciality != null) {
                    resourceService.getResourceBySpeciality(branchId, department, speciality)
                        .then((response) => {
                            console.log("response: ", response.data)
                            if (response.data.length === 0) {
                                resourceService.getResourceBySpeciality(branchId, department, generalDentistry)
                                    .then((response) => {
                                        setDoctorsData(response.data)
                                        setLoader(false);
                                    })
                            } else {
                                setDoctorsData(response.data)
                                setLoader(false);
                            }
                        })
                        .catch((error) => {
                            console.log("error ", error)
                        })
                } else {
                    if (branchId == null) {
                        doctorService.getAllDoctors()
                            .then((response) => {
                                // console.log("\ndoctorService.getAllDoctors(): \n", response)
                                setDoctorsData(response.data);
                                setLoader(false);
                            })
                            .catch((error) => {
                                console.log("\ndoctorService.getAllDoctors(): \n", error)
                            })
                    } else {
                        doctorService.getAllDoctorsByBranch(branchId)
                            .then((response) => {
                                setDoctorsData(response.data.filter((doctor: any) => doctor.speciality === speciality));
                                setLoader(false);
                                // console.log("\n\n\n\n\n\ndoctorService.getAllDoctorsByBranch(branchId) response", response);
                            })
                            .catch((error) => {
                                console.log("\n\n\n\n\ndoctorService.getAllDoctorsByBranch(branchId) error", error);
                            })
                    }
                }
            }
        }, [])
    )


    return (
        <SafeAreaView>
            <ScrollView className="pt-6">
                <View className="px-6">
                    <HeaderWithBackButton isPushBack={true} title={i18n.t("Doctors")} />
                </View>

                <View className="pb-16 px-6">
                    {
                        +callCenterDoctorFlow &&
                        // <View className="pt-8 pb-5 border-b border-dashed border-pc-primary flex flex-row justify-between items-center">
                        <View className="pb-5 border-b border-dashed border-pc-primary">
                            <View className="mt-6 w-1/2">
                                <Pressable
                                    onPress={() => {
                                        console.log("recentAppointments.length: ", recentAppointments.length)
                                        if (showLast3Appointments) {
                                            setShowLast3Appointments(false);
                                        } else {
                                            setShowLast3Appointments(true);
                                        }
                                        // getPatientPolicyData();
                                    }}
                                    className="bg-[#3B2314] text-primaryColor border-[1px] border-primaryColor px-5 py-2 rounded-lg">
                                    <Text className="text-white">{i18n.t("Last 3 Appointments")}</Text>
                                </Pressable>
                            </View>
                        </View>
                    }
                    {
                        !loader && (doctorsData.length === 0 || doctorsData == null)
                            ?
                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No doctors available for selected speciality")}</Text>
                            : loader
                                ?
                                <ActivityIndicator size="large" color="#454567" />
                                :
                                showLast3Appointments
                                    ?
                                    recentAppointments.map(({ ...props }, idx) => (
                                        <DoctorCard {...props} branchId={+branchId} fromSpeciality={fromSpeciality} selectedSpecialityCode={specialityCode} callCenterDoctorFlow={+callCenterDoctorFlow} key={idx} />
                                    ))
                                    :
                                    doctorsData.map(({ ...props }, idx) => (
                                        <DoctorCard {...props} branchId={+branchId} fromSpeciality={fromSpeciality} selectedSpecialityCode={specialityCode} callCenterDoctorFlow={+callCenterDoctorFlow} key={idx} />
                                    ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BranchDoctor;