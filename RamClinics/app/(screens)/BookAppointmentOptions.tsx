import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useCallback, useState } from "react";


const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const BookAppointmentOptions = () => {

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            console.log("locale: ", locale)
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )
    const router = useRouter();
    const { city, fromSpeciality, department } = useLocalSearchParams();


    // get departments by branch
    const optionsData = [
        // {
        //     id: 1,
        //     icon: 'hospital-building',
        //     title: "By Branch",
        //     link: "/BranchPage",
        //     params: {
        //         city: city,
        //         fromSpeciality: fromSpeciality,
        //         department: department,
        //         speciality: "",
        //         specialityCode: "",
        //         callCenterFlow: 0,
        //         devices: JSON.stringify(""),
        //         responsible: "",
        //         mobileOrOnline: "",
        //         callCenterDoctorFlow: 0
        //     }
        // },
        {
            id: 2,
            icon: 'doctor',
            title: "By Doctor",
            link: "/CityPage",
            params: {
                branchId: "",
                fromSpeciality: fromSpeciality,
                department: department,
                callCenterFlow: 0,
                specialiyCode: "",
                speciality: "",
                responsible: "",
                devices: JSON.stringify(""),
                mobileOrOnline: "",
                callCenterDoctorFlow: 1
            }
        },
        {
            // id: 4,
            id: 3,
            icon: 'hospital-marker',
            title: "By Service",
            link: "/DoctorSpecialityPage",
            params: {
                branchId: "",
                fromSpeciality: fromSpeciality,
                department: department,
                callCenterFlow: 1,
                callCenterDoctorFlow: 0
            }
        },

    ]

    // useFocusEffect(
    //     useCallback(() => {
    //     }, [])
    // )

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("searchBy")} />
                    </View>
                    <View className="flex flex-row justify-evenly">
                        {
                            optionsData.map((item) => (
                                <View key={item.id} className="w-32">
                                    <TouchableOpacity
                                        className="border border-pc-primary p-2 rounded-lg w-full bg-[rgb(59,35,20)]"
                                        onPress={
                                            () => {
                                                router.push({
                                                    pathname: item.link,
                                                    params: item.params
                                                })
                                            }
                                        }>
                                        <View className="py-2 items-center">
                                            {/* <FontAwesome icon={item.icon as any} size={36} color={'#78350f'} /> */}
                                            {/* <!--<FontAwesomeIcon icon={item.icon as any} size={36} color={'#78350f'} /> */}
                                            {/* <FontAwesome6 name="fa-solid fa-tooth" color="#c3c3ce" /> */}
                                            {/* <FontAwesome name="calendar" size={36} color={'#78350f'} className="mr-2" /> */}
                                            {/* <FontAwesomeIcon icon="fa-solid fa-tooth" /> */}
                                            {/* <Ionicons name={item.icon as any} size={36} color={'#78350f'} /> */}
                                            <MaterialCommunityIcons name={item.icon} size={36} color={'rgb(132, 204, 22)'} />
                                        </View>
                                        <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(item.title)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointmentOptions;
