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
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

// get departments by branch
const serviceData = [
    {
        id: 1,
        icon: 'tooth',
        title: "Dental",
    },
    {
        id: 2,
        icon: 'hand-dots',
        title: "Dermatology",
    },
    {
        id: 3,
        icon: 'suitcase-medical',
        title: "Medical",
    },
]

const BookAppointment = () => {
    const router = useRouter();

    // useFocusEffect(
    //     useCallback(() => {
    //     }, [])
    // )


    var serviceDataRender = []

    for (let item of serviceData) {

        serviceDataRender.push(
            <View className="w-32">
                <TouchableOpacity
                    className="border border-pc-primary p-2 rounded-lg w-full"
                    onPress={
                        () => {
                            router.push({
                                pathname: "/BookAppointmentOptions",
                                params: {
                                    city: null,
                                    fromSpeciality: 0,
                                    department: item.title
                                }
                            })
                        }
                    }>
                    <View className="py-2 items-center">
                        <FontAwesome icon={item.icon as any} size={36} color={'#78350f'} />
                        {/* <!--<FontAwesomeIcon icon={item.icon as any} size={36} color={'#78350f'} /> */}
                        {/* <FontAwesome6 name="fa-solid fa-tooth" color="#c3c3ce" /> */}
                        {/* <FontAwesome name="calendar" size={36} color={'#78350f'} className="mr-2" /> */}
                        {/* <FontAwesomeIcon icon="fa-solid fa-tooth" /> */}
                        {/* <Ionicons name={item.icon as any} size={36} color={'#78350f'} /> */}
                    </View>
                    <Text className="text-sm font-semibold text-center text-pc-primary pt-3 pb-2">{item.title}</Text>
                </TouchableOpacity>
            </View>

        )
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="Book Appointment" />
                        <MaterialCommunityIcons
                            name="calendar-check-outline"
                            size={24}
                            color={"rgb(59,35,20)"}
                        />
                    </View>
                    <View className="flex flex-row justify-evenly">
                        {serviceDataRender}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointment;
