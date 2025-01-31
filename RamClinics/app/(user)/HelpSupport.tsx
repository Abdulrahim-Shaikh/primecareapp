import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import NASButton from "../../components/NASButton";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const HelpSupport = () => {
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
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title={i18n.t("Contact Us")} />
          <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-2xl">
            <Text className="text-2xl py-1 font-bold text-pc-primary">
              {i18n.t("Always Here to Help")}!
            </Text>
            <Text className="text-lg py-3">
              {i18n.t("Your inquiries, suggestions, and complains all are most welcomed")}.
            </Text>
            <NASButton title={i18n.t('complaintsorsuggestions')} onPress={() => router.navigate({pathname: 'https://ramclinics.net/complaints-and-inquiries?lang=en'})} />
            {/* <Pressable
              onPress={() => router.push("/FaqPage")}
              className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed text-amber-500"
            >
              <Text className="text-md font-medium">FAQ</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/CustomerServiceStart")}
              className=" flex-row justify-between items-center py-4 border-b border-dashed text-amber-500"
            >
              <Text className="text-base font-medium">Contact Us</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/LegalPolicies")}
              className=" flex-row justify-between items-center pt-4 "
            >
              <Text className="text-base font-medium">Terms & Conditions</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable> */}
          </View>

          <View className="mt-8 p-6 border border-pc-primary bg-[rgb(59,35,20)] rounded-2xl">
            <Text className="text-2xl py-1 font-bold text-lime-400">
              {i18n.t("Contact Us")}
            </Text>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="call" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">920020011</Text>
                </View>
              </View>
            </View>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="call" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">0133334050</Text>
                </View>
              </View>
            </View>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="mail" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">ramsupport@ramclinics.com</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="my-8 p-4 border border-pc-primary rounded-2xl bg-amber-100">
            <Text className="text-2xl pl-4 py-1 font-bold text-pc-primary">
              {i18n.t("Timings")}
            </Text>
            <View className="rounded-lg my-3">
              <View className="border border-pc-primary bg-white rounded-lg p-3 mt-5 mb-3">
                <View className="flex flex-row items-center p-2">
                  <Ionicons name="time" size={24} color="rgb(132 204 22)" />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-pc-primary text-center">{i18n.t("Saturday to Thursday")}:</Text>
                    <Text className="text-lg font-bold text-pc-primary text-center">8:00 AM to 10:00 PM</Text>
                  </View>
                </View>
              </View>
              <View className="border border-pc-primary bg-white rounded-lg p-3 mt-5 mb-3">
                <View className="flex flex-row items-center p-2">
                  <Ionicons name="time" size={24} color="rgb(132 204 22)" />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-pc-primary text-center">{i18n.t("Friday")}:</Text>
                    <Text className="text-lg font-bold text-pc-primary text-center">4:00 PM to 10:00 PM</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({});
