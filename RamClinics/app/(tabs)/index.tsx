import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingSlider from "../../components/homePage/UpcomingSlider";
import DoctorSpeciality from "../../components/homePage/DoctorSpeciality";
import TopDoctor from "../(screens)/TopDoctor";
import NotificationModal from "../../components/homePage/modal/NotificationModal";
import FilterModal from "../../components/homePage/modal/FilterModal";
import FavouriteModal from "../../components/homePage/modal/FavouriteModal";
import Header from "../../components/homePage/Header";
import userService from "../../domain/services/UserService";
import SearchSection from "../../components/homePage/SearchSection";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import MainMenu from "../../components/homePage/MainMenu";
import { useUserSate } from "../../domain/state/UserState";
import NASButton from "../../components/NASButton";
import branchService from "../../domain/services/BranchService";
import { useHISSate } from "../../domain/state/HISState";

const Home = () => {

  let loggedIn = useUserSate.getState().loggedIn;
  let userBranch = useUserSate.getState().branch;
  const [branches, setBranchesResp] = useState([]);
  let {setBranches} = useHISSate();
  let {setCurrentBranch} = useHISSate();
  const [showNotification, setShowNotification] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);

  useEffect(() => {
    branchService.findAll().then((res) => {
      let branches = res.data;
      setBranchesResp(branches);
    }).catch((error) => {
      console.error("Failed to fetch branches:", error);
    });
  }, []);

  useEffect(() => {
    if (branches) {
      setBranches(branches);
    }
    if (userBranch) {
      setCurrentBranch(userBranch);
    }
  }, [branches, userBranch]);
  
  return (
    <SafeAreaView className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="justify-start min-h-[85vh] my-8 items-start">
          {loggedIn ?
            <Header
              setShowNotification={setShowNotification}
              setShowFavouriteModal={setShowFavouriteModal}
            />
            :
            <View className="py-4 w-full items-center">
              <View className="flex-row justify-between py-2 px-4 bg-amber-900 rounded-2xl w-4/5 h-[4.5rem]">
                <Text className="text-white pt-5 pl-1">Sign In to get details.. </Text>
                <Pressable className="bg-emerald-500 p-2 my-2 rounded-lg border border-indigo-950" onPress={() => router.push("/SignIn")}>
                  <Text className="text-indigo-950 font-semibold"> Sign In </Text>
                </Pressable>
              </View>
            </View>
          }
          {/* <SearchSection setShowFilter={setShowFilter} />     */}
          <UpcomingSlider />
          <DoctorSpeciality />
          {loggedIn && (<MainMenu />)}
          <TopDoctor />
        </View>

        <NotificationModal
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
        <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} />
        <FavouriteModal
          showFavouriteModal={showFavouriteModal}
          setShowFavouriteModal={setShowFavouriteModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
