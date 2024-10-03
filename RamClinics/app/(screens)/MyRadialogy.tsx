import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useUserSate } from "../../domain/state/UserState";
import radialogyService from "../../domain/services/RadialogyService";
import RadialogyReport from "./RadialogyReport";
import PdfViewer from "./PDFViewer";
const tabNames = ["Pending", "Invoiced", "Cancelled"];

const MyRadialogy = () => {
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [radialogy, setRadialogy] = useState([]);
    const [filteredRadialogy, setFilteredRadialogy] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRadialogy, setSelectedRadialogy] = useState<any>(null);
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

    const filterRadialogy = () => {
        let filtered = radialogy?.filter((item: any) => item.status === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const orderDate = new Date(item.orderDate);
                const isWithinDateRange = orderDate >= fromDate && orderDate <= toDate
                return item.branchName === selectedValue && isWithinDateRange;
            });
        }
        setFilteredRadialogy(filtered);
    };

    useEffect(() => {
        setLoading(true);
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        }).finally(() => {
            radialogyService.byPatientId(userId).then((res) => { //"PNT000034"
                console.log("Fetched radialogy:", res.data);
                setRadialogy(res.data);
                setFilteredRadialogy(res.data);
            }).catch((error) => {
                console.error("Failed to fetch radialogy:", error);
            }).finally(() => {
                setLoading(false);
            });
        });
    }, []);

    useEffect(() => {
        filterRadialogy();
    }, [fromDate, toDate, selectedValue, activeTab, radialogy]);

    const openModal = async (radialogy: any) => {
        setSelectedRadialogy(radialogy);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/risReport/${radialogy.orderId}`;
        setpdfSource({ uri: pdfUrl, cache: true })
        //  setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", radialogy.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedRadialogy(null);
        setpdfSource({ uri: ``, cache: true })
        //  setPdfUri('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pb-8 px-6 pt-4">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Radialogy" />
                        <MaterialCommunityIcons
                            name="car-brake-temperature"
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
                            filteredRadialogy.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">No radialogy available for this filter.
                                    Select Correct Branch Name, Date & Tabs</Text>
                            ) : (
                                filteredRadialogy.map((radialogys: any) => (
                                    <Pressable key={radialogys.id} onPress={() => openModal(radialogys)} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">Radialogy ID: {radialogys.id}</Text>
                                            <AntDesign name="medicinebox" size={24} color="#008080" />
                                        </View>
                                        <Text style={styles.invoiceText}>
                                            <Text style={styles.amount}>{radialogys.serviceName}</Text>
                                        </Text>
                                        <Text style={styles.invoiceText}>
                                            Total Amount: <Text style={styles.amount}>{radialogys.total}</Text>
                                        </Text>
                                        <Text style={styles.branchText}>Branch: {radialogys.branchName}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">Date: {new Date(radialogys.orderDate).toLocaleDateString()}</Text>
                                    </Pressable>
                                ))
                            )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <PdfViewer url={pdfSource.uri} invoiceId={selectedRadialogy?.orderId} />
                    {/* <RadialogyReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        orderId={selectedRadialogy?.orderId}
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

export default MyRadialogy;

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
