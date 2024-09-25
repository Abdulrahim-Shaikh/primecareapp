import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type PropsTypes = {
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  isPushBack?: boolean;
  isTextWhite?: boolean;
};

const HeaderWithBackButton = ({
  setModal,
  title,
  isPushBack,
  isTextWhite,
}: PropsTypes) => {
  return (
    <View className="flex flex-row justify-start items-center">
      {setModal && (
        <Text
          onPress={() => setModal(false)}
          className="bg-primaryColor rounded-full p-2"
        >
          <Ionicons name="chevron-back" color={"white"} size={20} />
        </Text>
      )}
      {isPushBack && (
        <Pressable
          onPress={() => router.back()}
          className={` rounded-full p-2 justify-center items-center ${
            isTextWhite ? "bg-white text-primaryColor" : "bg-primaryColor"
          }`}
        >
          <Ionicons
            name="chevron-back"
            color={isTextWhite ? "#009281" : "white"}
            size={20}
          />
        </Pressable>
      )}

      {title && (
        <Text
          className={`text-2xl pl-4 font-semibold ${
            isTextWhite && "text-white"
          }`}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default HeaderWithBackButton;

const styles = StyleSheet.create({});
