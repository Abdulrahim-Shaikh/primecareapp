import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";

const BranchPage = () => {

    let [branches, setBranches] = useState([]);

    const { city } = useLocalSearchParams();

    useEffect(() => {
        branchService.getAllBranchesInCity(city).then((res) => {
            setBranches(res.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Select Branch" isPushBack={true} />
                <View className="flex-1 pt-10 space-y-4 ">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={branches}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => (
                            <View className="w-full">
                                <Pressable
                                    className="flex flex-row border border-amber-900 rounded-lg p-4 shadow-sm bg-white"
                                    onPress={() => router.push({
                                        pathname: "/BranchDoctor",
                                        params: { branchId: item.id }
                                    })}>
                                    <View className="rounded-smg bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <Image source={logoRamClinic} style={{ width: 50, height: 50 }} />
                                    </View>
                                    <View className="px-4 flex justify-center">
                                        <Text className="font-semibold text-lg text-gray-800">
                                            {item?.name}
                                        </Text>
                                        <Text className="text-gray-600 pt-1">
                                            {item?.city}
                                        </Text>
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