import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React, { useEffect, useState } from "react";
import resourceService from "../../domain/services/ResourceService";
import moment, { Moment } from "moment";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DoctorSelect from "./DoctorSelect";

const SlotsConfirmationPage = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, callOrReception, shift, gender } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [slotsAvailable, setSlotsAvailable] = useState(new Map<string, Array<number>>())
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [slotSearchDate, setSlotSearchDate] = useState(new Date());
    const [doctorListPageRoute, setDoctorListPageRoute] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [loader, setLoader] = useState(false);

    var slotsRender = [];

    useEffect(() => {
        // setDevicesList(JSON.parse(devices.toString()))
        let today = moment().format("YYYY-MM-DD");
        setSlotsAvailable(new Map<string, Array<number>>())
        search(today)
    }, []);

    const selectSlot = async (slot: any) => {
        console.log("slot: ", slot)
        setSelectedSlot(slot)
        setDoctorListPageRoute(true)
        console.log("slotsAvailable.get(selectedSlot): ", slotsAvailable.get(selectedSlot))
        router.push({
            pathname: "/DoctorSelect",
            params: {
                city: city,
                branch: branch,
                fromSpeciality: fromSpeciality,
                department: department,
                speciality: speciality,
                specialityCode: specialityCode,
                callCenterFlow: callCenterFlow,
                devices: JSON.stringify(devicesList),
                responsible: responsible,
                callOrReception: callOrReception,
                shift: shift,
                gender: gender,
                slotSearchDate: moment(slotSearchDate).format("YYYY-MM-DD"),
                selectedSlot: slot[0],
                doctorList: JSON.stringify(slot[1])
            }
        })
    }

    function checkSlots() {
        console.log("slotsAvailable.size: ", slotsAvailable.size)
        console.log("slotsAvailable: ", slotsAvailable)
    }

    const search = (date: any) => {
        setLoader(true)
        let subServiceSlotInterval = +callOrReception
        console.log("subServiceSlotInterval: ", subServiceSlotInterval)
        if (+callCenterFlow) {
            let deviceCode: any = ""
            for (let device of devicesList) {
                deviceCode += device.deviceCode + ","
            }

            resourceService.getResourceByLiveSlotSpeciality(specialityCode, date, branch, shift, city, deviceCode, responsible)
                .then((response) => {
                    setLoader(true)
                    let slots: any = response.data;
                    // console.log("moment: ", moment())
                    // console.log("moment2: ", new Date())
                    const currentTimeInstance = moment();
                    // const currentTimeInstance = moment(date).format("YYYY-MM-DD hh:mm A");
                    // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
                    let slotsAvailableAux: Map<string, Array<any>> = new Map<string, Array<number>>()
                    let pastSlotLimit: Map<number, any> = new Map<number, any>()
                    let pastSlotLimitAux: Map<number, any> = new Map<number, any>()
                    const timeSlots = Object.keys(slots);
                    const sortedTimeSlots = timeSlots.sort((a, b) => {
                        return moment(`${date} ${a.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${date} ${b.trim()}`, "YYYY-MM-DD hh:mm A"))
                    })

                    let slotsAvailableAux2: Map<string, Array<any>> = new Map<string, Array<number>>()

                    for (let slot of sortedTimeSlots) {
                        const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
                        if (moment(slotTimeInstance).isSameOrAfter(moment(currentTimeInstance))) {
                            let schedules = slots[slot]
                            if (schedules != null && schedules.length > 0) {
                                for (let doctorSchedule of schedules) {
                                    if (pastSlotLimit.has(doctorSchedule.id)) {
                                        let previousSlotString = pastSlotLimitAux.get(doctorSchedule.id)
                                        let upperLimitTimeInstance = pastSlotLimit.get(doctorSchedule.id)
                                        if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
                                            if (slotsAvailableAux.has(previousSlotString)) {
                                                slotsAvailableAux.set(previousSlotString, [...(slotsAvailableAux.get(slot) || []), doctorSchedule])
                                                slotsAvailableAux2 = slotsAvailableAux;
                                            } else {
                                                slotsAvailableAux.set(previousSlotString, [doctorSchedule])
                                                slotsAvailableAux2 = slotsAvailableAux;
                                            }
                                            if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                                pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                                pastSlotLimitAux.set(doctorSchedule.id, slot)
                                                continue;
                                            }
                                        }
                                        if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
                                            pastSlotLimitAux.delete(doctorSchedule.id)
                                            pastSlotLimit.delete(doctorSchedule.id)
                                        }
                                    } else {
                                        if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                            pastSlotLimitAux.set(doctorSchedule.id, slot)
                                            pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                        }
                                    }
                                }
                            }
                        // } else {
                        }
                    }
                    setLoader(false)
                    setSlotsAvailable(slotsAvailableAux2)
                })
        }
    }

    function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        const currentDate = selectedDate || slotSearchDate;
        setIsDatePickerOpen(false);
        setSlotSearchDate(currentDate);
        search(moment(slotSearchDate).format("YYYY-MM-DD"))
    };


    var appointmentsRender: any = []
    var appointmentsRowRender: any = []

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Slots Confirmation" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <TouchableOpacity
                        onPress={() => setIsDatePickerOpen(true)}
                        className="flex flex-row justify-between items-center pt-2 gap-4 ">
                        <Text className="flex-1 text-white border border-pc-primary px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                            On: {moment(slotSearchDate).format("DD-MMM-YYYY")} 
                        </Text>
                    </TouchableOpacity>
                    <View>
                        {
                            loader && <ActivityIndicator size="large" color="#454567" />
                        }
                    </View>
                    <View>
                        <Text>{isDatePickerOpen}</Text>
                        {isDatePickerOpen && (
                            <DateTimePicker value={slotSearchDate} mode="date" display="default" onChange={onDateChange} />
                        )}
                    </View>


                    <FlatList
                        data={Array.from(slotsAvailable)}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginHorizontal: "auto" }}
                        renderItem={({ item }) => (
                            <View className="flex flex-row p-1 m-1 w-32 h-32">
                                <Pressable
                                    onPress={() => {
                                        selectSlot(item)
                                    }}
                                    className="border border-pc-primary p-2 rounded-lg w-full">
                                    <View className="py-2 items-center">
                                        <Ionicons name="time" size={36} color={"#3B2314"} />
                                    </View>
                                    <Text className="text-sm font-semibold text-center text-pc-primary pt-3 pb-2">{item[0]}</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SlotsConfirmationPage;