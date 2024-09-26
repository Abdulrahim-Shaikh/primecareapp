import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const ScreenLayout = () => {
  return (

      <Tabs >
        <Tabs.Screen name="index" options={ { headerShown: true, headerTitle: "Home"} } ></Tabs.Screen>

        <Tabs.Screen  name="doctors" options={ { headerShown: true, headerTitle: "Doctors "} }></Tabs.Screen>
      </Tabs>
    
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({});
