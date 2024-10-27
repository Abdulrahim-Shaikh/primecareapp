import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useCallback } from "react";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useState } from "react";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

// get departments by branch
const serviceData = [
    {
        id: 1,
        icon: 'tooth-outline',
        title: "Dental",
    },
    {
        id: 2,
        icon: 'fingerprint',
        title: "Dermatology",
    },
    {
        id: 3,
        icon: 'hospital-box',
        title: "Medical",
    },
]

const i18n =  new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const BookAppointment = () => {
    const { language, changeLanguage } = useLanguage();
    const router = useRouter();
    var serviceDataRender = []

    const [locale, setLocale] = useState(i18n.locale);
    const { fromMainMenu } = useLocalSearchParams();
    const [title, setTitle] = useState("Book Appointment");

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }
    

    useFocusEffect(
        useCallback(() => {
            console.log("fromMainMenu", fromMainMenu)
            if (fromMainMenu != undefined && fromMainMenu != null) {
                setTitle("All Doctor Specialities")
            } else {
                setTitle("Book Appointment")
            }
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )



    for (let item of serviceData) {

        serviceDataRender.push(
            <View className="w-32">
                <TouchableOpacity
                    className="border border-pc-primary p-2 rounded-lg w-full bg-[rgb(59,35,20)]"
                    onPress={
                        () => {
                            router.push({
                                pathname: "/BookAppointmentOptions",
                                params: {
                                    city: null,
                                    fromSpeciality: 0,
                                    department: item.title
                                }
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

        )
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t(title)} />
                        {
                            (fromMainMenu == undefined || fromMainMenu == null) &&
                            <MaterialCommunityIcons
                                name="calendar-check-outline"
                                size={24}
                                color={"#3b2314"}
                            />
                        }
                    </View>
                    <View className="flex flex-row justify-evenly">
                        {serviceDataRender}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointment;
