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
          <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-2xl">
            <Text className="text-2xl py-1 font-bold text-pc-primary">
              Always Here to Help!
            </Text>
            <Text className="text-lg py-3">
              Your inquiries, suggestions, and complains all are most welcomed.
            </Text>
            {/* <Pressable
              onPress={() => router.push("/FaqPage")}
              className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed text-amber-500"
            >
              <Text className="text-md font-medium">FAQ</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/CustomerServiceStart")}
              className=" flex-row justify-between items-center py-4 border-b border-dashed text-amber-500"
            >
              <Text className="text-base font-medium">Contact Us</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/LegalPolicies")}
              className=" flex-row justify-between items-center pt-4 "
            >
              <Text className="text-base font-medium">Terms & Conditions</Text>
              <Text className="bg-[rgb(59,35,20)] rounded-full p-1 justify-center items-center">
                <Ionicons name="chevron-forward" color={"white"} size={20} />
              </Text>
            </Pressable> */}
          </View>

          <View className="mt-8 p-6 border border-pc-primary bg-[rgb(59,35,20)] rounded-2xl">
            <Text className="text-2xl py-1 font-bold text-lime-400">
              Contact Us
            </Text>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="call" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">920020011</Text>
                </View>
              </View>
            </View>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="call" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">0133334050</Text>
                </View>
              </View>
            </View>
            <View className="border border-white bg-amber-100 rounded-lg p-3 mt-5 mb-3">
              <View className="flex flex-row items-center p-2">
                <Ionicons name="mail" size={24} color="rgb(132 204 22)" />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-pc-primary text-center">ramsupport@ramclinics.com</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-8 p-4 border border-pc-primary rounded-2xl bg-indigo-950">
            <Text className="text-2xl pl-4 py-1 font-bold text-lime-600">
              Timings
            </Text>
            <View className="rounded-lg mt-5 mb-3">
              <View className="flex items-center">
                <View className="rounded-lg bg-indigo-100 mr-1 p-2">
                  <Text className="text-lg font-bold text-indigo-950 text-center">Saturday to Thursday:</Text>
                  <Text className="text-lg font-bold text-indigo-950 text-center">8:00 AM to 10:00 PM</Text>
                </View>
                <View className="rounded-lg bg-indigo-100 ml-1 p-2 mt-4">
                  <Text className="text-lg font-bold text-indigo-950 text-center">Friday:</Text>
                  <Text className="text-lg font-bold text-indigo-950 text-center">4:00 AM to 10:00 PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({});
