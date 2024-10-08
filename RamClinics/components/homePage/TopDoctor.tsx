import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import DoctorCard from "../ui/DoctorCard";
import { router, useFocusEffect } from "expo-router";
import { topDoctorData } from "../../constants/data";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const TopDoctor = () => {
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
    <View className="pt-8 block px-6">
      <View className="flex flex-row justify-between items-center w-full ">
        <Text className=" text-xl font-semibold">{i18n.t("Top Doctor")}</Text>
        <Text
          onPress={() => router.push("/TopDoctor")}
          className=" font-semibold text-pc-primary"
        >
          {i18n.t("View All")}
        </Text>
      </View>
      <View className="">
        {topDoctorData.map(({ ...props }, idx) => (
          <DoctorCard {...props} key={idx} />
        ))}
      </View>
    </View>
  );
};

export default TopDoctor;

const styles = StyleSheet.create({});
