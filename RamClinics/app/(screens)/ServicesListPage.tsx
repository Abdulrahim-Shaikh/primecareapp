
import {
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
import { doctorSpecialityData2, servicesList } from "../../constants/data";
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

const ServicesListPage = () => {

    const { city , fromSpeciality, department, callCenterFlow, specialityCode, speciality, services} = useLocalSearchParams();
    const [ servicesList, setServicesList ] = useState([]);
    const [ searchValue, setSearchValue ] = useState([]);
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

    useFocusEffect(
        useCallback(() => {
            setServicesList(JSON.parse(services.toString()))
        }, [])
    )

    function selectService(name: any, subServices: any) {
      router.push({
        pathname: "/AppointmentType",
        params: {
          city: null,
          fromSpeciality: fromSpeciality,
          department: department,
          callCenterFlow: callCenterFlow,
          specialityCode: specialityCode,
          speciality: speciality,
          subServices: JSON.stringify(subServices)
        }
      })
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Services")} isPushBack={true} />
                <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
                    {servicesList.map(({ serviceNameEn, serviceNameAr, subServices }, idx) => (
                        <Pressable
                            onPress={() => { selectService(serviceNameEn, subServices) }}
                            className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4 bg-[rgb(59,35,20)]"
                            key={idx}
                        >
                            <View className="p-3 rounded-md border border-pc-primary bg-white">
                                <Image source={specialityIcon} />
                            </View>
                            <Text className="text-base font-semibold pt-3 text-white">{serviceNameEn}</Text>
                            <Text className="text-base font-semibold text-white">{serviceNameAr}</Text>
                            <Text className="item-center flex-row text-pc-primary pt-1 text-white">
                                {i18n.t("Select branch")} {" "}
                                <Feather name="arrow-right" size={14} color="#fff" />{" "}
                            </Text>
                            {/* {
                                +fromSpeciality
                                    ?
                                    <Text className="item-center flex-row text-pc-primary pt-1">
                                        Select branch {" "}
                                        <Feather name="arrow-right" size={14} color="#454567" />{" "}
                                    </Text>
                                    :
                                    <Text className="item-center flex-row text-pc-primary pt-1">
                                        Select doctor {" "}
                                        <Feather name="arrow-right" size={14} color="#454567" />{" "}
                                    </Text>
                            } */}
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default ServicesListPage;

const styles = StyleSheet.create({});
