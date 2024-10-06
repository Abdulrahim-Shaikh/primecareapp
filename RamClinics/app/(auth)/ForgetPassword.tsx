import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";


const ForgetPassword = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">
            Forgot Password
          </Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
            Reset your password securely for uninterrupted access to your
            account.
          </Text>
          <View className="w-full pt-8 pb-32">
            <FormField name="Email" placeholder="Email" />
          </View>

          <LinkButton link="/VerifyOTP" text="Send OTP" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
