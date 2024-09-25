import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import videoCallBg from "../../assets/images/video-call-bg-img.png";
import { SafeAreaView } from "react-native-safe-area-context";
import frontCamera from "../../assets/images/front-camera.png";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const VideoCall = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full absolute">
        <Image source={videoCallBg} />
      </View>
      <View className="z-10 justify-between items-center h-full p-6">
        <View className=" justify-end items-end w-full">
          <Image source={frontCamera} style={{ borderRadius: 10 }} />
        </View>
        <View>
          <View className="pb-8">
            <Text className="text-white text-xl font-semibold text-center">
              Dr. Jonny Smith
            </Text>
            <Text className="text-white text-center"> 12:40 mins</Text>
          </View>
          <View className="pb-14 flex-row justify-center items-center gap-4">
            <Pressable
              onPress={() => router.push("/EndChatSession")}
              className="p-5 rounded-full bg-[#B71D18]"
            >
              <MaterialIcons name="call-end" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => router.push("/AudioCall")}
              className="py-5 px-6 rounded-full bg-primaryColor justify-center items-center"
            >
              <FontAwesome name="microphone" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoCall;

const styles = StyleSheet.create({});
