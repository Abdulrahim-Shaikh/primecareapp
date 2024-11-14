import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import specialityService from "../../domain/services/SpecialityService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const DoctorSpecialityPage = () => {

  const { branchId, fromSpeciality, department, callCenterFlow, callCenterDoctorFlow } = useLocalSearchParams();
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
      if (+callCenterFlow || +callCenterDoctorFlow) {
        specialityService.getSpecialityServiceByDepartmentTest(department)
          .then((response) => {
            setSpecialityList(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "New Flow" || speciality.flowType === "Both")))
            setLoader(false)
          })
          .catch((error) => {
            setLoader(false)
          })
      } else {
        specialityService.getByDept(department)
          .then((response) => {
            setSpecialityList(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "New Flow" || speciality.flowType === "Both")))
            setLoader(false)
          })
          .catch((error) => {
            setLoader(false)
          })
      }
    } else {
      specialityService.findAll()
        .then((response) => {
          setSpecialityList(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "New Flow" || speciality.flowType === "Both")))
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


  function selectSpeciality(item: any, code: any, speciality: any, services: any) {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    console.log("code: ", code)
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
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
            mobileOrOnline: "",
            callCenterDoctorFlow: 0
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
            specialityCode: code,
            speciality: speciality,
            callCenterDoctorFlow: callCenterDoctorFlow,
            last3AppointmentsFlow: 0
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
        <View className="pt-8">
          {
            loader && <ActivityIndicator size="large" color="#454567" />
          }
        </View>
        <View className="flex-row flex-wrap">
          {
            (specialityList == null || specialityList.length === 0) && !loader &&
            <Text className="w-full text-center text-lg text-gray-600">{i18n.t("No specialities found")}</Text>
          }
          <View className="flex-1 pb-16 space-y-4 ">
            <FlatList
              contentContainerStyle={{ gap: 9 }}
              data={specialityList}
              keyExtractor={(item: any, index) => "key" + index}
              renderItem={({ item }) => {
                return (
                  <View className="w-full">
                    <Pressable
                      className="flex flex-row border border-pc-primary rounded-lg p-3 shadow-sm bg-white"
                      onPress={() => { selectSpeciality(item, item.code, item.name, item.services) }}
                    >
                      <View className="rounded-full bg-white flex justify-center items-center w-18 h-18 border border-gray-200">
                        {/* <Image source={specialityIcon} style={{ width: 50, height: 50 }} /> */}
                        <MaterialCommunityIcons
                          name="stethoscope"
                          size={30}
                          color={"#3b2314"}
                        />
                      </View>
                      <View className="w-full px-4 flex justify-center gap-3">
                        <View className="flex flex-row justify-between flex-wrap font-semibold text-lg text-gray-800">
                          <View>
                            <Text className="text-base">
                              {item.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              paddingRight: 25,
                            }}
                          >
                            <Text className="text-base">
                              {item.nameAr}
                            </Text>
                          </View>
                        </View>
                        {/* <View className="w-full flex flex-col items-start gap-2 font-semibold text-lg text-gray-800">
                          <Text>{item.name}</Text>
                        </View> */}
                      </View>
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default DoctorSpecialityPage;

const styles = StyleSheet.create({});
