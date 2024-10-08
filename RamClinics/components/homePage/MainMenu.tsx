import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const MainMenu = () => {
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

  const menuItems = [
    {
      icon: "calendar-number-outline",
      title: "My Appoinments",
      link: "/MyAppoinment",
    },
    {
      icon: "calendar-outline",
      title: "Book Appoinment",
      link: "/BookAppointment",
    },
    {
      icon: "people-outline",
      title: "Family Members",
      link: "/FamilyFile",
    },
    {
      icon: "shield-checkmark-outline",
      title: "My Approvals",
      link: "/MyApprovals",
    },
    {
      icon: "receipt-outline",
      title: "My Invoices",
      link: "/MyInvoices",
    },
    {
      icon: "document-text-outline",
      title: "My Prescriptions",
      link: "/MyPrescription",
    },
    {
      icon: "flask-outline",
      title: "Labrotary",
      link: "/MyLabrotary",
    },
    {
      icon: "radio-outline",
      title: "Radiology",
      link: "/MyRadialogy",
    },
    {
      icon: "pricetag-outline",
      title: "Promotions",
      link: "/MyPromotionBookings",
    },
    {
      icon: "bandage-outline",
      title: "My Sick Leaves",
      link: "/MySickLeaves",
    },
    {
      icon: "fitness-outline",
      title: "My Vital Signs",
      link: "/MyVitalSigns",
    },
    {
      icon: "wallet-outline",
      title: "My Wallet",
      link: "/Wallets",
    },
  ];

  return (
    <View className="pt-8 w-full">
      <View className="flex flex-row justify-between px-6">
        <Text className=" text-xl font-semibold">{i18n.t("Main Menu")}</Text>
      </View>
      <View className="flex-row pt-5 px-4">
        <FlatList
          data={menuItems}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: "auto" }}
          renderItem={({ item }) => (
            <View className="flex flex-row p-1 m-1 w-32 h-32">
              <Pressable className="border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
                <View className="py-2 items-center">
                  <Ionicons name={item.icon as any} size={36} color={"rgb(132 204 22)"} />
                </View>
                <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(item.title)}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({});
