import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useCallback, useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";
import resourceService from "../../domain/services/ResourceService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useBranches } from "../../domain/contexts/BranchesContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const BranchPage = () => {

    const { city, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, mobileOrOnline, callCenterDoctorFlow } = useLocalSearchParams();
    const [ devicesList, setDevicesList ] = useState(JSON.parse(devices.toString()));
    const [ branchesData, setBranchesData ] = useState([]);
    const { language, changeLanguage } = useLanguage();
    const [ locale, setLocale ] = useState(i18n.locale);
    const { branches, changeBranches } = useBranches();

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            console.log("branches.length: ", branches.length)
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )

    useEffect(() => {
        if (devices != null || devices != "") {
            setDevicesList(JSON.parse(devices.toString()))
        }
        if (+callCenterFlow) {
            let deviceCode: any = ""
            for (let device of devicesList) {
                deviceCode += device.deviceCode + ","
            }
            const getBranchBySpecialityCity = async () => {
                let response = await resourceService.getBranchBySpecialityCity(specialityCode, city, deviceCode)
                console.log("getBranchBySpecialityCity response.data: ", response.data)
                setBranchesData(response.data)
            }
            getBranchBySpecialityCity()
        } else {
            if (city == null || city == "" || city.length == 0) {
                if (branches != null) {
                    setBranchesData(branches);
                }
            } else {
                branchService.getAllBranchesInCity(city).then((res) => {
                    let newCallCenterEnabledBranches = res.data.filter((branch: any) => branch.newCallCenterEnabled)
                    setBranchesData(newCallCenterEnabledBranches);
                });
            }
        }
    }, []);

    function selectCity(item: any) {
        if (+callCenterDoctorFlow) {
            router.push({
                pathname: "/DoctorSpecialityPage",
                params: {
                    branchId: item.id,
                    fromSpeciality: fromSpeciality,
                    department: department,
                    callCenterFlow: 0,
                    callCenterDoctorFlow: callCenterDoctorFlow
                }
            })
        } else {
            if (+callCenterFlow) {
                router.push({
                    pathname: "/ShiftAndGenderOptions",
                    params: {
                        city: city,
                        branch: item,
                        fromSpeciality: fromSpeciality,
                        department: department,
                        speciality: speciality,
                        specialityCode: specialityCode,
                        callCenterFlow: callCenterFlow,
                        devices: devices,
                        responsible: responsible,
                        mobileOrOnline: mobileOrOnline
                    }
                })
            } else {
                if (+fromSpeciality) {
                    router.push({
                        pathname: "/BranchDoctor",
                        params: {
                            branchId: item.id,
                            fromSpeciality: fromSpeciality,
                            department: department,
                            specialityCode: item.code,
                            speciality: speciality,
                            callCenterDoctorFlow: 0
                        }
                    })
                } else {
                    router.push({
                        pathname: "/DoctorSpecialityPage",
                        params: {
                            branchId: item.id,
                            fromSpeciality: fromSpeciality,
                            department: department,
                            callCenterFlow: 0,
                            callCenterDoctorFlow: 0
                        }
                    })
                }
            }
        }
    }


    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Select Branch")} isPushBack={true} />
                <View className="flex-1 pt-6 space-y-4 ">
                    <View className="flex flex-row pl-2 pb-4">
                        {/* <View>
                            <Text>Skip</Text>
                        </View> */}
                        {/* <View>
                            <Ionicons
                                name="chevron-forward"
                                color={"#000000"}
                                size={20}
                            />
                        </View> */}
                    </View>
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={branchesData}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => (
                            <View className="w-full">
                                <Pressable
                                    className="flex flex-row border border-pc-primary rounded-lg p-4 shadow-sm bg-white"
                                    onPress={() => {
                                        typeof item === 'string' ? selectCity(item) : selectCity(item)
                                    }
                                    }>
                                    <View className="rounded-smg bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <Image source={logoRamClinic} style={{ width: 50, height: 50 }} />
                                    </View>
                                    <View className="px-4 flex justify-center">
                                        {
                                            typeof item === 'string'
                                                ?
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item}
                                                </Text>
                                                :
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item?.name}
                                                </Text>
                                        }
                                        {
                                            +callCenterFlow
                                                ?
                                                <Text className="text-gray-600 pt-1">
                                                    {city}
                                                </Text>
                                                :
                                                <Text className="text-gray-600 pt-1">
                                                    {item?.city}
                                                </Text>
                                        }
                                    </View>
                                </Pressable>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default BranchPage;