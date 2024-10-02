import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useUserSate } from "../../domain/state/UserState";
import SickLeavesReport from "./SickLeavesReport";
import vitalSignsService from "../../domain/services/VitalSignsService";

const tabNames = [
    { label: "In Progress", value: "in-progress" },
    { label: "Finished", value: "finished" },
    { label: "Cancelled", value: "cancelled" }
];

const MySickLeaves = () => {
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [vitalSigns, setVitalSigns] = useState([]);
    const [filteredVitalSigns, setFilteredVitalSigns] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSickLeaves, setSelectedSickLeaves] = useState<any>(null);
    const [pdfUri, setPdfUri] = useState('');
    let setUser = useUserSate.getState().setUser;
    let userId = useUserSate.getState().userId;
    console.log(userId)
    const onChangeFrom = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || fromDate;
        setShowFromPicker(false);
        setFromDate(currentDate);
    };

    const onChangeTo = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || toDate;
        setShowToPicker(false);
        setToDate(currentDate);
    };

    const [activeTab, setActiveTab] = useState("in-progress");

    const filterSickLeaves = () => {
        let filtered = vitalSigns?.filter((item: any) => item.status === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const createdDate = new Date(item.createdDate);
                const isWithinDateRange = createdDate >= fromDate && createdDate <= toDate
                return item.branchName === selectedValue && isWithinDateRange;
            });
        }
        setFilteredVitalSigns(filtered);
    };

    useEffect(() => {
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        });

        vitalSignsService.patientEncounterHistory("PNT000028").then((res) => {
            console.log("Response data:", res.data);
            setVitalSigns(res.data || []);
            setFilteredVitalSigns(res.data || []);
        }).catch((error) => {
            console.error("Failed to fetch vital signs:", error);
        });
    }, []);

    useEffect(() => {
        filterSickLeaves();
    }, [fromDate, toDate, selectedValue, activeTab, vitalSigns]);

    const openModal = async (sickLeaves: any) => {
        setSelectedSickLeaves(sickLeaves);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/patientconsentform/sickLeaveByPatientId/${userId}`;
        setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", sickLeaves.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedSickLeaves(null);
        setPdfUri('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pb-8 px-6 pt-4">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Sick Leaves" />
                        <MaterialCommunityIcons
                            name="emoticon-sick-outline"
                            size={24}
                            color={"#009281"}
                        />
                    </View>

                    <View className="flex-row justify-between my-4">
                        <Pressable onPress={() => setShowFromPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg mr-2">
                            <Text className="text-lg">From: {fromDate.toLocaleDateString()}</Text>
                        </Pressable>
                        {showFromPicker && (
                            <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
                        )}

                        <Pressable onPress={() => setShowToPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg ml-2">
                            <Text className="text-lg">To: {toDate.toLocaleDateString()}</Text>
                        </Pressable>
                        {showToPicker && (
                            <DateTimePicker value={toDate} mode="date" display="default" onChange={onChangeTo} />
                        )}
                    </View>

                    <View className="border border-gray-300 rounded-lg mb-4">
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue);
                            }}
                            className="h-12"
                        >
                            <Picker.Item label="Select Branch" value="" />
                            {branches.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                            ))}
                        </Picker>
                    </View>

                    <View className="flex-row justify-between mb-4">
                        {tabNames.map((item, idx) => (
                            <Pressable key={idx} onPress={() => setActiveTab(item.value)} className={`flex-1 border-b-2 pb-2 ${activeTab === item.value ? "border-yellow-500" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item.value ? "text-yellow-500" : "text-gray-700"}`}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {filteredVitalSigns.length === 0 ? (
                            <Text className="text-center text-lg text-gray-600 mt-4">No sick leaves available for this filter.
                                Select Correct Branch Name, Date & Tabs</Text>
                        ) : (
                            filteredVitalSigns.map((vitalsign: any) => (
                                <Pressable key={vitalsign.id} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="font-semibold">Sick Leaves ID: {vitalsign.id}</Text>
                                        <AntDesign name="medicinebox" size={24} color="#008080" />
                                    </View>
                                    <Text style={styles.invoiceText}>
                                        <Text style={styles.amount}>{vitalsign.mrno}</Text>
                                    </Text>
                                    <Text style={styles.branchText}>Practitioner Name: {vitalsign.practitionerName}</Text>
                                    <Text style={styles.branchText}>Branch: {vitalsign.branchName}</Text>
                                    <Text className="mt-1 text-sm text-gray-600">Date: {new Date(vitalsign.createdDate).toLocaleDateString()}</Text>
                                </Pressable>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <SickLeavesReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        patientId={selectedSickLeaves?.id}
                        onClose={closeModal}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MySickLeaves;

const styles = StyleSheet.create({
    invoiceText: {
        marginTop: 4,
        fontSize: 16,
        color: '#333',
    },
    amount: {
        fontWeight: 'bold',
        color: '#008080',
    },
    branchText: {
        marginTop: 2,
        fontSize: 14,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0)',
        borderRadius: 10,
        padding: 20,
    },
});
