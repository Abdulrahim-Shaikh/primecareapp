import { Alert, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import NASButton from "../../components/NASButton";
import logo from "../../assets/logo/logo-ram-clinic.png";

const SignIn = () => {

  let mobileNo = '';
  const sendOtp = () => {
    if(!mobileNo) {
      Alert.alert('Mobile No Should no be empty. ' + mobileNo)
    }else {
      router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo}});
    } 
  }

  const onChangeText = (val: string) => {   
    mobileNo = val;    
    if(mobileNo.startsWith("0")) {
      mobileNo = mobileNo.substring(1);
    }
    if(mobileNo.startsWith("966")) {
      mobileNo = mobileNo.substring(3);
    }
    if(mobileNo.startsWith("+966")) {
      mobileNo = mobileNo.substring(4);
    }
    if(mobileNo.length == 9) {
      sendOtp();
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <View className="items-center pb-6">
            <Image source={logo} style={{ maxHeight: 140, maxWidth: 200}}/>
          </View>
          <Text className="text-2xl font-bold text-center">Sign In</Text>
          <Text className="text-[14px] text-amber-900 text-center pt-3">
            Access your account securely. Sign in to manage your personalized
            experience.
          </Text>
          <View className="w-full pt-8 pb-8">
            <FormField name="Mobile No" placeholder="05..." onChangeText={onChangeText} onEnter={sendOtp}  keyboardType="numeric"/>
            {/* <FormField name="Password" placeholder="*******" otherStyle="mt-4" /> */}
          </View>
          {/* <View className="text-amber-500 flex items-end w-full pt-2 pb-7">
            <Link
              href={"/ForgetPassword"}
              className="text-[14px] text-text-amber-500 font-bold"
            >
              Forgot password?
            </Link>
          </View> */}
          {/* <LinkButton link="/VerifyOTP" text="Send Otp" /> */}

          {/* <Button onPress={sendOtp} title="Send OTP"> </Button> */}

          <NASButton title="Send Otp" onPress={sendOtp}  />

          <View className="pt-8">
            {/* <View>
              <Text className="text-[14px] font-semibold text-center">
                Or Continue With
              </Text>
            </View>

            <View className="flex flex-row gap-4 pt-8 justify-center items-center">
              <View className="border border-amber-900 rounded-full p-3">
                <Image source={fb} />
              </View>
              <View className="border border-amber-900 rounded-full p-3">
                <Image source={google} />
              </View>
              <View className="border border-amber-900 rounded-full p-3">
                <Image source={apple} />
              </View>
            </View> */}

            <View className="pt-4">
              <Text className="text-base text-amber-900 text-center">
                Don't have an account?{" "}
                <Text
                  className="text-lime-600 underline underline-offset-8"
                  onPress={() => router.push("/SignUp")}
                >
                  Sign up
                </Text>{" "}here
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
