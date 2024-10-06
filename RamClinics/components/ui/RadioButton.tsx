import { StyleSheet, View } from "react-native";
import React from "react";

const RadioButton = ({ isActive }: { isActive: boolean }) => {
  return (
    <View
      className={`border  w-5 h-5 rounded-full justify-center items-center ${
        isActive ? "border-pc-primary" : " text-amber-500"
      }`}
    >
      <View
        className={`w-3 h-3 border  rounded-full ${
          isActive
            ? "border-pc-primary bg-[rgb(59,35,20)]"
            : "border-pc-primary"
        } `}
      ></View>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
