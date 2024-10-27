import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, Modal, ActivityIndicator, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { useUserSate } from "../../domain/state/UserState";
import SickLeavesReport from "./SickLeavesReport";
import vitalSignsService from "../../domain/services/VitalSignsService";
import moment from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useFocusEffect } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";

const tabNames = [
    { label: "In Progress", value: "in-progress" },
    { label: "Finished", value: "finished" },
    { label: "Cancelled", value: "cancelled" }
];
const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const MyVitalSigns = () => {
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

    const filterOptions = [
        { id: 1, name: "From Last Month", value: 'lastMonth' },
        { id: 2, name: "All", value: 'all' },
        // { id: 3, name: "6 Months", months: 6 },
    ]
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromType, setFromType] = useState("lastMonth");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [vitalSigns, setVitalSigns] = useState([]);
    const [filteredVitalSigns, setFilteredVitalSigns] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVitalSigns, setSelectedVitalSigns] = useState<any>(null);
    const [loading, setLoading] = useState(true);
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

    const { data, status, isLoading } = vitalSignsService.vitalSignsByPatientIds(userId);

    useEffect(() => {
        // console.log('API response', data, status);
        if (data && status === "success") {
            setVitalSigns(data);
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
            // setFilteredVitalSigns(data);
        }
    }, [data, status, fromType]);

    const filterVitalSigns = () => {
        let filtered = vitalSigns?.filter((item: any) => item.status === activeTab) || [];
        filtered = filtered.filter((item: any) => {
            const createdDate = new Date(item.createdDate);
            const isWithinDateRange = createdDate >= fromDate && createdDate <= toDate
            return isWithinDateRange;
        });
        if (selectedValue) {
            filtered = filtered.filter((item: any) => item.branchName === selectedValue);
        }
        setFilteredVitalSigns(filtered);
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
        filterVitalSigns();
    }, [fromDate, toDate, selectedValue, activeTab, vitalSigns]);

    const openModal = async (sickLeaves: any) => {
        setSelectedVitalSigns(sickLeaves);
        const pdfUrl = `http://16.24.11.104:8080/HISAdmin/api/patientconsentform/sickLeaveByPatientId/${userId}`;
        setPdfUri(pdfUrl);
        console.log("Opening modal with ID:", sickLeaves.id);
        console.log("PDF URL:", pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedVitalSigns(null);
        setPdfUri('');
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={Platform.OS === 'ios' ? "px-6" : "py-8 px-6"}>
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("My Vital Signs")} />
                        <MaterialCommunityIcons
                            name="emoticon-sick-outline"
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
                    {/* <View className="bg-gray-200 rounded-lg mt-4 mb-3">
                        <Picker selectedValue={fromType} onValueChange={(itemValue) => { setFromType(itemValue) }} className="h-12">
                            <Picker.Item label={i18n.t("From Last Month")} value="lastMonth" />
                            <Picker.Item label={i18n.t("All")} value="all" />
                        </Picker>
                    </View> */}

                    <View className="p-4 border rounded-lg mb-4">
                        <SelectDropdown
                            data={branches}
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
                            {branches.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                            ))}
                        </Picker> */}
                    </View>
                    {/* <View className="border border-gray-300 rounded-lg mb-4">
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
                    </View> */}

                    <View className="flex-row justify-between mb-4">
                        {tabNames.map((item, idx) => (
                            <Pressable key={idx} onPress={() => setActiveTab(item.value)} className={`flex-1 border-b-2 pb-2 ${activeTab === item.value ? "border-lime-600" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item.value ? "text-lime-600" : "text-gray-700"}`}>
                                    {i18n.t(item.label)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        ) :
                            filteredVitalSigns.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No data available for this filter")}.</Text>
                            ) : (
                                filteredVitalSigns.map((vitalsign: any) => (
                                    <Pressable key={vitalsign.id} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">{i18n.t("Vital Sign ID")}: {vitalsign.id}</Text>
                                            <AntDesign name="medicinebox" size={24} color=" rgb(132 204 22)" />
                                        </View>
                                        <Text style={styles.invoiceText}>
                                            <Text style={styles.amount}>{vitalsign.mrno}</Text>
                                        </Text>
                                        <Text style={styles.branchText}>{i18n.t("Practitioner Name")}: {vitalsign.practitionerName}</Text>
                                        <Text style={styles.branchText}>{i18n.t("Branch")}: {vitalsign.branchName}</Text>
                                        <Text className="mt-1 text-sm text-gray-600">{i18n.t("Date")}: {moment(vitalsign.createdDate).format("DD-MMM-YYYY")}</Text>
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
                        patientId={selectedVitalSigns?.id}
                        onClose={closeModal}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MyVitalSigns;

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
