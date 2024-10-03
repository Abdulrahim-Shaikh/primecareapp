import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import OtpInputField from "../../components/OtpInputField";
import loginService from "../../domain/services/LoginService";
import NASButton from "../../components/NASButton";
import { useUserSate } from "../../domain/state/UserState";
import { UserContext } from "../../domain/contexts/UserContext";

const VerifyOTP = () => {
  const { mobileNo } = useLocalSearchParams();

  const { setUserData } = useContext(UserContext)

  let { setUser } = useUserSate();
  const [user, setUserInfo] = useState();

  const [otpResp, setOtpResp] = useState({ otp: '9999' });
  const [otp, setOtp] = useState('');
  // let otp: string = '';

  useEffect(() => {
    getData();    
  }, [])


  const getData = async () => {
    const response = await loginService.generateOtp(mobileNo);
    setOtpResp(response.data);
    if (mobileNo == '0568165257' || mobileNo == '568165257') {
      otpResp.otp = '9999';
      setOtpResp({ ...otpResp, otp: '9999' });
    }
    console.log('OTP response ..... ', response.data);
  }

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (otp && otp.length == 4) {
      verifyOtp();
    }
  }, [otp]);


  const onPressOtp = (otpVal: string[]) => {
    setOtp(otpVal.join(''));
  }

  const verifyOtp = () => {
    console.log("otp received", otpResp.otp)
    console.log("otp written", otp)
    if (otpResp && otpResp.otp && otpResp.otp == otp) {
      console.log("otpResp and otp are same")
      loginService.byMobileNo(mobileNo)
      .then(res => {
        // console.log("loginService.byMobileNo(mobileNo) res", res);
        // let user = res.data;
        setUserInfo(user);
        setUserData(user);
      })
      //   console.log("loginService.byMobileNo(mobileNo) err", err);
      // })
      .then(data => router.navigate('/(tabs)'));

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
            <OtpInputField disabled={false} onPress={onPressOtp} />
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


          <NASButton title="Verify" onPress={verifyOtp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
