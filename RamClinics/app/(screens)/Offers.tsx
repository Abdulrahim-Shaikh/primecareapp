import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Modal, Alert, ActivityIndicator, ScrollView } from "react-native";
import branchService from "../../domain/services/BranchService";
import { useUserSate } from "../../domain/state/UserState";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import promotionService from "../../domain/services/PromotionSerivce";
import emptyOfferImage from "../../assets/images/png-transparent-special-offer-.png";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

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
    const [signInRequiredModal, setSignInRequiredModal] = useState(false);

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
        const fetchPromotion = async () => {
            setIsLoading(true);
            try {
                const res = await promotionService.getPromotion();
                console.log("Promotions", res.data);
                setPromotions(res.data.filter((promotion: any) => promotion.showOnline));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPromotion();
    }, []);

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
            setSignInRequiredModal(true);
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
                setConfirmationMessage(i18n.t('BookingSuccess'));
                setTimeout(() => {
                    setIsModalVisible(false);
                    setConfirmationMessage("");
                }, 4000);
            })
            .catch((error) => {
                console.error(error);
                setBookingError(true);
                // Alert.alert('An error occurred during the booking process');
            })
    };


    return (
        <SafeAreaView>
            <ScrollView>
                <View className="flex-1 p-6">
                    <View className="flex flex-row justify-start items-center gap-4 pb-8">
                        <HeaderWithBackButton isPushBack={true} title={i18n.t("Offers")} />
                        <MaterialCommunityIcons name="gift-outline" size={24} color={"rgb(59, 35, 20)"} />
                    </View>
                    {isLoading ? (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size="large" color="rgb(132 204 22)" style={{ marginTop: 20 }} />
                        </View>
                    ) : promotions.length > 0 ? (
                        <FlatList
                            data={promotions}
                            keyExtractor={(item: any) => item.id.toString()}
                            renderItem={({ item }) => {
                                const photoUrl = (item.photo && Array.isArray(item.photo) && item.photo.length > 0 && item.photo[0])
                                    ? { uri: `${sourceUrl}${encodeURIComponent(item.photo[0])}` }
                                    : emptyOfferImage;
                                return (
                                    <View className="flex-row border border-pc-primary rounded-lg mb-4 overflow-hidden">
                                        <Image source={photoUrl} style={{ width: 128, height: 128 }} />
                                        <View className="flex-1 p-4">
                                            <Text className="text-base font-bold mb-1">{item.promotionName}</Text>
                                            <Text className="text-sm text-gray-500 mb-4">{item.description}</Text>
                                            <Pressable
                                                className="bg-[rgb(59,35,20)] flex-row items-center justify-center rounded-md py-2 px-4"
                                                onPress={() => handleBookPress(item)}
                                                style={{ alignSelf: 'flex-start' }}
                                            >
                                                <FontAwesome name="calendar" size={14} color="white" className="mr-2" />
                                                <Text className="text-white font-bold">{i18n.t("Book")}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
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
                                {confirmationMessage ? (
                                    <Text className="text-xl font-bold text-center mb-4 mt-7">{confirmationMessage}</Text>
                                ) : (
                                    <>
                                        <Text className="text-xl font-bold text-center mb-4 mt-7">{i18n.t("BookingConfirmMessage")}</Text>
                                        <View className="flex-row justify-between">
                                            <Pressable className="flex-1 bg-red-50 py-2 rounded-lg mr-2" onPress={handleCancel}>
                                                <Text className="text-center text-black font-bold">{i18n.t("Cancel")}</Text>
                                            </Pressable>
                                            <Pressable className="flex-1 bg-[rgb(59,35,20)] py-2 rounded-lg ml-2" onPress={handleConfirmBooking}>
                                                <Text className="text-center text-white font-bold">{i18n.t("Confirm")}</Text>
                                            </Pressable>
                                        </View>
                                    </>
                                )}
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
                    <Modal transparent={true} animationType="fade" visible={signInRequiredModal} onRequestClose={() => setSignInRequiredModal(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View className="bg-white p-6 rounded-lg w-4/5 relative">
                                <View className="flex flex-row justify-center">
                                    <MaterialCommunityIcons
                                        name="information-outline"
                                        size={60}
                                        color={"#737373"}
                                    />
                                </View>
                                <Text className="text-xl font-bold text-center mb-2 mt-1">{i18n.t('SignInRequired')}</Text>
                                <Text className="text-xl font-bold text-center mb-4">{i18n.t('SignInMessage')}</Text>
                                <View className=" flex-row justify-end gap-5 items-center py-4">
                                    <Pressable onPress={() => {
                                        setSignInRequiredModal(false)
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