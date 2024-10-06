import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useUserSate } from "../../domain/state/UserState";
import prescriptionService from "../../domain/services/PrescriptionService";
import PrescriptionReport from "./PrescriptionReport";
import PdfViewer from "./PDFViewer";
import moment from "moment";
const tabNames = ["Pending", "Invoiced", "Cancelled"];

const MyPrescription = () => {
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [prescription, setPrescription] = useState([]);
    const [filteredPrescription, setFilteredPrescription] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
    // const [pdfUri, setPdfUri] = useState('');
    const [loading, setLoading] = useState(true);
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

    const filterPrescription = () => {
        let filtered = prescription?.filter((item: any) => item.invoiceStatus === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const invoiceDate = new Date(item.invoiceDate);
                const isWithinDateRange = invoiceDate >= fromDate && invoiceDate <= toDate
                return item.branch === selectedValue && isWithinDateRange;
            });
        }
        setFilteredPrescription(filtered);
    };

    const [activeTab, setActiveTab] = useState("Pending");

    const { data, status, isLoading } = prescriptionService.byPatientIds(userId);

    useEffect(() => {
        console.log('API response', data, status);
        if (data && status === "success") {
            setPrescription(data);
            setFilteredPrescription(data);
        }
    }, [data, status]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const branchesResponse = await branchService.findAll();
    //         setBranches(branchesResponse.data);
    //     } catch (error) {
    //         console.error("Failed to fetch branches:", error);
    //     }

    //     try {
    //         const prescriptionResponse = await prescriptionService.byPatientId(userId);
    //         // console.log("Fetched prescription:", prescriptionResponse.data);
    //         setPrescription(prescriptionResponse.data);
    //         setFilteredPrescription(prescriptionResponse.data);
    //     } catch (error) {
    //         console.error("Failed to fetch prescription:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    
    useEffect(() => {
        filterPrescription();
    }, [fromDate, toDate, selectedValue, activeTab, prescription]);

    const openModal = async (prescription: any) => {
        setSelectedPrescription(prescription);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/getPrescription/${prescription.orderId}`;
        setpdfSource({ uri: pdfUrl, cache: true })
        // setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", prescription.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedPrescription(null);
        setpdfSource({ uri: ``, cache: true })
        // setPdfUri('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={ Platform.OS === 'ios' ? "px-6" : "py-8 px-6"}>
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Prescription" />
                        <MaterialCommunityIcons
                            name="medical-bag"
                            size={24}
                            color={"rgb(59, 35, 20)"}
                        />
                    </View>

                    <View className="flex-row justify-between my-4">
                        <Pressable onPress={() => setShowFromPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg mr-2">
                            <Text className="text-lg">From: {moment(fromDate).format("DD-MMM-YYYY")}</Text>
                        </Pressable>
                        {showFromPicker && (
                            <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
                        )}

                        <Pressable onPress={() => setShowToPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg ml-2">
                            <Text className="text-lg">To: {moment(toDate).format("DD-MMM-YYYY")}</Text>
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
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-lime-600" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-lime-600" : "text-gray-700"}`}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        ) :
                            filteredPrescription.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">No prescription available for this filter.
                                    Select Correct Branch Name, Date & Tabs</Text>
                            ) : (
                                filteredPrescription.map((prescription: any) => (
                                    <Pressable key={prescription.id} onPress={() => openModal(prescription)} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">Prescription ID: {prescription.id}</Text>
                                            <AntDesign name="medicinebox" size={24} color=" rgb(132 204 22)" />
                                        </View>
                                        <Text style={styles.invoiceText}>
                                            <Text style={styles.amount}>{prescription.orderType}</Text>
                                        </Text>
                                        <Text style={styles.invoiceText}>
                                            Total Amount: <Text style={styles.amount}>{prescription.total}</Text>
                                        </Text>
                                        <Text style={styles.branchText}>Branch: {prescription.branch}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">Date: {new Date(prescription.invoiceDate).toLocaleDateString()}</Text>
                                    </Pressable>
                                ))
                            )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <PdfViewer url={pdfSource.uri} invoiceId={selectedPrescription?.orderId} />
                    {/* <PrescriptionReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        orderId={selectedPrescription?.orderId}
                        onClose={closeModal}
                    /> */}
                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MyPrescription;

const styles = StyleSheet.create({
    invoiceText: {
        marginTop: 4,
        fontSize: 16,
        color: '#333',
    },
    amount: {
        fontWeight: 'bold',
        color: ' rgb(132 204 22)',
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
