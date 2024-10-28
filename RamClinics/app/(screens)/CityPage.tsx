import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FlatList, Linking, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import cityMasterService from "../../domain/services/CityMasterService";
import { useCallback, useEffect, useState } from "react";
import cityImg from "../../assets/images/Building.png";
import branchService from "../../domain/services/BranchService";
import resourceService from "../../domain/services/ResourceService";
import { useBranches } from "../../domain/contexts/BranchesContext";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const CityPage = () => {

    const { branchId, fromSpeciality, department, callCenterFlow, specialityCode, speciality, responsible, devices, mobileOrOnline, callCenterDoctorFlow } = useLocalSearchParams();
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [cities, setCities] = useState<any>([]);
    const [branchCounts, setBranchCounts] = useState(Object());
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const { branches, changeBranches} = useBranches();
    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
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
                const getCitiesBySpeciality = async () => {
                    let response = await resourceService.getCityBySpeciality(specialityCode, deviceCode)
                    setCities(response.data)
                }
                getCitiesBySpeciality()
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
                    setCities(Array.from(citySet))
                } else {
                    cityMasterService.findAll().then((res) => {
                        setCities(res.data);
                    });
                }
            }
        }, [])
    )


    useFocusEffect(
        useCallback(() => {
            const counts: { [key: string]: number } = {};
            for (const city of cities) {
                if (+callCenterDoctorFlow) {
                    branchService.getAllBranchesInCity(city).then((res) => {
                        let newCallCenterEnabledBranches = res.data.filter((branch: any) => branch.newCallCenterEnabled)
                        counts[city] = newCallCenterEnabledBranches.length;
                        setBranchCounts(counts);
                        console.log("counts: ", counts)
                    });
                } else {
                    let deviceCode: any = ""
                    for (let device of devicesList) {
                        deviceCode += device.deviceCode + ","
                    }
                    resourceService.getBranchBySpecialityCity(specialityCode, city, deviceCode)
                    .then((response) => {
                        counts[city] = response.data.length;
                        setBranchCounts(counts);
                        console.log("counts1: ", counts)
                    })
                }
            }
        }, [cities])
    )

    let renderNumBranches: any;

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Select City")} isPushBack={true} />
                <View className="flex-1 pt-8 space-y-4 ">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={cities}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => {
                            return (
                                <View className="w-full">
                                    <Pressable
                                        className="flex flex-row border border-pc-primary rounded-lg p-2 shadow-sm bg-white"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/BranchPage",
                                                params: {
                                                    city: item,
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
                                        <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                            <Image source={cityImg} style={{ width: 50, height: 50 }} />
                                        </View>
                                        <View className="px-4 w-3/4 flex justify-center">
                                            <Text className="font-semibold text-lg text-gray-800">
                                                {i18n.t(item || item.city)}
                                            </Text>
                                            <Text className="text-gray-600 pt-1">
                                                {branchCounts[item] || 0} {i18n.t("Branches")}
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
