import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Button, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";
import { Picker } from "@react-native-picker/picker";
import LinkButton from "../../components/LinkButton";
import moment, { Moment } from "moment";

const ShiftAndGenderOptions = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, callOrReception } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [branches, setBranches] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [slotsAvailable, setSlotsAvailable ] = useState(new Map<string, Array<number>>())

    useEffect(() => {
        setDevicesList(JSON.parse(devices.toString()))
    }, []);

    const shiftOptions: any = [
        { id: 1, name: 'Both' },
        { id: 2, name: 'Morning' },
        { id: 3, name: 'Evening' }
    ]
    const genderOptions: any = [
        { id: 1, name: 'Both' },
        { id: 2, name: 'Male' },
        { id: 3, name: 'Female' }
    ]
    // const shiftOptions: any = [
    //     'Both', 'Morning', 'Evening'];
    // const genderOptions: any = ['Both', 'Male', 'Female'];

    const search = async () => {
        if (+callCenterFlow) {
            router.push({
                pathname: "/SlotsConfirmationPage",
                params: {
                    city: city,
                    branch: branch,
                    fromSpeciality: fromSpeciality,
                    department: null,
                    speciality: speciality,
                    specialityCode: specialityCode,
                    callCenterFlow: callCenterFlow,
                    devices: devices,
                    responsible: responsible,
                    callOrReception: callOrReception,
                    shift: selectedShift,
                    gender: selectedGender
                }
            })
        } 
        // let subServiceSlotInterval = +callOrReception
        // if (+callCenterFlow) {
        //     let deviceCode: any = ""
        //     for (let device of devicesList) {
        //         deviceCode += device.deviceCode + ","
        //     }

        //     let today = moment().format("YYYY-MM-DD");
        //     let response = await resourceService.getResourceByLiveSlotSpeciality(specialityCode, today, branch, selectedShift, city, deviceCode, responsible)
        //     let slots: any = response.data;
        //     const currentTimeInstance: Moment = moment();
        //     // let doctorsAvailableAgainstSlots: Map<number, Array<any>> = new Map<number, Array<any>>()
        //     let slotsAvailableAux: Map<string, Array<number>> = new Map<string, Array<number>>()
        //     let pastSlotLimit: Map<number, any> = new Map<number, any>()

        //     for (let slot of Object.keys(slots)) {
        //         const slotTimeInstance = moment(`${today} ${slot.trim()}`, "YYYY-MM-DD hh:mm A");
        //         if (slotTimeInstance.isSameOrAfter(currentTimeInstance)) {
        //             let schedules = slots[slot]
        //             if (schedules != null && schedules.length > 0) {
        //                 for (let doctorSchedule of schedules) {
        //                     if (pastSlotLimit.has(doctorSchedule.id)) {
        //                         let upperLimitTimeInstance = pastSlotLimit.get(doctorSchedule.id)
        //                         if (slotTimeInstance.diff(upperLimitTimeInstance, 'minutes') >= subServiceSlotInterval) {
        //                             if (slotsAvailableAux.has(slot)) {
        //                                 slotsAvailableAux.set(slot, [...(slotsAvailableAux.get(slot) || []), doctorSchedule.id])
        //                                 setSlotsAvailable(slotsAvailableAux)
        //                             } else {
        //                                 slotsAvailableAux.set(slot, [doctorSchedule.id])
        //                                 setSlotsAvailable(slotsAvailableAux)
        //                             }
        //                             if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
        //                                 pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
        //                                 continue;
        //                             }
        //                         }
        //                         if (doctorSchedule.status != null && doctorSchedule.status == 'Busy') {
        //                             pastSlotLimit.delete(doctorSchedule.id)
        //                         }
        //                     } else {
        //                         if (doctorSchedule.status == null || (doctorSchedule.status != null && doctorSchedule.status != 'Busy')) {
        //                             pastSlotLimit.set(doctorSchedule.id, slotTimeInstance)
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Shift and Gender" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <View className="flex content-between">
                        <View className="border border-indigo-950 rounded-lg mb-4">
                            <Picker
                                selectedValue={selectedShift} onValueChange={(itemValue) => { setSelectedShift(itemValue); }} className="h-12">
                                <Picker.Item label="Select Shift" value="" />
                                {shiftOptions.map((branch: any) => (
                                    <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                                ))}
                            </Picker>
                        </View>
                        <View className="border border-indigo-950 rounded-lg mb-4">
                            <Picker
                                selectedValue={selectedGender} onValueChange={(itemValue) => { setSelectedGender(itemValue); }} className="h-12">
                                <Picker.Item label="Select Gender" value="" />
                                {genderOptions.map((branch: any) => (
                                    <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                        onPress={() =>  search()}
                         className="flex flex-row justify-between items-center pt-2 gap-4 ">
                            <Text className="flex-1 text-white border border-[#3B2314] px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                                Schedule Appointment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
export default ShiftAndGenderOptions;