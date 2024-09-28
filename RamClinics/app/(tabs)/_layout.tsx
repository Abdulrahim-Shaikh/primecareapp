import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import {
  AntDesign, FontAwesome, MaterialCommunityIcons
} from "@expo/vector-icons";

const TabIcon = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: string;
}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Text
        className={`p-3 rounded-lg ${focused ? "bg-amber-500" : "bg-white"}`}
      >
        {iconName === "home" && (
          <Entypo name="home" size={20} color={focused ? "white" : "#009281"} />
        )}
        {iconName === "message" && (
          <AntDesign
            name="message1"
            size={20}
            color={focused ? "white" : "#009281"}
          />
        )}
        {iconName === "calendar" && (
          <MaterialCommunityIcons
            name="calendar-check-outline"
            size={20}
            color={focused ? "white" : "#009281"}
          />
        )}
        {iconName === "gift" && (
          <FontAwesome
            name="gift"
            size={20}
            color={focused ? "white" : "#009281"}
          />
        )}
        {iconName === "user" && (
          <AntDesign
            name="user"
            size={20}
            color={focused ? "white" : "#009281"}
          />
        )}
      </Text>
      {focused && (
        <View className="w-2 h-2 rounded-full bg-amber-500 absolute top-[50px] left-[18px] z-50"></View>
      )}
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "#009281",
            height: 80,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="message" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="MyAppoinment"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="calendar" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="Promotions"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="gift" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="ProfileTab"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="user" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
