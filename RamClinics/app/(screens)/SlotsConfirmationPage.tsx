import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

    const search = (date: any) => {
        let subServiceSlotInterval = +callOrReception
        console.log("subServiceSlotInterval: ", subServiceSlotInterval)
        if (+callCenterFlow) {
            let deviceCode: any = ""
            for (let device of devicesList) {
                deviceCode += device.deviceCode + ","
            }

            resourceService.getResourceByLiveSlotSpeciality(specialityCode, date, branch, shift, city, deviceCode, responsible)
                .then((response) => {
                    let slots: any = response.data;
                    console.log("moment: ", moment())
                    console.log("moment2: ", new Date())
                    const currentTimeInstance = moment();
                    // const currentTimeInstance = moment(date).format("YYYY-MM-DD hh:mm A");
                    // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
                    let slotsAvailableAux: Map<string, Array<any>> = new Map<string, Array<number>>()
                    let pastSlotLimit: Map<number, any> = new Map<number, any>()
                    const timeSlots = Object.keys(slots);
                    const sortedTimeSlots = timeSlots.sort((a, b) => {
                        return moment(`${date} ${a.trim()}`, "YYYY-MM-DD hh:mm A").diff(moment(`${date} ${b.trim()}`, "YYYY-MM-DD hh:mm A"))
                    })

                    for (let slot of sortedTimeSlots) {
                        const slotTimeInstance = moment(`${date} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
                        // console.log("\n\n\n")
                        // console.log("slotTimeInstance   : ", slotTimeInstance, "\n")
                        // console.log("currentTimeInstance: ", currentTimeInstance, "\n\n\n\n")
                        if (moment(slotTimeInstance).isSameOrAfter(moment(currentTimeInstance))) {
                            let schedules = slots[slot]
                            // console.log("schedules.length: ", schedules.length)
                            if (schedules != null && schedules.length > 0) {
                                for (let doctorSchedule of schedules) {
                                    if (pastSlotLimit.has(doctorSchedule.id)) {
                                        let upperLimitTimeInstance = pastSlotLimit.get(doctorSchedule.id)
                                        // console.log("slotTimeInstance.diff(upperLimitTimeInstance, 'minutes'): ", slotTimeInstance.diff(upperLimitTimeInstance, 'minutes'), slot)
                                        if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
                                            if (slotsAvailableAux.has(slot)) {
                                                slotsAvailableAux.set(slot, [...(slotsAvailableAux.get(slot) || []), doctorSchedule])
                                                console.log("setting")
                                                setSlotsAvailable(slotsAvailableAux)
                                            } else {
                                                slotsAvailableAux.set(slot, [doctorSchedule])
                                                console.log("setting2")
                                                setSlotsAvailable(slotsAvailableAux)
                                            }
                                            if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                                pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                                continue;
                                            }
                                        }
                                        if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
                                            pastSlotLimit.delete(doctorSchedule.id)
                                        }
                                    } else {
                                        // console.log("not pastSlotLimit.has(doctorSchedule.id)")
                                        if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
                                            pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log("coming before")
                        }
                    }
                })
        }
    }

    function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        console.log("here")
        const currentDate = selectedDate || slotSearchDate;
        setIsDatePickerOpen(false);
        setSlotSearchDate(currentDate);
        search(moment(slotSearchDate).format("YYYY-MM-DD"))
    };

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Slots Confirmation" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <TouchableOpacity
                        onPress={() => setIsDatePickerOpen(true)}
                        className="flex flex-row justify-between items-center pt-2 gap-4 ">
                        <Text className="flex-1 text-white border border-amber-900 px-4 py-2 rounded-lg bg-amber-900 text-center" >
                            On: {slotSearchDate.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <Text>{isDatePickerOpen}</Text>
                        {isDatePickerOpen && (
                            <DateTimePicker value={slotSearchDate} mode="date" display="default" onChange={onDateChange} />
                        )}
                    </View>
                    <FlatList
                        data={Array.from(slotsAvailable)}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginHorizontal: "auto" }}
                        renderItem={({ item }) => (
                            <View className="flex flex-row p-1 m-1 w-32 h-32">
                                <Pressable
                                    onPress={() => {
                                        console.log("selected item: ", item)
                                        selectSlot(item)
                                    }}
                                    className="border border-amber-900 p-2 rounded-lg w-full">
                                    <View className="py-2 items-center">
                                        <Ionicons name="time" size={36} color={"maroon"} />
                                    </View>
                                    <Text className="text-sm font-semibold text-center text-amber-900 pt-3 pb-2">{item[0]}</Text>
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