import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import emptyImg from "../../assets/images/EmptyDoctorImg.jpg";
import doctorService from "../../domain/services/DoctorService";
import moment from "moment";
import scheduleService from "../../domain/services/ScheduleService";
import { myAppoinmentData } from "../../constants/data";
import { useUserSate } from "../../domain/state/UserState";
import patientService from "../../domain/services/PatientService";
import branchService from "../../domain/services/BranchService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import specialityService from "../../domain/services/SpecialityService";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;

type Props = {
  id: any;
  photo: any[];
  name: string;
  department: string;
  primaryBranch: string;
  rating: string;
  clinicHours: any;
  consultationFee: string;
  speciality: string;
  specialityCode: string;
  branchId: number;
  mainSpeciality: string;
  fromSpeciality: string;
  selectedSpecialityCode: string;
  callCenterDoctorFlow: boolean;
};

const DoctorCard = ({
  id,
  photo,
  name,
  department,
  primaryBranch,
  rating,
  clinicHours,
  consultationFee,
  speciality,
  specialityCode,
  branchId,
  mainSpeciality,
  fromSpeciality,
  selectedSpecialityCode,
  callCenterDoctorFlow
}: Props) => {

  const BASE_URL = "http://16.24.11.104:8080/HISAdmin/api/resource/file/";

  const profilePhotoUrl = (photo && Array.isArray(photo) && photo.length > 0 && photo[0])
    ? { uri: `${BASE_URL}${encodeURIComponent(photo[0])}` }
    : emptyImg;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control for start date picker modal
  const [loader, setLoader] = useState(false); // Control for loader
  const [date, setDate] = useState(new Date());  // State for start date
  const [user, setUser] = useState(useUserSate.getState().user);
  const [specialityList, setSpeciality] = useState("");
  // const [doctorName, setDoctorName] = useState(null);
  const [mobile, setMobile] = useState("");
  // const [branchId, setBranchId] = useState("");
  const [doctorScheduleData, setDoctorScheduleData] = useState([])
  const [patientData, setPatientData] = useState(useUserSate.getState().user)
  const [patientPolicyData, setPatientPolicyData] = useState({})
  const [modalVisible, setModalVisible] = useState(false);


  let dateAux = new Date();
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
      console.log("co: ", specialityCode)
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
      console.log("branchId: ", branchId)
      console.log("ssssspeciality: ", speciality)
      console.log("mainSpeciality: ", mainSpeciality)
      console.log("selectedSpecialityCode: ", selectedSpecialityCode)
      console.log("callCenterDoctorFlow: ", callCenterDoctorFlow)
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (useUserSate.getState().user != null) {
        setUser(useUserSate.getState().user)
        setPatientData(useUserSate.getState().user)
        // console.log("useUserSate.getState().user: ", useUserSate.getState().user)
        if (useUserSate.getState().user.mobile != null) {
          const mobile = useUserSate.getState().user.mobile
          setMobile(useUserSate.getState().user.mobile)
        }
      }
      if (useUserSate.getState().user != null && useUserSate.getState().user.mobile != null) {
        const mobile = useUserSate.getState().user.mobile
        setMobile(useUserSate.getState().user.mobile)
        setPatientData(useUserSate.getState().user)
      }
    }, [])
  )


  const getPatientPolicyData = async () => {
    setLoader(true)
    if (!useUserSate.getState().loggedIn) {
      Alert.alert('Patient Not Found', 'You need to Sign in first', [
        {
          text: 'BACK',
          style: 'default'
        },
        {
          text: 'SIGN IN',
          onPress: () => router.push('/SignIn'),
          style: 'default'
        },
      ])
    } else {
      patientPolicyService.byPatientId(user.id)
        .then((response: any) => {
          // console.log("respponse: ", response.data[0])
          setPatientPolicyData(response.data[0])
          // console.log("patientPolicyData: ", patientPolicyData)
          if (+callCenterDoctorFlow) {
            let visitTypes = []
            if (department == 'Dermatology') {
              visitTypes = [
                { subServiceNameEn: 'New service Appointment', mobileOrOnline: 20 },
                { subServiceNameEn: 'Consultation Appointment', mobileOrOnline: 10 },
                { subServiceNameEn: 'Follow up Appointment', mobileOrOnline: 20 },
                { subServiceNameEn: 'Emergency Appointment', mobileOrOnline: 20 },
              ]
              router.push({
                pathname: "/AppointmentType",
                params: {
                  branchId: branchId,
                  city: null,
                  fromSpeciality: fromSpeciality,
                  department: department,
                  callCenterFlow: 0,
                  specialityCode: selectedSpecialityCode,
                  speciality: mainSpeciality,
                  subServices: JSON.stringify(visitTypes),
                  callCenterDoctorFlow: 1,
                  resourceId: id
                }
              })
            } else {
              specialityService.getSpecialityServiceByDepartmentTest(department).then((response) => {
                let specialityList = [...response.data];
                let selectedDoctorSpeciality = specialityList.find(speciality => speciality.code == selectedSpecialityCode);
                visitTypes = selectedDoctorSpeciality?.services[0].subServices;
                for (let i of selectedDoctorSpeciality?.services) {
                  console.log("\n\n\ni: ", i)
                }
                // console.log("1selectedSpecialityCode: ", selectedSpecialityCode)
                router.push({
                  pathname: "/AppointmentType",
                  params: {
                    branchId: branchId,
                    city: null,
                    fromSpeciality: fromSpeciality,
                    department: department,
                    callCenterFlow: 0,
                    specialityCode: selectedSpecialityCode,
                    speciality: mainSpeciality,
                    subServices: JSON.stringify(visitTypes),
                    callCenterDoctorFlow: 1,
                    resourceId: id
                  }
                })
              })
              .catch((error) => {
                Alert.alert('Note', 'Appointment types not found', [
                    {
                        text: 'OK',
                        // onPress: () => router.back(),
                        style: 'default'
                    },
                ],
                )
              })
            }
          } else {
            console.log("datePickerOpen")
            bookAppointment()
            // setIsDatePickerOpen(true);
          }
        })
        .catch((error) => {
          console.log("patientPolicyService.byPatientId() error: ", error)
        })
    }
  }

  const bookAppointment = () => {

    if (patientData == null || Object.keys(patientData).length <= 0) {
      Alert.alert('Patient Not Found', 'You need to Sign in first', [
        {
          text: 'BACK',
          style: 'default'
        },
        {
          text: 'SIGN IN',
          onPress: () => router.push('/SignIn'),
          style: 'default'
        },
      ])
    } else {

      if (patientPolicyData == null || Object.keys(patientPolicyData).length <= 0) {
        Alert.alert('Note', 'Patient Policy data not found', [
          {
            text: 'OK',
            // onPress: () => router.push({
            //     pathname: "/BookAppointment",
            // }),
            style: 'default'
          },
        ],
        )
      } else {
        doctorService.find(id)
          .then((response) => {
            let speciality = response.data.speciality;
            let doctorName = response.data.name;
            setSpeciality(response.data.speciality);
            let today = new Date()
            if (department != null && today != null && speciality != null && doctorName != null) {
              let dateString = moment(date).format("YYYY-MM-DD");
              let requestBody: any = [{
                date: dateString,
                day: +moment(date).format("D"),
                resourceIds: [id],
                wday: moment(date).format("ddd")
              }]
              scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                .then((response) => {
                  // setAppointmentEntry(true)
                  setDoctorScheduleData(response.data)
                  if (response.data == null || response.data.length <= 0 || response.data[0] == null || response.data[0].length <= 0) {
                    Alert.alert('Note', 'Doctor Schedule not found', [
                      {
                        text: 'BACK',
                        // onPress: () => router.back(),
                        style: 'default'
                      },
                    ],
                    )
                  } else {
                    router.push({
                      pathname: "/ScheduleAppointment/",
                      params: {
                        branchId: branchId,
                        department: department,
                        speciality: speciality,
                        doctor: doctorName,
                        resourceId: id,
                        date: (today).toString(),
                        params: JSON.stringify(response.data[0]),
                        patientData: JSON.stringify(patientData),
                        patientPolicyData: JSON.stringify(patientPolicyData)
                      }
                    })
                  }
                })
                .catch((err) => {
                  Alert.alert('Note', 'Doctor Schedule not found', [
                    {
                      text: 'OK',
                      style: 'default'
                    },
                  ],
                  )
                  console.log(err);
                })
            }
          })
      }

    }



  }



  return (

    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/DoctorProfile",
          params: { id: id },
        })
      }}
      activeOpacity={0.7}
      className="p-4 border border-pc-primary rounded-2xl w-full mt-4"
    >
      <View className="flex flex-row w-full justify-between items-start">
        <View className="flex flex-row justify-start items-center flex-1">
          <View className="bg-amber-100 rounded-lg overflow-hidden mr-3">
            {photo && photo.length > 0 && photo[0] != null ? (
              <Image source={profilePhotoUrl} style={{ width: 90, height: 120, justifyContent: "center" }} />

            ) : (
              <Image source={emptyImg} className="w-16 h-16 border-4" />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity className="text-base font-medium"
              onPress={() =>
                router.push({
                  pathname: "/DoctorProfile",
                  params: { id: id },
                })
              }
            >
              <Text>
                {name}
              </Text>
            </TouchableOpacity>
            <Text className="py-2">
              {speciality} <Entypo name="dot-single" />
              <Text className="text-[12px] text-pc-primary">{primaryBranch}</Text>
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ maxWidth: '80%' }} className="text-[12px]">
                <AntDesign name="star" color={"#ffab00"} />
                {rating}
                <Entypo name="dot-single" />
                <Text className="text-pc-primary">
                  <AntDesign name="clockcircle" /> {clinicHours}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-end ">
        <Pressable
          onPress={() => {
            getPatientPolicyData();
          }}
          className="bg-[#3B2314] text-primaryColor border-[1px] border-primaryColor px-5 py-2 rounded-lg">
          <Text className="text-white">{i18n.t("Book")}</Text>
        </Pressable>
      </View>

        <Modal visible={loader} transparent={true} animationType="fade"onRequestClose={() => {
            setLoader(!loader);
          }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="white" />
          </View>
        </Modal>
    </TouchableOpacity >
  );
};

export default DoctorCard;

const styles = StyleSheet.create({});
