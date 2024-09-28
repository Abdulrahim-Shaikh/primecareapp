import { Image, SafeAreaView, ScrollView, View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/ui/DoctorCard";
import { friendChatList, serviceData, topDoctorData } from "../../constants/data";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";

const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const ServiceListPage = () => {
    const [serviceOptions, setServiceOptions] = useState([])
    const { option } = useLocalSearchParams();

    useEffect(() => {
        specialityService.getSpecialityServiceByDepartmentTest(option)
            .then((response) => {
                setServiceOptions(response.data)
            })
            .catch((error) => {
                console.log(error)
            }) 

    })

    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={"#009281"}
                            onPress={() => router.back()}
                        />
                        <Text className="text-2xl font-semibold">Select your Service</Text>
                    </View>
                    <View className="pt-8">
                        <Searchbox />
                    </View>
                    <View className="py-8 gap-4">
                        {serviceData.map(({ id, serviceNameAr, serviceNameEn }) => (
                            <Pressable
                                key={`key:${id}`}
                                className="p-4 border border-borderColor rounded-2xl flex flex-row justify-between items-start"
                            >
                                <View className="flex flex-row justify-start items-center gap-4">
                                    {/* <Image source={img} style={{ height: 50, width: 50 }} /> */}
                                    <View>
                                        <Text className="text-base font-semibold">{serviceNameAr}</Text>
                                        <Text className=" pt-1">{serviceNameEn}</Text>
                                    </View>
                                </View>

                                <View className="p-2 rounded-md bg-[#96d2cb]">
                                    <Ionicons
                                        name="arrow-forward-outline"
                                        size={16}
                                        color="white"
                                    />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ServiceListPage;