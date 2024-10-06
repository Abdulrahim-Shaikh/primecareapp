import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BookAppointmentOptions = () => {
    const router = useRouter();
    const { city, fromSpeciality, department } = useLocalSearchParams();


    // get departments by branch
    const optionsData = [
        {
            id: 1,
            icon: 'building-columns',
            title: "By Branch",
            link: "/BranchPage",
            params: {
                city: city,
                fromSpeciality: fromSpeciality,
                department: department,
                speciality: null,
                specialityCode: null,
                callCenterFlow: 0,
                devices: JSON.stringify(""),
                responsible: "",
                callOrReception: ""
            }
        },
        {
            id: 2,
            icon: 'user-doctor',
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
            id: 4,
            icon: 'file-waveform',
            title: "Call Center",
            link: "/DoctorSpecialityPage",
            params: {
                branchId: null,
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

    var serviceDataRender = []

    for (let item of optionsData) {
        serviceDataRender.push(
            <View className="w-32">
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
                                            ])
                                        }
                                    }> */}
                <TouchableOpacity
                    className="border border-amber-900 p-2 rounded-lg w-full"
                    onPress={
                        () => {
                            router.push({
                                pathname: item.link,
                                params: item.params
                            })
                        }
                    }>
                    <View className="py-2 items-center">
                        {/* <FontAwesomeIcon icon={item.icon as any} size={36} color={'#78350f'} /> */}
                        <FontAwesome icon={item.icon as any} size={36} color={'#78350f'} />
                        {/* <FontAwesome6 name="fa-solid fa-tooth" color="#c3c3ce" /> */}
                        {/* <FontAwesome name="calendar" size={36} color={'#78350f'} className="mr-2" /> */}
                        {/* <FontAwesomeIcon icon="fa-solid fa-tooth" /> */}
                        {/* <Ionicons name={item.icon as any} size={36} color={'#78350f'} /> */}
                    </View>
                    <Text className="text-sm font-semibold text-center text-amber-900 pt-3 pb-2">{item.title}</Text>
                </TouchableOpacity>
            </View>

        )
    }



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
                        <Text className="text-2xl font-semibold">Search by</Text>
                    </View>
                    <View className="flex-row pt-5">
                        {/* <FlatList
                            data={optionsData}
                            numColumns={3}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                               
                            )}
                        /> */}
                    </View>
                    <View className="flex flex-row justify-evenly">
                        {serviceDataRender}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookAppointmentOptions;
