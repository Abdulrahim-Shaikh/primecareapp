import { StyleSheet, View } from "react-native";
import React from "react";

const RadioButton = ({ isActive }: { isActive: boolean }) => {
  return (
    <View
      className={`border  w-5 h-5 rounded-full justify-center items-center ${
        isActive ? "border-primaryColor" : " border-borderColor"
      }`}
    >
      <View
        className={`w-3 h-3 border  rounded-full ${
          isActive
            ? "border-primaryColor bg-primaryColor"
            : "border-borderColor "
        } `}
      ></View>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
