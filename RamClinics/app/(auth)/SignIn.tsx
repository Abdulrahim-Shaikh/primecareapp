import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import fb from "../../assets/images/fb.png";
import google from "../../assets/images/google.png";
import apple from "../../assets/images/apple.png";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">Sign In</Text>
          <Text className="text-[14px] text-bodyText text-center pt-3">
            Access your account securely. Sign in to manage your personalized
            experience.
          </Text>
          <View className="w-full pt-8">
            <FormField name="Email" placeholder="Email" />
            <FormField
              name="Password"
              placeholder="*******"
              otherStyle="mt-4"
            />
          </View>
          <View className="text-primaryColor flex items-end w-full pt-2 pb-7">
            <Link
              href={"/ForgetPassword"}
              className="text-[14px] text-primaryColor font-bold"
            >
              Forgot password?
            </Link>
          </View>
          <LinkButton link="/Home" text="Sign In" />

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
                Don't have an account?{" "}
                <Text
                  className=" text-primaryColor"
                  onPress={() => router.push("/SignUp")}
                >
                  Sign up
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

export default SignIn;

const styles = StyleSheet.create({});
