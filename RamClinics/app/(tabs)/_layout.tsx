import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import {
  AntDesign, FontAwesome, MaterialCommunityIcons
} from "@expo/vector-icons";
import { useUserSate } from "../../domain/state/UserState";

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
        className={`p-2 justify-center justify-items-center rounded-lg ${focused ? "bg-lime-500" : "bg-white"}`}
      >
        {iconName === "home" && (
          <>
            <View className="flex flex-col justify-center justify-items-center justif-self-center">
              <Entypo name="home" size={24} color={focused ? "white" : "rgb(120 53 15)"} />
              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-amber-900"}`}>Home</Text> */}
            </View>
          </>
        )}
        {/* {iconName === "message" && (
          <AntDesign
            name="message1"
            size={20}
            color={focused ? "white" : "rgb(120 53 15)"}
          />
        )} */}
        {iconName === "calendar-check-outline" && (
          <>
            <View className="flex flex-col justify-center justify-items-center justif-self-center">
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={24}
                color={focused ? "white" : "rgb(120 53 15)"}
              />
              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-amber-900"}`}>My{"\n"}Appointments</Text> */}
            </View>
          </>
        )}
        {iconName === "book-clock-outline" && (
          <>
            <View className="flex flex-col justify-center justify-items-center justif-self-center">
              <MaterialCommunityIcons
                name="book-clock-outline"
                size={44}
                color={focused ? "white" : "rgb(120 53 15)"}
              />
              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-amber-900"}`}>Book{"\n"}Appointment</Text> */}
            </View>

          </>
        )}
        {iconName === "gift" && (
          <>
            <View className="flex flex-col justify-center justify-items-center justif-self-center">
              <FontAwesome
                name="gift"
                size={24}
                color={focused ? "white" : "rgb(120 53 15)"}
              />

              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-amber-900"}`}>Promotions</Text> */}
            </View>
          </>
        )}
        {iconName === "user" && (
          <>
            <View className="flex flex-col justify-center justify-items-center justif-self-center"><AntDesign
              name="user"
              size={24}
              color={focused ? "white" : "rgb(120 53 15)"}
            />
              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-amber-900"}`}>Profile</Text> */}
            </View>
          </>
        )}
      </Text>
      {/* {focused && (
        <View className="w-2 h-2 rounded-full bg-lime-500 absolute top-[50px] left-[18px] z-50"></View>
      )} */}
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 11,
            color: "white",
            paddingTop: -4,
            paddingBottom: 6,
          },

          tabBarBadgeStyle: {
            alignItems: "center",
            justifyContent: "center",
          },

          tabBarStyle: {
            backgroundColor: "rgb(120 53 15)",
            height: 90,
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

        {/* <Tabs.Screen
          name="Chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="message" focused={focused} />
            ),
          }}
        /> */}

        {/* {
            useUserSate.getState().loggedIn && ( */}
        <Tabs.Screen
          name="MyAppoinment"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="calendar-check-outline" focused={focused} />
            ),
          }}
        />
        {/* )
          } */}

        <Tabs.Screen
          name="BookAppointment"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="book-clock-outline" focused={focused} />
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

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    paddingLeft: 20
  }
});
