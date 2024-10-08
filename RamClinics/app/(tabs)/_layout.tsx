import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Tabs, useFocusEffect } from "expo-router";
import {
  AntDesign, FontAwesome
} from "@expo/vector-icons";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

type TabIconProbs = {
  focused: boolean;
  iconName: string;
}
const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const TabIcon = ({ focused, iconName, }: TabIconProbs) => {

  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )
  return (
    <View className="flex items-center justify-center gap-2">
      <Text className={`p-2 justify-center justify-items-center rounded-lg ${focused ? "bg-lime-500" : "bg-white"}`} style={Platform.OS === 'ios' && styles.viewText} >
        {iconName === "home" && (
          <View style={styles.iconBg}>
            <View className="flex flex-col justify-center justify-items-center justif-self-center" style={styles.iconView}>
              <FontAwesome name="home" size={30} color={Platform.OS === 'ios' ? (focused ? "rgb(132 204 22)" : "white") : (focused ? "white" : "rgb(59, 35, 20)")} />
            </View>
          </View>
        )}
        {/* {iconName === "message" && (
          <AntDesign
            name="message1"
            size={20}
            color={focused ? "white" : "rgb(59, 35, 20)"}
          />
        )} */}
        {iconName === "calendar-check-outline" && (
          <View style={styles.iconBg}>
            <View className="flex flex-col justify-center justify-items-center justif-self-center" style={styles.iconView}>
              {/* <MaterialCommunityIcons name="calendar-check-outline" size={Platform.OS === 'ios' ? 32 : 28} color={focused ? "white" : "rgb(59, 35, 20)"} /> */}
              <FontAwesome name="calendar-check-o" size={30} color={Platform.OS === 'ios' ? (focused ? "rgb(132 204 22)" : "white") : (focused ? "white" : "rgb(59, 35, 20)")} />
              {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-pc-primary"}`}>My{"\n"}Appointments</Text> */}
            </View>
          </View>
        )}
        {Platform.OS === 'ios' ?
          iconName === "book-app" && (
            <View style={styles.iconBgBook}>
              <View className="flex flex-col justify-center justify-items-center justif-self-center" style={styles.iconView}>
                <FontAwesome name="calendar-plus-o" size={60} color={focused ? "rgb(132 204 22)" : "white"} />
                {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-pc-primary"}`}>Book{"\n"}Appointment</Text> */}
              </View>
            </View>
          )
          :
          iconName === "book-app" && (
            <>
              <View className="flex flex-col justify-center justify-items-center justif-self-center" >
                <FontAwesome className="text-center" name="calendar-plus-o" size={34} color={focused ? "white" : "rgb(59, 35, 20)"} />
                <Text className={`text-xs text-center pt-1 ${focused ? " text-white" : "text-pc-primary"}`}>Book{"\n"}Appointment</Text>
              </View>
            </>
          )
        }
        {iconName === "gift" && (
          <View style={styles.iconBg}>
            <View className="flex flex-col justify-center justify-items-center justif-self-center" style={styles.iconView}>
              <FontAwesome name="gift" size={30} color={Platform.OS === 'ios' ? (focused ? "rgb(132 204 22)" : "white") : (focused ? "white" : "rgb(59, 35, 20)")} />
            </View>
          </View>
        )}
        {iconName === "user" && (
          <View style={styles.iconBg}>
            <View className="flex flex-col justify-center justify-items-center justif-self-center" style={styles.iconView}>
              <AntDesign name="user" size={30} color={Platform.OS === 'ios' ? (focused ? "rgb(132 204 22)" : "white") : (focused ? "white" : "rgb(59, 35, 20)")} />
            </View>
          </View>
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
            paddingBottom: Platform.OS === 'ios' ? 0 : 8,
          },

          tabBarBadgeStyle: {
          },

          tabBarStyle: {
            backgroundColor: "rgb(59, 35, 20)",
            height: Platform.OS === 'ios' ? 124 : 110,
            marginTop: Platform.OS === 'ios' ? -35 : 0,
            borderTopEndRadius: Platform.OS === 'ios' ? 0 : 15,
            borderTopLeftRadius: Platform.OS === 'ios' ? 0 : 15,
            borderTopWidth: 0,

          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: i18n.t('Home'),
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
            title: i18n.t('MyAppoinment'),
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
            title: Platform.OS === 'ios' ? i18n.t("BookAppoint") : "",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="book-app" focused={focused} />
            ),
          }}
        />


        <Tabs.Screen
          name="Promotions"
          options={{
            headerShown: false,
            title: i18n.t("Promotions"),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName="gift" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="ProfileTab"
          options={{
            headerShown: false,
            title: i18n.t("Profile"),
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
  viewText: {
    padding: 0,
    backgroundColor: Platform.OS === 'ios' ? 'rgb(59, 35, 20)' : '',
  },
  iconBg: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
  },
  iconBgBook: {
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: -2
  },
  iconView: {
    alignItems: 'center',
  },
});
