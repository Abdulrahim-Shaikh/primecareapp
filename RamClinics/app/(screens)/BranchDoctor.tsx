import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithBackButton from '../../components/ui/HeaderWithBackButton';
import DoctorCard from '../../components/ui/DoctorCard';
import doctorService from '../../domain/services/DoctorService';
import resourceService from '../../domain/services/ResourceService';
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useDoctors } from '../../domain/contexts/DoctorsContext';
import appointmentService from '../../domain/services/AppointmentService';
import { useUserSate } from '../../domain/state/UserState';
import { useSpecialities } from '../../domain/contexts/SpecialitiesContext';
import { useBranches } from '../../domain/contexts/BranchesContext';

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

    const { branchId, fromSpeciality, department, specialityCode, speciality, callCenterDoctorFlow, last3AppointmentsFlow } = useLocalSearchParams();
    const [doctorsData, setDoctorsData] = useState([]);
    const [loader, setLoader] = useState(true);
    const { doctors, changeDoctors } = useDoctors();
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [showLast3Appointments, setShowLast3Appointments] = useState(false);
    const [patientData, setPatientData] = useState(useUserSate.getState().user)
    const [recentAppointments, setRecentAppointments] = useState<any>([]);
    const [branchIds, setBranchIds] = useState<any>({});
    const {allSpecialities, changeSpecialities} = useSpecialities();
    const {branches, changeBranches} = useBranches();

    const generalDentistry = 'General Dentistry';
    const generalMedicine = "General Medicine";
    const generalDentistrySpecialityCode = 'GP';
    const generalMedicineSpecialityCode = 'GM';

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {

            changeLocale(language)
            changeLanguage(language)
            setLoader(true);
            if (+last3AppointmentsFlow) {
                appointmentService.getLastThreeAppointments(patientData.id)
                    .then((response) => {
                        let lastAppts: any[] = []
                        let lastApptsPractionerIds: any = new Set<any>()
                        for (let appt of response.data) {
                            if (lastApptsPractionerIds.has(appt.practitionerId)) {
                                continue
                            }
                            lastAppts.push(appt)
                            lastApptsPractionerIds.add(appt.practitionerId)
                        }
                        let lastApptsDoctors: any[] = []
                        for (let it = 0; it < lastAppts.length; it++) {
                            resourceService.find(lastAppts[it].practitionerId)
                                .then((response) => {
                                    let sp = response.data.speciality
                                    let spCode = allSpecialities.find((s: any) => s.name === sp).code
                                    let bCode = branches.find((b: any) => b.name === response.data.primaryBranch).id
                                    response.data.spCode = spCode
                                    response.data.bCode = bCode
                                    lastApptsDoctors.push(response.data)
                                    setRecentAppointments(lastApptsDoctors)
                                })
                                .catch((error) => {
                                    console.error("resourceService.find", error.response)
                                })
                            if (it == lastAppts.length - 1) {
                                setLoader(false)
                                setShowLast3Appointments(true)
                            }
                        }
                    })
                    .catch((error: any) => {
                        console.error("appointmentService.getLastThreeAppointments", error.response)
                    })
            } else {
                if (+callCenterDoctorFlow) {
                    let doctorsByBranch: any = []
                    let generalDentistryDoctors: any = []
                    let generalMedicineDoctors: any = []
                    doctors.map((doctor: any) => {
                        if (doctor.department == department && doctor.branchId.includes(+branchId) && (doctor.specialityCode.includes(specialityCode) || doctor.speciality == speciality)) {
                            doctorsByBranch.push(doctor)
                        }
                        if (doctor.department == department && doctor.branchId.includes(+branchId) && (doctor.specialityCode.includes(generalDentistrySpecialityCode) || doctor.speciality == generalDentistry)) {
                            generalDentistryDoctors.push(doctor)
                        }
                        if (doctor.department == department && doctor.branchId.includes(+branchId) && (doctor.specialityCode.includes(generalMedicineSpecialityCode) || doctor.speciality == generalMedicine)) {
                            generalMedicineDoctors.push(doctor)
                        }
                    })
                    // if (doctorsByBranch.length === 0) {
                    //     doctors.map((doctor: any) => {
                    //     })
                    // }
                    if (department == 'Dental') {
                        setDoctorsData(doctorsByBranch.length === 0 ? generalDentistryDoctors : doctorsByBranch)
                    } else if (department == 'Medical') {
                        setDoctorsData(doctorsByBranch.length === 0 ? generalMedicineDoctors : doctorsByBranch)
                    }
                    setLoader(false)
                } else {
                    if (branchId != null && department != null && speciality != null) {
                        resourceService.getResourceBySpeciality(branchId, department, speciality)
                            .then((response) => {
                                if (response.data.length == 0) {
                                    if (department == 'Dental' && speciality != generalDentistry) {
                                        resourceService.getResourceBySpeciality(branchId, department, generalDentistry)
                                            .then((response) => {
                                                setDoctorsData(response.data)
                                                setLoader(false);
                                            })
                                    } else if (department == 'Medical' && speciality != generalMedicine) {
                                        resourceService.getResourceBySpeciality(branchId, department, generalMedicine)
                                            .then((response) => {
                                                setDoctorsData(response.data)
                                                setLoader(false);
                                            })
                                    }
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
                                })
                                .catch((error) => {
                                    console.log("\n\n\n\n\ndoctorService.getAllDoctorsByBranch(branchId) error", error);
                                })
                        }
                    }
                }
            }

        }, [])
    )

    let content;
    if (showLast3Appointments) {
        if (!loader && (recentAppointments == null || recentAppointments.length < 1)) {
            content = <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No doctors available for selected speciality")}</Text>;
        } else if (loader) {
            content = <ActivityIndicator size="large" color="#454567" />;
        } else {
            content = (
                <View className="pt-3">
                    <Text>{i18n.t("Showing last 3 appointments' doctors")}</Text>
                    {
                        recentAppointments.map((props: any) => (
                            <View key={props.id}>
                                <DoctorCard {...props} branchId={props.bCode} mainSpeciality={speciality} fromSpeciality={fromSpeciality} selectedSpecialityCode={props.spCode} callCenterDoctorFlow={+callCenterDoctorFlow} />
                            </View>
                        ))
                    }
                </View>
            );
        }
    } else {
        if (!loader && (doctorsData == null || doctorsData.length < 1)) {
            content = <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No doctors available for selected speciality")}</Text>;
        } else if (loader) {
            content = <ActivityIndicator size="large" color="#454567" />;
        } else {
            content = doctorsData.map((props: any) => (
                <DoctorCard {...props} branchId={+branchId} mainSpeciality={speciality} fromSpeciality={fromSpeciality} selectedSpecialityCode={specialityCode} callCenterDoctorFlow={+callCenterDoctorFlow} key={props.id} />
            ));
        }
    }

    return (
        <SafeAreaView>
            <ScrollView className="pt-6">
                <View className="px-6">
                    <HeaderWithBackButton isPushBack={true} title={i18n.t("Doctors")} />
                </View>

                <View className="pb-16 px-6">
                    {content}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BranchDoctor;