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

  return (
    <SafeAreaView className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="justify-start min-h-[85vh] my-8 items-start">
          <Header
            setShowNotification={setShowNotification}
            setShowFavouriteModal={setShowFavouriteModal}
          />
          {/* <SearchSection setShowFilter={setShowFilter} />     */}
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
