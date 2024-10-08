import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";
import CheckBox from "react-native-elements/dist/checkbox/CheckBox";
import { Picker } from "@react-native-picker/picker";
import { countries } from "../../constants/data";
import branchService from "../../domain/services/BranchService";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import moment from "moment";
import patientService from "../../domain/services/PatientService";
import NASButton from "../../components/NASButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useFocusEffect } from "expo-router";

const i18n =  new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const SingUp = () => {

  let IDCountries = [
    { id: 1, name: "Saudi Arabia" },
    { id: 2, name: "Bahrain" },
    { id: 3, name: "UAE" },
    { id: 4, name: "Qatar" },
    { id: 5, name: "Kuwait" },
  ]
  let cities = [
    { id: 1, name: "Al Ahsa" },
    { id: 2, name: "Al Qatif" },
    { id: 3, name: "Ras Tanura" },
    { id: 4, name: "Jubail" },
    { id: 5, name: "Dammam" },
    { id: 6, name: "Khafji" },
    { id: 7, name: "Khobar" },
    { id: 8, name: "Dahran" },
    { id: 9, name: "Madinah" },
    { id: 10, name: "Yanbu" },
    { id: 11, name: "Riyadh" },
  ]
  let referredByList = [
    { id: 1, name: "Snapchat" },
    { id: 2, name: "Instagram" },
    { id: 3, name: "Tiktok" },
    { id: 4, name: "Twitter" },
    { id: 5, name: "Facebook" },
    { id: 6, name: "Recomended" },
    { id: 7, name: "Google Search" },
    { id: 8, name: "Sign Ads" },
  ]

  const [checked, setChecked] = useState(false);
  const [selectedOption, setOption] = useState(0);
  const [id, setId] = useState('');
  const [selectedIdCountry, setIdCountry] = useState('');
  const [passport, setPassport] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSeletedBranch] = useState('');
  const [city, setCity] = useState('');
  const [showDatePicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState(new Date());
  let dateAux = new Date();
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

  useEffect(() => {
    branchService.findAll().then((res) => {
      setBranches(res.data);
    }).catch((error) => {
      console.error("Failed to fetch branches:", error);
    });
  }, []);

  let signupForm = {
    "firstName": firstName,
    "middleName": secondName,
    "lastName": lastName,
    "dob": moment(dob).format("YYYY-MM-DD"),
    "country": selectedIdCountry,
    "nationalId": id,
    "passportNo": passport,
    "nationality": nationality,
    "mobileNumber": mobileNo,
    "registerBranch": selectedBranch,
    "city": city,
    "referredBy": referredBy,
    "gender": gender,
    "emailId": email,
  }

  const savePatient = () => {
    // console.log(signupForm);
    if (firstName && lastName && dob && mobileNo && selectedBranch && gender) {
      patientService.save(signupForm).then((res) => {
        Alert.alert("Success", "Registered Successfully!", [
          { text: "OK", onPress: () => router.push("/SignIn") }
        ]);
        console.log("Patient saved Successfully! :", res.data);
        console.log("\n\n\nDate=",dob);
      }).catch((error) => {
        console.error("Failed to save Patient:", error);
        Alert.alert("Error", "Please try again later.");
      });
    } else {
      console.log("Mandatory Fields Missing!");
      Alert.alert("Mandatory Fields Missing!", "Please fill in all required fields.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-start min-h-[85vh] px-6 my-8 items-center ">
          <Text className="text-2xl font-bold text-center">
            {i18n.t('createacc')}
          </Text>
          <Text className="text-[14px] text-pc-primary text-center pt-3">
            {i18n.t('signuptext')}
          </Text>
          <View className="w-full pt-1 pb-6">

            <Text className="pt-4 font-medium">{i18n.t("doctype")}</Text>
            <View className="text-pc-primary flex justify-evenly flex-row items-center">
              <View className="flex-row">
                <CheckBox checked={selectedOption === 0} onPress={() => setOption(0)} iconType="material-community"
                  checkedIcon="radiobox-marked" uncheckedIcon="radiobox-blank" />
                <Text className="text-base font-medium pt-4">
                  {i18n.t('id')}
                </Text>
              </View>
              <View className="flex-row">
                <CheckBox checked={selectedOption === 1} onPress={() => setOption(1)} iconType="material-community"
                  checkedIcon="radiobox-marked" uncheckedIcon="radiobox-blank" />
                <Text className="text-base font-medium p-2 pt-4">
                  {i18n.t('Passport')}
                </Text>
              </View>
            </View>

            {selectedOption === 0 && (
              <>
                <Text className="mb-2 font-medium">{i18n.t("country")}</Text>
                <View className="border rounded-xl mb-2">
                  <Picker
                    selectedValue={selectedIdCountry} onValueChange={(cntry) => { setIdCountry(cntry) }} className="text-slate-800">
                    <Picker.Item label={i18n.t("country")} value="" style={{ color: 'grey', fontSize: 14 }} />
                    {IDCountries.map((cntry: any) => (
                      <Picker.Item key={cntry.id} label={i18n.t(cntry.name)} value={cntry.name} />
                    ))}
                  </Picker>
                </View>
                <FormField name={i18n.t("idno")} placeholder={i18n.t("idno")} otherStyle="mb-4" onChangeText={(e) => { setId(e) }} />
              </>
            )}
            {selectedOption === 1 && (
              <FormField name={i18n.t("Passport")} placeholder={i18n.t("Passport")} otherStyle="mb-2" onChangeText={(e) => { setPassport(e) }} />
            )}

            <FormField name={`${i18n.t("mobileno")} *`} placeholder={i18n.t("mobilenum")} otherStyle="" onChangeText={(e) => { setMobileNo(e) }} />

            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, paddingTop: '5%' }} />

            <FormField name={`${i18n.t("fl")} *`} placeholder={i18n.t("fl")} otherStyle="mt-2" onChangeText={(e) => { setFirstName(e) }} />
            <FormField name={i18n.t("ml")} placeholder={i18n.t("ml")} otherStyle="mt-2" onChangeText={(e) => { setSecondName(e) }} />
            <FormField name={`${i18n.t("ll")} *`} placeholder={i18n.t("ll")} otherStyle="mt-2" onChangeText={(e) => { setLastName(e) }} />

            <Text className="my-2 font-medium">{`${i18n.t("dob")} *`}</Text>
            <View className="flex-row justify-between my-2">
              <Pressable onPress={() => setShowPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-xl py-4">
                <Text className="text-lg">{moment(dob).format("DD-MMM-YYYY")}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker value={dob} mode="date" display="default" onChange={(event: DateTimePickerEvent, date: any) => { const selectedDate=date; setShowPicker(false); setDob(selectedDate)}} />
              )}
            </View>

            <Text className="my-2 font-medium">{`${i18n.t("gender")} *`}</Text>
            <View className="border rounded-xl">
              <Picker
                selectedValue={gender} onValueChange={(g) => { setGender(g) }} className="text-slate-800">
                <Picker.Item label={i18n.t("gender")} value="" style={{ color: 'grey', fontSize: 14 }} />
                <Picker.Item label={i18n.t("male")} value="Male" style={{ fontSize: 16 }} />
                <Picker.Item label={i18n.t("female")} value="Female" style={{ fontSize: 16 }} />
              </Picker>
            </View>

            <Text className="my-2 font-medium">{i18n.t("Nationality")}</Text>
            <View className="border rounded-xl">
              <Picker
                selectedValue={nationality} onValueChange={(cntry) => { setNationality(cntry) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Nationality")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {countries.map((cntry: any) => (
                  <Picker.Item key={cntry.code} label={i18n.t(cntry.name)} value={cntry.name} />
                ))}
              </Picker>
            </View>

            <FormField name={i18n.t("Email")} placeholder={i18n.t("Email")} otherStyle="mt-4" onChangeText={(e) => { setEmail(e) }} />

            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 10 }} />

            <Text className="my-2 font-medium">{i18n.t("City")}</Text>
            <View className="border rounded-xl">
              <Picker
                selectedValue={city} onValueChange={(c) => { setCity(c) }} className="text-slate-800">
                <Picker.Item label={i18n.t("City")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {cities.map((c: any) => (
                  <Picker.Item key={c.id} label={i18n.t(c.name)} value={c.name} />
                ))}
              </Picker>
            </View>

            <Text className="my-2 font-medium">{`${i18n.t("Register Branch")} *`}</Text>
            <View className="border rounded-xl">
              <Picker
                selectedValue={selectedBranch} onValueChange={(r) => { setSeletedBranch(r) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Register Branch")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {branches.map((branch: any) => (
                  <Picker.Item key={branch.branchCode} label={branch.name} value={branch.name} />
                ))}
              </Picker>
            </View>

            <Text className="my-2 font-medium">{i18n.t("Referred By")}</Text>
            <View className="border rounded-xl mb-6">
              <Picker
                selectedValue={referredBy} onValueChange={(r) => { setReferredBy(r) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Referred By")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {referredByList.map((r: any) => (
                  <Picker.Item key={r.id} label={i18n.t(r.name)} value={r.name} />
                ))}
              </Picker>
            </View>
            {/* <FormField
              name="Password"
              placeholder="*******"
              otherStyle="mt-4"
            />
            <FormField
              name="Confirm Password"
              placeholder="*******"
              otherStyle="mt-4"
            /> */}
          </View>
          <NASButton title={i18n.t("Register")} onPress={savePatient} />

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
              {i18n.t("signuptext2")}{" "}
                <Text
                  className="text-lime-600 underline underline-offset-8"
                  onPress={() => router.push("/SignIn")}
                >
                  {i18n.t("login")}
                </Text>{" "}
                {i18n.t("here")}
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
