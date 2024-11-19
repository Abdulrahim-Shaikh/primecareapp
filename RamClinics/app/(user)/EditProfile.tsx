import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput, Modal, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";
import patientService from "../../domain/services/PatientService";
import { useUserSate } from "../../domain/state/UserState";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import { useFocusEffect } from "expo-router";
import { UserContext } from "../../domain/contexts/UserContext";
import loginService from "../../domain/services/LoginService";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const EditProfile = () => {
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);
  const [showDatePicker, setShowPicker] = useState(false);

  let { setUser } = useUserSate();
  const [userInfo, setUserInfo] = useState<any>();
  const { userData, setUserData } = useContext(UserContext)

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
  let user = useUserSate.getState().user;
  const [patient, setPatient] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    patientService.find(user.id).then((res) => {
      // console.log("patientid", res.data)
      setPatient(res.data);
      setFirstName(res.data.firstName || '');
      setLastName(res.data.lastName || '');
      if (res.data.dob) {
        const date = new Date(res.data.dob);
        // const formattedDob = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setDob(date);
      }
    });
  }, [user.id]);

  const getPatient = () => {
    loginService.byMobileNo(user.mobile)
      .then((res) => {
        setSuccessModalVisible(true);
        // Alert.alert("User Updated Successfully");
        setUser(res.data);
        setUserInfo(res.data);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log("loginservice error", error)
      })
  }

  const handleSave = () => {
    const updatedPatient = {
      ...patient,
      firstName: firstName,
      lastName: lastName,
      dob: dob
    };
    patientService.update(updatedPatient)
      .then(() => {
        getPatient();
      })
      .then(() => {
        console.log("user", userData)
      })
      // 
      .catch((error) => {
        // Alert.alert(error);
      });
  };

  if (!patient) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title={i18n.t("Edit Profile")} />
          <View className="pt-8">
            <View>
              <FormField
                placeholder={i18n.t("First name")}
                name={i18n.t("First Name")}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View className="pt-5">
              <FormField
                placeholder={i18n.t("Last name")}
                name={i18n.t("Last Name")}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View className={`w-full pt-5`}>
              <Text className="text-base font-medium">Select date</Text>
              <View className={`px-4 py-3  border rounded-xl w-full mt-2`} >
                <TextInput
                  placeholder={dob.toDateString()}
                  placeholderTextColor="#c3c3ce"
                  className="w-full"
                  value={dob.toDateString()}
                  onPress={() => setShowPicker(true)}
                />
              </View>
              <View className="pt-5 pb-8">
                {showDatePicker && (
                  <DateTimePicker value={dob} mode="date" display="default" onChange={(event: DateTimePickerEvent, date: any) => { const selectedDate = date; setShowPicker(false); setDob(selectedDate) }} />
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSave}
              style={{
                backgroundColor: 'rgb(59,35,20)',
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                {i18n.t("Save")}
              </Text>
            </TouchableOpacity>

            {/* <LinkButton link="/ProfileTab" text="Save" /> */}
          </View>
        </View>
      <Modal transparent={true} animationType="fade" visible={successModalVisible} onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <View className="flex flex-row justify-center">
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={60}
                color={"#84CC16"}
              />
            </View>
            <Text className="text-xl font-bold text-center mb-4 pt-3">{i18n.t('Success - User Updated Successfully')}</Text>
            <View className=" flex-row justify-between gap-5 items-center py-4">
              <Pressable onPress={() => {
                setSuccessModalVisible(false)
              }}>
                <Text> {i18n.t('Ok')} </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
