import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useCallback, useState } from "react";
import branchService from "../../domain/services/BranchService";
import resourceService from "../../domain/services/ResourceService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useCities } from "../../domain/contexts/CitiesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const CityPage = () => {

    const { branchId, fromSpeciality, department, callCenterFlow, specialityCode, speciality, responsible, devices, mobileOrOnline, callCenterDoctorFlow } = useLocalSearchParams();
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [citiesData, setCitiesData] = useState<any>([]);
    const [branchCounts, setBranchCounts] = useState(Object());
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const { branches, changeBranches } = useBranches();
    const { cities, changeCities } = useCities();

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            LogBox.ignoreAllLogs();
            changeLocale(language)
            changeLanguage(language)
            console.log("locale: ", locale)
            if (devices != null && devices != "") {
                setDevicesList(JSON.parse(devices.toString()))
            }
            if (+callCenterFlow) {
                let deviceCode: any = ""
                for (let device of devicesList) {
                    deviceCode += device.deviceCode + ","
                }
                const getCitiesDataBySpeciality = async () => {
                    resourceService.getCityBySpeciality(specialityCode, deviceCode)
                        .then((response) => {
                            let citiesBySpeciality = []
                            for (let cityString of response.data) {
                                let city = cities.filter((city: any) => city.city === cityString)
                                citiesBySpeciality.push(city[0])
                            }
                            console.log("citiesBySpeciality: ", citiesBySpeciality)
                            setCitiesData(citiesBySpeciality)
                        })
                    // let response = await resourceService.getCityBySpeciality(specialityCode, deviceCode)
                    // setCitiesData(response.data)
                }
                getCitiesDataBySpeciality()
            } else {
                if (+callCenterDoctorFlow) {
                    if (branches == null) {
                        branchService.findAll().then((response) => {
                            changeBranches(response.data)
                        })
                    }
                    let citySet: Set<string> = new Set();
                    branches.map((branch: any) => {
                        if (branch.newCallCenterEnabled) {
                            citySet.add(branch.city)
                        }
                    })
                    let citiesBySpeciality = []
                    for (let cityString of Array.from(citySet)) {
                        let city = cities.filter((city: any) => city.city === cityString)
                        citiesBySpeciality.push(city[0])
                    }
                    setCitiesData(citiesBySpeciality)
                } else {
                    setCitiesData(cities);
                }
            }
        }, [])
    )


    useFocusEffect(
        useCallback(() => {
            const counts: { [key: string]: number } = {};
            for (const city of citiesData) {
                if (+callCenterDoctorFlow) {
                    branchService.getAllBranchesInCity(city.city).then((res) => {
                        let newCallCenterEnabledBranches = res.data.filter((branch: any) => branch.newCallCenterEnabled)
                        counts[city.city] = newCallCenterEnabledBranches.length;
                        setBranchCounts(counts);
                        console.log("counts: ", counts)
                    });
                } else {
                    let deviceCode: any = ""
                    for (let device of devicesList) {
                        deviceCode += device.deviceCode + ","
                    }
                    console.log("specialityCode: ", specialityCode)
                    console.log("city: ", city.city)
                    console.log("deviceCode: ", deviceCode)
                    resourceService.getBranchBySpecialityCity(specialityCode, city.city, deviceCode)
                        .then((response) => {
                            counts[city.city] = response.data.length;
                            setBranchCounts(counts);
                            console.log("counts1: ", counts)
                        })
                }
            }
        }, [citiesData])
    )

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Select City")} isPushBack={true} />
                <View className="flex-1 pt-2 space-y-4 ">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={citiesData}
                        keyExtractor={(item: any, index) => "key" + index}
                        ListHeaderComponent={<></>}
                        ListFooterComponent={<></>}
                        renderItem={({ item }) => {
                            return (
                                <View className="w-full">
                                    <Pressable
                                        className="flex flex-row border border-pc-primary rounded-lg p-2 shadow-sm bg-white"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/BranchPage",
                                                params: {
                                                    city: item.city,
                                                    fromSpeciality: fromSpeciality,
                                                    department: department,
                                                    speciality: speciality,
                                                    specialityCode: specialityCode,
                                                    callCenterFlow: callCenterFlow,
                                                    devices: devices,
                                                    responsible: responsible,
                                                    mobileOrOnline: mobileOrOnline,
                                                    callCenterDoctorFlow: callCenterDoctorFlow
                                                },
                                            })
                                        }
                                    >
                                        <View className="rounded-full bg-white flex justify-center items-center w-18 gap-2 pl-3">
                                            {/* <Image source={cityImg} style={{ width: 50, height: 50 }} /> */}
                                            <MaterialCommunityIcons
                                                name="city-variant-outline"
                                                size={30}
                                                color={"#3b2314"}
                                            />
                                        </View>
                                        <View
                                            className="pl-6 w-full flex justify-center"
                                            style={{
                                                paddingRight: 55,
                                            }}
                                        >
                                            <View className="flex flex-row justify-between">
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item.city}
                                                </Text>
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item.cityAr}
                                                </Text>
                                            </View>
                                            <Text className="text-gray-600">
                                                {branchCounts[item.city] || 0} {i18n.t("Branches")}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default CityPage;
