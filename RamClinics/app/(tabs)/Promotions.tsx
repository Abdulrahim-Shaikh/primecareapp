import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, FlatList, Pressable, ScrollView, TouchableOpacity, Platform } from "react-native";
import { serviceData } from "../../constants/data";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const Promotions = () => {
    const router = useRouter();

    const offersData = [
        {
            id: 1,
            icon: "gift",
            title: "Offers",
        },
        {
            id: 2,
            icon: "tag-heart",
            title: "Packages",
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className="px-6 flex flex-row justify-start items-center gap-4 pt-6">
                    <HeaderWithBackButton isPushBack={true} title="Promotions" />
                        <AntDesign name="gift" size={24} color={"rgb(59, 35, 20)"} />
                    </View>
                    <View className="flex-row pt-10 px-4 justify-center">
                        <FlatList
                            data={offersData}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                            renderItem={({ item }) => (
                                <View className="flex flex-row justify-center items-center p-1 m-1 w-32 h-32 rounded-md">
                                    <Pressable
                                        className="border border-pc-primary p-2 rounded-lg w-full items-center bg-[rgb(59,35,20)]"
                                        onPress={() => {
                                            if (item.title === "Offers") {
                                                router.push({ pathname: "/Offers", params: { offer: item.title } });
                                            } else if (item.title === "Packages") {
                                                router.push({ pathname: "/Packages", params: { package: item.title } });
                                            }
                                        }}
                                    >
                                        <View className="py-2 items-center">
                                            <MaterialCommunityIcons name={item.icon as any} size={36} color={'rgb(132, 204, 22)'} />
                                        </View>
                                        <Text className="text-sm  text-white font-semibold text-center text-pc-primary pt-3 pb-2">
                                            {item.title}
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Promotions;