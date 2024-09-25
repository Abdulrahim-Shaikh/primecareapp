import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import fb from "../../assets/images/fb.png";
import google from "../../assets/images/google.png";
import apple from "../../assets/images/apple.png";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";

const SingUp = () => {
  const [checked, setChecked] = useState(false);
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">
            Create an Account
          </Text>
          <Text className="text-[14px] text-bodyText text-center pt-3">
            Sign up today for personalized health insights and exclusive member
            perks!
          </Text>
          <View className="w-full pt-8">
            <FormField name="Email" placeholder="Email" />
            <FormField
              name="Password"
              placeholder="*******"
              otherStyle="mt-4"
            />
            <FormField
              name="Confirm Password"
              placeholder="*******"
              otherStyle="mt-4"
            />
          </View>

          <View className="text-primaryColor flex justify-start flex-row items-center w-full pt-2 pb-7">
            {/* <CheckBox
              onClick={() => setChecked((prev) => !prev)}
              isChecked={checked}
              checkBoxColor="#009281"
              checkedCheckBoxColor="#009281"
            /> */}
            <Text className="text-base font-medium pl-2">
              Remember Password
            </Text>
          </View>
          <LinkButton link="/SignIn" text="Sign Up" />

          <View className="pt-8">
            <View>
              <Text className="text-[14px] font-semibold text-center">
                Or Continue With
              </Text>
            </View>

            <View className="flex flex-row gap-4 pt-8 justify-center items-center">
              <View className="border border-borderColor rounded-full p-3">
                <Image source={fb} />
              </View>
              <View className="border border-borderColor rounded-full p-3">
                <Image source={google} />
              </View>
              <View className="border border-borderColor rounded-full p-3">
                <Image source={apple} />
              </View>
            </View>

            <View className="pt-4">
              <Text className="text-base text-bodyText text-center">
                Already have an account?{" "}
                <Text
                  className=" text-primaryColor"
                  onPress={() => router.push("/SignIn")}
                >
                  Login
                </Text>{" "}
                here
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
