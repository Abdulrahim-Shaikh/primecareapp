import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CustomSwitch = () => {
  const [isEnabled, setIsEnables] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setIsEnables((prev) => !prev)}
      className="relative w-12"
    >
      <Text
        className={`h-[28px] w-[50px] ${
          isEnabled ? "bg-[rgb(59,35,20)]" : "bg-[#c3c3ce]"
        } rounded-full`}
      ></Text>
      <Text
        className={`absolute top-0.5  h-6 w-6 rounded-full bg-white duration-700 z-10 ${
          isEnabled ? "left-6" : " left-0.5"
        }`}
      ></Text>
    </TouchableOpacity>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({});
