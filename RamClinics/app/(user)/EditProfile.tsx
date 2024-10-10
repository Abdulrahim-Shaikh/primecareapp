import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

const EditProfile = () => {
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
  let user = useUserSate.getState().user;
  const [patient, setPatient] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  console.log("firstName>>>", firstName);
  useEffect(() => {
    patientService.find(user.id).then((res) => {
      // console.log("patientid", res.data)
      setPatient(res.data);
      setFirstName(res.data.firstName || '');
      setLastName(res.data.lastName || '');
      if (res.data.dob) {
        const date = new Date(res.data.dob);
        const formattedDob = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setDob(formattedDob);
      }
    });
  }, [user.id]);

  const handleSave = () => {
    const updatedPatient = {
      ...patient,
      firstName: firstName,
      lastName: lastName,
    };
    patientService.update(updatedPatient)
      .then(() => {
        Alert.alert("Success", "Details updated successfully");
      })
      .catch((error) => {
        Alert.alert(error);
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
            <View className="pt-5 pb-8">
              <FormField
                placeholder="24/25/2024"
                name={i18n.t("Date of Birth")}
                value={dob}
                onChangeText={setDob}
              />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
