import { Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import doctorService from "../../domain/services/DoctorService";
import doctorImg from "../../assets/images/doctorProfile.jpg";
import LinkButton from "../../components/LinkButton";
import translations from "../../constants/locales/ar";
import { I18n } from "i18n-js";
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";



const i18n =  new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const DoctorProfile = () => {

  const { language, changeLanguage } = useLanguage();
  const router = useRouter();
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

  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState({});
  // console.log("doctor>>>>", doctor);
  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/resource/file/";

  // useEffect(() => {
  //   doctorService.find(id).then((doc) => {
  //     setDoctor(doc.data);
  //   });
  // }, [id]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doc = await doctorService.find(id);
        setDoctor(doc.data);
      } catch (error) {
        console.log("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [id])

  const renderValue = (value: any, placeholder: any) => {
    return value && value.length > 0 && value[0] !== "" ? value : placeholder;
  };

  const renderQualification = () => {
    const qualification = doctor.qualification && doctor.qualification.length > 0 ? doctor.qualification[0] : '';
    const qualificationDtsAr = doctor.qualificationDtsAr || '';

    if (!qualification && !qualificationDtsAr) {
      return "Qualification not specified";
    } else if (!qualification) {
      return "Qualification not specified, Details not available";
    } else if (!qualificationDtsAr) {
      return `${qualification}, Details not available`;
    }

    return `${qualification}, ${qualificationDtsAr}`;
  };

  return (
      <ScrollView>
        <View className="flex-1 bg-amber-100 pt-16">
          <View className="flex-row justify-between items-center px-6">
            <Text onPress={() => router.back()} className="bg-[rgb(59,35,20)] rounded-full p-2">
              <Ionicons name="chevron-back" color={"white"} size={20} />
            </Text>
            <Text>
              <Octicons name="share-android" size={20} color="black" />
            </Text>
          </View>
          <TouchableOpacity onPress={() =>
            router.push({
              pathname: "/DoctorProfile",
              params: { id: id },
            })
          }>
            <View className="flex items-center justify-center mt-4 mb-6">
              {doctor.photo && doctor.photo.length > 0 && doctor.photo[0] != null ? (
                <Image
                  source={{ uri: `${sourceUrl}${encodeURIComponent(doctor.photo[0])}` }}
                  className="w-64 h-64 rounded-full border-4 border-pc-primary "
                />
              ) : (
                <Image source={doctorImg} className="w-64 h-64 rounded-full border-4 border-pc-primary" />
              )}
            </View>
          </TouchableOpacity>
          <View className="bg-[rgb(59,35,20)] rounded-t-3xl p-6 mt-5">
            <View className="flex-row justify-between items-start">
              <View className="w-full justify-between">
                <Text className="text-white font-semibold">{i18n.t("DoctorName")}</Text>
                <Text className="text-2xl text-white">{doctor.name}</Text>
              </View>
              <View>
                {/* <Text className="bg-white p-[10px] rounded-md">
                  <AntDesign name="heart" size={16} color="rgb(132 204 22)" />
                </Text> */}
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-4 pb-10 w-full">
              <DetailItem icon="local-hospital" label={i18n.t("professionalDetails")} value={renderValue(doctor.professionalDts, "Professional not available")} />
              {/* <DetailItem icon="directions-walk" label="Experience" value={renderValue(doctor.experience, "N/A")} /> */}
              <DetailItem icon="star-rate" label={i18n.t("rating")} value={renderValue(`${doctor.rating} +`, "N/A")} />
            </View>
          </View>

          <View className="p-6 bg-slate-50 rounded-t-2xl -mt-10 w-full">
            <View className="flex-row justify-between items-center pb-2 w-full">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="add-home" label={i18n.t("departmentDetails")} value={renderValue(doctor.department, "Department not available")} isAmber />
            </View>
            <View className="flex-row justify-between items-center pt-2 pb-5 w-full">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="access-alarms" label={i18n.t("doctorAvailability")} value={renderValue(doctor.clinicHoursAr, "Availability not specified")} isAmber />
            </View>
            <View className="flex-row justify-between items-center pb-5">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="access-alarms" label={i18n.t("experience")} value={renderValue(doctor.experience, "Experience not specified")} isAmber />
            </View>
            <View className="flex-row justify-between items-center pb-5">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="menu-book" label={i18n.t("qualification")} value={renderQualification()} isAmber />
            </View>
            <View className="flex-row justify-between items-center pb-5">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="account-balance" label={i18n.t("nationality")} value={renderValue(doctor.nationality, "Nationality not specified")} isAmber />
            </View>
            <View className="flex-row justify-between items-center pb-5">
            {language === "ar" && (<Text className="text-white font-semibold"></Text>)}
              <DetailItem icon="reviews" label={i18n.t("reviews")} value={renderValue(doctor.reviews, "No reviews yet")} isAmber />
            </View>
          </View>
          {/* <View className={`p-2 bg-slate-50 ${Platform.OS === 'ios' ? 'pb-10' : 'pb-4'}`}>
            <View className="p-2 rounded-t-2xl">
            <LinkButton link="/Appoinment" text="Make an appointment" />
            </View>
          </View> */}
        </View>
        </ScrollView>
        );
};

        const DetailItem = ({icon, label, value, isAmber = false}) => (
        <View className="flex-row items-center gap-2">
          <Text className="p-2 rounded-md bg-white">
            <MaterialIcons name={icon} size={25} color="rgb(132 204 22)" />
          </Text>
          <View>
            <Text className={`text-xs ${isAmber ? 'text-pc-primary' : 'text-white'}`}>{label}</Text>
            <Text className={`text-md font-semibold ${isAmber ? 'text-pc-primary' : 'text-white'}`}>{value}</Text>
          </View>
        </View>
     

        );


        export default DoctorProfile;

        const styles = {
          modalContainer: {
          width: '15rem',
        height: '15rem',
  },
};