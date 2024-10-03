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
import { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons/faBuildingColumns'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons/faUserDoctor'
import { faFileWaveform } from '@fortawesome/free-solid-svg-icons/faFileWaveform'


const BookAppointmentOptions = () => {
    const router = useRouter();
    const { city, fromSpeciality, department } = useLocalSearchParams();

    // get departments by branch
    const optionsData = [
        {
            id: 1,
            icon: faBuildingColumns,
            title: "By Branch",
            link: "/BranchPage",
            params: {
                city: city,
                fromSpeciality: fromSpeciality,
                department: department
            }
        },
        {
            id: 2,
            icon: faUserDoctor,
            title: "By Doctor",
            link: "/SpecialistListPage",
            params: { department: department }
        },
        {
            id: 3,
            icon: faFileWaveform,
            title: "By Service",
            link: "/ServiceListPage",
            params: { department: department }
        },
        {
            id: 4,
            icon: faFileWaveform,
            title: "By Service2",
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
                    <View className="flex-row pt-5 px-4">
                        <FlatList
                            data={optionsData}
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

export default BookAppointmentOptions;
