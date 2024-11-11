import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useCallback, useEffect, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useBranches } from "../../domain/contexts/BranchesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const OurBranches = () => {

    const { city } = useLocalSearchParams();
    const [branchesData, setBranchesData] = useState([]);
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            changeLocale(language);
            changeLanguage(language);
        }, [])
    )

    useEffect(() => {
        branchService.getAllBranchesInCity(city).then((res) => {
            setBranchesData(res.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Select Branch")} isPushBack={true} />
                <View className="flex-1 pt-8 space-y-4 pb-16">
                    { branchesData.length > 0 ? 
                        <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={branchesData}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => ( 
                            <View className="w-full">
                                <View className="flex flex-row border border-pc-primary rounded-lg p-3 shadow-sm bg-white">
                                    <View className="rounded-smg bg-white flex justify-center items-center border-gray-200">
                                        {/*<Image source={require("../../assets/logo/logo-ram-clinic-square.png")} style={{ width: 50, height: 50 }} />*/}

                                        <MaterialCommunityIcons
                                            name="hospital-building"
                                            size={30}
                                            color={"#3b2314"}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            paddingRight: 35,
                                        }}
                                        className="w-full pl-2 flex content-center items-center flex-row justify-between flex-wrap">
                                        <View>
                                            <Text className="font-semibold text-gray-800">
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="font-semibold text-lg text-gray-800">
                                                {item.nameAr}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    :
                    <View className="flex flex-row justify-center items-center gap-4">
                        <Text className="text-gray-600">
                            {i18n.t("No branches in this city")}
                        </Text>
                    </View>
                }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default OurBranches;