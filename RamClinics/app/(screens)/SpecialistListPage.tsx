import { SafeAreaView, ScrollView, View, Text, FlatList, Pressable, ViewToken, Alert, ActivityIndicator } from "react-native";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import React, { useCallback, useEffect, useState } from "react";
import DoctorCard from "../../components/ui/DoctorCard";
import { myAppoinmentData, topDoctorData } from "../../constants/data";
import { router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useAnimatedRef, useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import branchService from "../../domain/services/BranchService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import patientService from "../../domain/services/PatientService";
import specialityService from "../../domain/services/SpecialityService";
import { useUserSate } from "../../domain/state/UserState";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import scheduleService from "../../domain/services/ScheduleService";
import resourceService from "../../domain/services/ResourceService";
import doctorService from "../../domain/services/DoctorService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const specialityList = [
    "All",
    "General Dentist",
    "General Practitioner",
    "Dermatology",
    "Internal Medicine",
    "Orthodontics",
    "Pedodontics",
    "Machine"
];

const SpecialityListPage = () => {
    const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSpeciality, setActiveSpeciality] = useState(0);
    const [branchOptions, setBranchOptions] = useState([])
    const [specialityOptions, setSpecialityOptions] = useState([])
    const [doctor, setDoctor] = useState(null)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const { department } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());  // State for start date
    const [patientData, setPatientData] = useState({})
    const [patientPolicyData, setPatientPolicyData] = useState({})
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [branchId, setBranchId] = useState(null)
    const [selectedDoctor, setSelectedDoctor] = useState(topDoctorData[0])
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);
    const [searchValue, setSearchValue] = useState('');
    let [loader, setLoader] = useState(true);
    // let patientData = {}
    // let patientPolicyData = {}

    let dateAux = new Date();

    useEffect(() => {
        setLoader(true)
        doctorService.getAllDoctors().then((res) => {
            // console.log("filtered patient..", res.data)
            setDoctor(res.data);
            setFilteredDoctors(res.data);
            setLoader(false)
        }).catch((error) => {
            console.error("Failed to fetch labratory:", error);
        });
        console.log(`option: '${department}'`)
        patientService.byMobileNo(useUserSate.getState().user.mobile)
            .then((response: any) => {
                // console.log("patientService.byMobileNo: ", response)
                setPatientData(response.data[0])


                console.log("response.data[0].registerBranch: ", response.data[0].registerBranch)
                branchService.getBranchByName(response.data.registerBranch)
                    .then((response: any) => {
                        setBranchId(response.data.id)
                    })
                    .catch((error) => {
                        console.log("branchService.getBranchByName() error: ", error)
                    })


                patientPolicyService.byPatientId(response.data[0].id)
                    .then((response: any) => {
                        setPatientPolicyData(response.data[0])
                        // patientPolicyData = response.data[0]
                    })
                    .catch((error) => {
                        console.log("patientPolicyService.byPatientId() error: ", error)
                    })


            })
            .catch((error) => {
                console.log("errorrrr: ", error)
            })

        branchService.findAll()
            .then((response) => {
                setBranchOptions(response.data)
            })
            .catch((error) => {
                console.log("branchService.findAll() error: ", error)
            })

        specialityService.getByDept(department)
            .then((response) => {
                // setSpecialities(response.data)
                // console.log("getByDept: ", response.data)
                setSpecialityOptions(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "Old Flow" || speciality.flowType === "Both")))
            })
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 pb-4 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <View className="px-6">
                            <HeaderWithBackButton isPushBack={true} title={i18n.t("Find your specialist")} />
                        </View>
                    </View>
                </View>
                {/* <View className="px-6 ">
                <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View> */}

                <View className="pb-16 px-6">
                    {
                        loader 
                        ?
                            <ActivityIndicator className="mt-80" size="large" color="#00ff00" />
                        :
                        filteredDoctors.map((doctor, idx) => (
                            <Pressable>
                                <DoctorCard {...doctor} key={idx} />
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SpecialityListPage;