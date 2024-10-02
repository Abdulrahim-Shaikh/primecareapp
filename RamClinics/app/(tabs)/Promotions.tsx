import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";

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

        <View className="pt-6">
            <View className="pt-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                <AntDesign name="gift" size={24} color={"#009281"} />
                <Text className="text-2xl font-semibold">Promotions</Text>
            </View>
            <View className="flex-row pt-10 px-4 justify-center">
                <FlatList
                    data={offersData}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View className="flex flex-row justify-center items-center p-1 m-1 w-32 h-32">
                            <Pressable
                                className="border border-amber-900 p-2 rounded-lg w-full items-center"
                                onPress={() => {
                                    if (item.title === "Offers") {
                                        router.push({ pathname: "/Offers", params: { offer: item.title } });
                                    } else if (item.title === "Packages") {
                                        router.push({ pathname: "/Packages", params: { package: item.title } });
                                    }
                                }}
                            >
                                <View className="py-2 items-center">
                                    <MaterialCommunityIcons name={item.icon as any} size={36} color={'#78350f'} />
                                </View>
                                <Text className="text-sm font-semibold text-center text-amber-900 pt-3 pb-2">
                                    {item.title}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    )
};

export default Promotions;