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
import appointmentService from "../../domain/services/AppointmentService";
import { useUserSate } from "../../domain/state/UserState";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const OurBranchesCities = () => {

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [citiesData, setCitiesData] = useState<any>([]);
    const [branchCounts, setBranchCounts] = useState(new Map<string, number>());
    const { branches, changeBranches } = useBranches();
    const { cities, changeCities } = useCities();

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            changeLocale(language);
            changeLanguage(language);
            setCitiesData(cities);
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            let cityMap: any = new Map<string, number>();
            branches.forEach((branch: any) => {
                if (cityMap.has(branch.city)) {
                    let currentCountOfBranch: number = cityMap.get(branch.city);
                    currentCountOfBranch += 1
                    cityMap.set(branch.city, currentCountOfBranch);
                } else {
                    cityMap.set(branch.city, 1);
                }
            });
            setBranchCounts(cityMap);
        }, [citiesData])
    )

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title={i18n.t("Select City")} isPushBack={true} />
                <View className="flex-1 pt-3 pb-16">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={cities}
                        keyExtractor={(item: any, index) => "key" + index}
                        ListHeaderComponent={<View></View>}
                        ListFooterComponent={<View></View>}
                        renderItem={({ item }) => {
                            return (
                                <View className="w-full">
                                    <Pressable
                                        className="flex flex-row border border-pc-primary rounded-lg p-2 shadow-sm bg-white"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/OurBranches",
                                                params: {
                                                    city: item.city,
                                                },
                                            })
                                        }
                                    >
                                        <View className="rounded-full bg-white flex justify-center items-center w-18 gap-2 pl-3">
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
                                                { branchCounts.get(item.city) || 0} {i18n.t("Branches")}
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
export default OurBranchesCities;
