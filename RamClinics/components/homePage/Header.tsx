import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import emptyProfileImg from "../../assets/images/avatar.png";
import { useUserSate } from "../../domain/state/UserState";
import httpService from "../../domain/services/core/HttpService";

const Header = ({
  setShowNotification,
  setShowFavouriteModal,
}: {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFavouriteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  let user = useUserSate.getState().user;
  let patientName = useUserSate.getState().patientName;
  let loggedIn = useUserSate.getState().loggedIn;
  let branch = useUserSate.getState().branch;
  
  const BASE_URL = "http://16.24.11.104:8080/HISAdmin/api/patient/file/";

  const profilePhotoUrl = user.profileImg && user.profileImg.length>0 && user.profileImg[0].length>0 ? {uri: `${BASE_URL}${encodeURIComponent(user.profileImg[0])}`} : emptyProfileImg;

  // console.log("User Data:", user);
  // console.log("Profile Photo URL:", profilePhotoUrl);

  return (
    <View className="w-full flex flex-row justify-between items-center px-6">
      <View className="flex flex-row justify-start items-center gap-3">
        <View className=" rounded-xl overflow-hidden">
          <Image source={profilePhotoUrl} style={styles.profileImage} />
        </View>
        <View>
          <Text className="text-lg font-semibold">HI, {patientName}</Text>
          <View className=" bg-lime-100 px-3 py-1 rounded-lg mt-2 flex flex-row justify-center">
            <Text className="text-[14px]">{branch}</Text>
            <Text className=" block pl-2 ">
              <Fontisto name="map-marker-alt" size={16} color="rgb(59, 35, 20)" />
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row gap-2">
        <TouchableOpacity
          className="border border-pc-primary rounded-lg p-2 relative"
          onPress={() => setShowNotification(true)}
        >
          <MaterialCommunityIcons name="bell-outline" size={20} />
          <View className="w-[8px] h-[8px] rounded-full bg-[#b91c1c] absolute top-2 right-2"></View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setShowFavouriteModal(true)}
          className="border border-pc-primary rounded-lg p-2"
        >
          <MaterialCommunityIcons name="heart-outline" size={20} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  profileImage: {
    width: 50, 
    height: 50,
  },
});
