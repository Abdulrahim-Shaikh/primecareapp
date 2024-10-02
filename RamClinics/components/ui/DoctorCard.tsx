import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
  speciality
}: Props) => {

  const BASE_URL = "http://16.24.11.104:8080/HISAdmin/api/resource/file/";

  const profilePhotoUrl = (photo && Array.isArray(photo) && photo.length > 0 && photo[0])
    ? { uri: `${BASE_URL}${encodeURIComponent(photo[0])}` }
    : emptyImg;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control for start date picker modal
  const [date, setDate] = useState(new Date());  // State for start date
  const [specialityList, setSpeciality] = useState("");
  const [doctorName, setDoctorName] = useState(null);
  const [branchId, setBranchId] = useState("");
  const [doctorScheduleData, setDoctorScheduleData] = useState(myAppoinmentData)
  const [patientData, setPatientData] = useState({})
  const [patientPolicyData, setPatientPolicyData] = useState({})

  let dateAux = new Date();


  useFocusEffect(
    useCallback(() => {
      const mobile = useUserSate.getState().user.mobile ? useUserSate.getState().user.mobile : "0594951370"
      console.log("mobile: ", useUserSate.getState().user)
      patientService.byMobileNo(mobile)
        .then((response: any) => {
          setPatientData(response.data[0])
          patientPolicyService.byPatientId(response.data[0].id)
            .then((response: any) => {
              setPatientPolicyData(response.data[0])
              // patientPolicyData = response.data[0]
            })
            .catch((error) => {
              console.log("patientPolicyService.byPatientId() error: ", error)
            })
        })
        .catch((error) => {
          console.log("error: ", error)
        })

    }, [])
  )


  const bookAppointment = () => {

    if (patientData == null || Object.keys(patientData).length <= 0) {
      Alert.alert('Note', 'Patient data not found', [
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
            setSpeciality(response.data.speciality);
            setDoctorName(response.data.name);
            setBranchId(response.data.branchId[0]); // set first branchId from patient branch list if below API gives error
            branchService.getBranchByName(response.data.primaryBranch)
              .then((response) => {
                setBranchId(response.data.id);
                if (department != null && date != null && specialityList != null && doctorName != null) {
                  let dateString = moment(date).format("YYYY-MM-DD");
                  let today = moment().format("YYYY-MM-DD");
                  let requestBody: any = [{
                    date: dateString,
                    day: 2,
                    resourceIds: [id],
                    wday: "Mon"
                  }]
                  scheduleService.getDoctorSchedule(branchId, department, specialityList, "false", requestBody)
                    .then((response) => {
                      setDoctorScheduleData(response.data)
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
              })
              .catch((error) => {
                console.log("errorrrr: ", error)
              })
            if (department != null && date != null && specialityList != null && doctorName != null) {
              let dateString = moment(date).format("YYYY-MM-DD");
              let today = moment().format("YYYY-MM-DD");
              let requestBody: any = [{
                date: dateString,
                day: 2,
                resourceIds: [id],
                wday: "Mon"
              }]
              scheduleService.getDoctorSchedule(branchId, department, specialityList, "false", requestBody)
                .then((response) => {
                  console.log("rresponse getDoctorSchedule: ", response.data)
                  // setAppointmentEntry(true)
                  setDoctorScheduleData(response.data)
                  router.push({
                    pathname: "/ScheduleAppointment/",
                    params: {
                      branchId: branchId,
                      department: department,
                      speciality: specialityList,
                      doctor: doctorName,
                      date: (new Date(date)).toString(),
                      params: JSON.stringify(response.data[0]),
                      patientData: JSON.stringify(patientData),
                      patientPolicyData: JSON.stringify(patientPolicyData)
                    }
                  })
                })
                .catch((err) => {
                  Alert.alert('Note', 'Doctor Schedule not found', [
                    {
                      text: 'OK',
                      // onPress: () => router.push({
                      //     pathname: "/BookAppointment",
                      // }),
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
        console.log("DoctorCard Clicked");
      }}
      activeOpacity={0.7}
      className="p-4 border border-amber-900 rounded-2xl w-full mt-4"
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
              <Text className="text-[12px] text-amber-900">{primaryBranch}</Text>
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ maxWidth: '80%' }} className="text-[12px]">
                <AntDesign name="star" color={"#ffab00"} />
                {rating}
                <Entypo name="dot-single" />
                <Text className="text-amber-900">
                  <AntDesign name="clockcircle" /> {clinicHours}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="border border-amber-900 p-2 rounded-md ml-2">
          <Ionicons name="heart-outline" size={16} color={"#009281"} />
        </View>
      </View>

      {isDatePickerOpen && (
        <View>
          <DateTimePicker
            value={dateAux}
            mode="date"
            display="default"
            onChange={(selectedDate: any) => {
              const currentDate = selectedDate.nativeEvent.timestamp || date;
              setDate(currentDate);
              setIsDatePickerOpen(false);
              bookAppointment()
            }}
          />
        </View>
      )}
      <View className="flex flex-row justify-end ">
        <TouchableOpacity
          onPress={() => {
            console.log("datePickerOpen")
            setIsDatePickerOpen(true);
          }}
          className="bg-emerald-500 text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-5 py-2 rounded-lg">
          <Text>Book</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity >
  );
};

export default DoctorCard;

const styles = StyleSheet.create({});
