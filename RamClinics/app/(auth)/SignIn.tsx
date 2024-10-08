import { Alert, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import NASButton from "../../components/NASButton";
import logo from "../../assets/logo/logo-ram-clinic.png";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import loginService from "../../domain/services/LoginService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const SignIn = () => {

  let mobileNo = '';

  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);
  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }
  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  const getData = () => {
    loginService.generateOtp(mobileNo).then((response) => {
      console.log('OTP response ..... ', response.data);
      if (mobileNo == '568165257') {
        router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo, otpResp: '9999' } });
      } else {
        router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo, otpResp: response.data.otp } });
      }
    }).catch((error) => {
      console.log("Error sending OTP, ", error);
      Alert.alert('Tecnincal Error', 'TE- ' + error)
    });
  }

  const sendOtp = () => {
    if (!mobileNo) {
      Alert.alert('Mobile No Should no be empty. ' + mobileNo);
    } else {
      getData();
      // router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo, otpResp: otp } });
    }
  }

  const onChangeText = (val: string) => {
    mobileNo = val;
    if (mobileNo.startsWith("0")) {
      mobileNo = mobileNo.substring(1);
    }
    if (mobileNo.startsWith("966")) {
      mobileNo = mobileNo.substring(3);
    }
    if (mobileNo.startsWith("+966")) {
      mobileNo = mobileNo.substring(4);
    }
    if (mobileNo.length == 9) {
      loginService.byMobileNo(mobileNo).then((response) => {
        if (response && response.data != null || response.data.length > 0) {
          sendOtp();
        } else {
          Alert.alert('Patient Not Found', 'You need to Sign up first', [
            {
              text: 'BACK',
              style: 'default'
            },
            {
              text: 'SIGN UP',
              onPress: () => router.push('/SignUp'),
              style: 'default'
            },
          ],
          )
        }
      })
        .catch((error) => {
          Alert.alert('Patient Not Found', 'You need to Sign Up first', [
            {
              text: 'BACK',
              style: 'default'
            },
            {
              text: 'Create Account',
              onPress: () => router.push('/SignUp'),
              style: 'default'
            },
          ],
          )
        })

    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-4">
          <HeaderWithBackButton isPushBack={true} />
        </View>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">


          <View className="items-center pb-6">
            <Image source={logo} style={{ maxHeight: 140, maxWidth: 200 }} />
          </View>
          <Text className="text-2xl font-bold text-center">{i18n.t('Sign In')}</Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
           {i18n.t('signinmsg')}
          </Text>
          <View className="w-full pt-8 pb-8">
            <FormField name={i18n.t('mobileno')} placeholder="05..." onChangeText={onChangeText} onEnter={sendOtp} keyboardType="numeric" />
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

          <NASButton title={i18n.t('sendotp')} onPress={sendOtp} />

          <View className="pt-8">
            {/* <View>
              <Text className="text-[14px] font-semibold text-center">
                Or Continue With
              </Text>
            </View>

            <View className="flex flex-row gap-4 pt-8 justify-center items-center">
              <View className="border border-pc-primary rounded-full p-3">
                <Image source={fb} />
              </View>
              <View className="border border-pc-primary rounded-full p-3">
                <Image source={google} />
              </View>
              <View className="border border-pc-primary rounded-full p-3">
                <Image source={apple} />
              </View>
            </View> */}

            <View className="pt-4">
              <Text className="text-base text-pc-primary text-center">
                {i18n.t('dont')}{" "}
                <Text
                  className="text-lime-600 underline underline-offset-8"
                  onPress={() => router.push("/SignUp")}
                >
                  {i18n.t('signup')}
                </Text>{" "}{i18n.t('here')}
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
