import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OtpInputField from "../../components/OtpInputField";
import LinkButton from "../../components/LinkButton";

const VerifyOTP = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">Verify OTP</Text>
          <Text className="text-[14px] text-amber-900 text-center pt-3">
            Enter OTP code received to authenticate your identity and complete
            verification
          </Text>
          <View className="w-full pt-8 pb-4 ">
            <OtpInputField disabled={false} />
          </View>

          <View className=" pb-32">
            <Text className="text-base text-amber-900 text-center ">
              Didn’t receive email?{" "}
              <Text
                className=" text-amber-900"
                onPress={() => router.push("/SignUp")}
              >
                Resend
              </Text>
            </Text>
          </View>

          <LinkButton link="/VerifySuccessfully" text="Verify" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
