import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import CustomSwitch from "../../components/CustomSwitch";

const NotificationSettings = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Notification" />
          <View className="mt-8 p-6 border border-primaryColor bg-secondaryBg rounded-xl">
            <Text className="text-base font-semibold text-primaryColor">
              Manage Notification
            </Text>
            <View className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed border-borderColor">
              <Text className="text-base font-medium">Sound</Text>
              <CustomSwitch />
            </View>
            <View className=" flex-row justify-between items-center py-4 border-b border-dashed border-borderColor">
              <Text className="text-base font-medium">Vibrate</Text>
              <CustomSwitch />
            </View>
            <View className=" flex-row justify-between items-center py-4 border-b border-dashed border-borderColor">
              <Text className="text-base font-medium">New tips available</Text>
              <CustomSwitch />
            </View>
            <View className=" flex-row justify-between items-center pt-4 ">
              <Text className="text-base font-medium">
                New service available
              </Text>
              <CustomSwitch />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({});
