import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { doctorSpecialityData } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useBranches } from "../../domain/contexts/BranchesContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const DoctorSpeciality = () => {
  const { language, changeLanguage } = useLanguage();
  const { branches, changeBranches } = useBranches();

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
  let [specialtyList, setSpecialty] = useState([]);

  useEffect(() => {
    specialityService.findAll().then((response) => {
      setSpecialty(response.data);
    })
  }, [])

  return (
    <View className="pt-8">
      <View className="flex flex-row justify-between items-center w-full px-6">
        <Text className=" text-xl font-semibold">{i18n.t("Doctor Speciality")}</Text>
        <Text
          onPress={() =>
            router.push({
              pathname: "/DoctorSpecialityPage",
              params: {
                branchId: null,
                fromSpeciality: 1,
                department: null,
                callCenterFlow: 0,
                callCenterDoctorFlow: 0
              }
            })
          }
          className=" font-semibold text-pc-primary">
          {i18n.t("View All")}
        </Text>
      </View>

      <View className="h-[90px] pt-5">

        {
          specialtyList.length === 0
            ?
            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No Doctors found")}</Text>
            :

            <FlatList
              horizontal
              contentContainerStyle={{ gap: 8 }}
              showsHorizontalScrollIndicator={false}
              data={specialtyList}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item }) => (
                <View className="">
                  <Pressable className="flex flex-row border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg"
                    onPress={() =>
                      router.push({
                        pathname: "/BranchPage",
                        params: {
                          city: null,
                          fromSpeciality: 1,
                          department: null,
                          speciality: item.name,
                          specialityCode: item.code,
                          callCenterFlow: 0,
                          devices: JSON.stringify(""),
                          responsible: "",
                          callOrReception: "",
                          callCenterDoctorFlow: 0
                        }
                      })
                    }
                  >
                    <Text className=" bg-[rgb(59,35,20)] rounded-md p-3 flex justify-center items-center">
                      <Ionicons name={'medical'} size={24} color={"rgb(132 204 22)"} />
                    </Text>
                    <View className="px-3">
                      <Text className="font-semibold text-white">{item.name} </Text>
                      <View>
                        <Text className="font-bodyText pt-1 text-white">
                          {i18n.t("doctors")}{" "}
                          {language === "ar" ?
                            <AntDesign name="arrowleft" color={"white"} /> :
                            <AntDesign name="arrowright" color={"white"} />}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              )}
            />
        }
      </View>
    </View>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({});
