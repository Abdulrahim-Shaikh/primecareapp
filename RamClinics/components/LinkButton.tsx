import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

type PropsType = {
  link: string;
  text: string;
};

const LinkButton = ({ link, text }: PropsType) => {
  return (
    <Pressable
      onPress={() => router.push(link)}
      className="  w-full py-4 rounded-lg bg-amber-900 "
    >
      <Text className="text-white text-base  font-medium text-center">
        {text}
      </Text>
    </Pressable>
  );
};

export default LinkButton;

const styles = StyleSheet.create({});
