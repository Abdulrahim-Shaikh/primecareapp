import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";

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

const LanguageSettings = () => {
  const [selectSuggested, setSelectSuggest] = useState(0);
  const [selectLanguage, setSelectLanguage] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Language" />
          {/* <View className="mt-8 p-6 border border-amber-900 bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-amber-900">
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
                      : "border-b border-dashed border-amber-900 pb-4"
                  }`}
                >
                  <Text className="text-base font-medium">{item}</Text>
                  <RadioButton isActive={idx === selectSuggested} />
                </Pressable>
              ))}
            </View>
          </View> */}
          <View className="mt-8 p-6 border border-amber-900 bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-amber-900">
              Select Language
            </Text>

            <View className="pt-2">
              {LanguageList.map((item, idx) => (
                <Pressable
                  onPress={() => setSelectLanguage(idx)}
                  key={idx}
                  className={`flex-row justify-between items-center pt-4 ${
                    LanguageList.length === idx + 1
                      ? ""
                      : "border-b border-dashed border-amber-900 pb-4"
                  }`}
                >
                  <Text className="text-base font-medium">{item}</Text>
                  <RadioButton isActive={idx === selectLanguage} />
                </Pressable>
              ))}
            </View>
          </View>
          <View className="w-full pt-8">
            <LinkButton link="/ProfileTab" text="Save" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LanguageSettings;

const styles = StyleSheet.create({});
