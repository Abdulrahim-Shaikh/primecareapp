import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator } from 'react-native'
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
    const [ doctorsData, setDoctorsData ] = useState([]);
    const [ loader, setLoader ] = useState(true);
    const { doctors, changeDoctors } = useDoctors();
    const { language, changeLanguage } = useLanguage();
    const [ locale, setLocale ] = useState(i18n.locale);


    const generalDentistry = 'General Dentistry';
    const generalDentistrySpecialityCode = 'GP';

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {

            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
            console.log("ccodeee: ", specialityCode)
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
            changeLocale(language)
            changeLanguage(language)
            setLoader(true);

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
                        !loader && (doctorsData.length === 0 || doctorsData == null)
                            ? 
                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No doctors available for selected speciality")}</Text>
                            : loader
                                ?
                                <ActivityIndicator size="large" color="#454567" />
                                :
                                doctorsData.map(({ ...props }, idx) => (
                                    <DoctorCard {...props } branchId={+branchId} fromSpeciality={fromSpeciality} selectedSpecialityCode={specialityCode} callCenterDoctorFlow={+callCenterDoctorFlow} key={idx} />
                                ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BranchDoctor;