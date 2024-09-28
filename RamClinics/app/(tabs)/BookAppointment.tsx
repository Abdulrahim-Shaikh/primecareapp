import {
    Alert,
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

    let serviceOptionsDiv = [];
    for (let i = 0; i < serviceData.length; i++) {
        serviceOptionsDiv.push(
            <TouchableOpacity onPress={
                () => {
                    Alert.alert('Search by Doctor or Service', 'Please select one', [
                        {
                            text: 'Doctor',
                            onPress: () => router.push({
                                pathname: "/SpecialistListPage",
                                params: { option: serviceData[i].title }
                            }),
                            style: 'default'
                        },
                        {
                            text: 'Service',
                            onPress: () => router.push({
                                pathname: "/ServiceListPage",
                                params: { option: serviceData[i].title }
                            }),
                            style: 'default'
                        },
                    ],
                    )
                }
            } key={i} className="bg-slate-300 flex flex-column border justify-stretch items-center border-borderColor p-2 rounded-lg">
                <Ionicons className="flex justify-center justify-items-center justify-self-center" name={serviceData[i].icon as any} size={24} color={"white"} />
                <Text>{serviceData[i].title}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View className=" pb-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="calendar-check-outline"
                            size={24}
                            color={"#009281"}
                        />
                        <Text className="text-2xl font-semibold">Book Appointment</Text>
                    </View>
                    <View className="pt-8 grid flex-row grid-flow-col justify-evenly">
                        {serviceOptionsDiv}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointment;
