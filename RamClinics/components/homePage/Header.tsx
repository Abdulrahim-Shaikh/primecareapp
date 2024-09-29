import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import profileImg from "../../assets/images/homePageProfileImg.png";
import { useUserSate } from "../../domain/state/UserState";

const Header = ({
  setShowNotification,
  setShowFavouriteModal,
}: {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFavouriteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  let setuser = useUserSate.getState().setUser;
  let patientName = useUserSate.getState().patientName;
  let loggedIn = useUserSate.getState().loggedIn;

  return (
    <View className="w-full flex flex-row justify-between items-center px-6">
      <View className="flex flex-row justify-start items-center gap-3">
        <View className=" rounded-xl overflow-hidden">
          <Image source={profileImg} />
        </View>
        <View>
          <Text className="text-lg font-semibold">HI, {patientName}</Text>
          <View className=" bg-amber-300 px-3 py-1 rounded-lg mt-2 flex flex-row">
            <Text className="text-[14px]">New York</Text>
            <Text className=" block pl-2 ">
              <Fontisto name="map-marker-alt" size={16} color="#009281" />
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-2">
        <TouchableOpacity
          className="border border-amber-900 rounded-lg p-2 relative"
          onPress={() => setShowNotification(true)}
        >
          <MaterialCommunityIcons name="bell-outline" size={20} />
          <View className="w-[8px] h-[8px] rounded-full bg-[#b91c1c] absolute top-2 right-2"></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowFavouriteModal(true)}
          className="border border-amber-900 rounded-lg p-2"
        >
          <MaterialCommunityIcons name="heart-outline" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
