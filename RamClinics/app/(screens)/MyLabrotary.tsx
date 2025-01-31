import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator, Platform, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback, useEffect, useState } from "react";
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import labratoryService from "../../domain/services/LabratoryService";
import { useUserSate } from "../../domain/state/UserState";
import PdfViewer from "./PDFViewer";
import moment from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { useBranches } from "../../domain/contexts/BranchesContext";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const MyLabrotary = () => {
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const filterOptions = [
        { id: 1, name: "From Last Month", value: 'lastMonth' },
        { id: 2, name: "All", value: 'all' },
        // { id: 3, name: "6 Months", months: 6 },
    ]
    const [branchesData, setBranchesData] = useState([]);
    const {branches, changeBranches} = useBranches();
    const [selectedValue, setSelectedValue] = useState("");
    const [fromType, setFromType] = useState("lastMonth");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [labratory, setLabratory] = useState([]);
    const [filteredLabratory, setFilteredLabratory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLabratory, setSelectedLabratory] = useState<any>(null);
    const [pdfSource, setpdfSource] = useState({ uri: 'https://pdfobject.com/pdf/sample.pdf', cache: true });
    //  const [pdfUri, setPdfUri] = useState('');
    let userId = useUserSate.getState().userId;
    const { data, status, isLoading } = labratoryService.byPatientIds(userId);

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


    useEffect(() => {
        // console.log('API response', data, status);
        if (data && status === "success") {
            setLabratory(data);
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
            // setFilteredLabratory(data);
        }
    }, [data, status, fromType]);

    const filterLabratory = () => {
        // let filtered = labratory?.filter((item: any) => item.status === activeTab) || [];
        let filtered: any = [];
        filtered = labratory?.filter((item: any) => {
            const orderDate = new Date(item.orderDate);
            const isWithinDateRange = orderDate >= fromDate && orderDate <= toDate
            return isWithinDateRange;
        });
        if (selectedValue) {
            filtered = labratory?.filter((item: any) => item.branch === selectedValue);
        }
        setFilteredLabratory(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (branches == undefined || branches == null || branches.length == 0) {
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
        filterLabratory();
    }, [fromDate, toDate, selectedValue, labratory]);

    const openModal = async (labratory: any) => {
        setSelectedLabratory(labratory);
        if (labratory.status === 'RC' || labratory.status === 'Reported' || labratory.status === 'External Result') {
            const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/report/getLabReport/${labratory.orderId}`;
            setpdfSource({ uri: pdfUrl, cache: true })
            //  setPdfUri(pdfUrl);
            console.log("Opening modal with ID:", labratory.id);
            console.log("PDF URL:", pdfUrl);
            setIsModalVisible(true);
        } else {
            Alert.alert(i18n.t("Not Yet Reported!"));
        }
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

                    {/* <View className="flex-row justify-between my-4">
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
                                        <View className="flex-row justify-between">
                                            <Text className="mt-1 text-md text-gray-600">{i18n.t("Date")}: {moment(labratorys.invoiceDate).format("DD-MMM-YYYY")}</Text>
                                            <Text className="mt-1 text-md text-gray-600">{i18n.t('Status')}: <Text className="text-lime-600">{labratorys.status}</Text></Text>
                                        </View>
                                    </Pressable>
                                ))
                            )}
                    </View>
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={false} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <PdfViewer url={pdfSource.uri} invoiceId={selectedLabratory?.orderId} />

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
