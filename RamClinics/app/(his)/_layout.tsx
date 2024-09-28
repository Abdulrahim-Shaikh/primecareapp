import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const ScreenLayout = () => {
  return (

      <Tabs initialRouteName="/(tabs)">
        <Tabs.Screen name="home" options={ { headerShown: true, headerTitle: "Home"} } ></Tabs.Screen>

        <Tabs.Screen  name="doctors" options={ { headerShown: true, headerTitle: "Doctors "} }></Tabs.Screen>
      </Tabs>
    
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({});
