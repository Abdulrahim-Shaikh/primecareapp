import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
  id: any;
  photo: any;
  name: string;
  department: string;
  primaryBranch: string;
  rating: string;
  clinicHours: any;
  consultationFee: string;
};

const DoctorCard = ({
  id,
  photo,
  name,
  department,
  primaryBranch,
  rating,
  clinicHours,
  consultationFee,
}: Props) => {
  return (
    <View className="p-4 border border-amber-900 rounded-2xl w-full mt-4">
      <View className="flex flex-row w-full justify-between items-start">
        <View className="flex flex-row justify-start items-center">
          <View className="bg-amber-100 rounded-lg overflow-hidden mr-3 ">
            {/* <Image source={photo} /> */}
           <Image source={{ uri: photo }} />
          </View>

          <View>
            <Text
              onPress={() => router.push({
                pathname: "/DoctorProfile",
                params: { id : id}
              })}
              className="text-base font-medium"
            >
              {name}
            </Text>
            <Text className="py-2">
              {department} <Entypo name="dot-single" />
              <Text className="text-[12px] text-amber-900">{primaryBranch}</Text>
            </Text>
            <Text className="text-[12px]">
              <Text>
                <AntDesign name="star" color={"#ffab00"} />
              </Text>
              {rating}
              <Text>
                <Entypo name="dot-single" />
              </Text>
              <Text className="text-amber-900">
                <AntDesign name="clockcircle" /> {clinicHours}
              </Text>
            </Text>
          </View>
        </View>

        <View className=" border border-amber-900 p-2 rounded-md ">
          <Ionicons name="heart-outline" size={16} color={"#009281"} />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center pt-3">
        <TouchableOpacity className="bg-emerald-500 text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
          <Text>Book</Text>
        </TouchableOpacity>
        <Text className="w-[32vw] border-b border-dashed mb-4 border-borderColor"></Text>
        <Text className="text-lg font-semibold">${consultationFee}</Text>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({});
