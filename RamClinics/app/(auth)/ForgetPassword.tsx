import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useFocusEffect } from "expo-router";
import { useLanguage } from "../../domain/contexts/LanguageContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const ForgetPassword = () => {
  const [locale, setLocale] = useState(i18n.locale);
  const { language, changeLanguage } = useLanguage();

  useFocusEffect(
    useCallback(() => {

    }, [])
  )

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">
            {i18n.t("Forgot Password")}
          </Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
            {i18n.t("Reset your password securely for uninterrupted access to your account.")}
          </Text>
          <View className="w-full pt-8 pb-32">
            <FormField name="Email" placeholder="Email" />
          </View>

          <LinkButton link="/VerifyOTP" text="Send OTP" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
