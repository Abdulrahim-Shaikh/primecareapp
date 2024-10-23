import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";
import { useLanguage } from "../../domain/contexts/LanguageContext";
import NASButton from "../../components/NASButton";
import { router, useFocusEffect } from "expo-router";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'

const suggestedLanguage = ["English (UK)", "English (US)"];
const LanguageList = [
  "English", "Arabic",
  // "Chineses (CN)",
  // "Croatian",
  // "Czech",
  // "Danish",
  // "Hindi",
  // "Spanish",
  // "Bengali",
  // "Russian",
];

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const LanguageSettings = () => {
  const [selectSuggested, setSelectSuggest] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);


  function selectLanguage(item: string, index: number) {
    setSelectedLanguage(item);
    setSelectedLanguageIndex(index);
  }

  useFocusEffect(
    useCallback(() => {
      console.log("i18n.locale: ", i18n.locale)
      console.log("Localization.locale: ", Localization.locale)
      if (language === "en") {
        i18n.locale = "en";
        setLocale("en");
        setSelectedLanguage("English");
        setSelectedLanguageIndex(0);
      } else if (language === "ar") {
        i18n.locale = "ar";
        setLocale("ar");
        setSelectedLanguage("Arabic");
        setSelectedLanguageIndex(1);
      }
    },[])
  )

  function onSave() {
    if (selectedLanguage === "English") {
      changeLanguage("en");
      router.push({
        pathname: "/ProfileTab"
      })
    } else if (selectedLanguage === "Arabic") {
      changeLanguage("ar");
      router.push({
        pathname: "/ProfileTab"
      })
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title={i18n.t("Language")} />
          {/* <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-pc-primary">
              Suggested
            </Text>

            <View className="pt-2">
              {suggestedLanguage.map((item, idx) => (
                <Pressable
                  onPress={() => setSelectSuggest(idx)}
                  key={idx}
                  className={`flex-row justify-between items-center pt-4 ${
                    suggestedLanguage.length === idx + 1
                      ? ""
                      : "border-b border-dashed border-pc-primary pb-4"
                  }`}
                >
                  <Text className="text-base font-medium">{item}</Text>
                  <RadioButton isActive={idx === selectSuggested} />
                </Pressable>
              ))}
            </View>
          </View> */}
          <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-pc-primary">
              {i18n.t("Select Language")}
            </Text>
            <View className="pt-2">
              {LanguageList.map((item, idx) => (
                <Pressable
                  onPress={() => selectLanguage(item, idx)}
                  key={idx}
                  className={`flex-row justify-between items-center pt-4 ${LanguageList.length === idx + 1
                    ? ""
                    : "border-b border-dashed border-pc-primary pb-4"
                    }`}
                >
                  <Text className="text-base font-medium">
                    {i18n.t(item)}
                  </Text>
                  <RadioButton isActive={idx === selectedLanguageIndex} />
                </Pressable>
              ))}
            </View>
          </View>
          <View className="w-full pt-8">
            <NASButton
              onPress={() => onSave()}
              title="Save" 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageSettings;

const styles = StyleSheet.create({});
