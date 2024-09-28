import { router, Stack } from "expo-router";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const BranchPage = () => {

    let [branches, setBranches] = useState([]);

    useEffect(() => {
        branchService.findAll().then((res) => {
            setBranches(res.data);
        });
    });

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Select Branch" isPushBack={true} />
                <View className="flex-1 justify-center items-center pt-10 space-y-4">
                    <FlatList
                        contentContainerStyle={{ gap: 8 }}
                        data={branches}
                        keyExtractor={(item, index) => "key" + index}
                        renderItem={({ item }) => (
                            <View className="">
                                <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg"
                                    onPress={() => router.push("/TopDoctor")}>
                                    <Text className=" bg-amber-900 rounded-md p-3 flex justify-center items-center">
                                        <Ionicons name={item?.invoiceLogo as any} size={24} color={"white"} />
                                    </Text>
                                    <View className="px-3">
                                        <Text className="font-semibold">{item?.name} </Text>
                                        <View>
                                            <Text className="font-bodyText pt-1">
                                                {item.city}

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