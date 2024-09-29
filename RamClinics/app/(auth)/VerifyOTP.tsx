import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import OtpInputField from "../../components/OtpInputField";
import loginService from "../../domain/services/LoginService";
import NASButton from "../../components/NASButton";
import { useUserSate } from "../../domain/state/UserState";

const VerifyOTP = () => {

  const {mobileNo} = useLocalSearchParams();
  let {setUser} = useUserSate();
  let otpResp : any;
  let otp = '';

  useEffect(() => {
    loginService.generateOtp(mobileNo).then((resp: any) => {
      otpResp = resp.data;
      console.log(otpResp)
    });
  }, [])  

  
  const onPressOtp = (otpVal: string[]) => {
    let val = otpVal.join('')
    if(val.length == 4 ) {
      otp = val;
      verifyOtp();
    }
  }

  // const setData: async (user: any) => {
  //   await setUser(user);    
  // };

  const verifyOtp = () => {    
      if(otpResp.otp == otp) {        
        loginService.byMobileNo(mobileNo).then(res => {
          let user = res.data;                  
          useUserSate.getState().setUser(user);                          
        }).then((data) =>  router.navigate('/(tabs)'));      
      } else {
        Alert.alert("Invalid OTP!")
      }    
  };
  


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">Verify OTP</Text>
          <Text className="text-[14px] text-amber-900 text-center pt-3">
            Enter OTP code received to authenticate your identity and complete verification
          </Text>
          <View className="w-full pt-8 pb-4 ">
            <OtpInputField disabled={false} onPress={onPressOtp}/>
          </View>

          <View className=" pb-32">
            <Text className="text-base text-amber-900 text-center ">
              Didn’t receive OTP?{" "}
              <Text
                className=" text-amber-900"
                onPress={() => router.push("/SignUp")}
              >
                Resend
              </Text>
            </Text>
          </View>

          
          <NASButton title="Verify"   onPress={verifyOtp}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
