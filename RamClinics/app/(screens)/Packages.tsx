import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, Modal, Alert, ActivityIndicator } from "react-native";
import branchService from "../../domain/services/BranchService";
import packageService from "../../domain/services/PackageService";
import QRCode from "react-native-qrcode-svg";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import { useUserSate } from "../../domain/state/UserState";
import emptyOfferImage from "../../assets/images/png-transparent-special-offer-.png";

const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/servicepackage/file/";

const Packages = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<any>();

    const [qrCodeData, setQrCodeData] = useState<any>();
    const [isLoadingQr, setIsLoadingQr] = useState(false);

    let userId = useUserSate.getState().userId;
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
        packageService.getPackages().then((res) => {
            setPackages(res.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        const filtered = packages.filter((pack: any) => {
            return pack.packageBranchs.some(
                (branch: any) => branch.branchName === selectedBranch);
        });
        setFilteredPackages(filtered);
    }, [selectedBranch, packages]);

    const handleBookPress = (item: any) => {
        setSelectedPackage(item);
        setQrCodeData(null);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setQrCodeData(null);
    };

    const handleConfirmBooking = () => {
        if (!userId) {
            Alert.alert('Sign In Required', 'You need to be signed in to complete the booking. Please log in and try again.');
            return;
        }

        setIsLoadingQr(true);
        let orderData = {
            id: null,
            promotionName: selectedPackage.packageName,
            promotionId: selectedPackage.id,
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
            amount: selectedPackage.packPrice,
            packageOrder: true,
        };

        promotionOrderService.save(orderData)
            .then((response) => {
                const orderId = response.data.id;
                return promotionOrderService.getByQRCode(orderId);
            })
            .then((qrCodeResponse) => {
                if (qrCodeResponse.data) {
                    // console.log("QR Code Response", qrCodeResponse);
                    setQrCodeData(qrCodeResponse.data);
                } else {
                    Alert.alert('Failed to fetch QR Code');
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('An error occurred during the booking process');
            })
            .finally(() => {
                setIsLoadingQr(false);
            });
    };

    const getSelectedBranchPrice = (selectedPackage: any) => {
        if (!selectedPackage || !selectedPackage.packageBranchs) return "";
        const branch = selectedPackage.packageBranchs.find((branch: any) => branch.branchName === selectedBranch);
        return branch ? branch.packBranchPrice : selectedPackage.packPrice;
    };

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-between items-center mb-4 mt-8">
                <Text className="text-2xl font-bold">Packages</Text>
                <View className="border border-amber-900 rounded-lg p-1 w-1/2">
                    <Picker
                        selectedValue={selectedBranch} onValueChange={(itemValue) => setSelectedBranch(itemValue)}
                        style={{ height: 40 }}>
                        {branches.map((branch: any) => (
                            <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                        ))}
                    </Picker>
                </View>
            </View>

            {filteredPackages.length > 0 ? (
                <FlatList data={filteredPackages}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => {
                        const photoUrl = (item.photo && Array.isArray(item.photo) && item.photo.length > 0 && item.photo[0])
                            ? { uri: `${sourceUrl}${encodeURIComponent(item.photo[0])}` }
                            : emptyOfferImage;
                        return (
                            <View className="flex-row border border-amber-900 rounded-lg mb-4 overflow-hidden">
                                <Image source={photoUrl} style={{ width: 128, height: 128 }} />
                                <View className="flex-1 p-4">
                                    <Text className="text-base font-bold mb-1">{item.packageName}</Text>
                                    <Text className="text-sm text-gray-500 mb-4">{item.serviceName}</Text>
                                    <Pressable className="bg-amber-900 flex-row items-center justify-center rounded-md py-2 px-4"
                                        onPress={() => handleBookPress(item)} style={{ alignSelf: 'flex-start' }}
                                    >
                                        <FontAwesome name="calendar" size={14} color="white" className="mr-2" />
                                        <Text className="text-white font-bold ">Book</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }}
                />
            ) : (
                <View className="flex-1 items-center justify-center p-4">
                    <Text className="text-gray-500 text-lg">No available packages for the branch!</Text>
                </View>
            )}

            <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCancel}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white p-6 rounded-lg w-4/5 relative">
                        <Pressable className="absolute top-3 right-3" onPress={handleCancel}>
                            <AntDesign name="closecircle" size={24} color="#78450f" />
                        </Pressable>
                        <Text className="text-xl font-bold text-center mb-4 mt-7">
                            {qrCodeData ? `Booking successful! Here is your QR code:` :
                                `Do you want to book this service for ${getSelectedBranchPrice(selectedPackage)} SAR?`}
                        </Text>

                        {isLoadingQr && <ActivityIndicator size="large" color="#78450f" />}

                        {!qrCodeData ? (
                            <View className="flex-row justify-between mt-4">
                                <Pressable className="flex-1 bg-red-50 py-2 rounded-lg mr-2" onPress={handleCancel}>
                                    <Text className="text-center text-black font-bold">Cancel</Text>
                                </Pressable>
                                <Pressable className="flex-1 bg-amber-900 py-2 rounded-lg ml-2" onPress={handleConfirmBooking}>
                                    <Text className="text-center text-white font-bold">Confirm</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <View className="justify-center items-center mt-4">
                                <QRCode value={qrCodeData} size={200} />
                            </View>
                        )
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Packages;