import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { UserContext } from "../../domain/contexts/UserContext";
import branchService from "../../domain/services/BranchService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import DoctorSpeciality from "../../components/homePage/DoctorSpeciality";
import specialityService from "../../domain/services/SpecialityService";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const Specialities = () => {
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);

    const { setUserData } = useContext(UserContext)
    const { branches, setBranches } = useBranches();
    const [dentalSpecialityList, setDentalSpeciality] = useState([])
    const [dermatologySpecialityList, setDermatologySpeciality] = useState([])
    const [medicalSpecialityList, setMedicalSpeciality] = useState([])
    let [specialtyList, setSpecialty] = useState([
        'Dental', 'Dermatology', 'Medical'
    ]);


    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
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
            if (branches == null) {
                branchService.findAll().then((response) => {
                    setBranches(response.data)
                })
            }
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View className="pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-16">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("Doctor Specialities")} />
                    </View>
                    <View>
                        <View className="pt-8">
                            <View className="flex flex-col">
                                <View className="flex flex-row justify-between items-center w-full px-6">
                                    <Text className="text-xl font-semibold">{i18n.t("Dental Specialities")}</Text>
                                </View>
                                <View className="pt-5 pl-2 pr-2">
                                    {
                                        specialtyList.length === 0
                                            ?
                                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No Doctors found")}</Text>
                                            :
                                            <View>
                                                <FlatList
                                                    horizontal
                                                    contentContainerStyle={{ gap: 8 }}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={dentalSpecialityList}
                                                    keyExtractor={(item: any, index) => "key" + index}
                                                    renderItem={({ item }) => (
                                                        <View className="">
                                                            <Pressable className="flex flex-row border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg"
                                                                onPress={() =>
                                                                    router.push({
                                                                        pathname: "/ServicesListPage",
                                                                        params: {
                                                                            city: null,
                                                                            fromSpeciality: 0,
                                                                            department: "Dental",
                                                                            callCenterFlow: 1,
                                                                            specialityCode: item.code,
                                                                            speciality: item.name,
                                                                            services: JSON.stringify(item.services)
                                                                        }
                                                                    })
                                                                }
                                                            >
                                                                <View className="rounded-md gap-4 p-3 flex justify-center flex-row items-center">
                                                                    <View>
                                                                        <Ionicons name={'medical'} size={24} color={"rgb(132 204 22)"} />
                                                                    </View>
                                                                    <View>
                                                                        <Text className="text-white">{item.name}</Text>
                                                                    </View>
                                                                </View>
                                                            </Pressable>
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                    }
                                </View>
                                <View className="flex flex-row justify-between items-center w-full px-6 pt-8 pt-6">
                                    <Text className=" text-xl font-semibold">{i18n.t("Dermatology Specialities")}</Text>
                                </View>

                                <View className="pt-5 pl-2 pr-2">

                                    {
                                        specialtyList.length === 0
                                            ?
                                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No Doctors found")}</Text>
                                            :
                                            <View>
                                                <FlatList
                                                    horizontal
                                                    contentContainerStyle={{ gap: 8 }}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={dermatologySpecialityList}
                                                    keyExtractor={(item: any, index) => "key" + index}
                                                    renderItem={({ item }) => (
                                                        <View className="">
                                                            <Pressable className="flex flex-row border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg"
                                                                onPress={() =>
                                                                    router.push({
                                                                        pathname: "/ServicesListPage",
                                                                        params: {
                                                                            city: null,
                                                                            fromSpeciality: 0,
                                                                            department: "Dermatology",
                                                                            callCenterFlow: 1,
                                                                            specialityCode: item.code,
                                                                            speciality: item.name,
                                                                            services: JSON.stringify(item.services)
                                                                        }
                                                                    })
                                                                }
                                                            >
                                                                <View className="rounded-md gap-4 p-3 flex justify-center flex-row items-center">
                                                                    <View>
                                                                        <Ionicons name={'medical'} size={24} color={"rgb(132 204 22)"} />
                                                                    </View>
                                                                    <View>
                                                                        <Text className="text-white">{item.name}</Text>
                                                                    </View>
                                                                </View>
                                                            </Pressable>
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                    }
                                </View>
                                <View className="flex flex-row justify-between items-center w-full px-6 pt-8">
                                    <Text className=" text-xl font-semibold">{i18n.t("Medical Specialities")}</Text>
                                </View>

                                <View className="pt-5 pl-2 pr-2">

                                    {
                                        specialtyList.length === 0
                                            ?
                                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No Doctors found")}</Text>
                                            :
                                            <View>
                                                <FlatList
                                                    horizontal
                                                    contentContainerStyle={{ gap: 8 }}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={medicalSpecialityList}
                                                    keyExtractor={(item: any, index) => "key" + index}
                                                    renderItem={({ item }) => (
                                                        <View className="">
                                                            <Pressable className="flex flex-row border border-pc-primary bg-[rgb(59,35,20)] p-2 rounded-lg"
                                                                onPress={() =>
                                                                    router.push({
                                                                        pathname: "/ServicesListPage",
                                                                        params: {
                                                                            city: null,
                                                                            fromSpeciality: 0,
                                                                            department: "Medical",
                                                                            callCenterFlow: 1,
                                                                            specialityCode: item.code,
                                                                            speciality: item.name,
                                                                            services: JSON.stringify(item.services)
                                                                        }
                                                                    })
                                                                }
                                                            >
                                                                <View className="rounded-md gap-4 p-3 flex justify-center flex-row items-center">
                                                                    <View>
                                                                        <Ionicons name={'medical'} size={24} color={"rgb(132 204 22)"} />
                                                                    </View>
                                                                    <View>
                                                                        <Text className="text-white">{item.name}</Text>
                                                                    </View>
                                                                </View>
                                                            </Pressable>
                                                        </View>
                                                    )}
                                                />
                                            </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Specialities;

const styles = StyleSheet.create({});
