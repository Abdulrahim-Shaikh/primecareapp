import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable, ActivityIndicator, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import patientService from "../../domain/services/PatientService";
import { useUserSate } from "../../domain/state/UserState";
import invoiceService from "../../domain/services/InvoiceService";
import moment from "moment";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { useBranches } from "../../domain/contexts/BranchesContext";

const i18n =  new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const MyApprovals = () => {

    let user = useUserSate.getState().user;
    let mrno = '';
    const tabNames = ["Pending", "Approved", "Cancelled"];
    const [patient, setPatient] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [fromType, setFromType] = useState("lastMonth");
    const [toDate, setToDate] = useState(new Date());
    const [branchesData, setBranchesData] = useState([]);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [approvals, setApprovals] = useState([]);
    const [pendingApps, setPendingApps] = useState([]);
    const [approvedApps, setApprovedApps] = useState([]);
    const [cancelledApps, setCancelledApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Pending");
    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const {branches, changeBranches} = useBranches();

    const filterOptions = [
        { id: 1, name: "From Last Month", value: 'lastMonth' },
        { id: 2, name: "All", value: 'all' },
        // { id: 3, name: "6 Months", months: 6 },
    ]
	
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

    const onChangeFrom = (event: DateTimePickerEvent, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowFromPicker(false);
        setFromDate(currentDate);
    };

    const onChangeTo = (event: DateTimePickerEvent, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowToPicker(false);
        setToDate(currentDate);
    };

    useEffect(() => {
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
    }, [fromType]);

    const setMrNo = () => {
        patient.forEach((patnt: any) => {
            mrno = patnt.mrno;
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (branches == undefined || branches == null  || branches.length === 0) {
                const branchesDataResponse = await branchService.findAll();
                setBranchesData(branchesDataResponse.data);
            } else {
                setBranchesData(branches);
            }
        } catch (error) {
            console.error("Failed to fetch branchesData:", error);
        }

        try {
            const patientRes = await patientService.getByMobileNo(user.mobile);
            // console.log("Fetched approvals:", patientRes.data);
            setPatient(patientRes.data);
        } catch (error) {
            console.error("Failed to fetch patient:", error);
        } finally {
            setLoading(false);
        }
    };

    const search = () => {
        setMrNo();
        let fDate = moment(fromDate).format("YYYY-MM-DD");
        let tDate = moment(toDate).format("YYYY-MM-DD");
        setLoading(true);
        invoiceService.invoiceApprovals(selectedValue, fDate, tDate, mrno)
            .then((res) => {
                setApprovals(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("\n\nFailed to fetch approvals:", error);

            });
    };

    useEffect(() => {
        const pending = approvals.filter((app: any) => (app.approvalStatus === "Pending" || app.approvalStatus === "In Approval"));
        setPendingApps(pending);
        const approved = approvals.filter((app: any) => (app.approvalStatus === "Completed" || app.approvalStatus === "Auto Approved" || app.approvalStatus === "CASH"));
        setApprovedApps(approved);
        const cancelled = approvals.filter((app: any) => (app.approvalStatus === "Cancelled"));
        setCancelledApps(cancelled);
    }, [approvals]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={ Platform.OS === 'ios' ? "px-6" : "py-8 px-6"}>
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("My Approvals")} />
                        <MaterialCommunityIcons name="receipt" size={24} color={"rgb(59, 35, 20)"} />
                    </View>

                    {/* <View className="flex-row justify-between my-4">
                        <Pressable onPress={() => setShowFromPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-lg mr-2">
                            <Text className="text-lg">{i18n.t("From: ")}{moment(fromDate).format("DD-MMM-YYYY")}</Text>
                        </Pressable>
                        {showFromPicker && (
                            <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
                        )}

                        <Pressable onPress={() => setShowToPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-lg ml-2">
                            <Text className="text-lg">{i18n.t("To: ")}{moment(toDate).format("DD-MMM-YYYY")}</Text>
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
                            selectedValue={selectedValue} onValueChange={(itemValue) => { setSelectedValue(itemValue); }} className="h-12">
                            <Picker.Item label={i18n.t("Select Branch")} value="" />
                            {branchesData.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                            ))}
                        </Picker> */}
                    </View>

                    <Pressable onPress={() => search()} className="flex-1 bg-[rgb(59,35,20)] p-3 rounded-lg mb-6">
                        <Text className="text-lg text-white text-center"> {i18n.t("search")} </Text>
                    </Pressable>

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
                        {loading ? (
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        ) :
                            approvals.length === 0 ? (
                                <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("Noapps")}</Text>
                            ) : (
                                activeTab === "Cancelled" ?
                                    cancelledApps.map((apprval: any) => (
                                        <View key={apprval.id} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                            <View className="flex-row justify-between items-center">
                                                <Text className="font-semibold">{i18n.t("Approval ID:")} {apprval.id}</Text>
                                            </View>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Status: <Text className="font-bold text-lime-600">{apprval.approvalStatus}</Text>
                                            </Text>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Total Amount: <Text className="font-bold text-lime-600">{apprval.total}</Text>
                                            </Text>
                                            <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-lime-600">{apprval.status}</Text> &emsp; Invoice Date: {moment(apprval.invoiceDate).format("DD-MMM-YYYY")}</Text>
                                            <Text className="mt-1 text-md text-gray-600"></Text>
                                        </View>
                                    ))
                                    :
                                    activeTab === "Approved" ?
                                        approvedApps.map((apprval: any) => (
                                            <View key={apprval.id} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                                <View className="flex-row justify-between items-center">
                                                    <Text className="font-semibold">Approval ID: {apprval.id}</Text>
                                                </View>
                                                <Text className="mt-1 text-lg text-gray-800">
                                                    Status: <Text className="font-bold text-lime-600">{apprval.approvalStatus}</Text>
                                                </Text>
                                                <Text className="mt-1 text-lg text-gray-800">
                                                    Total Amount: <Text className="font-bold text-lime-600">{apprval.total}</Text>
                                                </Text>
                                                <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-lime-600">{apprval.status}</Text> &emsp; Invoice Date: {moment(apprval.invoiceDate).format("DD-MMM-YYYY")}</Text>
                                                <Text className="mt-1 text-md text-gray-600"></Text>
                                            </View>
                                        ))
                                        :
                                        pendingApps.map((apprval: any) => (
                                            <View key={apprval.id} className="p-4 border border-pc-primary rounded-2xl w-full mt-4 bg-white">
                                                <View className="flex-row justify-between items-center">
                                                    <Text className="font-semibold">Approval ID: {apprval.id}</Text>
                                                </View>
                                                <Text className="mt-1 text-lg text-gray-800">
                                                    Status: <Text className="font-bold text-lime-600">{apprval.approvalStatus}</Text>
                                                </Text>
                                                <Text className="mt-1 text-lg text-gray-800">
                                                    Total Amount: <Text className="font-bold text-lime-600">{apprval.total}</Text>
                                                </Text>
                                                <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-lime-600">{apprval.status}</Text> &emsp; Invoice Date: {moment(apprval.invoiceDate).format("DD-MMM-YYYY")}</Text>
                                                <Text className="mt-1 text-md text-gray-600"></Text>
                                            </View>
                                        ))
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default MyApprovals;

const styles = StyleSheet.create({
    invoiceText: {
        marginTop: 4,
        fontSize: 16,
        color: '#333',
    },
    amount: {
        fontWeight: 'bold',
        color: '#007BFF',
    },
    branchText: {
        marginTop: 2,
        fontSize: 14,
        color: '#555',
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
