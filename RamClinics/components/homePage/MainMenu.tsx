import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { UserContext } from "../../domain/contexts/UserContext";
import branchService from "../../domain/services/BranchService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import { useUserSate } from "../../domain/state/UserState";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const MainMenu = () => {
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);
  let loggedIn = useUserSate.getState().loggedIn;

  const { setUserData } = useContext(UserContext)
  const { branches, setBranches } = useBranches();


  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      if (branches == null) {
        branchService.findAll().then((response) => {
          setBranches(response.data)
        })
      }
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  const menuItems = [
    {
      icon: 'medkit-outline',
      title: 'Specialities',
      link: '/Specialities',
      showOnLogin: true
    },
    {
      icon: "calendar-number-outline",
      title: "My Appoinments",
      link: "/MyAppoinment",
      showOnLogin: true
    },
    // {
    //   icon: "calendar-outline",
    //   title: "Book Appoinment",
    //   link: "/BookAppointment",
    // },
    {
      icon: "receipt-outline",
      title: "My Invoices",
      link: "/MyInvoices",
      showOnLogin: true
    },
    {
      icon: "shield-checkmark-outline",
      title: "My Approvals",
      link: "/MyApprovals",
      showOnLogin: true
    },
    {
      icon: "document-text-outline",
      title: "My Prescriptions",
      link: "/MyPrescription",
      showOnLogin: true
    },
    {
      icon: "people-outline",
      title: "Family Members",
      link: "/FamilyFile",
      showOnLogin: true
    },
    {
      icon: "pricetag-outline",
      title: "Promotions",
      link: "/MyPromotionBookings",
      showOnLogin: true
    },
    {
      icon: "flask-outline",
      title: "Laboratory",
      link: "/MyLabrotary",
      showOnLogin: true
    },
    {
      icon: "radio-outline",
      title: "Radiology",
      link: "/MyRadialogy",
      showOnLogin: true
    },
    {
      icon: "bandage-outline",
      title: "My Sick Leaves",
      link: "/MySickLeaves",
      showOnLogin: true
    },
    {
      icon: "fitness-outline",
      title: "My Vital Signs",
      link: "/MyVitalSigns",
      showOnLogin: true
    },
    {
      icon: "wallet-outline",
      title: "My Wallet",
      link: "/Wallets",
      showOnLogin: true
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
            <View>
              {
                loggedIn
                ?
                item.showOnLogin &&
                <View className="flex flex-row p-1 m-1 w-32 h-32">
                  <Pressable className="border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
                    <View className="py-2 items-center">
                      <Ionicons name={item.icon as any} size={36} color={"rgb(132 204 22)"} />
                    </View>
                    <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(item.title)}</Text>
                  </Pressable>
                </View>
                :
                <View className="flex flex-row p-1 m-1 w-32 h-32">
                  <Pressable className="border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
                    <View className="py-2 items-center">
                      <Ionicons name={item.icon as any} size={36} color={"rgb(132 204 22)"} />
                    </View>
                    <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(item.title)}</Text>
                  </Pressable>
                </View>
              }
            </View>
          )}
        />
      </View>
    </View >
  );
};

export default MainMenu;

const styles = StyleSheet.create({});
