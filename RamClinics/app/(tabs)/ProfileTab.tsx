import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import emptyProfileImg from "../../assets/images/avatar.png";
import { router, useFocusEffect } from "expo-router";
import { profileSettings } from "../../constants/data";
import CustomSwitch from "../../components/CustomSwitch";
import { useUserSate } from "../../domain/state/UserState";
import { UserContext } from "../../domain/contexts/UserContext";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const ProfileTab = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const { userData } = useContext(UserContext);
  const [patientName, setPatientName] = useState("");
  // let user = useUserSate.getState().user;
  // let patientName = useUserSate.getState().patientName;
  let loggedIn = useUserSate.getState().loggedIn;
  let setLoggedOut = useUserSate.getState().setLoggedOut;
  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/patient/file/";
  function onPressFunction(name: string, link: string) {
    if (name === "Dark Mode") return;
    if (!loggedIn && (name === "My Invoices" || name == "My Prescription" || name == "Security")) {
      router.push("/SignIn");
    } else {
      router.push(link);
    }

  }

  useFocusEffect(
    useCallback(() => {
      setUser(useUserSate.getState().user)
      setPatientName(useUserSate.getState().patientName)
      console.log("loggedIn ?: ", loggedIn);
      // console.log("userState: ", useUserSate.getState());
    }, [])
  )


  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6 pb-8">
            <HeaderWithBackButton isPushBack={true} title="User Settings" />
            <AntDesign name="user" size={24} color={"rgb(120 53 15)"} />

          </View>
          <View className="bg-amber-900 rounded-[20px] p-6 flex flex-row justify-between items-center">
            <View className="flex-row gap-4">
              {user && user.profileImg && user.profileImg.length > 0 && user.profileImg[0].length > 0 ?
                <Image source={{ uri: `${sourceUrl}${encodeURIComponent(user.profileImg[0])}` }} className="w-16 h-16 rounded-lg" />
                :
                <Image source={emptyProfileImg} className="w-16 h-16 rounded-lg" />
              }
              <View className="">
                <Text className="text-white text-xl font-bold">
                  {user && patientName ? patientName : "Guest"}
                </Text>
                <Text className="text-white text-base pt-2 font-semibold">
                  {user && user.mobile ? user.mobile : "mobile"}
                </Text>
                <Pressable onPress={() => loggedIn ? router.push("/UserProfile") : router.push("/SignIn")}
                  className={`bg-lime-500 mt-4 px-3 border-[1px] border-primaryColor rounded-lg items-center ${loggedIn ? " px-2 py-1" : "p-2"}`}>
                  <Text className={`text-md text-primaryColor ${loggedIn ? "font-medium" : "font-semibold"}`}>
                    {loggedIn ? "View Profile" : "Sign In"}
                  </Text>
                </Pressable>

              </View>
            </View>
            <Pressable
              onPress={() => loggedIn ? router.push("/EditProfile") : router.push("/SignIn")}
              className="bg-white p-3 rounded-full"
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={24}
                color={"rgb(120 53 15)"}
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
                  <View className="bg-lime-500 rounded-full p-3">
                    <Ionicons name={icon as any} size={24} color="white" />
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
            {loggedIn && (
              <Pressable
                onPress={() => setLogoutModal(true)}
                className="flex-row justify-between items-center pt-3"
              >
                <View className="flex-row items-center gap-4">
                  <View className="rounded-full p-3">
                    <Text className="">
                      <MaterialIcons name="logout" size={26} color="rgb(120 53 15)" />
                    </Text>
                  </View>
                  <Text className="text-lg font-semibold text-amber-900">
                    Logout
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>

        <Modal visible={logoutModal} transparent={true}>
          <View
            className="h-full justify-end items-center"
            style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}>
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
                  onPress={() => { setLogoutModal(false); setLoggedOut(); router.push("/(tabs)") }}
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
