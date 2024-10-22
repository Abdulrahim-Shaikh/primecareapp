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
                <FontAwesome name="calendar-plus-o" size={69} color={focused ? "rgb(132 204 22)" : "white"} />
                {/* <Text className={`text-xs text-center ${focused ? " text-white" : "text-pc-primary"}`}>Book{"\n"}Appointment</Text> */}
              </View>
            </View>
          )
          :
          iconName === "book-app" && (
            <>
              <View className="flex flex-col justify-center justify-items-center justif-self-center" >
                <FontAwesome className="text-center" name="calendar-plus-o" size={34} color={focused ? "white" : "rgb(59, 35, 20)"} />
                <Text className={`text-xs text-center pt-1 ${focused ? " text-white" : "text-pc-primary"}`}>{i18n.t("bookAppoint")}</Text>
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
            paddingBottom: Platform.OS === 'ios' ? 6 : 10,
          },

          tabBarBadgeStyle: {
          },

          tabBarStyle: {
            backgroundColor: "rgb(59, 35, 20)",
            height: Platform.OS === 'ios' ? 100 : 90,
            marginTop: Platform.OS === 'ios' ? -35 : 0,
            paddingTop: Platform.OS === 'ios' ? 0 : 12,
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

        {/* { useUserSate.getState().loggedIn && ( */}
        <Tabs.Screen
          name="MyAppoinment"
          options={{
            headerShown: false,
            title: i18n.t('MyAppointmnts'),
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
            title: Platform.OS === 'ios' ? "" : "",
            tabBarIcon: ({ color, focused }) => (
              // <TabIcon iconName="book-app" focused={focused} />
              <View style={[
                Platform.OS === 'ios' ? {
                //aiphone
                width: 90,
                height: 90,
                borderWidth: 3,
                borderRadius:50,
                borderColor: "rgb(59, 35, 20)",
                backgroundColor: focused? "rgb(132, 204, 22)" : "white",
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'black', 
                shadowOffset: { width: 0, height: -5 }, 
                shadowOpacity: 0.15,
                shadowRadius: 3.84, 
                bottom: 4,
                left:2,
                } : {
                //yandroid
                width: 90,
                height: 90,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: "rgb(59, 35, 20)",
                backgroundColor: focused? "rgb(132, 204, 22)" : "white",
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 10,
                }]}>
                {/* <FontAwesome className="text-center pl-0.5 pt-0" name="calendar-plus-o" size={22} color={focused ? "white" : "rgb(59, 35, 20)"} /> */}
                <Text className={`font-extrabold text-3xl pt-2 text-center ${focused ? " text-white" : "text-[rgb(59, 35, 20)]"}`}>{i18n.t('BOOK')}</Text>
                <Text className={`font-bold text-xs pb-2 text-center ${focused ? " text-white" : "text-[rgb(59, 35, 20)]"}`}>{i18n.t('appointment')}</Text>
              </View>
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
    paddingTop: Platform.OS === 'ios' ? 16 : 0,
  },
  iconBgBook: {
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 0,
  },
  iconView: {
    alignItems: 'center',
  },
});
