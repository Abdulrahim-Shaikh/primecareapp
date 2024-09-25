import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/session-end-img.png";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import bgGradient from "../../assets/images/audip_call_gradient.png";
import { router } from "expo-router";

const AudioCall = () => {
  return (
    <SafeAreaView>
      <View className="h-full justify-between items-center">
        <Image
          source={bgGradient}
          style={{ width: "100%", height: "100%" }}
          className="absolute inset-0"
        />
        <View className="py-8 justify-center items-center z-10">
          <View>
            <Image source={profileImg} />
          </View>
          <Text className="text-xl font-semibold pt-5">Dr. Dianne Johnson</Text>
          <Text className="pt-2">Ringing...</Text>
        </View>

        <View className="pb-14 flex-row justify-center items-center gap-4">
          <Pressable
            onPress={() => router.push("/EndChatSession")}
            className="p-5 rounded-full bg-[#B71D18]"
          >
            <MaterialIcons name="call-end" size={24} color="white" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/VideoCall")}
            className="p-5 rounded-full bg-primaryColor"
          >
            <Feather name="video" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AudioCall;

const styles = StyleSheet.create({});
