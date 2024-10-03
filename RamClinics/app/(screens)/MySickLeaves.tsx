import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import sickLeavesService from "../../domain/services/SickLeavesService";
import { useUserSate } from "../../domain/state/UserState";
import SickLeavesReport from "./SickLeavesReport";
import PdfViewer from "./PDFViewer";
const tabNames = ["Pending", "Cancelled", "Completed"];

const MySickLeaves = () => {
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [sickLeaves, setSickLeaves] = useState([]);
    const [filteredSickLeaves, setFilteredSickLeaves] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSickLeaves, setSelectedSickLeaves] = useState<any>(null);
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
    const [loading, setLoading] = useState(true);
    // const [pdfUri, setPdfUri] = useState('');
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

    const [activeTab, setActiveTab] = useState("Pending");

    const filterSickLeaves = () => {
        let filtered = sickLeaves?.filter((item: any) => item.status === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const createdDate = new Date(item.createdDate);
                const isWithinDateRange = createdDate >= fromDate && createdDate <= toDate
                return item.branchName === selectedValue && isWithinDateRange;
            });
        }
        setFilteredSickLeaves(filtered);
    };

    useEffect(() => {
        setLoading(true);
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        }).finally(() => {
            sickLeavesService.byPatientId(userId).then((res) => {
                console.log("Fetched sick leaves:", res.data);
                setSickLeaves(res.data);
                setFilteredSickLeaves(res.data);
            }).catch((error) => {
                console.error("Failed to fetch sick leaves:", error);
            }).finally(() => {
                setLoading(false);
            });
        });
    }, []);

    useEffect(() => {
        filterSickLeaves();
    }, [fromDate, toDate, selectedValue, activeTab, sickLeaves]);

    const openModal = async (sickLeaves: any) => {
        setSelectedSickLeaves(sickLeaves);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/patientconsentform/sickLeaveByPatientId/${userId}`;
        setpdfSource({ uri: pdfUrl, cache: true })
        // setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", sickLeaves.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedSickLeaves(null);
        setpdfSource({ uri: ``, cache: true })
        // setPdfUri('');
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
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-yellow-500" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-yellow-500" : "text-gray-700"}`}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {loading ? (
                            <ActivityIndicator size="large" color="#009281" style={{ marginTop: 20 }} />
                        ) :
                            filteredSickLeaves.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">No sick leaves available for this filter.
                                    Select Correct Branch Name, Date & Tabs</Text>
                            ) : (
                                filteredSickLeaves.map((sickLeave: any) => (
                                    <Pressable key={sickLeave.id} onPress={() => openModal(sickLeave)} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">Sick Leaves ID: {sickLeave.id}</Text>
                                            <AntDesign name="medicinebox" size={24} color="#008080" />
                                        </View>
                                        <Text style={styles.invoiceText}>
                                            <Text style={styles.amount}>{sickLeave.consentFormName}</Text>
                                        </Text>
                                        <Text style={styles.branchText}>Practitioner Name: {sickLeave.practitionerName}</Text>
                                        <Text style={styles.branchText}>Branch: {sickLeave.branchName}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">Date: {new Date(sickLeave.createdDate).toLocaleDateString()}</Text>
                                    </Pressable>
                                ))
                            )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <PdfViewer url={pdfSource.uri} invoiceId={selectedSickLeaves?.id} />
                    {/* <SickLeavesReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        patientId={selectedSickLeaves?.id}
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
