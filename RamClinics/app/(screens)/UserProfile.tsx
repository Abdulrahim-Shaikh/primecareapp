import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useRouter } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/UserIcon.png";
import LinkButton from "../../components/LinkButton";
import { useUserSate } from "../../domain/state/UserState";
import emptyProfileImg from "../../assets/images/avatar.png";
import patientService from "../../domain/services/PatientService";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import translations from "../../constants/locales/ar";
import { I18n } from "i18n-js";
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import moment from "moment";

const i18n =  new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;


const UserProfile = () => {

  const { language, changeLanguage } = useLanguage();
  
    var serviceDataRender = []
    
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

  const { user, setUser } = useUserSate();
  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/patient/file/";
  let [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await patientService.find(user.id);
        setPatient(res.data)
      } catch (error) {
        console.error("Filter Error", error)
      }
    };
    fetchPatient();
  }, []);

  return (
    <View className="pt-12">
      <View className="h-full justify-between items-start w-full">
        <View className="flex-row justify-between items-center pt-6 px-6 w-full">
          <Text
            onPress={() => router.back()}
            className="bg-[rgb(59,35,20)] rounded-full p-2"
          >
            <Ionicons name="chevron-back" color={"white"} size={20} />
          </Text>
          <Text className="">
            <Octicons name="share-android" size={20} color="black" />
          </Text>
        </View>
        <View className="w-full">
          <View className="flex-row justify-center items-start">
            {user && user.profileImg && user.profileImg.length > 0 && user.profileImg[0].length > 0 ?
              <Image source={{ uri: `${sourceUrl}${encodeURIComponent(user.profileImg[0])}` }} className="w-64 h-64 rounded-lg" />
              :
              <Image source={emptyProfileImg} className="w-64 h-64 rounded-lg" />
            }
          </View>
          <View className="text-amber-950 justify-center items-center text m-1">
            {/* <Text className="text-blue-500 text-xl font-semibold">{user && user.email ? user.email : "person@ramclinic.com"}</Text> */}
          </View>
        </View>
        <View className="w-full">
          <View className="bg-[rgb(59,35,20)] rounded-t-3xl p-6 ">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="bg-lime-500 p-[10px] bg-white rounded-md">
                  <AntDesign name="user" size={20} color="#84cc16" />
                </Text>
              </View>
              <View>
                <Text className=" text-white">{i18n.t("firstname")}</Text>
                <Text className="text-lime-600 text-md font-semibold text-xl">
                  {user && user.firstName ? user.firstName : "-"}
                </Text>
              </View>
              <View>
                <Text className=" text-white">{i18n.t("middlename")}</Text>
                <Text className="text-lime-600 text-md font-semibold text-xl">
                  {user && user.middleName ? user.middleName : "-"}
                </Text>
              </View>
              <View>
                <Text className=" text-white">{i18n.t("lastname")}</Text>
                <Text className="text-lime-600 text-md font-semibold text-xl">
                  {user && user.lastName ? user.lastName : "-"}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-12 pb-8 bg-">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="list"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("mrno")}</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-600 text-md font-bold">{patient && patient.mrno ? patient.mrno : "KHB100105421846"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="2k-plus"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("nationalId")}</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-600 text-md font-bold">{patient && patient.nationalId ? patient.nationalId : "28458625824"}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between items-center pb-8 pr-3">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="motion-photos-auto"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("gender")}</Text>
                  <View className="rounded-md ">
                    <Text className="text-lime-600 text-md font-bold">{patient && patient.gender ? patient.gender : "Dont Know"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2 ml-16">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="people-outline"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("dob")}</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-600 text-md font-bold">
                      {patient && patient.dob ? moment(patient.dob).format("DD-MMM-YYYY") : "05/06/1999"}
                    </Text>

                  </View>
                </View>
              </View>

            </View>

            <View className="flex-row justify-between items-center pb-20">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="flag"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("nationality")}</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-600 text-md font-bold">{patient && patient.nationality ? patient.nationality : "India"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2 pr-1">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="mobile-friendly"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">{i18n.t("phone")}</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-600 text-md font-bold">{user && user.mobile ? user.mobile : "28458625824"}</Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
          {/* <View className="p-2 rounded-t-2xl bg-white -mt-10">
                <LinkButton link="/Appoinment" text="Make an appointment" />
              </View> */}
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
