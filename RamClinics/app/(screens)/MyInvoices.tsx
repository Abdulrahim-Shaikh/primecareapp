import { View, Text, SafeAreaView, ScrollView, Pressable, Modal, StyleSheet, ActivityIndicator, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import invoiceService from "../../domain/services/InvoiceService";
import { useUserSate } from "../../domain/state/UserState";
import PdfViewer from "./PDFViewer";
import moment from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useFocusEffect, useRouter } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { useBranches } from "../../domain/contexts/BranchesContext";

const tabNames = ["Pending", "Invoiced", "Cancelled"];
const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const MyInvoices = () => {
    const { language, changeLanguage } = useLanguage();
    const router = useRouter();
    var serviceDataRender = []

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

    const filterOptions = [
        { id: 1, name: "From Last Month", value: 'lastMonth' },
        { id: 2, name: "All", value: 'all' },
        // { id: 3, name: "6 Months", months: 6 },
    ]
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [branchesData, setBranchesData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromType, setFromType] = useState("lastMonth");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");
    const [modalVisible, setIsModalVisible] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const {branches, changeBranches} = useBranches();
    // const [pdfUri, setPdfUri] = useState('');
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
    let userId = useUserSate.getState().userId;

    const { data, status, isLoading } = invoiceService.invoicesByPatientIds(userId);

    useEffect(() => {
        // console.log('API response', data, status);
        if (data && status === "success") {
            setInvoices(data);
            let today = new Date();
            if (fromType === 'lastMonth') {
                let lastMonth = new Date();
                lastMonth.setMonth(today.getMonth() - 1);
                setFromDate(lastMonth);
            } else if (fromType === 'all') {
                let lastYear = new Date();
                lastYear.setFullYear(today.getFullYear() - 1);
                setFromDate(lastYear);
            }
            // setFilteredInvoices(data);
        }
    }, [data, status, fromType]);

    const filterInvoices = () => {
        let filtered = invoices?.filter((item: any) => item.invoiceStatus === activeTab) || [];
        filtered = filtered.filter((item: any) => {
            const invoiceDate = new Date(item.invoiceDate);
            const isWithinDateRange = invoiceDate >= fromDate && invoiceDate <= toDate;
            return isWithinDateRange;
        });
        if (selectedValue) {
            filtered = filtered.filter((item: any) => item.branch === selectedValue);
        }
        setFilteredInvoices(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (branches == undefined || branches == null || branches.length === 0) {
                const branchesDataResponse = await branchService.findAll();
                setBranchesData(branchesDataResponse.data.filter((branch: any) => branch.showInMobileApp == true));
            } else {
                setBranchesData(branches);
            }
        } catch (error) {
            console.error("Failed to fetch branchesData:", error);
        }
    };

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
                <View className={Platform.OS === 'ios' ? "px-6" : "py-8 px-6"}>
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("My Invoices")} />
                        <MaterialCommunityIcons name="receipt" size={24} color={"rgb(59, 35, 20)"} />
                    </View>

                    {/* {/* <View className="flex-row justify-between my-4">
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
                    </View> */}

                    <View className="rounded-lg mt-4">
                        <View className="p-4 border rounded-lg mb-4">
                            <SelectDropdown
                                data={filterOptions}
                                defaultValue={filterOptions[0]}
                                onSelect={(selectedItem, index) => {
                                    setFromType(selectedItem.value)
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            {selectedItem && (
                                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                            )}
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.name) || 'Select time period'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                dropdownStyle={styles.dropdownMenuStyle}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        {/* <Picker selectedValue={fromType} onValueChange={(itemValue) => { setFromType(itemValue) }} className="h-12">
                            <Picker.Item label={i18n.t("From Last Month")} value="lastMonth" />
                            <Picker.Item label={i18n.t("All")} value="all" />
                        </Picker> */}
                    </View>

                    <View className="p-4 border rounded-lg mb-4">
                        <SelectDropdown
                            data={branchesData}
                            search={true}
                            defaultValue={selectedValue}
                            onSelect={(selectedItem, index) => {
                                setSelectedValue(selectedItem.value);
                                // setFromType(selectedItem.value)
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        {selectedItem && (
                                            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                        )}
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.name) || 'Select Branch'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        <Text>{item.name}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                            showsVerticalScrollIndicator={false}
                        />
                        {/* <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue);
                            }}
                            className="h-12"
                        >
                            <Picker.Item label={i18n.t("Select Branch")} value="" />
                            {branchesData.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                            ))}
                        </Picker> */}
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
                        ) : filteredInvoices.length === 0 ? (
                            <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No data available for this filter")}.</Text>
                        ) : (
                            filteredInvoices.map((invoice: any) => (
                                <Pressable key={invoice.id} onPress={() => openModal(invoice)} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="font-semibold">{i18n.t("Invoice ID")}: {invoice.id}</Text>
                                        <AntDesign name="filetext1" size={24} color=" rgb(132 204 22)" />
                                    </View>
                                    <Text className="mt-2 text-lg text-gray-800">
                                        {i18n.t("Total Amount")}: <Text className="font-bold text-lime-600">{invoice.total}</Text>
                                    </Text>
                                    <Text className="mt-1 text-sm text-gray-600">{i18n.t("Branch")}: {invoice.branch}</Text>
                                    <Text className="mt-1 text-sm text-gray-600">{i18n.t("Date")}: {moment(invoice.invoiceDate).format("DD-MMM-YYYY")}</Text>
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
                        <Text style={styles.closeButtonText}>{i18n.t("Close")}</Text>
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
    dropdownButtonStyle: {
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 25,
    },
    dropdownButtonIconStyle: {},
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
