import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { doctorSpecialityData2 } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const DoctorSpecialityPage = () => {

  const { branchId, fromSpeciality, department, callCenterFlow } = useLocalSearchParams();
  const [specialityList, setSpecialityList] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [loader, setLoader] = useState(false);
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

  const fetchSpecialities = () => {
    setLoader(true)
    if (department != null) {
      if (+callCenterFlow) {
        specialityService.getSpecialityServiceByDepartmentTest(department)
          .then((response) => {
            setSpecialityList(response.data)
            setLoader(false)
          })
          .catch((error) => {
            setLoader(false)
          })
      } else {
        specialityService.getByDept(department)
          .then((response) => {
            setSpecialityList(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "Old Flow" || speciality.flowType === "Both")))
            setLoader(false)
          })
          .catch((error) => {
            setLoader(false)
          })
      }
    } else {
      specialityService.findAll()
        .then((response) => {
          setSpecialityList(response.data)
          setLoader(false)
        })
        .catch((error) => {
          console.log("error: ", error)
          setLoader(false)
        })
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSpecialities()
    }, [])
  )


  function selectSpeciality(code: any, speciality: any, services: any) {
    console.log("fromSpeciality: ", fromSpeciality)
    console.log("")
    if (+callCenterFlow) {
      router.push({
        pathname: "/ServicesListPage",
        params: {
          city: null,
          fromSpeciality: fromSpeciality,
          department: department,
          callCenterFlow: callCenterFlow,
          specialityCode: code,
          speciality: speciality,
          services: JSON.stringify(services)
        }
      })
      // router.push({
      //   pathname: "/CityPage",
      //   params: {
      //     city: null,
      //     fromSpeciality: fromSpeciality,
      //     department: department,
      //     callCenterFlow: callCenterFlow,
      //     speciality: speciality
      //   }
      // })
    } else {
      if (+fromSpeciality) {
        router.push({
          pathname: "/BranchPage",
          params: {
            city: null,
            fromSpeciality: fromSpeciality,
            department: department,
            speciality: speciality,
            specialityCode: code,
            callCenterFlow: callCenterFlow,
            devices: JSON.stringify(""),
            responsible: "",
            callOrReception: ""
          }
        })
      } else {
        console.log("going from doctorSpeciality page to branchdoctor page")
        router.push({
          pathname: "/BranchDoctor",
          params: {
            branchId: branchId,
            fromSpeciality: fromSpeciality,
            department: department,
            speciality: speciality
          }
        })
      }
    }
  }


  return (
    <SafeAreaView>
      <ScrollView className="p-6">
        <HeaderWithBackButton title={i18n.t("Doctor Speciality")} isPushBack={true} />
        {/* <View className="pt-8 ">
          <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
        </View> */}
        <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
            {
              loader && 
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color="#3B2314" style={{ marginTop: 20 }} />
                </View>
            }
          {
            (specialityList == null || specialityList.length === 0) && !loader && 
            <Text>No specialities found</Text>
          }
          {specialityList.map(({ code, name, services }, idx) => (
            <Pressable
              onPress={() => { selectSpeciality(code, name, services) }}
              className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4 bg-[rgb(59,35,20)]"
              key={idx}
            >
              <View className="p-3 rounded-md border border-pc-primary bg-white">
                <Image source={specialityIcon} />
              </View>
              <Text className="text-base font-semibold pt-3 text-white">{name}</Text>
              {
                +fromSpeciality
                  ?
                  <Text className="item-center flex-row text-white pt-1">
                    {i18n.t("Select branch")} {" "}
                    <Feather name="arrow-right" size={14} color="#454567" />{" "}
                  </Text>
                  :
                  <Text className="item-center flex-row text-white pt-1">
                    {i18n.t("Select doctor")} {" "}
                    <Feather name="arrow-right" size={14} color="#FFF" />{" "}
                  </Text>
              }
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default DoctorSpecialityPage;

const styles = StyleSheet.create({});
