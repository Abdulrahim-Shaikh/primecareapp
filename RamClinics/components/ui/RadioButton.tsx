import { StyleSheet, View } from "react-native";
import React from "react";

const RadioButton = ({ isActive }: { isActive: boolean }) => {
  return (
    <View
      className={`border  w-5 h-5 rounded-full justify-center items-center ${
        isActive ? "border-amber-900" : " text-amber-500"
      }`}
    >
      <View
        className={`w-3 h-3 border  rounded-full ${
          isActive
            ? "border-amber-900 bg-amber-900"
            : "border-amber-900"
        } `}
      ></View>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
