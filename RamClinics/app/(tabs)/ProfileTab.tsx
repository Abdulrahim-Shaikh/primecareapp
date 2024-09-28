import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/profile-settings-img.png";
import { router } from "expo-router";
import { profileSettings } from "../../constants/data";
import CustomSwitch from "../../components/CustomSwitch";

const ProfileTab = () => {
  const [logoutModal, setLogoutModal] = useState(false);

  function onPressFunction(name: string, link: string) {
    if (name === "Dark Mode") return;

    router.push(link);
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6 pb-8">
            <AntDesign name="user" size={24} color={"#009281"} />
            <Text className="text-2xl font-semibold">User Settings</Text>
          </View>
          <View className="bg-amber-900 rounded-[20px] p-6 flex flex-row justify-between items-center">
            <View className="flex-row gap-4">
              <Image source={profileImg} />
              <View className="">
                <Text className="text-white text-xl font-semibold">
                  Nayeem Raj
                </Text>
                <Text className="text-white text-base pt-2">+0123456789</Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push("/EditProfile")}
              className="bg-white p-3 rounded-full"
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color={"#009281"}
              />
            </Pressable>
          </View>

          <View className="pt-2">
            {profileSettings.map(({ id, icon, name, link }, idx) => (
              <Pressable
                className="flex-row justify-between items-center pt-3"
                key={id}
                onPress={() => onPressFunction(name, link)}
              >
                <View className="flex-row items-center gap-4">
                  <View className="bg-amber-100 rounded-full p-3">
                    <Ionicons name={icon as any} size={24} color="#009281" />
                  </View>
                  <Text className="text-lg font-semibold">{name}</Text>
                </View>
                <View>
                  {name === "Dark Mode" ? (
                    <CustomSwitch />
                  ) : (
                    <Entypo name="chevron-thin-right" size={20} color="black" />
                  )}
                </View>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setLogoutModal(true)}
              className="flex-row justify-between items-center pt-3"
            >
              <View className="flex-row items-center gap-4">
                <View className="bg-[#ffe9d5] rounded-full p-3">
                  <Text className="">
                    <MaterialIcons name="logout" size={20} color="#ff5630" />
                  </Text>
                </View>
                <Text className="text-lg font-semibold text-[#ff5630]">
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <Modal visible={logoutModal} transparent={true}>
          <View
            className="h-full justify-end items-center"
            style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
          >
            <View className="bg-white w-full pt-16 px-6 pb-6 rounded-t-[60px] ">
              <View className="pb-4 border-b border-dashed text-amber-500">
                <Text className="text-[#ff5630] text-2xl text-center font-semibold ">
                  Log Out
                </Text>
              </View>
              <Text className="text-lg pt-4 text-center text-amber-900">
                Are you sure you want to log out?
              </Text>

              <View className="pt-8 flex-row gap-4">
                <Pressable
                  onPress={() => setLogoutModal(false)}
                  className="flex-1"
                >
                  <Text className="text-amber-900 border border-amber-900 rounded-lg py-4 bg-amber-100 text-center font-medium ">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/SignIn")}
                  className="flex-1"
                >
                  <Text className="text-white border border-amber-900 rounded-lg py-4 bg-amber-900 text-center font-medium ">
                    Logout
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({});
