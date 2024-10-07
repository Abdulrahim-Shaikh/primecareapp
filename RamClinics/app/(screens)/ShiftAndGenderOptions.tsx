import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Button, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import genderService from "../../domain/services/genderService";
import { useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";
import { Picker } from "@react-native-picker/picker";
import LinkButton from "../../components/LinkButton";
import moment, { Moment } from "moment";
import NASButton from "../../components/NASButton";

const ShiftAndGenderOptions = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, callOrReception } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [genderes, setgenderes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedShift, setSelectedShift] = useState("Both");
    const [selectedGender, setSelectedGender] = useState("Both");
    const [slotsAvailable, setSlotsAvailable] = useState(new Map<string, Array<number>>())

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

    useEffect(() => {
        setSelectedShift("Both")
        setSelectedGender("Both")
        setSelectedGender(genderOptions[0])
        setDevicesList(JSON.parse(devices.toString()))
    }, []);

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
    }

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Shift and Gender" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                    <View className="flex items-center flex-row">
                        <Text className="my-2 font-medium">Shift</Text>
                        <Text className="text-red-500"> *</Text>
                    </View>
                    <View className="flex content-between">
                        <View className="border border-indigo-950 rounded-lg mb-4">
                            <Picker
                                selectedValue={selectedShift} onValueChange={(itemValue) => { setSelectedShift(itemValue); }} className="h-12">
                                {/* <Picker.Item label="Select Shift" value="" /> */}
                                {shiftOptions.map((gender: any) => (
                                    <Picker.Item key={gender.id} label={gender.name} value={gender.name} />
                                ))}
                            </Picker>
                        </View>
                        <View className="flex items-center flex-row">
                            <Text className="my-2 font-medium">Gender</Text>
                            <Text className="text-red-500"> *</Text>
                        </View>
                        <View className="border border-indigo-950 rounded-lg mb-4">
                            <Picker
                                selectedValue={selectedGender} onValueChange={(itemValue) => { setSelectedGender(itemValue); }} className="h-12">
                                {/* <Picker.Item label="Select Gender" value="" /> */}
                                {genderOptions.map((gender: any) => (
                                    <Picker.Item key={gender.id} label={gender.name} value={gender.id} />
                                ))}
                            </Picker>
                        </View>
                        <NASButton title="Schedule Appointment" onPress={search} />
                        {/* <TouchableOpacity
                            onPress={() => search()}
                            className="flex flex-row justify-between items-center pt-2 gap-4 ">
                            <Text className="flex-1 text-white border border-[#3B2314] px-4 py-2 rounded-lg bg-[#3B2314] text-center" >
                                Schedule Appointment
                            </Text>
                        </TouchableOpacity> */}
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