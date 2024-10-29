import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import OtpInputField from "../../components/OtpInputField";
import loginService from "../../domain/services/LoginService";
import NASButton from "../../components/NASButton";
import { useUserSate } from "../../domain/state/UserState";
import { UserContext } from "../../domain/contexts/UserContext";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import patientService from "../../domain/services/PatientService";

const VerifyOTP = () => {
  const { mobileNo, otpResp, signUpFormData } = useLocalSearchParams();

  const { setUserData } = useContext(UserContext)

  let { setUser } = useUserSate();
  const [user, setUserInfo] = useState();

  // hardcoded values
  // const [otpResp, setOtpResp] = useState({ otp: '9999' });
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [patientNotFoundModal, setPatientNotFoundModal] = useState(false);
  const [invalidOtpModal, setInvalidOtpModal] = useState(false);

  const { data, status } = loginService.useGenerateOtp(mobileNo);
  // let otp: string = '';

  // useEffect(() => {
  //   console.log('API res', data, status)
  //   getData();
  // }, [])

  // useEffect(() => {
  //   console.log('API res', data, status)
  // }, [data])

  // const getData = async () => {
  //   const response = await loginService.generateOtp(mobileNo);
  //   const resp = loginService.useGenerateOtp(mobileNo);
  //   setOtpResp(response.data);
  //   // hardcoded values?
  //   if (mobileNo == '0568165257' || mobileNo == '568165257') {
  //     otpResp.otp = '9999';
  //     setOtpResp({ ...otpResp, otp: '9999' });
  //   }
  //   console.log('OTP response ..... ', response.data);
  // }

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
    console.log("otp received", otpResp)
    console.log("otp written", otp)
    if (otpResp && otpResp == otp) {
      console.log("otpResp and otp are same")
      console.log("signUpFormData", signUpFormData)
      console.log("signUpFormData.length", signUpFormData.length)

      if (signUpFormData != null && signUpFormData != `""`) {
        let signupForm = JSON.parse(Array.isArray(signUpFormData) ? signUpFormData[0] : signUpFormData);
        patientService.save(signupForm).then((res) => {
          setSuccessModal(true);
          loginService.byMobileNo(mobileNo)
            .then(res => {
              let user = res.data;
              setUserInfo(user);
              setUserData(user);
            })
            .then(data => {
              setLoader(false);
              router.navigate('/(tabs)')
            });
        }).catch((error) => {
          setPatientNotFoundModal(true);
        });
      } else {
        loginService.byMobileNo(mobileNo)
          .then(res => {
            let user = res.data;
            setUserInfo(user);
            setUserData(user);
          })
          .then(data => {
            setLoader(false);
            router.navigate('/(tabs)')
          });
      }

    } else {
      if (signUpFormData != null && signUpFormData != '') {
        let signupForm = JSON.parse(Array.isArray(signUpFormData) ? signUpFormData[0] : signUpFormData);
        if (signupForm != null) {
          setLoader(false);
          setInvalidOtpModal(true);
        }
      }
    }
  };


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-4 pt-1">
          <HeaderWithBackButton isPushBack={true} />
        </View>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">Verify OTP</Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
            Enter OTP code received to authenticate your identity and complete verification - {status}
          </Text>
          <View className="w-full pt-8 pb-4 ">
            <OtpInputField disabled={false} onPress={onPressOtp} />
          </View>

          <View className="pb-32">
            <View className="flex flex-col">
              <View>
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
              <View className="pt-8">
                {
                  loader &&
                  <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#3B2314" style={{ marginTop: 20 }} />
                  </View>
                }
              </View>
            </View>
          </View>


          <NASButton title="Verify" onPress={verifyOtp} />
        </View>
        <Modal transparent={true} animationType="fade" visible={patientNotFoundModal} onRequestClose={() => setPatientNotFoundModal(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Text className="text-xl font-bold text-center mb-2 mt-1">Patient Not Found</Text>
              <Text className="text-xl font-bold text-center mb-4">Failed to save patient</Text>
              <View className=" flex-row justify-end gap-5 items-center py-4">
                <Pressable onPress={() => {
                  setPatientNotFoundModal(false)
                  router.back()
                }} >
                  <Text> Back </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} animationType="fade" visible={invalidOtpModal} onRequestClose={() => setInvalidOtpModal(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              {/* <Pressable className="absolute top-3 right-3" onPress={() => {
              setPatientNotFoundModal(false)
              router.back()
            }}>
              <AntDesign name="closecircle" size={24} color="#3B2314" />
            </Pressable> */}
              {/* <Text className="text-xl font-bold text-center mb-4 mt-7">Note</Text> */}
              <Text className="text-xl font-bold text-center mb-2 mt-1">Invalid OTP</Text>
              <Text className="text-xl font-bold text-center mb-4">Mobile Number not verified</Text>
              <View className=" flex-row justify-end gap-5 items-center py-4">
                <Pressable onPress={() => {
                  setInvalidOtpModal(false)
                }} >
                  <Text> Ok </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} animationType="fade" visible={successModal} onRequestClose={() => setSuccessModal(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              {/* <Pressable className="absolute top-3 right-3" onPress={() => {
              setPatientNotFoundModal(false)
              router.back()
            }}>
              <AntDesign name="closecircle" size={24} color="#3B2314" />
            </Pressable> */}
              {/* <Text className="text-xl font-bold text-center mb-4 mt-7">Note</Text> */}
              <Text className="text-xl font-bold text-center mb-4 pt-3">Success, User Registered</Text>
              <View className=" flex-row justify-end gap-5 items-center py-4">
                <Pressable onPress={() => {
                  setSuccessModal(false)
                }} >
                  <Text> Ok </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({});
