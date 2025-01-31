
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const ServicesListPage = () => {

    const { city, fromSpeciality, department, callCenterFlow, specialityCode, speciality, services } = useLocalSearchParams();
    const [servicesList, setServicesList] = useState([]);
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

    useFocusEffect(
        useCallback(() => {
            setServicesList(JSON.parse(services.toString()).sort((a: any, b: any) => a.seqNo - b.seqNo))
        }, [])
    )

    function selectService(name: any, subServices: any) {
        router.push({
            pathname: "/AppointmentType",
            params: {
                branchId: "",
                city: null,
                fromSpeciality: fromSpeciality,
                department: department,
                callCenterFlow: callCenterFlow,
                specialityCode: specialityCode,
                speciality: speciality,
                subServices: JSON.stringify(subServices),
                callCenterDoctorFlow: 0,
                resourceId: null
            }
        })
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Services")} isPushBack={true} />
                <View className="flex-1 space-y-4 pt-8 pb-16">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={servicesList}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => {
                            return (
                                <View className="w-full">
                                    <Pressable
                                        className="flex flex-row border border-pc-primary rounded-lg p-2 shadow-sm bg-white"
                                        onPress={() => { selectService(item.serviceNameEn, item.subServices) }}
                                    >
                                        <View className="rounded-full bg-white flex justify-center items-center w-18 h-18 border border-gray-200">
                                            {/* <Image source={specialityIcon} style={{ width: 50, height: 50 }} /> */}
                                            <MaterialCommunityIcons
                                                name="crowd"
                                                size={30}
                                                color={"#3b2314"}
                                            />
                                        </View>
                                        <View className="w-full px-4 flex justify-center gap-3">
                                            <View className="flex flex-row justify-between flex-wrap font-semibold text-lg text-gray-800">
                                                <View>
                                                    <Text className="text-base">
                                                        {item.serviceNameEn}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        paddingRight: 25,
                                                    }}
                                                    >
                                                    <Text className="text-base">
                                                        {item.serviceNameAr}
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
                {/* <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
                    {servicesList.map(({ serviceNameEn, serviceNameAr, subServices }, idx) => (
                        <Pressable
                            onPress={() => { selectService(serviceNameEn, subServices) }}
                            className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4 bg-[rgb(59,35,20)]"
                            key={idx}
                        >
                            <View className="p-3 rounded-md border border-pc-primary bg-white">
                                <Image source={specialityIcon} />
                            </View>
                            <Text className="text-base font-semibold pt-3 text-white">{serviceNameEn}</Text>
                            <Text className="text-base font-semibold text-white">{serviceNameAr}</Text>
                        </Pressable>
                    ))}
                </View> */}
            </ScrollView>
        </SafeAreaView >
    );
};

export default ServicesListPage;

const styles = StyleSheet.create({});
