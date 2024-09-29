import {
    Alert,
    Button,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { StyleSheet } from "react-native";
import { useRouter, router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import scheduleService from "../../domain/services/ScheduleService";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import BookAppointment from "../(tabs)/BookAppointment";
import appointmentService from "../../domain/services/AppointmentService";

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

const ScheduleAppointment = () => {
    const router = useRouter();
    const { department, speciality, doctor, date, data } = useLocalSearchParams();

    const doctorScheduleData = data ? JSON.parse(data.toString()) : {}
    // const defaultStatus = doctorScheduleData.status ? doctorScheduleData.status : "Booked"
    const [fromDate, setFromDate] = useState(new Date());  // State for start date
    const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false); // Control for start date picker modal
    const [toDate, setToDate] = useState(new Date());  // State for start date
    const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false); // Control for start date picker modal
    const [defaultStatus, setDefaultStatus] = useState(doctorScheduleData.status ? doctorScheduleData.status : "Booked")

    let fromDateAux = new Date();
    let toDateAux = new Date();

    useEffect(() => {
    }, [])

    const bookAppointment = () => {
        let temporaryPayload = {
            age: 21,
            appointmentDate: (new Date(fromDate)).toDateString(),
            branchId: 7215165,
            branchName: "Doha Medical Complex",
            cardNo: "0",
            className: null,
            createdBy: "ibrahim",
            createdDate: date,
            department: department,
            endTime: (new Date(toDate)).toDateString(),
            gender: 'Male',
            hisStatus: 'defaultStatus',
            history: [
                {
                    status: 'Booked',
                    updatedBy: 'ibrahim',
                    updatedDate: (new Date(new Date())).toString()
                }
            ],
            mobileNo: "594951370",
            mrno: "KHO-AQRPNT100001",
            nationalId: null,
            nationality: 'India',
            patientId: 'PNT100001',
            patientName: "Abdulrahim  Shaikh",
            policyName: "Cash Plan",
            policyNo: "C0001",
            practitionerId: 7282358,
            practitionerName: "Doha Doctor",
            remarks: null,
            requestByPatient: null,
            shift: null,
            slots: [
                {
                    endTime: (new Date(toDate)).toDateString(),
                    scheduled: 6890450,
                    slotId: 6901731,
                    slotName: (new Date(fromDate)).toTimeString() + "-" + (new Date(toDate)).toTimeString(),
                    startTime: (new Date(fromDate)).toDateString(),
                    status: 'busy'
                }
            ],
            speciality: speciality,
            startTime: (new Date(fromDate)).toDateString(), 
            status: 'pending',
            visitType: 'Checkup',
            walkIn: null
        }

        appointmentService.save(temporaryPayload)
        .then((response) => {
            console.log("appointmentService response: ", response)
        })
        .catch((error) => {
            console.log("appointmentService error", error)
        })
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
                    <Text className="text-2xl font-semibold">Schedule Appointment</Text>
                </View>
            </View>
            <View className="py-8 gap-4 flex justify-center">
                <View className="flex flex-column gap-2">
                    <Text className="pl-6">Book Slots</Text>
                    <View className="flex flex-row justify-center gap-2">
                        <View>
                            <Button title="From time" onPress={() => setIsFromDatePickerOpen(true)} />
                            {isFromDatePickerOpen && (
                                <View>
                                    <DateTimePicker
                                        value={fromDateAux}
                                        mode="time"
                                        display="default"
                                        onChange={(selectedDate: any) => {
                                            const currentDate = selectedDate.nativeEvent.timestamp || date;
                                            setFromDate(currentDate);
                                            setIsFromDatePickerOpen(false);
                                        }}
                                    />
                                </View>
                            )}
                            {/* <TouchableOpacity
                                className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                <Text className="text-white">From time</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View>
                            <Button title="To time" onPress={() => setIsToDatePickerOpen(true)} />
                            {isToDatePickerOpen && (
                                <View>
                                    <DateTimePicker
                                        value={toDateAux}
                                        mode="time"
                                        display="default"
                                        onChange={(selectedDate: any) => {
                                            const currentDate = selectedDate.nativeEvent.timestamp || date;
                                            setToDate(currentDate);
                                            setIsToDatePickerOpen(false);
                                        }}
                                    />
                                </View>
                            )}
                            {/* <TouchableOpacity
                                className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                <Text className="text-white">To Time</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View className="flex flex-column justify-center gap-2">
                        {fromDate != null ?
                            <View className="flex flex-row">
                                <View className="flex w-2/4 flex-row justify-end">
                                    <Text> From </Text>
                                </View>
                                <View className="flex w-2/4 flex-row justify-start">
                                    <Text> {new Date(fromDate).toLocaleTimeString()} </Text>
                                </View>
                            </View>
                            : <></>
                        }
                        {toDate != null ?
                            <View className="flex flex-row">
                                <View className="flex w-2/4 flex-row justify-end">
                                    <Text> To </Text>
                                </View>
                                <View className="flex w-2/4 flex-row justify-start">
                                    <Text> {new Date(toDate).toLocaleTimeString()} </Text>
                                </View>
                            </View>
                            : <></>
                        }
                    </View>
                </View>
                <View className="flex justify-center mt-8">
                    <Text className="pl-6">Status: </Text>
                    <View className="flex flex-row justify-center gap-3">
                        <SelectDropdown
                            data={['Booked', 'Confirmed']}
                            defaultValue={defaultStatus}
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
                </View>
                <View className="flex justify-center mt-8">
                    <Text className="pl-6">Policy Details: </Text>
                    <View className="flex flex-column justify-center gap-2">
                        <View className="flex flex-row">
                            <View className="flex w-2/4 flex-row justify-end">
                                <Text> No </Text>
                            </View>
                            <View className="flex w-2/4 flex-row justify-start">
                                <Text> C0001 </Text>
                            </View>
                        </View>
                        <View className="flex flex-row">
                            <View className="flex w-2/4 flex-row justify-end">
                                <Text> Name </Text>
                            </View>
                            <View className="flex w-2/4 flex-row justify-start">
                                <Text> Cash Plan </Text>
                            </View>
                        </View>
                        <View className="flex flex-row">
                            <View className="flex w-2/4 flex-row justify-end">
                                <Text> Card No </Text>
                            </View>
                            <View className="flex w-2/4 flex-row justify-start">
                                <Text> 0 </Text>
                            </View>
                        </View>
                        <View className="flex flex-row">
                            <View className="flex w-2/4 flex-row justify-end">
                                <Text> Start Date </Text>
                            </View>
                            <View className="flex w-2/4 flex-row justify-start">
                                <Text> - </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="flex flex-row justify-center mt-8 pt-8">
                    <TouchableOpacity onPress={
                        () => {
                            Alert.alert('' + doctor, '' + new Date(fromDate).toLocaleDateString() + "-\n" + new Date(fromDate).toLocaleTimeString() + '  to  ' + new Date(toDate).toLocaleTimeString(), [
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        bookAppointment()
                                    },
                                    style: 'default'
                                },
                                {
                                    text: 'Cancel',
                                    style: 'default'
                                },
                            ],
                            )
                        }
                    }
                        className="flex flex-row justify-self-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                        <Text className="text-white">Book Appointment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ScheduleAppointment;
