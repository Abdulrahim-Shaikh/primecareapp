import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
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

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);

  let data :any[]= [];
  userService.findAll().then((response) => { data= response.data;console.log(response.data)});

  return (
    <SafeAreaView className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="justify-start min-h-[85vh] my-8 items-start">
          <Header
            setShowNotification={setShowNotification}
            setShowFavouriteModal={setShowFavouriteModal}
          />
          {/* <SearchSection setShowFilter={setShowFilter} />     */}
          <View className="p-6 w-full items-center">
            <View className="py-2 px-3 bg-amber-900 rounded-md w-4/5">
              <Text className="text-white" onPress={() => router.push("/SignIn")}>Sign In to get details.. <span className="text-teal-400 font-bold ml-20">  Sign In</span></Text>
            </View>
          </View>
          <UpcomingSlider />
          <DoctorSpeciality />
          <MainMenu />
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
