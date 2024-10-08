import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator, Platform } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import labratoryService from "../../domain/services/LabratoryService";
import { useUserSate } from "../../domain/state/UserState";
import LabratoryReport from "./LabratoryReport";
import WebView from "react-native-webview";
import PdfViewer from "./PDFViewer";
import moment from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useFocusEffect } from "expo-router";

const tabNames = ["Pending", "Cancelled", "Invoiced"];
const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const MyLabrotary = () => {
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);

    const changeLocale = (locale: any) => {
        i18n.locale = locale;
        setLocale(locale);
    }

    useFocusEffect(
        useCallback(() => {
            changeLocale(language)
            changeLanguage(language)
        }, [])
    )
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [labratory, setLabratory] = useState([]);
    const [filteredLabratory, setFilteredLabratory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLabratory, setSelectedLabratory] = useState<any>(null);
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
    //  const [pdfUri, setPdfUri] = useState('');
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

    const [activeTab, setActiveTab] = useState("Pending");
    const { data, status, isLoading } = labratoryService.byPatientIds(userId);

    useEffect(() => {
        console.log('API response', data, status);
        if (data && status === "success") {
            setLabratory(data);
            setFilteredLabratory(data);
        }
    }, [data, status]);

    const filterLabratory = () => {
        let filtered = labratory?.filter((item: any) => item.status === activeTab) || [];
        if (selectedValue) {
            filtered = filtered.filter((item: any) => {
                const orderDate = new Date(item.orderDate);
                const isWithinDateRange = orderDate >= fromDate && orderDate <= toDate
                return item.branch === selectedValue && isWithinDateRange;
            });
        }
        setFilteredLabratory(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const branchesResponse = await branchService.findAll();
            setBranches(branchesResponse.data);
        } catch (error) {
            console.error("Failed to fetch branches:", error);
        }
    };

    useEffect(() => {
        filterLabratory();
    }, [fromDate, toDate, selectedValue, activeTab, labratory]);

    const openModal = async (labratory: any) => {
        setSelectedLabratory(labratory);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/getLabReport/${labratory.orderId}`;
        setpdfSource({ uri: pdfUrl, cache: true })
        //  setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", labratory.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedLabratory(null);
        setpdfSource({ uri: ``, cache: true })
        // setPdfUri('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={Platform.OS === 'ios' ? "px-6" : "py-8 px-6"}>
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("My Labratory")} />
                        <MaterialCommunityIcons
                            name="store-plus-outline"
                            size={24}
                            color={"rgb(59, 35, 20)"}
                        />
                    </View>

                    <View className="flex-row justify-between my-4">
                        <Pressable onPress={() => setShowFromPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg mr-2">
                            <Text className="text-lg">{i18n.t("From")}: {moment(fromDate).format("DD-MMM-YYYY")}</Text>
                        </Pressable>
                        {showFromPicker && (
                            <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
                        )}

                        <Pressable onPress={() => setShowToPicker(true)} className="flex-1 bg-gray-300 p-3 rounded-lg ml-2">
                            <Text className="text-lg">{i18n.t("To")}: {moment(toDate).format("DD-MMM-YYYY")}</Text>
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
                            <Picker.Item label={i18n.t("Select Branch")} value="" />
                            {branches.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                            ))}
                        </Picker>
                    </View>

                    <View className="flex-row justify-between mb-4">
                        {tabNames.map((item, idx) => (
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-lime-600" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-lime-600" : "text-gray-700"}`}>
                                    {i18n.t(item)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        ) :
                            filteredLabratory.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No data available for this filter")}.</Text>
                            ) : (
                                filteredLabratory.map((labratorys: any) => (
                                    <Pressable key={labratorys.id} onPress={() => openModal(labratorys)} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">{i18n.t("Labratory ID")}: {labratorys.id}</Text>
                                            <AntDesign name="medicinebox" size={24} color=" rgb(132 204 22)" />
                                        </View>
                                        <Text style={styles.invoiceText}>
                                            <Text style={styles.amount}>{labratorys.serviceName}</Text>
                                        </Text>
                                        <Text style={styles.invoiceText}>
                                            {i18n.t("Total Amount")}: <Text style={styles.amount}>{labratorys.total}</Text>
                                        </Text>
                                        <Text style={styles.branchText}>{i18n.t("Branch")}: {labratorys.branch}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">{i18n.t("Date")}: {new Date(labratorys.orderDate).toLocaleDateString()}</Text>
                                    </Pressable>
                                ))
                            )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <PdfViewer url={pdfSource.uri} invoiceId={selectedLabratory?.orderId} />
                    {/* <LabratoryReport
                        isVisible={isModalVisible}
                        pdfUri={pdfUri}
                        orderId={selectedLabratory?.orderId}
                        onClose={closeModal}
                    /> */}

                    <Pressable onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>{i18n.t("Close")}</Text>
                    </Pressable>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MyLabrotary;

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
