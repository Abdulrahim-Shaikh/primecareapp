import {
    Alert,
    Platform,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { SpecialityService } from "../../domain/services/SpecialityService";
import { useCallback, useEffect } from "react";

// get departments by branch
const serviceData = [
    {
        id: 1,
        icon: "medical",
        title: "Dental",
    },
    {
        id: 2,
        icon: "flask",
        title: "Dermatology",
    },
    {
        id: 3,
        icon: "medkit",
        title: "Medical",
    },
]

const BookAppointment = () => {
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
        },[])
    )

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="calendar-check-outline"
                            size={24}
                            color={"#009281"}
                        />
                        <Text className="text-2xl font-semibold">Book Appointment</Text>
                    </View>
                    <View className="flex-row pt-5 px-4">
                        <FlatList
                            data={serviceData}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View className="flex flex-row p-1 m-1 w-32 h-32">
                                    <TouchableOpacity className="border border-amber-900 p-2 rounded-lg w-full" onPress={
                                        () => {
                                            Alert.alert('Search by Doctor or Service', 'Please select one', [
                                                {
                                                    text: 'Flow',
                                                    onPress: () => router.push({
                                                        pathname: "/BranchPage",
                                                        params: { 
                                                            city: null,
                                                            fromSpeciality: 0,
                                                            department: item.title
                                                        }
                                                    })
                                                },
                                                {
                                                    text: 'Doctor',
                                                    onPress: () => router.push({
                                                        pathname: "/SpecialistListPage",
                                                        params: { department: item.title }
                                                    }),
                                                    style: 'default'
                                                },
                                                {
                                                    text: 'Service',
                                                    onPress: () => router.push({
                                                        pathname: "/ServiceListPage",
                                                        params: { department: item.title }
                                                    }),
                                                    style: 'default'
                                                },
                                            ],
                                            )
                                        }
                                    }>
                                        <View className="py-2 items-center">
                                            <Ionicons name={item.icon as any} size={36} color={'#78350f'} />
                                        </View>
                                        <Text className="text-sm font-semibold text-center text-amber-900 pt-3 pb-2">{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointment;
