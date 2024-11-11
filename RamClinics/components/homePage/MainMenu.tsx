import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { UserContext } from "../../domain/contexts/UserContext";
import branchService from "../../domain/services/BranchService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import { useUserSate } from "../../domain/state/UserState";
import { SafeAreaView } from "react-native-safe-area-context";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = false;

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

  const loggedOutMenuItems = [
    {
      icon: 'gift-open-outline',
      title: 'Offers',
      link: '/Offers',
      showWhenLoggedOut: true
    },
    {
      icon: 'city-variant-outline',
      title: 'Our Branches',
      link: '/CityPage',
      showWhenLoggedOut: true
    },
    {
      icon: 'tag-heart-outline',
      title: 'Packages',
      link: '/Packages',
      showWhenLoggedOut: true
    },
    {
      icon: 'doctor',
      title: 'Specialities',
      link: '/Specialities',
      showWhenLoggedOut: true
    },
    {
      icon: 'hospital-building',
      title: 'About Us',
      link: '/AboutUs',
      showWhenLoggedOut: true
    },
    {
      icon: 'phone',
      title: 'Contact Us',
      link: '/HelpSupport',
      showWhenLoggedOut: true
    },
  ]

  const menuItems = [
    {
      icon: 'medkit-outline',
      title: 'Specialities',
      link: '/Specialities',
      showWhenLoggedOut: false
    },
    {
      icon: "calendar-number-outline",
      title: "My Appoinments",
      link: "/MyAppoinment",
      showWhenLoggedOut: false
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
      showWhenLoggedOut: false
    },
    {
      icon: "shield-checkmark-outline",
      title: "My Approvals",
      link: "/MyApprovals",
      showWhenLoggedOut: false
    },
    {
      icon: "document-text-outline",
      title: "My Prescriptions",
      link: "/MyPrescription",
      showWhenLoggedOut: false
    },
    {
      icon: "people-outline",
      title: "Family Members",
      link: "/FamilyFile",
      showWhenLoggedOut: false
    },
    {
      icon: "pricetag-outline",
      title: "Promotions",
      link: "/MyPromotionBookings",
      showWhenLoggedOut: false
    },
    {
      icon: "flask-outline",
      title: "Laboratory",
      link: "/MyLabrotary",
      showWhenLoggedOut: false
    },
    {
      icon: "radio-outline",
      title: "Radiology",
      link: "/MyRadialogy",
      showWhenLoggedOut: false
    },
    {
      icon: "bandage-outline",
      title: "My Sick Leaves",
      link: "/MySickLeaves",
      showWhenLoggedOut: false
    },
    {
      icon: "fitness-outline",
      title: "My Vital Signs",
      link: "/MyVitalSigns",
      showWhenLoggedOut: false
    },
    {
      icon: "wallet-outline",
      title: "My Wallet",
      link: "/Wallets",
      showWhenLoggedOut: false
    },
  ];


  let renderLoggedOutMenu: any = []

  loggedOutMenuItems.forEach((item) => {
    renderLoggedOutMenu.push(
      <View className="flex flex-row p-1 m-1 w-32 h-32">
        <Pressable className="border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
          <View className="py-2 items-center">
            <Ionicons name={loggedOutMenuItems[0].icon as any} size={36} color={"rgb(132 204 22)"} />
          </View>
          <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(loggedOutMenuItems[0].title)}</Text>
        </Pressable>
      </View>
    )
  })


  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex flex-row" style={{ padding: '4%' }}>
          <View className="pt-8 w-full">
            <View className="flex flex-row justify-between">
              <Text className=" text-xl font-semibold">{i18n.t("Main Menu")}</Text>
            </View>
            <View className="flex-row pt-5">

                  <FlatList
                    data={loggedIn ? menuItems : loggedOutMenuItems}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: "auto" }}
                    renderItem={({ item }) => (
                      <View>
                        <View className="flex flex-row p-1 m-1 w-32 h-32">
                          <Pressable className="border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
                            <View className="py-2 items-center">
                              {
                                !loggedIn
                                  ?
                                    <MaterialCommunityIcons
                                        name={item.icon as any}
                                        size={36}
                                        color={"rgb(132 204 22)"}
                                    />
                                  :
                                    <Ionicons name={item.icon as any} size={36} color={"rgb(132 204 22)"} />
                              }
                            </View>
                            <Text className="text-sm font-semibold text-center text-white pt-3 pb-2">{i18n.t(item.title)}</Text>
                          </Pressable>
                        </View>
                      </View>
                    )}
                  />

            </View>
          </View >
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default MainMenu;

const styles = StyleSheet.create({});
