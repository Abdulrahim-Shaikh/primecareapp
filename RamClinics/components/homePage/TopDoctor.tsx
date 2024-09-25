import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DoctorCard from "../ui/DoctorCard";
import { router } from "expo-router";
import { topDoctorData } from "../../constants/data";

const TopDoctor = () => {
  return (
    <View className="pt-8 block px-6">
      <View className="flex flex-row justify-between items-center w-full ">
        <Text className=" text-xl font-semibold">Top Doctor</Text>
        <Text
          onPress={() => router.push("/TopDoctor")}
          className=" font-semibold text-primaryColor"
        >
          View All
        </Text>
      </View>
      <View className="">
        {topDoctorData.map(({ ...props }, idx) => (
          <DoctorCard {...props} key={idx} />
        ))}
      </View>
    </View>
  );
};

export default TopDoctor;

const styles = StyleSheet.create({});
