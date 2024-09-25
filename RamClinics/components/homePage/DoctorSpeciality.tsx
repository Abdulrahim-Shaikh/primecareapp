import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { doctorSpecialityData } from "../../constants/data";

const DoctorSpeciality = () => {
  return (
    <View className="pt-8">
      <View className="flex flex-row justify-between items-center w-full px-6">
        <Text className=" text-xl font-semibold">Doctor Speciality</Text>
        <Text
          onPress={() => router.push("/DoctorSpecialityPage")}
          className=" font-semibold text-primaryColor"
        >
          View All
        </Text>
      </View>

      <View className="h-[90px] pt-5">
        <FlatList
          horizontal
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
          data={doctorSpecialityData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <View className="">
              <Pressable className="flex flex-row border border-borderColor p-2 rounded-lg">
                <Text className=" bg-primaryColor rounded-md p-3 flex justify-center items-center">
                  <Ionicons name={item.icon as any} size={24} color={"white"} />
                </Text>
                <View className="px-3">
                  <Text className="font-semibold">{item.title} </Text>
                  <View>
                    <Text className="font-bodyText pt-1">
                      {item.totalDoctors} doctors{" "}
                      <AntDesign name="arrowright" />
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({});
