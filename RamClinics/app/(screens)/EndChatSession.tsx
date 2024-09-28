import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import profileImg from "../../assets/images/session-end-img.png";
import { router } from "expo-router";

const EndChatSession = () => {
  return (
    <SafeAreaView className="p-6">
      <View className=" justify-center items-center pt-12 pb-8 border-b border-dashed border-borderColor">
        <View className="p-6 rounded-full bg-amber-900 justify-center items-center">
          <AntDesign name="clockcircle" size={24} color="white" />
        </View>
        <Text className="text-2xl font-semibold text-amber-900 pt-6 ">
          20:00 min
        </Text>
        <Text className="font-semibold text-base pt-4">
          The consultation session has ended.
        </Text>
        <Text className="text-amber-900">
          Recording have been saved in history
        </Text>
      </View>
      <View className="py-8 justify-center items-center">
        <View>
          <Image source={profileImg} />
        </View>
        <Text className="text-xl font-semibold pt-5">Dr. Dianne Johnson</Text>
        <Text className="pt-2">Cardiologist</Text>
        <Text className="pt-1 text-amber-900 text-xs">
          Cefixime New Hospital
        </Text>
      </View>

      <View className=" flex-row justify-between items-center gap-4">
        <Pressable onPress={() => router.push("/Home")} className="flex-1 ">
          <Text
            className={`text-center  py-3 px-4 rounded-lg border border-amber-900 text-base font-medium text-amber-900`}
          >
            Back to Home
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 "
          onPress={() => router.push("/WriteReview")}
        >
          <Text
            className={`text-center  py-3 px-4 rounded-lg border border-amber-900 text-base font-medium bg-amber-900 text-white`}
          >
            Leave a Review
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EndChatSession;

const styles = StyleSheet.create({});
