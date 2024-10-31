import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import arrow from "../../assets/images/arrow.png";
import sliderImgBg from "../../assets/images/doctor_img_bg.png";
import background from "../../assets/images/background.jpg";
import emptyOfferImage from "../../assets/images/png-transparent-special-offer-.png";
import promotionOrderService from "../../domain/services/PromotionOrderService";
import { useUserSate } from "../../domain/state/UserState";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";

const i18n =  new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

type PromotionService = { serviceName: string; totalAmount: number; };
type Props = { id: number; promotionName: string; description: string; photo: any, promotionServices: PromotionService[], promotionService: any };

const UpcomingSliderItem = ({ id, promotionName, description, photo, promotionServices, promotionService }: Props) => {

  let userId = useUserSate.getState().userId;
  let patientName = useUserSate.getState().patientName;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isServicesModalVisible, setIsServicesModalVisible] = useState(false);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/promotion/file/";
  const photoUrl = (promotionService.offerImages && Array.isArray(promotionService.offerImages) && promotionService.offerImages.length > 0 && promotionService.offerImages[0])
  ? { uri: `${sourceUrl}${encodeURIComponent(promotionService.offerImages[0])}` } : null;

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

  const handleBookPress = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setConfirmationMessage("");
  };

  const handleConfirmBooking = () => {
    if (!userId) {
      Alert.alert(i18n.t('SignInRequired'), i18n.t('SignInMessage'));
      return;
    }
    const orderData = {
      id: null,
      promotionName: promotionName,
      promotionId: id,
      status: "Pending",
      orderDate: new Date().toISOString(),
      patientId: userId,
      mrno: `SSW00${userId}`,
      mobileNo: "",
      patientName: patientName,
      nationalityId: "",
      note: "Booking note",
      branch: "",
      department: "",
      speciality: "",
      paymentReference: "121",
      paymentStatus: "Pending",
      amount: promotionService.totalAmount,
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
        Alert.alert('An error occurred during the booking process');
      });
  };

  const handleShowServices = () => {
    setIsServicesModalVisible(true);
  };

  const handleCloseServicesModal = () => {
    setIsServicesModalVisible(false);
  };

  return (
    <ImageBackground
    // source={background}
    source={photoUrl ? photoUrl : background}
      resizeMode="cover"
      style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05 }}
      imageStyle={{ borderRadius: 20 }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <View className="flex flex-row justify-between items-center w-full pt-8">
          <View className="max-w-[230px] pl-5 relative z-10">
            <Text className={`text-lg font-semibold ${photoUrl ? ' text-white': ''}`}>{promotionName}</Text>
            {/* <Text className="text-base pt-1">{description}</Text> */}
            <Text className={`text-lg font-semibold ${photoUrl ? ' text-white': ''}`}>{description}</Text>
          </View>
          <TouchableOpacity onPress={handleShowServices} className="px-6 py-2">
            <FontAwesome name="list" size={24} color={`${photoUrl ? "white": "#1e1b4b"}`} style={{ marginBottom: 35 }} />
          </TouchableOpacity> 
        </View>
        <TouchableOpacity
          className="bg-lime-500 text-primaryColor border-[1px] border-primaryColor px-4 py-2 rounded-lg"
          style={{ position: 'absolute', right: 15, bottom: 20 }}
          onPress={handleBookPress}
        >
          <Text style={{ color: 'black', }}>{i18n.t("book")}</Text>
        </TouchableOpacity>
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
        <Modal transparent={true} animationType="slide" visible={isServicesModalVisible} onRequestClose={handleCloseServicesModal}>
          <View className="flex-1 justify-center items-center bg-transparent">
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Pressable className="absolute top-3 right-3" onPress={handleCloseServicesModal}>
                <AntDesign name="closecircle" size={24} color="#78450f" />
              </Pressable>
              {/* <Text className="text-xl font-bold text-center mb-4 mt-4">{i18n.t("ListOfServices")}</Text> */}
              <Text className="text-xl font-bold text-center mb-4 mt-4">{i18n.t("ServiceDetails")}</Text>
              <View style={{ maxHeight: 400 }}>
                {/* <FlatList
                  data={promotionServices}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View className="flex-row border border-pc-primary rounded-lg mb-4 p-4 bg-white shadow-md">
                      <View className="flex-1">
                        <Text className="text-base font-bold mb-1">{item.serviceName}</Text>
                        <Text className="text-sm" style={{ color: '#04522b', fontWeight: '600' }}>
                          {i18n.t("Amount")}: {item.totalAmount.toFixed(2)} SAR
                        </Text>
                      </View>
                    </View>
                  )}
                /> */}
                    <View className="flex-row border border-pc-primary rounded-lg mb-4 p-4 bg-white shadow-md">
                      <View className="flex-1">
                        <Text className="text-base font-bold mb-1">{promotionService.serviceName}</Text>
                        <Text className="text-sm" style={{ color: '#04522b', fontWeight: '600' }}>
                          {i18n.t("Amount")}: {promotionService.totalAmount.toFixed(2)} SAR
                        </Text>
                      </View>
                    </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>

  );
};

export default UpcomingSliderItem;

const styles = StyleSheet.create({});
