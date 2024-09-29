import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import branchService from "../../domain/services/BranchService";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const tabNames = ["Pending", "Invoiced", "Cancelled"];

const MyRadialogy = () => {
    let [branches, setBranches] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [radialogy, setRadialogy] = useState([
        { id: 1, totalAmount: 100, branch: "Branch A", date: new Date('2024-01-01') },
        { id: 2, totalAmount: 200, branch: "Branch B", date: new Date('2024-02-15') },
        { id: 3, totalAmount: 150, branch: "Branch C", date: new Date('2024-03-10') },
    ]);
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

    useEffect(() => {
        branchService.findAll().then((res) => {
            setBranches(res.data);
        }).catch((error) => {
            console.error("Failed to fetch branches:", error);
        });
    }, []);

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
                        {/* <Text className="text-2xl font-semibold">My Prescription</Text> */}
                    </View>

                    <View className="pt-8 flex-row justify-between">
                        <View className="flex-1 mr-2">
                            <Pressable
                                onPress={() => setShowFromPicker(true)}
                                style={{
                                    backgroundColor: '#d3d3d3',
                                    padding: 10,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                }}
                            >
                                <Text className="text-lg">From: {fromDate.toLocaleDateString()}</Text>
                            </Pressable>
                            {showFromPicker && (
                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                                    <DateTimePicker
                                        value={fromDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeFrom}
                                    />
                                </View>
                            )}
                        </View>

                        <View className="flex-1 ml-2">
                            <Pressable
                                onPress={() => setShowToPicker(true)}
                                style={{
                                    backgroundColor: '#d3d3d3',
                                    padding: 10,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                }}
                            >
                                <Text className="text-lg">To: {toDate.toLocaleDateString()}</Text>
                            </Pressable>
                            {showToPicker && (
                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                                    <DateTimePicker
                                        value={toDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeTo}
                                    />
                                </View>
                            )}
                        </View>
                    </View>

                    <View className="pt-4">
                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                style={{
                                    height: 50,
                                    width: '100%',
                                }}
                            >
                                {branches.map((branch: any) => (
                                    <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View className="pt-6 flex flex-row justify-between items-center">
                        {tabNames.map((item: any, idx: any) => (
                            <Pressable
                                key={idx}
                                onPress={() => setActiveTab(item)}
                                className={`flex-1 border-b pb-2 ${activeTab === item ? "border-amber-900" : "border-borderColor"}`}
                            >
                                <Text className={`text-center font-semibold ${activeTab === item ? "text-amber-900" : ""}`}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View>
                        {radialogy.map((radialogys) => (
                            <View key={radialogys.id} className="p-4 border border-amber-900 rounded-2xl w-full mt-4 bg-white">
                                <View className="flex-row justify-between items-center">
                                    <Text className="font-semibold">Radialogy ID: {radialogys.id}</Text>
                                    <AntDesign name="medicinebox" size={24} color="#007BFF" />
                                </View>
                                <Text style={styles.invoiceText}>
                                    Total Amount: <Text style={styles.amount}>${radialogys.totalAmount}</Text>
                                </Text>
                                <Text style={styles.branchText}>Branch: {radialogys.branch}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
        color: '#007BFF',
    },
    branchText: {
        marginTop: 2,
        fontSize: 14,
        color: '#555',
    },
});
