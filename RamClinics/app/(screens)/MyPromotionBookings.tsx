import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, ScrollView, Platform } from "react-native"
import { useUserSate } from "../../domain/state/UserState";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";
import moment from "moment";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const MyPromotionBookings = () => {
    const [promotionOrders, setPromotionOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    let patientId = useUserSate.getState().userId;
    let patientName = useUserSate.getState().patientName;
    
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

    useEffect(() => {
        promotionOrderService.byPatientId(patientId)
            .then((res) => {
                setPromotionOrders(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [patientId]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="px-6">
                    <View className="px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("My Promotion Bookings")} />
                        <MaterialCommunityIcons name="tag" size={24} color={"rgb(59, 35, 20)"} />
                    </View>

                    <View className="flex-row justify-between my-4">

                        {loading ? (
                            <View className="flex-1 justify-center items-center">
                                <ActivityIndicator size="large" color="#rgb(132 204 22)" />
                            </View>
                        ) : (
                            promotionOrders.length > 0 ? (
                                <FlatList
                                    data={promotionOrders}
                                    keyExtractor={(item: any) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View className="flex-row border border-pc-primary rounded-lg mb-4 p-4 bg-white shadow-md">
                                            <View className="flex-1">
                                                <Text className="text-base font-bold mb-1">
                                                    {item.promotionName}
                                                </Text>
                                                <Text className="text-sm" style={{ color: '#04522b', fontWeight: '600' }}>
                                                    {i18n.t("Amount")}: {item.amount.toFixed(2)}
                                                </Text>
                                            </View>
                                            <Text className="text-sm self-center" style={{ color: '#78450f', fontWeight: '500' }}>
                                                {moment(item.orderDate).format("DD-MMM-YYYY")}
                                            </Text>
                                        </View>
                                    )}
                                />
                            ) : (
                                <View className="flex-1 justify-center items-center">
                                    <Text className="text-gray-500 text-lg text-center">
                                        {i18n.t("No Bookings Found")}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default MyPromotionBookings;