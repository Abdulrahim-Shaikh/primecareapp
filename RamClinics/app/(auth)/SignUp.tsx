import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
// import { Icon } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useBranches } from "../../domain/contexts/BranchesContext";
import loginService from "../../domain/services/LoginService";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const i18n = new I18n(translations);
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

  const genderOptions = [
    { id: 1, name: "Select Gender", value: '' },
    { id: 2, name: "Male", value: 'Male' },
    { id: 3, name: "Female", value: 'Female' },
    // { id: 3, name: "6 Months", months: 6 },
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
  const { branches, setBranches } = useBranches();
  const [selectedBranch, setSeletedBranch] = useState('');
  const [city, setCity] = useState('');
  const [showDatePicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [errors, setErrors] = useState<any>({});
  const [countryCode, setCountryCode] = useState(countries[0].dial_code);
  const [selectedCountryCodeItem, setSelectedCountryCodeItem] = useState<any>(countries[0]);
  const [errorsExist, setErrorsExist] = useState(false);

  let dateAux = new Date();
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);
  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }
  useFocusEffect(
    useCallback(() => {
      if (branches == null) {
        branchService.findAll().then((response) => {
          setBranches(response.data)
        })
      }
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  useEffect(() => {
    console.log("nationality", nationality)
  }, [nationality])

  function selectNationality(item: any) {
    console.log("item nationality: ", item)
  }

  let signupForm = {
    "firstName": firstName,
    "middleName": secondName,
    "lastName": lastName,
    "dob": moment(dob).format("YYYY-MM-DD"),
    "country": selectedIdCountry,
    "nationalId": id,
    "passportNo": passport,
    "nationality": nationality,
    "mobilePrefix": countryCode,
    "mobileNumber": mobileNo,
    "registerBranch": selectedBranch,
    "city": city,
    "referredBy": referredBy,
    "gender": gender,
    "emailId": email,
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.exec(String(email)) !== null;
  }

  const validateName = (name: string) => {
    // create a regex validation to check firstname and last name
    const regex = /^[a-z ,.'-]+$/i
    return regex.exec(String(name)) !== null;

    // const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    // return regex.exec(String(name)) !== null;
  }

  const validateNumber = (number: any) => {
    const regex = /^[0-9]*$/;
    return regex.exec(String(number)) !== null;
  }

  const savePatient = () => {
    // console.log(signupForm);
    let tempErrors = {
      "firstName": "",
      "secondName": "",
      "lastName": "",
      "countryCode": "",
      "dob": "",
      "mobileNo": "",
      "id": "",
      "email": "",
      "selectedBranch": "",
      "gender": "",
      "saveError": ""
    };





    // if (id == null || id == "") {
    //   tempErrors.id = "ID is required";
    // }

    // if (firstName == null || firstName == "") {
    //   tempErrors.firstName = "First Name is required";
    // } else {
    //   if (!validateName(firstName)) {
    //     tempErrors.firstName = "Invalid first name";
    //   }
    // }

    // if (secondName != null && secondName != "" && !validateName(secondName)) {
    //   tempErrors.secondName = "Invalid second name";
    // }

    // if (firstName == null || firstName == "") {
    //   tempErrors.firstName = "Last Name is required";
    // } else {
    //   if (!validateName(firstName)) {
    //     tempErrors.firstName = "Invalid last name";
    //   }
    // }

    // if (mobileNo == null || mobileNo == "") {
    //   tempErrors.mobileNo = "Mobile number required";
    // } else {
    //   if (mobileNo.length < 9 || (mobileNo.length == 10 && !mobileNo.startsWith("0"))) {
    //     tempErrors.mobileNo = "Invalid Mobile Number";
    //   }
    // }

    // if (email != null && email != "" && !validateEmail(email)) {
    //   tempErrors.email = "Invalid Email";
    // }

    // if (countryCode == "") {
    //   tempErrors.countryCode = "Country Code is required";
    // }
    // if (dob == null) {
    //   tempErrors.dob = "Date of birth required";
    // }
    // if (selectedBranch == "") {
    //   tempErrors.selectedBranch = "Branch required";
    // }
    // if (gender == "") {
    //   tempErrors.gender = "Gender required";
    // }

    // // validateIdLength(id) {}
    // patientService.save(signupForm).then((res) => {
    //   setErrors({});
    //   setErrorsExist(false);
    //   Alert.alert("Success", "Registered Successfully!", [
    //     { text: "OK", onPress: () => router.push("/SignIn") }
    //   ]);
    // }).catch((error) => {
    //   tempErrors.saveError = "Failed to save Patient";
    //   setErrors(tempErrors)
    //   setErrorsExist(true);
    //   console.error("Failed to save Patient:", error);
    //   Alert.alert("Error", "Please try again later.");
    // });




    console.log("signupForm: ", signupForm);
    if (id != "" && countryCode != "" && firstName != '' && lastName != '' && dob != null && mobileNo != '' && selectedBranch != '' && gender != '') {
      let allValid = true
      if (id != null && id.length > 0 && id != '' && !validateNumber(id)) {
        console.log("valid: ", id.length)
        tempErrors.id = "Invalid ID";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }
      if (firstName != null && firstName.length > 0 && firstName != '' && !validateName(firstName)) {
        console.log("valid: ", firstName.length)
        tempErrors.firstName = "Invalid first name";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }
      if (secondName != null && secondName.length > 0 && secondName != '' && !validateName(secondName)) {
        console.log("valid")
        tempErrors.secondName = "Invalid second name";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }
      if (lastName != null && lastName.length > 0 && lastName != '' && !validateName(lastName)) {
        tempErrors.lastName = "Invalid last name";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }
      if (mobileNo.length < 10) {
        tempErrors.mobileNo = "Invalid Mobile Number";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }
      if (email != null && email != '' && !validateEmail(email)) {
        console.log("email invalid")
        tempErrors.email = "Invalid Email";
        setErrors(tempErrors)
        setErrorsExist(true);
        allValid = false
      }

      if (allValid) {
        setErrorsExist(false);
        setErrors(tempErrors)
        console.log("errors: ", errors);
        console.log("signupForm: ", signupForm);
        loginService.byMobileNo(mobileNo)
          .then((response) => {
            Alert.alert("Patient Already Exists with this mobile number", "Please Sign in or use another mobile number", [
              {
                text: 'BACK',
                style: 'default'
              },
              {
                text: 'Sign in',
                onPress: () => {
                  router.push('/SignIn')
                },
                style: 'default'
              },
            ])
          })
          .catch((error) => {
            console.log("signupForm: ", signupForm);
            loginService.generateOtp(mobileNo).then((response) => {
              console.log('OTP response ..... ', response.data);
              router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo, otpResp: response.data.otp, signUpFormData: JSON.stringify(signupForm) } });
              // if (mobileNo == '568165257') {
              //   router.navigate({ pathname: '/VerifyOTP', params: { mobileNo: mobileNo, otpResp: '9999' } });
              // } else {
              // }
            }).catch((error) => {
              console.log("Error sending OTP, ", error);
              Alert.alert('Tecnincal Error', 'TE- ' + error)
            });
          })
      }


      // patientService.save(signupForm).then((res) => {
      //   setErrors({});
      //   setErrorsExist(false);
      //   Alert.alert("Success", "Registered Successfully!", [
      //     { text: "OK", onPress: () => router.push("/SignIn") }
      //   ]);
      // }).catch((error) => {
      //   tempErrors.saveError = "Failed to save Patient";
      //   setErrors(tempErrors)
      //   setErrorsExist(true);
      //   console.error("Failed to save Patient:", error);
      //   Alert.alert("Error", "Please try again later.");
      // });



    } else {
      console.log("countryCode: ", countryCode)
      if (firstName != null && firstName != '' && !validateName(firstName)) {
        console.log("valid: ", firstName.length)
        tempErrors.firstName = "Invalid first name";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (secondName != null && secondName != '' && !validateName(secondName)) {
        console.log("valid")
        tempErrors.secondName = "Invalid first name";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (lastName != null && lastName != '' && !validateName(lastName)) {
        tempErrors.lastName = "Invalid last name";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (id != null && !validateNumber(id)) {
        tempErrors.id = "Invalid id, should be a number";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (mobileNo != null && !validateNumber(mobileNo)) {
        tempErrors.mobileNo = "Invalid mobile number, should be a number";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (email != null && email != '' && !validateEmail(email)) {
        console.log("email invalid")
        tempErrors.email = "Invalid Email";
        setErrors(tempErrors)
        setErrorsExist(true);
      }
      if (id == null || id == "") tempErrors.id = "ID is required";
      if (firstName == "") tempErrors.firstName = "First Name is required";
      if (lastName == "") tempErrors.lastName = "Last Name is required";
      if (countryCode == "") tempErrors.countryCode = "Country Code is required";
      if (dob == null) tempErrors.dob = "Date of birth required";
      if (mobileNo == "") tempErrors.mobileNo = "Mobile number required";
      if (selectedBranch == "") tempErrors.selectedBranch = "Branch required";
      if (gender == "") tempErrors.gender = "Gender required";
      setErrors(tempErrors)
      setErrorsExist(true);
      console.log("errors: ", tempErrors);
      console.log("Mandatory Fields Missing!");
      Alert.alert("Mandatory Fields Missing!", "Please fill in all required fields.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-4 pt-1">
          <HeaderWithBackButton isPushBack={true} />
        </View>
        <View className="w-full justify-start min-h-[85vh] px-6 items-center ">
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
                <View className="flex flex-row">
                  <Text className="mb-2 font-medium">{i18n.t("country")}</Text>
                  <Text className="mb-2 font-medium text-red-500"> *</Text>
                </View>
                <View className="border rounded-xl p-4 mb-2">
                  <SelectDropdown
                    data={IDCountries}
                    defaultValue={selectedIdCountry}
                    onSelect={(selectedItem, index) => {
                      setIdCountry(selectedItem.name)
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          {selectedItem && (
                            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                          )}
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && i18n.t(selectedItem.name)) || i18n.t('Select Country Code')}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                          <Text>{item.name}</Text>
                        </View>
                      );
                    }}
                    dropdownStyle={styles.dropdownMenuStyle}
                    showsVerticalScrollIndicator={false}
                  />
                  {/* <Picker selectedValue={selectedIdCountry} onValueChange={(cntry) => { setIdCountry(cntry) }} className="text-slate-800">
                    <Picker.Item label="Select Country Code" value="" style={{ color: 'grey', fontSize: 14 }} />
                    {IDCountries.map((cntry: any) => (
                      <Picker.Item key={cntry.id} label={i18n.t(cntry.name)} value={cntry.name} />
                    ))}
                  </Picker> */}
                </View>
                <View className="mt-3">
                  <FormField name={i18n.t("idno") + ' *'} placeholder={i18n.t("idno")} otherStyle="mb-4" onChangeText={(e) => { setId(e) }} />
                </View>
              </>
            )}
            {selectedOption === 1 && (
              <FormField name={i18n.t("Passport")} placeholder={i18n.t("Passport")} otherStyle="mb-2" onChangeText={(e) => { setPassport(e) }} />
            )}



            <View className="w-full flex flex-col">
              <View className="mt-3 flex flex-row items-center">
                <View>
                  <Text className="text-base font-medium">Mobile Number </Text>
                </View>
                <View>
                  <Text className="text-red-600">
                    *
                  </Text>
                </View>
              </View>
              <View className="w-full mt-2 flex flex-row align-center items-center">
                <View className="w-1/4">
                  <View className={`p-4 border rounded-xl ${errorsExist && errors[mobileNo] != ""}`}>


                    <Fragment>
                      <SelectDropdown
                        data={countries}
                        defaultValue={selectedCountryCodeItem}
                        search={true}
                        onSelect={(selectedItem, index) => {
                          console.log("selectedcountry: ", selectedItem, index);
                          setSelectedCountryCodeItem(selectedItem);
                          setCountryCode(selectedItem.dial_code)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                          return (
                            <View style={styles.dropdownButtonStyle}>
                              {selectedItem && (
                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                              )}
                              <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.dial_code) || i18n.t('Select Code')}
                              </Text>
                              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            // <View style={styles.dropdownButtonStyle}>
                            //   <Text style={styles.dropdownButtonTxtStyle}>
                            //     {" (" + (selectedItem && selectedItem.dial_code) + ") " || 'Select Code'}
                            //   </Text>
                            // </View>
                          );
                        }}
                        renderItem={(item, index, isSelected) => {
                          return (
                            <View style={{ ...styles.dropdownItemStyle }}>
                              <Icon name={item.icon} />
                              <Text>{"(" + item.dial_code + ") " + item.name}</Text>
                            </View>
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                      />
                      <></>
                    </Fragment>


                    {/* <Picker
                      selectedValue={selectedCountryCodeItem}
                      onValueChange={(item) => {
                        console.log("item: ", item);
                        setSelectedCountryCodeItem(item);
                        setCountryCode(item.dial_code)
                      }}
                      className="text-slate-800">
                      {countries.map((cntry: any) => (
                        <Picker.Item key={cntry.dial_code} label={" (" + cntry.dial_code + ") " + cntry.name} value={cntry} />
                      ))}
                    </Picker> */}
                  </View>
                </View>
                <View className={`px-4 py-3  border rounded-xl w-3/4 h-full`} >
                  <TextInput
                    placeholder={i18n.t("mobileno")}
                    placeholderTextColor="#c3c3ce"
                    className="w-full"
                    keyboardType='phone-pad'
                    value={mobileNo}
                    onChangeText={(e) => setMobileNo(e)}
                  />
                </View>
              </View>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, paddingTop: '5%' }} />

            <View className="pt-3">
              <FormField name={`${i18n.t("fl")} *`} placeholder={i18n.t("fl")} otherStyle="mt-2" onChangeText={(e) => { setFirstName(e) }} />
            </View>
            <View className="pt-3">
              <FormField name={i18n.t("ml")} placeholder={i18n.t("ml")} otherStyle="mt-2" onChangeText={(e) => { setSecondName(e) }} />
            </View>
            <View className="pt-3">
              <FormField name={`${i18n.t("ll")} *`} placeholder={i18n.t("ll")} otherStyle="mt-2" onChangeText={(e) => { setLastName(e) }} />
            </View>

            <View className="flex flex-row mt-3">
              <Text className="my-2 font-medium">{`${i18n.t("dob")}`}</Text>
              <Text className="my-2 font-medium text-red-500"> *</Text>
            </View>
            {/* <Text className="my-2 font-medium">{`${i18n.t("dob")} *`}</Text> */}
            <View className="flex-row justify-between">
              <Pressable onPress={() => setShowPicker(true)} className="flex-1 border border-indigo-950 p-3 rounded-xl py-4">
                <Text className="text-lg">{moment(dob).format("DD-MMM-YYYY")}</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event: DateTimePickerEvent, date: any) => { const selectedDate = date; setShowPicker(false); setDob(selectedDate) }}
                />
              )}
            </View>

            <View className="mt-3 flex flex-row">
              <Text className="my-2 font-medium">{`${i18n.t("gender")}`}</Text>
              <Text className="my-2 font-medium text-red-500"> *</Text>
            </View>

            <View className="p-4 border rounded-xl">
              <SelectDropdown
                data={genderOptions}
                // search={true}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem.value)
                  // console.log("selectedcountry: ", selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.name) || i18n.t('Select Gender')}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                    // <View style={styles.dropdownButtonStyle}>
                    //   <Text style={styles.dropdownButtonTxtStyle}>
                    //     {(selectedItem && selectedItem.name) || 'Select nationality'}
                    //   </Text>
                    // </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle }}>
                      <Icon name={item.icon} />
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
              {/* <Picker
                selectedValue={gender} onValueChange={(g) => { setGender(g) }} className="text-slate-800">
                <Picker.Item label={i18n.t("gender")} value="" style={{ color: 'grey', fontSize: 14 }} />
                <Picker.Item label={i18n.t("male")} value="Male" style={{ fontSize: 16 }} />
                <Picker.Item label={i18n.t("female")} value="Female" style={{ fontSize: 16 }} />
              </Picker> */}
            </View>

            <View className="mt-3">
              <Text className="my-2 font-medium">{i18n.t("Nationality")}</Text>
            </View>
            <View className="p-4 border rounded-xl">
              <Fragment>
                <SelectDropdown
                  data={countries}
                  search={true}
                  onSelect={(selectedItem, index) => {
                    setNationality(selectedItem.name)
                    // console.log("selectedcountry: ", selectedItem, index);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        {selectedItem && (
                          <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                        )}
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.name) || i18n.t('Select nationality')}
                        </Text>
                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                      </View>
                      // <View style={styles.dropdownButtonStyle}>
                      //   <Text style={styles.dropdownButtonTxtStyle}>
                      //     {(selectedItem && selectedItem.name) || 'Select nationality'}
                      //   </Text>
                      // </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View style={{ ...styles.dropdownItemStyle }}>
                        <Icon name={item.icon} />
                        <Text>{item.name}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
                <></>
              </Fragment>
            </View>

            {/* <Text className="my-2 font-medium">{i18n.t("Nationality")}</Text>
            <View className="border rounded-xl">
              <Picker
                selectedValue={nationality} onValueChange={(cntry) => { setNationality(cntry) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Nationality")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {countries.map((cntry: any) => (
                  <Picker.Item key={cntry.code} label={cntry.name} value={cntry.name} />
                ))}
              </Picker>
            </View> */}

            <FormField name={i18n.t("Email")} placeholder={i18n.t("Email")} otherStyle="mt-4" onChangeText={(e) => { setEmail(e) }} />

            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 10 }} />

            <View className="mt-3">
              <Text className="my-2 font-medium">{i18n.t("City")}</Text>
            </View>
            <View className="p-4 border rounded-xl">
              <SelectDropdown
                data={cities}
                defaultValue={city}
                search={true}
                onSelect={(selectedItem, index) => {
                  setCity(selectedItem.name)
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && i18n.t(selectedItem.name)) || i18n.t('Select City')}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdownMenuStyle}
                showsVerticalScrollIndicator={false}
              />
              {/* <Picker
                selectedValue={city} onValueChange={(c) => { setCity(c) }} className="text-slate-800">
                <Picker.Item label={i18n.t("City")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {cities.map((c: any) => (
                  <Picker.Item key={c.id} label={i18n.t(c.name)} value={c.name} />
                ))}
              </Picker> */}
            </View>

            <View className="mt-3 flex flex-row">
              <Text className="my-2 font-medium">{`${i18n.t("Register Branch")}`}</Text>
              <Text className="my-2 font-medium text-red-500"> *</Text>
            </View>
            <View className="border rounded-xl p-4">
              <SelectDropdown
                data={branches}
                defaultValue={selectedBranch}
                search={true}
                onSelect={(selectedItem, index) => {
                  setSeletedBranch(selectedItem.name)
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && `${selectedItem.name}, ${selectedItem.city ? selectedItem.city.trim() : ""}`) || i18n.t('Select Branch')}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdownMenuStyle}
                showsVerticalScrollIndicator={false}
              />
              {/* <Picker
                selectedValue={selectedBranch} onValueChange={(r) => { setSeletedBranch(r) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Register Branch")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {branches.map((branch: any) => (
                  (branch.name != 'Technas' && branch.name != 'Doha Medical Complex' && branch.name != 'Saudi Swiss' && branch.name! + 'Central Pharmacy Warehouse')
                  && <Picker.Item key={branch.branchCode} label={`${branch.name}, ${branch.city ? branch.city.trim() : ""}`} value={branch.name} />
                ))}
              </Picker> */}
            </View>

            <View className="mt-3">
              <Text className="my-2 font-medium">{i18n.t("Referred By")}</Text>
            </View>
            <View className="border rounded-xl p-4">
              <SelectDropdown
                data={referredByList}
                defaultValue={referredBy}
                search={true}
                onSelect={(selectedItem, index) => {
                  setReferredBy(selectedItem.name)
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && (
                        <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                      )}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && i18n.t(selectedItem.name)) || i18n.t('Select Referrer')}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdownMenuStyle}
                showsVerticalScrollIndicator={false}
              />
              {/* <Picker
                selectedValue={referredBy} onValueChange={(r) => { setReferredBy(r) }} className="text-slate-800">
                <Picker.Item label={i18n.t("Referred By")} value="" style={{ color: 'grey', fontSize: 14 }} />
                {referredByList.map((r: any) => (
                  <Picker.Item key={r.id} label={i18n.t(r.name)} value={r.name} />
                ))}
              </Picker> */}
            </View>
            {
              errorsExist &&
              <View className="mt-4 rounded-xl border-2 border-rose-500 px-4 py-3 bg-red-200">
                <View className="list-disc">
                  {
                    Object.keys(errors).map((key) => {
                      return key && errors[key] != "" && errors[key].length > 0 && (
                        <View className="flex items-center flex-row">
                          <MaterialCommunityIcons
                            name="circle-medium"
                            size={24}
                            color={"#dc2626"}
                          />
                          <Text className="text-red-600">{errors[key]}</Text>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            }
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

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 25,
  },
  dropdownButtonIconStyle: {},
  dropdownMenuStyle: {
    width: '75%',
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    width: '100%',
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});