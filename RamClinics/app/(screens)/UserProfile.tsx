import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/UserIcon.png";
import LinkButton from "../../components/LinkButton";
import { useUserSate } from "../../domain/state/UserState";

const UserProfile = () => {
  const { user,setUser } = useUserSate();
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
          <View className="-mt-16 flex-row justify-center items-start">
            <Image source={profileImg} />
          </View>
          <View className="text-amber-950 justify-center items-center text m-1">
            <Text className="text-blue-500 text-xl font-semibold">{user && user.email ? user.email : "person@ramclinic.com"}</Text>
          </View>
          <View className="bg-amber-900 rounded-t-3xl p-6 ">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className=" text-white">First Name</Text>
                <Text className="text-white font-semibold text-xl">
                {user && user.firstName ? user.firstName : "Unknown"}
                </Text>
              </View>
              <View>
                <Text className="text-base text-white">Last Name</Text>
                <Text className=" text-white font-semibold text-xl">
                {user && user.lastName ? user.lastName : "Person"}
                </Text>
              </View>
              <View>
                <Text className="bg-white p-[10px] rounded-md">
                  <AntDesign name="heart" size={16} color="#009281" />
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-4 pb-8">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="list"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">MRN NO </Text>
                  <View className="bg-amber-500 rounded-md">
                    <Text className="text-white text-md">KHB100105421846</Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Text className="p-2 rounded-md bg-white">
                    <MaterialIcons
                      name="2k-plus"
                      size={16}
                      color="#009281"
                    />
                  </Text>
                  <View>
                    <Text className="text-white text-xs">Nationl Id</Text>
                    <View className="bg-amber-500 rounded-md pl-1">
                      <Text className="text-white text-md">28458625824</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center pb-8">
              <View className="flex-row gap-3">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="motion-photos-auto"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Gender </Text>
                  <View className="bg-amber-500 rounded-md">
                    <Text className="text-white text-md font-semibold">Male</Text>
                  </View>
                </View>
                <View className="flex-row gap-2 ml-16">
                  <Text className="p-2 rounded-md bg-white">
                    <MaterialIcons
                      name="people-outline"
                      size={16}
                      color="#009281"
                    />
                  </Text>
                  <View>
                    <Text className="text-white text-xs">Date Of Birth</Text>
                    <View className="bg-amber-500 rounded-md">
                      <Text className="text-white text-xs font-semibold">05/06/1999</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center pt-4 pb-20">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="flag"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Nationality</Text>
                  <View className="bg-amber-500 rounded-md">
                    <Text className="text-white text-md ">India</Text>
                  </View>
                </View>
                <View className="flex-row gap-2 ml-14 content-end" >
                  <Text className="p-2 rounded-md bg-white">
                    <MaterialIcons
                      name="mobile-friendly"
                      size={16}
                      color="#009281"
                    />
                  </Text>
                  <View>
                    <Text className="text-white text-xs">Mobile Number</Text>
                    <View className="bg-amber-500 rounded-md">
                      <Text className="text-white text-md ">28458625824</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </View>
          <View className="p-6 rounded-t-2xl bg-white -mt-10">
            {/* <View className="flex-row justify-between items-center pt-4 pb-10">
                <View className="flex-row gap-9 bg-amber-400 rounded-md justify-center items-center">
                  <Text className="p-2 rounded-md bg-black">
                    <MaterialIcons
                      name="people-outline"
                      size={25}
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
                
              </View> */}
            {/* <Text className="text-amber-900 py-5">
              Dr. Dianne Johnson is a dedicated gynecologist committed to
              women's health and well-being. With expertise in obstetrics and
              gynecology, she provides compassionate care, emphasizing
              preventive measures and personalized treatment.
            </Text> */}

            <LinkButton link="/Appoinment" text="Make an appoinment" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
