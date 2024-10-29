import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Modal, Alert, ActivityIndicator, ScrollView } from "react-native";
import branchService from "../../domain/services/BranchService";
import packageService from "../../domain/services/PackageService";
import QRCode from "react-native-qrcode-svg";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import { useUserSate } from "../../domain/state/UserState";
import emptyOfferImage from "../../assets/images/png-transparent-special-offer-.png";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

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
    const [isLoading, setIsLoading] = useState(true);
    const [signInRequiredModal, setSignInRequiredModal] = useState(false);
    const [qrFetchError, setQrFetchError] = useState(false);

    const { language, changeLanguage } = useLanguage();
    const [locale, setLocale] = useState(i18n.locale);
    const [bookingError, setBookingError] = useState(false);

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

    let userId = useUserSate.getState().userId;
    let patientName = useUserSate.getState().patientName;

    useEffect(() => {
        const fetchPackages = async () => {
            setIsLoading(true);
            try {
                const res = await packageService.getPackages();
                setPackages(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPackages();
    }, []);

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
            setSignInRequiredModal(true);
            // Alert.alert(i18n.t('SignInRequired'), i18n.t('SignInMessage'));
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
                    setQrFetchError(true);
                }
            })
            .catch((error) => {
                console.error(error);
                setBookingError(true);
            })
            .finally(() => {
                setIsLoadingQr(false);
            });
    };

    const getSelectedBranchPrice = (selectedPackage: any) => {
        if (!selectedPackage || !selectedPackage.packageBranchs) return "";
        const branch = selectedPackage.packageBranchs.find((branch: any) => branch.branchName === selectedBranch);
        const price = branch ? branch.packBranchPrice : selectedPackage.packPrice;
        return price;
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="flex-1 p-6">
                    <View className="flex flex-row justify-start items-center gap-4 pb-8">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("Packages")} />
                        <MaterialCommunityIcons name="tag-heart" size={24} color={"rgb(59, 35, 20)"} />
                    </View>
                    {/* <View className="border border-pc-primary rounded-lg my-4">
                        <Picker
                            selectedValue={selectedBranch} onValueChange={(itemValue) => { setSelectedBranch(itemValue); }} className="h-12">
                            <Picker.Item label={i18n.t("Select Branch")} value="" />
                            {branches.map((branch: any) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.name} />
                            ))}
                        </Picker>
                    </View> */}

                    {isLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        </View>
                    ) : filteredPackages.length > 0 ? (
                        <FlatList data={filteredPackages}
                            keyExtractor={(item: any) => item.id.toString()}
                            renderItem={({ item }) => {
                                const photoUrl = (item.photo && Array.isArray(item.photo) && item.photo.length > 0 && item.photo[0])
                                    ? { uri: `${sourceUrl}${encodeURIComponent(item.photo[0])}` }
                                    : emptyOfferImage;
                                return (
                                    <View className="flex-row border border-pc-primary rounded-lg mb-4 overflow-hidden">
                                        <Image source={photoUrl} style={{ width: 128, height: 128 }} />
                                        <View className="flex-1 p-4">
                                            <Text className="text-base font-bold mb-1">{item.packageName}</Text>
                                            <Text className="text-sm text-gray-500 mb-4">{item.serviceName}</Text>
                                            <Pressable className="bg-[rgb(59,35,20)] flex-row items-center justify-center rounded-md py-2 px-4"
                                                onPress={() => handleBookPress(item)} style={{ alignSelf: 'flex-start' }}
                                            >
                                                <FontAwesome name="calendar" size={14} color="white" className="mr-2" />
                                                <Text className="text-white font-bold">{i18n.t("Book")}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    ) : (
                        <View className="flex-1 items-center justify-center p-4">
                            <Text className="text-gray-500 text-lg">{i18n.t("NoAvailableOffers")}</Text>
                        </View>
                    )}

                    <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCancel}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View className="bg-white p-6 rounded-lg w-4/5 relative">
                                <Pressable className="absolute top-3 right-3" onPress={handleCancel}>
                                    <AntDesign name="closecircle" size={24} color="#78450f" />
                                </Pressable>
                                <Text className="text-xl font-bold text-center mb-4 mt-7">
                                    {qrCodeData ? `${i18n.t("QRCodeSuccessMessage")}`
                                        : `${i18n.t("PackageBookingConfirmMessage")} ${getSelectedBranchPrice(selectedPackage)} SAR`
                                    }
                                </Text>

                                {isLoadingQr && <ActivityIndicator size="large" color="#78450f" />}

                                {!qrCodeData ? (
                                    <View className="flex-row justify-between mt-4">
                                        <Pressable className="flex-1 bg-red-50 py-2 rounded-lg mr-2" onPress={handleCancel}>
                                            <Text className="text-center text-black font-bold">{i18n.t("Cancel")}</Text>
                                        </Pressable>
                                        <Pressable className="flex-1 bg-[rgb(59,35,20)] py-2 rounded-lg ml-2" onPress={handleConfirmBooking}>
                                            <Text className="text-center text-white font-bold">{i18n.t("Confirm")}</Text>
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
                    <Modal transparent={true} animationType="fade" visible={signInRequiredModal} onRequestClose={() => setSignInRequiredModal(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View className="bg-white p-6 rounded-lg w-4/5 relative">
                                <View className="flex flex-row justify-center">
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={60}
                                        color={"#EF4444"}
                                    />
                                </View>
                                <Text className="text-xl font-bold text-center mb-2 mt-1">{i18n.t('SignInRequired')}</Text>
                                <Text className="text-xl font-bold text-center mb-4">{i18n.t('SignInMessage')}</Text>
                                <View className=" flex-row justify-between gap-5 items-center py-4">
                                    <Pressable onPress={() => {
                                        setSignInRequiredModal(false)
                                    }} >
                                        <Text> Back </Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        setSignInRequiredModal(false)
                                    }}>
                                        <Text> Sign in </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal transparent={true} animationType="fade" visible={qrFetchError} onRequestClose={() => setQrFetchError(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View className="bg-white p-6 rounded-lg w-4/5 relative">
                                <View className="flex flex-row justify-center">
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={60}
                                        color={"#EF4444"}
                                    />
                                </View>
                                <Text className="text-xl font-bold text-center mb-2 pt-3">Failed to fetch QR Code</Text>
                                <View className=" flex-row justify-end gap-5 items-center py-4">
                                    <Pressable onPress={() => {
                                        setQrFetchError(false)
                                    }}>
                                        <Text> Ok </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal transparent={true} animationType="fade" visible={bookingError} onRequestClose={() => setBookingError(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View className="bg-white p-6 rounded-lg w-4/5 relative">
                                <View className="flex flex-row justify-center">
                                    <MaterialCommunityIcons
                                        name="close-circle-outline"
                                        size={60}
                                        color={"#EF4444"}
                                    />
                                </View>
                                <Text className="text-xl font-bold text-center mb-2 mt-7">An error occurred during the booking process</Text>
                                <View className=" flex-row justify-end gap-5 items-center py-4">
                                    <Pressable onPress={() => {
                                        setBookingError(false)
                                    }} >
                                        <Text> Ok </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default Packages;

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