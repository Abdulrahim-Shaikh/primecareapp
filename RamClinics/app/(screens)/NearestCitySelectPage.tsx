import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const NearestCitySelectPage = () => {
    const { data } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={"rgb(132 204 22)"}
                            onPress={() => router.back()}
                        />
                        <Text className="text-2xl font-semibold">Select your Service</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NearestCitySelectPage;