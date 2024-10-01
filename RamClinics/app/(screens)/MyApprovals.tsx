import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import patientService from "../../domain/services/PatientService";
import { useUserSate } from "../../domain/state/UserState";
import invoiceService from "../../domain/services/InvoiceService";
import moment from "moment";

const MyApprovals = () => {

    let user = useUserSate.getState().user;
    let mrno = '';
    const tabNames = ["Pending", "Approved", "Cancelled"];
    const [patient, setPatient] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [branches, setBranches] = useState([]);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [approvals, setApprovals] = useState([]);
    const [filteredApprovals, setFilteredApps] = useState([]);
    const [pendingApps, setPendingApps] = useState([]);
    const [approvedApps, setApprovedApps] = useState([]);
    const [cancelledApps, setCancelledApps] = useState([]);
    const [activeTab, setActiveTab] = useState("Pending");

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

    const setMrNo = () => {
        patient.forEach((patnt: any) => {
            mrno = patnt.mrno;
        })
    }

    useEffect(() => {
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        });

        patientService.getByMobileNo(user.mobile).then((res) => {
            setPatient(res.data);
        }).catch((error) => {
            console.error("Failed to get Patient:", error);
        });
    }, []);

    // const filterApprovals = () => {
    //     let pending = approvals?.filter((item: any) =>{ item.status=="Pending" || item.status=="In Approval"});
    //     setPending(pending);
    //     let approved = approvals?.filter((item: any) => {item.status=="Completed" || item.status=="Auto Approved" || item.status=="CASH"});
    //     setApproved(approved);
    //     let cancelled = approvals?.filter((item: any) => {item.status=="Cancelled"});
    //     setCancelled(cancelled);
    // }

    const search = () => {
        setMrNo();
        console.log("\n\n---------> mrno: ", mrno, "\tfromdate:", fromDate, "\ttoDate:", toDate, "\tbranchID:", selectedValue);
        let fDate = moment(fromDate).format("YYYY-MM-DD");
        let tDate = moment(toDate).format("YYYY-MM-DD");
        console.log('\ndates --->', fDate, tDate);

        invoiceService.invoiceApprovals(selectedValue, fDate, tDate, mrno)
            .then((res) => {
                console.log("\n\nFetching approvals:", res.data);
                setApprovals(res.data);
            })
            .catch((error) => {
                console.error("\n\nFailed to fetch approvals:", error);
            });
    };

    useEffect(() => {
        const pending = approvals.filter((app: any) => (app.status === "Pending" || app.status === "In Approval"));
        setPendingApps(pending);
        console.log(">>>>>>>>pending approvals: ", pending);

        const approved = approvals.filter((app: any) => (app.status === "Completed" || app.status === "Auto Approved" || app.status === "CASH"));
        setApprovedApps(approved);
        console.log(">>>>>>>>approved approvals: ", approved);

        const cancelled = approvals.filter((app: any) => (app.status === "Cancelled"));
        setCancelledApps(cancelled);
        console.log(">>>>>>>>cancelled approvals: ", cancelled);
    }, [approvals]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pb-8 px-6 pt-4">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="My Approvals" />
                        <MaterialCommunityIcons name="receipt" size={24} color={"#009281"} />
                    </View>

                    <View className="flex-row justify-between my-4">
                        <Pressable onPress={() => setShowFromPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-lg mr-2">
                            <Text className="text-lg">From: {moment(fromDate).format("YYYY-MM-DD")}</Text>
                        </Pressable>
                        {showFromPicker && (
                            <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFrom} />
                        )}

                        <Pressable onPress={() => setShowToPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-lg ml-2">
                            <Text className="text-lg">To: {moment(toDate).format("YYYY-MM-DD")}</Text>
                        </Pressable>
                        {showToPicker && (
                            <DateTimePicker value={toDate} mode="date" display="default" onChange={onChangeTo} />
                        )}
                    </View>

                    <View className="border border-indigo-950 rounded-lg mb-4">
                        <Picker
                            selectedValue={selectedValue} onValueChange={(itemValue) => { setSelectedValue(itemValue); }} className="h-12">
                            <Picker.Item label="Select Branch" value="" />
                            {branches.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                            ))}
                        </Picker>
                    </View>

                    <Pressable onPress={() => search()} className="flex-1 bg-emerald-500 p-3 rounded-lg mt-2 mb-4">
                        <Text className="text-lg text-white text-center"> search </Text>
                    </Pressable>

                    <View className="flex-row justify-between mb-4">
                        {tabNames.map((item, idx) => (
                            <Pressable key={idx} onPress={() => setActiveTab(item)} className={`flex-1 border-b-2 pb-2 ${activeTab === item ? "border-amber-900" : "border-transparent"}`}>
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-amber-900" : "text-gray-700"}`}>
                                    {item}
                                </Text>

                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {filteredApprovals.length === 0 ? (
                            <Text className="text-center text-lg text-gray-600 mt-4">No aprrovals available.</Text>
                        ) : (
                            activeTab === "Cancelled" ?
                                cancelledApps.map((apprval: any) => (
                                    <View key={apprval.id} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="font-semibold">Approval ID: {apprval.id}</Text>
                                        </View>
                                        <Text className="mt-1 text-lg text-gray-800">
                                            Status: <Text className="font-bold text-indigo-900">{apprval.approvalStatus}</Text>
                                        </Text>
                                        <Text className="mt-1 text-lg text-gray-800">
                                            Total Amount: <Text className="font-bold text-indigo-900">{apprval.total}</Text>
                                        </Text>
                                        <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-emerald-600">{apprval.status}</Text> &emsp; Invoice Date: {new Date(apprval.invoiceDate).toLocaleDateString()}</Text>
                                        <Text className="mt-1 text-md text-gray-600"></Text>
                                    </View>
                                ))
                                :
                                activeTab === "Approved" ?
                                    approvedApps.map((apprval: any) => (
                                        <View key={apprval.id} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                            <View className="flex-row justify-between items-center">
                                                <Text className="font-semibold">Approval ID: {apprval.id}</Text>
                                            </View>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Status: <Text className="font-bold text-indigo-900">{apprval.approvalStatus}</Text>
                                            </Text>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Total Amount: <Text className="font-bold text-indigo-900">{apprval.total}</Text>
                                            </Text>
                                            <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-emerald-600">{apprval.status}</Text> &emsp; Invoice Date: {new Date(apprval.invoiceDate).toLocaleDateString()}</Text>
                                            <Text className="mt-1 text-md text-gray-600"></Text>
                                        </View>
                                    ))
                                    :
                                    pendingApps.map((apprval: any) => (
                                        <View key={apprval.id} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                            <View className="flex-row justify-between items-center">
                                                <Text className="font-semibold">Approval ID: {apprval.id}</Text>
                                            </View>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Status: <Text className="font-bold text-indigo-900">{apprval.approvalStatus}</Text>
                                            </Text>
                                            <Text className="mt-1 text-lg text-gray-800">
                                                Total Amount: <Text className="font-bold text-indigo-900">{apprval.total}</Text>
                                            </Text>
                                            <Text className="mt-1 text-md text-gray-600"> Invoice Status: <Text className="text-emerald-600">{apprval.status}</Text> &emsp; Invoice Date: {new Date(apprval.invoiceDate).toLocaleDateString()}</Text>
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
});
