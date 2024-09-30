import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, Modal, Alert } from "react-native";
import branchService from "../../domain/services/BranchService";
import packageService from "../../domain/services/PackageService";
import { useUserSate } from "../../domain/state/UserState";
import promotionOrderService from "../../domain/services/PromotionOrderService";

const Offers = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    let userId = useUserSate.getState().userId;
    let userName = useUserSate.getState().userName;
    let patientName = useUserSate.getState().patientName;

    useEffect(() => {
        branchService.findAll().then((res) => {
            setBranches(res.data);
            if (res.data.length > 0) {
                setSelectedBranch(res.data[0].name);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        packageService.findAll().then((res) => {
            setOffers(res.data);
            console.log("Packages data", res.data)
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        const filtered = offers.filter((pack: any) => pack.branchName === selectedBranch);
        console.log("Filtered packages:", filtered);
        setFilteredOffers(filtered);
    }, [selectedBranch, offers]);

    const handleBookPress = (item: any) => {
        setSelectedOffer(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setConfirmationMessage("");
    };

    const handleConfirmBooking = () => {
        let orderData = {
            id: null,
            promotionName: selectedOffer.packageName,
            promotionId: selectedOffer.id,
            status: "Pending",
            orderDate: new Date().toISOString(),
            patientId: userId,
            mrno: `SSW00${userId}`,
            mobileNo: "6380515252",
            patientName: patientName,
            nationalityId: "123456",
            note: "Booking note",
            branch: selectedBranch,
            department: selectedOffer.serviceName,
            speciality: selectedOffer.serviceName,
            paymentReference: "121",
            paymentStatus: "Pending",
            amount: selectedOffer.packPrice,
            packageOrder: true,
        };

        promotionOrderService.save(orderData)
            .then((response) => {
                console.log("Booking saved successfully:", response);
                setConfirmationMessage('Your booking has been successful');
                setTimeout(() => {
                    setIsModalVisible(false);
                    setConfirmationMessage("");
                }, 4000);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('An error occurred during the booking process');
            })
    };


    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-between items-center mb-4 mt-8">
                <Text className="text-2xl font-bold">Offers</Text>
                <View className="border border-gray-400 rounded-lg p-1 w-1/2">
                    <Picker
                        selectedValue={selectedBranch}
                        onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                        style={{ height: 40 }}>
                        {branches.map((branch: any) => (
                            <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                        ))}
                    </Picker>
                </View>
            </View>

            {filteredOffers.length > 0 ? (
                <FlatList data={filteredOffers} keyExtractor={(item: any) => item.id.toString()} renderItem={({ item }) => (
                    <View className="flex-row border border-gray-300 rounded-lg mb-4 overflow-hidden">
                        <Image source={{ uri: item.photo[0] || 'https://via.placeholder.com/150' }} className="w-32 h-32"
                            style={{ width: 128, height: 128 }} />
                        <View className="flex-1 p-4">
                            <Text className="text-base font-bold mb-1">{item.packageName}</Text>
                            <Text className="text-sm text-gray-500 mb-4">{item.serviceName}</Text>
                            <Pressable className="bg-amber-900 flex-row items-center justify-center rounded-md py-2 px-4"
                                onPress={() => handleBookPress(item)} style={{ alignSelf: 'flex-start' }}>
                                <FontAwesome name="calendar" size={14} color="white" className="mr-2" />
                                <Text className="text-white font-bold">Book</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                />
            ) : (
                <View className="flex-1 items-center justify-center p-4">
                    <Text className="text-gray-500 text-lg">No available offers for the branch!</Text>
                </View>
            )}

            <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCancel}>
                <View className="flex-1 justify-center items-center bg-transparent">
                    <View className="bg-white p-6 rounded-lg w-11/12">
                        <Pressable className="absolute top-3 right-3" onPress={handleCancel}>
                            <AntDesign name="closecircle" size={24} color="#78450f" />
                        </Pressable>
                        {confirmationMessage ? (
                            <Text className="text-xl font-bold text-center mb-4 mt-7">{confirmationMessage}</Text>
                        ) : (
                            <>
                                <Text className="text-xl font-bold text-center mb-4 mt-7">Do you want to book this service for {(selectedOffer as any)?.packPrice} SAR?</Text>
                                <View className="flex-row justify-between">
                                    <Pressable className="flex-1 bg-red-50 py-2 rounded-lg mr-2" onPress={handleCancel}>
                                        <Text className="text-center text-black font-bold">Cancel</Text>
                                    </Pressable>
                                    <Pressable className="flex-1 bg-amber-900 py-2 rounded-lg ml-2" onPress={handleConfirmBooking}>
                                        <Text className="text-center text-white font-bold">Confirm</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Offers;