import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import profileImg from "../../assets/images/done-profile-img.png";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import LinkButton from "../../components/LinkButton";

const BookingConfirm = () => {
  return (
    <SafeAreaView className="bg-secondaryBg h-full">
      <View className=" justify-between items-start h-full">
        <View className="w-full p-6">
          <HeaderWithBackButton isPushBack={true} />

          <View className=" justify-center items-center pt-4">
            <Text className="p-6 rounded-full bg-primaryColor">
              <Feather name="check" size={40} color="white" />
            </Text>
            <Text className="text-2xl font-semibold pt-4">
              Booking Confirmed
            </Text>
            <Text className="text-bodyText pt-3 text-center">
              Dr. Jenny Wilson is a highly skilled cardiologist dedicated to
              providing exceptional cardiac care. With{" "}
            </Text>
          </View>
        </View>

        <View className=" bg-white w-full p-6 rounded-3xl">
          <View
            className="bg-white p-5 rounded-3xl -mt-40 mb-8 "
            style={styles.boxShadow}
          >
            <View className=" justify-between items-center flex-row">
              <Text className="text-bodyText">ID : 656352165</Text>
              <View className="h-8 w-8 rounded-full border border-borderColor justify-center items-center">
                <Text>
                  <AntDesign name="edit" size={16} color="#c3c3ce" />
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center pt-3 pb-8 border-b border-dashed border-borderColor ">
              <View>
                <Image source={profileImg} />
              </View>
              <View className="pl-4">
                <Text className="text-xl font-semibold">Dr. Jenny Wilson</Text>
                <Text className="text-bodyText pt-1">Online</Text>
              </View>
            </View>
            <View className="pt-8 gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-bodyText">Name:</Text>
                <Text className="text-sm font-semibold">Dr. Jenny Wilson</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-bodyText">Time:</Text>
                <Text className="text-sm font-semibold">11.30 Am</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-bodyText">Date:</Text>
                <Text className="text-sm font-semibold">
                  02/02/{new Date().getFullYear()}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-bodyText">Total:</Text>
                <Text className="text-sm font-semibold text-primaryColor">
                  $85
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full">
            <LinkButton link="/Home" text="Done" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookingConfirm;

const styles = StyleSheet.create({
  boxShadow: {
    // shadowColor: "#333333",
    // shadowOffset: {
    //   width: 6,
    //   height: 6,
    // },
    // shadowOpacity: 0.6,
    // shadowRadius: 4,
    elevation: 10,
  },
});
