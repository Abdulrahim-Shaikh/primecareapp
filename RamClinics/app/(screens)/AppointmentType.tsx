import {
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
import { doctorSpecialityData2, servicesList } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";
import * as Localization from 'expo-localization'
import { I18n } from "i18n-js";
import translations from "../../constants/locales/ar";
import { useLanguage } from "../../domain/contexts/LanguageContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const AppointmentTypePage = () => {

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const { city, fromSpeciality, department, callCenterFlow, specialityCode, speciality, subServices } = useLocalSearchParams();
    const [subServicesList, setSubServicesList] = useState([]);
    const [searchValue, setSearchValue] = useState([]);

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            changeLocale(language)
            changeLanguage(language)
            setSubServicesList(JSON.parse(subServices.toString()))
            console.log("subServices: ", subServices)
        }, [])
    )


    function selectSubService(responsible: any, devices: any, callOrReception: any) {
        if (+callCenterFlow) {
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
                    callOrReception: callOrReception
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
                            <Text className="item-center flex-row text-pc-primary pt-1 text-white">
                                {i18n.t("Select branch")}
                                <Feather name="arrow-right" size={14} color="#fff" />{" "}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default AppointmentTypePage;

const styles = StyleSheet.create({});
