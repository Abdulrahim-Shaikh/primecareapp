import { View, Text, SafeAreaView, ScrollView, Pressable, Modal, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { WebView } from 'react-native-webview';
import InvoiceReport from "./InvoiceReport";
import { useUserSate } from "../../domain/state/UserState";
import vitalSigns from "../../domain/services/VitalSignsService";

const tabNames = ["Pending", "Complited", "Cancelled"];

const VitalSigns = () => {
    const [vitalsign, setVitalsign] = useState([]);
    const [filteredvitalsign, setFilteredvitalsign] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedVitalSigns] = useState<any>(null);
    const [pdfUri, setPdfUri] = useState('');
    let setUser = useUserSate.getState().setUser;
    let userId = useUserSate.getState().userId;

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

    const filterVitalSigns = () => {
        let filtered = vitalsign?.filter((item: any) => item.invoiceStatus === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const invoiceDate = new Date(item.invoiceDate);
                const isWithinDateRange = invoiceDate >= fromDate && invoiceDate <= toDate
                return item.branch === selectedValue && isWithinDateRange;
            });
        }
        setFilteredvitalsign(filtered);
    };

    useEffect(() => {
        console.log(">>>>>>>>>branch")
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        });

        vitalSigns.findAll().then((res) => {
            
            // console.log("Fetched Vital Sign:", res.data);
            console.log("\n\n\n\n vitalSigns :>>>>>>>>>>>>>>", res.data[0])
            setVitalsign(res.data);
            setFilteredvitalsign(res.data);
        }).catch((error) => {
            console.error("Failed to fetch invoices:", error);
        });
    }, []);

    useEffect(() => {
        filterVitalSigns();
    }, [fromDate, toDate, selectedValue, activeTab, vitalsign]);

    const openModal = async (invoice: any) => {
        setSelectedVitalSigns(invoice);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/invoiceReport/${invoice.id}`;
        setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", invoice.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedVitalSigns(null);
        setPdfUri('');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView>
                <View className="pb-8 px-6 pt-4">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Vital Signs" />
                        <MaterialCommunityIcons name="receipt" size={24} color={"#009281"} />
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
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-yellow-500" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-yellow-500" : "text-gray-700"}`}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {filteredvitalsign.length === 0 ? (
                            <Text className="text-center text-lg text-gray-600 mt-4">No Vital Signs available for this filter.
                                Select Correct Branch Name, Date & Tabs</Text>
                        ) : (
                            filteredvitalsign.map((encounter: any) => (
                                <View>
                                    {encounter.vitalSigns.map((vital: any) => (
                                    <View>
                                    <Pressable key={vital.id} onPress={() => openModal(vital)} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">vital ID: {vital.id}</Text>
                                            <AntDesign name="filetext1" size={24} color="#008080" />
                                        </View>
                                        <Text className="mt-2 text-lg text-gray-800">
                                            Total Amount: <Text className="font-bold text-teal-600">{vital.total}</Text>
                                        </Text>
                                        <Text className="mt-1 text-sm text-gray-600">Branch: {vital.branch}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">Date: {new Date(vital.invoiceDate).toLocaleDateString()}</Text>
                                    </Pressable>
                                    </View>
                                    ))}
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <InvoiceReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        invoiceId={selectedInvoice?.id}
                        onClose={closeModal}
                    />
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default VitalSigns;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0)',
        borderRadius: 10,
        padding: 20,
    },
    pdfView: {
        width: '100%',
        height: '80%',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
});
