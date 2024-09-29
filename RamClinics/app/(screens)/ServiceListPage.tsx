import { Image, SafeAreaView, ScrollView, View, Text, FlatList, Pressable, TouchableOpacity, Button, Platform, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/ui/DoctorCard";
import { friendChatList, serviceData, topDoctorData } from "../../constants/data";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";
import SelectDropdown from "react-native-select-dropdown";
import resourceService from "../../domain/services/ResourceService";
import DateTimePicker from '@react-native-community/datetimepicker';
import scheduleService from "../../domain/services/ScheduleService";

const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

const ServiceListPage = () => {
    const [specialityOptions, setSpecialityOptions] = useState([])
    const [speciality, setSpeciality] = useState(null)
    const [doctorOptions, setDoctorOptions] = useState([])
    const [doctor, setDoctor] = useState(null)
    const { option } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());  // State for start date
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control for start date picker modal
    const [appointmentEntry, setAppointmentEntry] = useState(false)
    const [doctorScheduleData, setDoctorScheduleData] = useState()

    useEffect(() => {
        console.log(`option: '${option}'`)
        specialityService.getByDept(option)
            .then((response) => {
                console.log("response1: ", response.data)
                setDoctorScheduleData(response.data)
                // setSpecialities(response.data)
                setSpecialityOptions(response.data)
            })

    }, [])

    const [activeCategory, setActiveCategory] = useState(0);
    let dateAux = new Date();



    const validateForm = () => {
        if (option != null && date != null && speciality != null && doctor != null) {
            console.log("validateForm", option)
            console.log("validateForm", speciality)
            setAppointmentEntry(true)
            // scheduleService.getDoctorSchedule("7215165", option, speciality, "false")
            //     .then((response) => {
            //         setAppointmentEntry(true)
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
            // router.push({
            //     pathname: "/ScheduleAppointment",
            //     params: {
            //         department: option,
            //         speciality: speciality,
            //         doctor: doctor,
            //         date: (new Date(date)).toString()
            //     }
            // })
        }
    }



    return (
        <SafeAreaView>
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
                {/* <View className="pt-8">
                        <Searchbox />
                    </View> */}
                <View className="py-8 gap-4 flex justify-center">
                    <View className="flex flex-column gap-5">
                        <View className="flex flex-row justify-center gap-3">
                            <SelectDropdown
                                data={[option]}
                                defaultValue={option}
                                disabled={true}
                                onSelect={(selectedItem, index) => {
                                    console.log("hererere")
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem) || 'Select a service'}
                                            </Text>
                                            <MaterialCommunityIcons
                                                name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                size={24}
                                                color={"#009281"}
                                            />
                                        </View>
                                    )
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>
                        <View className="flex flex-row justify-center gap-3">
                            <SelectDropdown
                                data={specialityOptions}
                                onSelect={(selectedItem, index) => {
                                    setSpeciality(selectedItem.name)
                                    resourceService.getResourceBySpeciality("7215165", option, selectedItem.name)
                                        .then((response) => {
                                            console.log("response2: ", response.data)
                                            setDoctorOptions(response.data)
                                        })
                                        .catch((error) => {
                                            console.log("errrr: ", error)
                                        })
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.name) || 'Select a service'}
                                            </Text>
                                            <MaterialCommunityIcons
                                                name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                size={24}
                                                color={"#009281"}
                                            />
                                        </View>
                                    )
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>
                        <View className="flex flex-row justify-center gap-3">
                            <SelectDropdown
                                data={doctorOptions}
                                onSelect={(selectedItem, index) => {
                                    setDoctor(selectedItem.name)
                                    setIsDatePickerOpen(true)
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.name) || 'Select a doctor'}
                                            </Text>
                                            <MaterialCommunityIcons
                                                name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                size={24}
                                                color={"#009281"}
                                            />
                                        </View>
                                    )
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>
                        <View className="flex flex-row justify-center gap-3">
                            <View className="flex flex-column justify-center">
                                {/* <TouchableOpacity className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                        <Text className="text-white">Select Date</Text>
                                    </TouchableOpacity> */}
                                <Button onPress={() => setIsDatePickerOpen(true)} title="Select Date" />
                                <TextInput
                                    onChangeText={() => setIsDatePickerOpen(true)}
                                    value={"Selected: " + (new Date(date)).toString()}
                                />
                            </View>
                            {isDatePickerOpen && (
                                <View>
                                    <DateTimePicker
                                        value={dateAux}
                                        mode="date"
                                        display="default"
                                        onChange={(selectedDate: any) => {
                                            console.log("dateeeee: ", selectedDate.nativeEvent.timestamp)
                                            const currentDate = selectedDate.nativeEvent.timestamp || date;
                                            setDate(currentDate);
                                            setIsDatePickerOpen(false);
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                        <View className="flex flex-row justify-center gap-3">
                            <View className="flex flex-column justify-center">
                                <TouchableOpacity onPress={() => { validateForm() }}
                                    className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                    <Text className="text-white">Search</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {appointmentEntry ?
                            <View className="mt-8 flex flex-row justify-center">
                                <View className="flex flex-col justify-center">
                                    <Text className="flex justify-center justify-self-center">{doctor}</Text>
                                    <View className="flex flex-row">
                                        <TouchableOpacity
                                            onPress={() => {
                                                router.push({
                                                    pathname: "/ScheduleAppointment",
                                                    params: {
                                                        department: option,
                                                        speciality: speciality,
                                                        doctor: doctor,
                                                        date: (new Date(date)).toString(),
                                                        data: JSON.stringify(doctorScheduleData)
                                                    }
                                                })
                                            }}
                                            className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                            <Text className="text-white">Book Appointment</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            : <></>
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ServiceListPage;