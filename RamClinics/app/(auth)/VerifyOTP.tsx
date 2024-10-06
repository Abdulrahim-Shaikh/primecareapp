import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
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

  // hardcoded values
  const [otpResp, setOtpResp] = useState({ otp: '9999' });
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  const { data, status } = loginService.useGenerateOtp(mobileNo);
  // let otp: string = '';

  useEffect(() => {
    console.log('API res', data, status)
    getData();
  }, [])

  useEffect(() => {
    console.log('API res', data, status)
  }, [data])

  const getData = async () => {
    const response = await loginService.generateOtp(mobileNo);
    const resp = loginService.useGenerateOtp(mobileNo);
    setOtpResp(response.data);
    // hardcoded values?
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
      setLoader(true);
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
          let user = res.data;
          setUserInfo(user);
          setUserData(user);
        })
        //   console.log("loginService.byMobileNo(mobileNo) err", err);
        // })
        .then(data => {
          setLoader(false);
          router.navigate('/(tabs)')
        });

    } else {
      Alert.alert("Invalid OTP!")
    }
  };



  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">Verify OTP</Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
            Enter OTP code received to authenticate your identity and complete verification - {status}
          </Text>
          <View className="w-full pt-8 pb-4 ">
            <OtpInputField disabled={false} onPress={onPressOtp} />
          </View>

          <View className=" pb-32">
            <Text className="text-base text-pc-primary text-center ">
              Didn’t receive OTP?{" "}
              <Text
                className=" text-pc-primary"
                onPress={() => router.push("/SignUp")}
              >
                Resend
              </Text>
            </Text>
          </View>
          {
            loader &&
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" color="#3B2314" style={{ marginTop: 20 }} />
                </View>
          }


          <NASButton title="Verify" onPress={verifyOtp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
