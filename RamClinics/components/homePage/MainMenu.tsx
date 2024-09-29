import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MainMenu = () => {

  const menuItems = [
    {
      icon: "calendar-number-outline",
      title: "My Appoinments",
      link: "/MyAppoinment",
    },
    {
      icon: "people-outline",
      title: "Family Members",
      link: "",
    },
    {
      icon: "shield-checkmark-outline",
      title: "My Approvals",
      link: "/MyApprovals",
    },
    {
      icon: "receipt-outline",
      title: "My Invoices",
      link: "/MyInvoices",
    },
    {
      icon: "document-text-outline",
      title: "My Prescriptions",
      link: "/MyPrescription",
    },
    {
      icon: "flask-outline",
      title: "Labrotary",
      link: "/MyLabrotary",
    },
    {
      icon: "radio-outline",
      title: "Radiology",
      link: "/MyRadialogy",
    },
    {
      icon: "pricetag-outline",
      title: "Promotions",
      link: "",
    },
    {
      icon: "bandage-outline",
      title: "My Sick Leaves",
      link: "/MySickLeaves",
    },
    {
      icon: "accessibility-outline",
      title: "My Vital Signs",
      link: "",
    },
    {
      icon: "wallet-outline",
      title: "My Wallet",
      link: "/Wallets",
    },
  ];

  return (
    <View className="pt-8 w-full">
      <View className="flex flex-row justify-between px-6">
        <Text className=" text-xl font-semibold">Main Menu</Text>
      </View>
      <View className="flex-row pt-5 px-4">
        <FlatList
          data={menuItems}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal:"auto"}}
          renderItem={({ item }) => (
            <View className="flex flex-row p-1 m-1 w-32 h-32">
              <Pressable className="border border-amber-900 p-2 rounded-lg w-full" onPress={() => router.navigate(item.link)}>
                <View className="py-2 items-center">
                  <Ionicons name={item.icon as any} size={36} color={"maroon"} />
                </View>
                <Text className="text-sm font-semibold text-center text-amber-900 pt-3 pb-2">{item.title}</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({});
