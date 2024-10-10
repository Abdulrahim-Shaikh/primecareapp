import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useFocusEffect } from "expo-router";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const cancelReason = [
  "I want to change to another doctor",
  "I want to change package",
  "I don't want to consult",
  "I have recovered from the disease",
  "I have found a suitable medicine",
  "I just want to cancel",
  "I don't want to tell",
  "Others",
];

const CancelAppoinment = () => {
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
  const [reason, setReason] = useState(0);
  return (
    <SafeAreaView className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWithBackButton isPushBack={true} title={i18n.t("Cancel Appoinment")} />

        <View className="pt-8">
          <Text className="text-xl font-semibold">
            {i18n.t("Reason for Schedule Change")}
          </Text>

          <View className="">
            {cancelReason.map((item, idx) => (
              <Pressable
                onPress={() => setReason(idx)}
                key={idx}
                className="flex-row justify-start items-center w-full px-4 py-3 border border-pc-primary rounded-lg mt-4"
              >
                <RadioButton isActive={reason === idx} />
                <Text className="text-pc-primary text-base pl-2">{i18n.t(item)}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="pt-6">
          <Text className="text-base font-semibold pb-3">
            {i18n.t("Write your problem")}
          </Text>
          <View className="px-4 py-3  border rounded-xl w-full text-amber-500">
            <TextInput
              multiline={true}
              placeholder={i18n.t("Write here")}
              numberOfLines={5}
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </View>
        <View className="w-full pt-6">
          <LinkButton link="/CancelAppoinmentSuccessfully" text={i18n.t("Submit")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelAppoinment;

const styles = StyleSheet.create({});
