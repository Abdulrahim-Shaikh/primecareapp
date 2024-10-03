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
import { useFocusEffect, useRouter } from "expo-router";
import { SpecialityService } from "../../domain/services/SpecialityService";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons/faTooth'
import { faHandDots } from '@fortawesome/free-solid-svg-icons/faHandDots'
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons/faSuitcaseMedical'

// get departments by branch
const serviceData = [
    {
        id: 1,
        icon: faTooth,
        title: "Dental",
    },
    {
        id: 2,
        icon: faHandDots,
        title: "Dermatology",
    },
    {
        id: 3,
        icon: faSuitcaseMedical,
        title: "Medical",
    },
]

const BookAppointment = () => {
    const router = useRouter();

    // useFocusEffect(
    //     useCallback(() => {
    //     }, [])
    // )

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="calendar-check-outline"
                            size={24}
                            color={"rgb(132 204 22)"}
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
                                    {/* <TouchableOpacity className="border border-amber-900 p-2 rounded-lg w-full" onPress={
                                        () => {
                                            Alert.alert('Search by Doctor or Service', 'Please select one', [
                                                {
                                                    text: 'By Branch',
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
                                    }> */}

                                    <TouchableOpacity
                                        className="border border-amber-900 p-2 rounded-lg w-full"
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
                                            <FontAwesomeIcon icon={item.icon as any} size={36} color={'#78350f'} />
                                            {/* <FontAwesome6 name="fa-solid fa-tooth" color="#c3c3ce" /> */}
                                            {/* <FontAwesome name="calendar" size={36} color={'#78350f'} className="mr-2" /> */}
                                            {/* <FontAwesomeIcon icon="fa-solid fa-tooth" /> */}
                                            {/* <Ionicons name={item.icon as any} size={36} color={'#78350f'} /> */}
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
