import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const HelpSupport = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Help & Support" />
          <View className="mt-8 p-6 border border-primaryColor bg-secondaryBg rounded-xl">
            <Text className="text-base font-semibold text-primaryColor">
              Manage Notification
            </Text>
            <Pressable
              onPress={() => router.push("/FaqPage")}
              className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed border-borderColor"
            >
              <Text className="text-base font-medium">FAQ</Text>
              <Text className="bg-amber-900 rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/CustomerServiceStart")}
              className=" flex-row justify-between items-center py-4 border-b border-dashed border-borderColor"
            >
              <Text className="text-base font-medium">Contact Us</Text>
              <Text className="bg-amber-900 rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/LegalPolicies")}
              className=" flex-row justify-between items-center pt-4 "
            >
              <Text className="text-base font-medium">Terms & Conditions</Text>
              <Text className="bg-amber-900 rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({});
