import { Pressable, Text } from "react-native";
import React from "react";

type PropsType = {
  // link: string;
  title: string;
  onPress(): void
};

const NASButton = ({ title , onPress}: PropsType) => {
  return (
    <Pressable onPress={onPress} className="  w-full py-4 rounded-lg bg-[rgb(59,35,20)] ">
      <Text className="text-white text-base font-medium text-center">
        {title}
      </Text>
    </Pressable>
  );
};

export default NASButton;
