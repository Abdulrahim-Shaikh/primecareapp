import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  img: any;
  name: string;
  department: string;
  medicalName: string;
  rating: string;
  availableTime: string;
  fee: string;
};

const DoctorCard = ({
  img,
  name,
  department,
  medicalName,
  rating,
  availableTime,
  fee,
}: Props) => {
  return (
    <View className="p-4 border border-borderColor rounded-2xl w-full mt-4">
      <View className="flex flex-row w-full justify-between items-start">
        <View className="flex flex-row justify-start items-center">
          <View className="bg-secondaryBg rounded-lg overflow-hidden mr-3 ">
            <Image source={img} />
          </View>

          <View>
            <Text
              onPress={() => router.push("/DoctorProfile")}
              className="text-base font-medium"
            >
              {name}
            </Text>
            <Text className="py-2">
              {department} <Entypo name="dot-single" />
              <Text className="text-[12px] text-bodyText">{medicalName}</Text>
            </Text>
            <Text className="text-[12px]">
              <Text>
                <AntDesign name="star" color={"#ffab00"} />
              </Text>
              {rating}
              <Text>
                <Entypo name="dot-single" />
              </Text>
              <Text className="text-primaryColor">
                <AntDesign name="clockcircle" /> {availableTime}
              </Text>
            </Text>
          </View>
        </View>

        <View className=" border border-primaryColor p-2 rounded-md ">
          <Ionicons name="heart-outline" size={16} color={"#009281"} />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center pt-3">
        <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
          Appoinment
        </Text>
        <Text className="w-[32vw] border-b border-dashed mb-4 border-borderColor"></Text>
        <Text className="text-lg font-semibold">${fee}</Text>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({});
