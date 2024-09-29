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
import { useRouter } from "expo-router";
import { SpecialityService } from "../../domain/services/SpecialityService";
import { useEffect } from "react";

const serviceData = [
    {
        id: 1,
        icon: "eye",
        title: "Dental",
    },
    {
        id: 2,
        icon: "medical",
        title: "Dermatology",
    },
    {
        id: 3,
        icon: "eye",
        title: "Medical",
    },
]

const BookAppointment = () => {
    const router = useRouter();

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
                                                    text: 'Doctor',
                                                    onPress: () => router.push({
                                                        pathname: "/SpecialistListPage",
                                                        params: { option: item.title }
                                                    }),
                                                    style: 'default'
                                                },
                                                {
                                                    text: 'Service',
                                                    onPress: () => router.push({
                                                        pathname: "/ServiceListPage",
                                                        params: { option: item.title }
                                                    }),
                                                    style: 'default'
                                                },
                                            ],
                                            )
                                        }
                                    }>
                                        <View className="py-2 items-center">
                                            <Ionicons name={item.icon as any} size={36} color={"teal"} />
                                        </View>
                                        <Text className="text-sm font-semibold text-center text-teal-800 pt-3 pb-2">{item.title}</Text>
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
