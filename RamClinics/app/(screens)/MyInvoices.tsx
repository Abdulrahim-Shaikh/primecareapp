import { View, Text, SafeAreaView, ScrollView, Pressable, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import invoiceService from "../../domain/services/InvoiceService";
import { useUserSate } from "../../domain/state/UserState";
import PdfViewer from "./PDFViewer";

const tabNames = ["Pending", "Invoiced", "Cancelled"];

const MyInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");
    const [modalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    // const [pdfUri, setPdfUri] = useState('');
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
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

    const filterInvoices = () => {
        let filtered = invoices?.filter((item: any) => item.invoiceStatus === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const invoiceDate = new Date(item.invoiceDate);
                const isWithinDateRange = invoiceDate >= fromDate && invoiceDate <= toDate
                return item.branch === selectedValue && isWithinDateRange;
            });
        }
        setFilteredInvoices(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const branchesResponse = await branchService.findAll();
            setBranches(branchesResponse.data);
        } catch (error) {
            console.error("Failed to fetch branches:", error);
        }

        try {
            const invoicesResponse = await invoiceService.invoicesByPatientId(userId);
            console.log("Fetched invoices:", invoicesResponse.data);
            setInvoices(invoicesResponse.data);
            setFilteredInvoices(invoicesResponse.data);
        } catch (error) {
            console.error("Failed to fetch invoices:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     setLoading(true);
    //     branchService.findAll().then((res) => {
    //         setBranches(res.data);
    //     }).catch((error) => {
    //         console.error("Failed to fetch branches:", error);
    //     }).finally(() => {
    //         invoiceService.invoicesByPatientId(userId).then((res) => {
    //             console.log("Fetched invoices:", res.data);
    //             setInvoices(res.data);
    //             setFilteredInvoices(res.data);
    //         }).catch((error) => {
    //             console.error("Failed to fetch invoices:", error);
    //         }).finally(() => {
    //             setLoading(false);
    //         });
    //     });
    // }, []);

    useEffect(() => {
        filterInvoices();
    }, [fromDate, toDate, selectedValue, activeTab, invoices]);

    const openModal = async (invoice: any) => {
        setSelectedInvoice(invoice);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/invoiceReport/${invoice.id}`;
        // setPdfUri(pdfUrl);
        setpdfSource({ uri: pdfUrl, cache: true })
        console.log("Opening modal with ID:", invoice.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedInvoice(null);
        // setPdfUri('');
        setpdfSource({ uri: ``, cache: true })
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView>
                <View className="py-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Invoices" />
                        <MaterialCommunityIcons name="receipt" size={24} color={"rgb(132 204 22)"} />
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
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-amber-900" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-yellow-500" : "text-gray-700"}`}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {loading ? (
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        ) : filteredInvoices.length === 0 ? (
                            <Text className="text-center text-lg text-gray-600 mt-4">No invoices available for this filter.
                                Select Correct Branch Name, Date & Tabs</Text>
                        ) : (
                            filteredInvoices.map((invoice: any) => (
                                <Pressable key={invoice.id} onPress={() => openModal(invoice)} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="font-semibold">Invoice ID: {invoice.id}</Text>
                                        <AntDesign name="filetext1" size={24} color="#008080" />
                                    </View>
                                    <Text className="mt-2 text-lg text-gray-800">
                                        Total Amount: <Text className="font-bold text-teal-600">{invoice.total}</Text>
                                    </Text>
                                    <Text className="mt-1 text-sm text-gray-600">Branch: {invoice.branch}</Text>
                                    <Text className="mt-1 text-sm text-gray-600">Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</Text>
                                </Pressable>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={modalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>

                    <PdfViewer url={pdfSource.uri} invoiceId={selectedInvoice?.id} />

                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default MyInvoices;

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
