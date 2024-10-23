import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useUserSate } from "../../domain/state/UserState";
import MainMenu from "./MainMenu";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const DoctorSpeciality = () => {
  const { language, changeLanguage } = useLanguage();
  const { branches, changeBranches } = useBranches();
  let loggedIn = useUserSate.getState().loggedIn;
  let { routeFromMainMenu } = useLocalSearchParams();

  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      console.log("logged in: ", loggedIn)
      console.log("routeFromMainMenu: ", routeFromMainMenu)
      specialityService.getByDept("Dental").then((response) => {
        setDentalSpeciality(response.data)
        console.log("dental response: ", response.data.length)
      })
        .catch((error) => {
          console.log("dental error: ", error)
        })
      specialityService.getByDept("Dermatology").then((response) => {
        setDermatologySpeciality(response.data)
      })
        .catch((error) => {
          console.log("derma error: ", error)
        })
      specialityService.getByDept("Medical").then((response) => {
        setMedicalSpeciality(response.data)
      })
        .catch((error) => {
          console.log("medical error: ", error)
        })
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )
  const [dentalSpecialityList, setDentalSpeciality] = useState([])
  const [dermatologySpecialityList, setDermatologySpeciality] = useState([])
  const [medicalSpecialityList, setMedicalSpeciality] = useState([])
  let [specialtyList, setSpecialty] = useState([
    'Dental', 'Dermatology', 'Medical'
  ]);

  useEffect(() => {
    // specialityService.findAll().then((response) => {
    //   setSpecialty(response.data);
    // })
  }, [])

  return (
    <SafeAreaView className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainMenu />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({});
