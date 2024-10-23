import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Button, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";
import { Picker } from "@react-native-picker/picker";
import LinkButton from "../../components/LinkButton";
import moment from "moment";

const AppointmentSlotPage = () => {

    const { city, branch, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [branches, setBranches] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    useEffect(() => {
        setDevicesList(JSON.parse(devices.toString()))
    }, []);

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Shift and Gender" isPushBack={true} />
                <View className="h-full flex flex-1 flex-col pt-8 space-y-4 ">
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AppointmentSlotPage;