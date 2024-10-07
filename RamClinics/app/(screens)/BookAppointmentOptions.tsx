import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { serviceData } from "../../constants/data";

const BookAppointmentOptions = () => {
    const router = useRouter();
    const { city, fromSpeciality, department } = useLocalSearchParams();


    // get departments by branch
    const optionsData = [
        {
            id: 1,
            icon: 'hospital-building',
            title: "By Branch",
            link: "/BranchPage",
            params: {
                city: city,
                fromSpeciality: fromSpeciality,
                department: department,
                speciality: "",
                specialityCode: "",
                callCenterFlow: 0,
                devices: JSON.stringify(""),
                responsible: "",
                callOrReception: ""
            }
        },
        {
            id: 2,
            icon: 'doctor',
            title: "By Doctor",
            link: "/SpecialistListPage",
            params: { department: department }
        },
        // {
        //     id: 3,
        //     icon: 'file-waveform',
        //     title: "By Service",
        //     link: "/NormalFlow",
        //     params: { department: department }
        // },
        {
            // id: 4,
            id: 3,
            icon: 'hospital-marker',
            title: "By Service",
            link: "/DoctorSpecialityPage",
            params: {
                branchId: "",
                fromSpeciality: fromSpeciality,
                department: department,
                callCenterFlow: 1
            }
        },

    ]

    // useFocusEffect(
    //     useCallback(() => {
    //     }, [])
    // )

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="">
                    <View className=" pb-8 px-6 flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="Search By" />
                    </View>
                    <View className="flex flex-row justify-evenly">
                        {
                            optionsData.map((item) => (
                                <View key={item.id} className="w-32">
                                    <TouchableOpacity
                                        className="border border-pc-primary p-2 rounded-lg w-full"
                                        onPress={
                                            () => {
                                                router.push({
                                                    pathname: item.link,
                                                    params: item.params
                                                })
                                            }
                                        }>
                                        <View className="py-2 items-center">
                                            {/* <FontAwesome icon={item.icon as any} size={36} color={'#78350f'} /> */}
                                            {/* <!--<FontAwesomeIcon icon={item.icon as any} size={36} color={'#78350f'} /> */}
                                            {/* <FontAwesome6 name="fa-solid fa-tooth" color="#c3c3ce" /> */}
                                            {/* <FontAwesome name="calendar" size={36} color={'#78350f'} className="mr-2" /> */}
                                            {/* <FontAwesomeIcon icon="fa-solid fa-tooth" /> */}
                                            {/* <Ionicons name={item.icon as any} size={36} color={'#78350f'} /> */}
                                            <MaterialCommunityIcons name={item.icon} size={36} color={"#3b2314"} />
                                        </View>
                                        <Text className="text-sm font-semibold text-center text-pc-primary pt-3 pb-2">{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointmentOptions;
