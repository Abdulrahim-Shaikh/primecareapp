import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
                <View className="flex-1 justify-center items-center pt-10 space-y-4">
                    <FlatList
                        contentContainerStyle={{ gap: 8 }}
                        data={branches}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => (
                            <View className="">
                                <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg"
                                    onPress={() => router.push({
                                        pathname: "/BranchDoctor",
                                        params: { branchId: item.id }
                                    })}>
                                    <Text className=" bg-amber-900 rounded-md p-10 flex">
                                        <Ionicons name={item?.invoiceLogo as any} size={24} color={"white"} />
                                    </Text>
                                    <View className="px-5">
                                        <Text className="font-semibold">{item?.name} </Text>
                                        <View>
                                            <Text className="font-bodyText pt-1">
                                                {item?.city}
                                            </Text>
                                        </View>
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