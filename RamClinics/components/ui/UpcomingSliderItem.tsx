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
import React, { useState } from "react";
import arrow from "../../assets/images/arrow.png";
import sliderImgBg from "../../assets/images/doctor_img_bg.png";
import background from "../../assets/images/background.jpg"
import promotionOrderService from "../../domain/services/PromotionOrderService";
import { useUserSate } from "../../domain/state/UserState";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type PromotionService = { serviceName: string; totalAmount: number; };
type Props = { id: number; promotionName: string; description: string; photo: any, promotionServices: PromotionService[] };

const UpcomingSliderItem = ({ id, promotionName, description, photo, promotionServices }: Props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isServicesModalVisible, setIsServicesModalVisible] = useState(false);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  let userId = useUserSate.getState().userId;
  let patientName = useUserSate.getState().patientName;

  const handleBookPress = () => {
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
      amount: 0,
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
    source={background}
    resizeMode="cover"
    style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05}} 
    imageStyle={{ borderRadius: 20 }}>
    <View style={{ flex: 1, position: 'relative' }}>
      <View className="flex flex-row justify-between items-center w-full pt-8">
        <View className="max-w-[230px] pl-5 relative z-10">
          <Text className="text-lg font-semibold">
            {promotionName}
          </Text>
          <Text className="text-base pt-1">{description}</Text>
        </View>
        <TouchableOpacity onPress={handleShowServices} className="px-6 py-2">
              <FontAwesome name="list" size={24} color="#1e1b4b" style={{ marginBottom: 35 }}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        className="bg-lime-500 text-primaryColor border-[1px] border-primaryColor px-4 py-2 rounded-lg"
        style={{ position: 'absolute', right: 15, bottom: 20 }}
          onPress={handleBookPress}
        >
          <Text style={{ color: 'black', }}>Book</Text>
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
        <Modal transparent={true} animationType="slide" visible={isServicesModalVisible} onRequestClose={handleCloseServicesModal}>
        <View className="flex-1 justify-center items-center bg-transparent">
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <Pressable className="absolute top-3 right-3" onPress={handleCloseServicesModal}>
              <AntDesign name="closecircle" size={24} color="#78450f" />
            </Pressable>
            <Text className="text-xl font-bold text-center mb-4 mt-4">List of Services</Text>
            <FlatList
              data={promotionServices}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="flex-row border border-amber-900 rounded-lg mb-4 p-4 bg-white shadow-md">
                  <View className="flex-1">
                    <Text className="text-base font-bold mb-1">{item.serviceName}</Text>
                    <Text className="text-sm" style={{ color: '#04522b', fontWeight: '600' }}>
                      Amount: {item.totalAmount.toFixed(2)} SAR
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
      </View>
    </ImageBackground>

  );
};

export default UpcomingSliderItem;

const styles = StyleSheet.create({});
