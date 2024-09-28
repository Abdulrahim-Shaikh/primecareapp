import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import {
    AntDesign,
    Ionicons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/doctor-profile-img.png";
import LinkButton from "../../components/LinkButton";

const DoctorProfile = () => {
  return (
    <View className="bg-amber-100 pt-6">
      <View className="h-full justify-between items-start w-full">
        <View className="flex-row justify-between items-center pt-6 px-6 w-full">
          <Text
            onPress={() => router.back()}
            className="bg-amber-900 rounded-full p-2"
          >
            <Ionicons name="chevron-back" color={"white"} size={20} />
          </Text>
          <Text className="">
            <Octicons name="share-android" size={20} color="black" />
          </Text>
        </View>
        <View className="w-full">
          <View className="-mt-16">
            <Image source={profileImg} />
          </View>
          <View className="bg-amber-900 rounded-t-3xl p-6 -mt-20">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-white font-semibold text-2xl">
                  Dr. Dianne Johnson
                </Text>
                <Text className="pt-1 text-base text-white">Gynecologist</Text>
              </View>
              <View>
                <Text className="bg-white p-[10px] rounded-md">
                  <AntDesign name="heart" size={16} color="#009281" />
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-4 pb-10">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="people-outline"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Patient</Text>
                  <Text className="text-white text-xs font-semibold">520</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="people-outline"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Years experience</Text>
                  <Text className="text-white text-xs font-semibold">10+</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="people-outline"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Reviews</Text>
                  <Text className="text-white text-xs font-semibold">60+</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="p-6 rounded-t-2xl bg-white -mt-10">
            <Text className="text-xl font-semibold">About Doctor</Text>
            <Text className=" text-amber-900 py-5">
              Dr. Dianne Johnson is a dedicated gynecologist committed to
              women's health and well-being. With expertise in obstetrics and
              gynecology, she provides compassionate care, emphasizing
              preventive measures and personalized treatment.
            </Text>

            <LinkButton link="/Appoinment" text="Make an appoinment" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({});