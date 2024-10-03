import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Modal, Alert, ActivityIndicator } from "react-native";
import branchService from "../../domain/services/BranchService";
import { useUserSate } from "../../domain/state/UserState";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import promotionService from "../../domain/services/PromotionSerivce";
import emptyOfferImage from "../../assets/images/png-transparent-special-offer-.png";

type Props = {
    id: number;
    photo: any;
    promotionName: string;
    description: string;
};

const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/promotion/file/";

const Offers = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    let userId = useUserSate.getState().userId;
    let patientName = useUserSate.getState().patientName;

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const res = await branchService.findAll();
                setBranches(res.data);
                if (res.data.length > 0) {
                    setSelectedBranch(res.data[0].name);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBranch();
    }, []);

    useEffect(() => {
        const fetchPromotion = async () => {
            setIsLoading(true);
            try {
                const res = await promotionService.getPromotion();
                setPromotions(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPromotion();
    }, []);

    useEffect(() => {
        // if (selectedBranch) {
        const filtered = promotions.filter((promotion: any) => {
            return promotion.promotionBranches.some(
                (branch: any) => branch.branchName === selectedBranch);
        });
        setFilteredPromotions(filtered);
        // } else {
        //     setFilteredPromotions(promotions);
        // }
    }, [selectedBranch, promotions]);

    const handleBookPress = (item: any) => {
        setSelectedPromotion(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setConfirmationMessage("");
    };

    const handleConfirmBooking = () => {
        if (!userId) {
            Alert.alert('Sign In Required', 'You need to be signed in to complete the booking. Please log in and try again.');
            return;
        }

        let orderData = {
            id: null,
            promotionName: selectedPromotion.promotionName,
            promotionId: selectedPromotion.id,
            status: "Pending",
            orderDate: new Date().toISOString(),
            patientId: userId,
            mrno: `SSW00${userId}`,
            mobileNo: "",
            patientName: patientName,
            nationalityId: "",
            note: "Booking note",
            branch: selectedBranch,
            department: "",
            speciality: "",
            paymentReference: "121",
            paymentStatus: "Pending",
            amount: selectedPromotion.servPrice,
            packageOrder: true,
        };

        promotionOrderService.save(orderData)
            .then((response) => {
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
                <View style={pickerStyles.pickerContainer}>
                    <Picker
                        selectedValue={selectedBranch}
                        onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                        style={pickerStyles.picker}>
                        {branches.map((branch: any) => (
                            <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                        ))}
                    </Picker>
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#78450f" />
                </View>
            ) : filteredPromotions.length > 0 ? (
                <FlatList
                    data={filteredPromotions}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => {
                        const photoUrl = (item.photo && Array.isArray(item.photo) && item.photo.length > 0 && item.photo[0])
                            ? { uri: `${sourceUrl}${encodeURIComponent(item.photo[0])}` }
                            : emptyOfferImage;
                        return (
                            <View className="flex-row border border-amber-900 rounded-lg mb-4 overflow-hidden">
                                <Image source={photoUrl} style={{ width: 128, height: 128 }} />
                                <View className="flex-1 p-4">
                                    <Text className="text-base font-bold mb-1">{item.promotionName}</Text>
                                    <Text className="text-sm text-gray-500 mb-4">{item.description}</Text>
                                    <Pressable
                                        className="bg-amber-900 flex-row items-center justify-center rounded-md py-2 px-4"
                                        onPress={() => handleBookPress(item)}
                                        style={{ alignSelf: 'flex-start' }}
                                    >
                                        <FontAwesome name="calendar" size={14} color="white" className="mr-2" />
                                        <Text className="text-white font-bold">Book</Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    }}
                />
            ) : (
                <View className="flex-1 items-center justify-center p-4">
                    <Text className="text-gray-500 text-lg">No available offers for the branch!</Text>
                </View>
            )}

            <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCancel}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <Pressable className="absolute top-3 right-3" onPress={handleCancel}>
                            <AntDesign name="closecircle" size={24} color="#78450f" />
                        </Pressable>
                        {confirmationMessage ? (
                            <Text className="text-xl font-bold text-center mb-4 mt-7">{confirmationMessage}</Text>
                        ) : (
                            <>
                                <Text className="text-xl font-bold text-center mb-4 mt-7">Do you want to book this service?</Text>
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

const pickerStyles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#78450f',
        backgroundColor: '#78450f',
        borderRadius: 8,
        width: '45%',
        height: 45,
        justifyContent: 'center',
    },
    picker: {
        color: '#fff',
        height: 50,
        width: '100%',
    },
});