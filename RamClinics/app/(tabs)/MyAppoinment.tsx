import {
  Alert,
  Button,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { myAppoinmentData } from "../../constants/data";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import appointmentService from "../../domain/services/AppointmentService";
import { useUserSate } from "../../domain/state/UserState";
import patientService from "../../domain/services/PatientService";
import moment from "moment";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { all } from "axios";

const tabNames = ["Booked", "Checked In"];
const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const Appoinment = () => {
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
  const [cancelModal, setCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Booked");
  const [filteredItem, setFilteredItem] = useState(myAppoinmentData);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [appointments, setAppointments] = useState(myAppoinmentData);
  const [allAppointments, setAllAppointments] = useState(myAppoinmentData);
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false); // Control for start date picker modal
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    const currentDate = new Date();
    setToDate(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const patientId = useUserSate.getState().userId;
    if (isEnabled) {
      setFromDate(firstDayOfMonth);
      patientService.getByPatientId(patientId)
        .then((response) => {
          let branchId = response.data.branchId;
          appointmentService.appointmentsByDate(branchId, fromDate.toDateString, toDate.toDateString, patientId, response.data.mrno, "Booked")
            .then((response) => {
              setAllAppointments(response.data);
              appointmentService.appointmentsByDate(branchId, fromDate.toDateString, toDate.toDateString, patientId, response.data.mrno, "Checked In")
                .then((response) => {
                  let appointments = [...allAppointments, ...response.data];
                  setAllAppointments(appointments);
                  changeTab("Booked")
                })
                .catch((error) => {
                  console.log(error);
                })
              changeTab("Booked")
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      setFromDate(firstDayOfYear);
      patientService.getByPatientId(patientId)
        .then((response) => {
          let branchId = response.data.branchId;
          appointmentService.appointmentsByDate(branchId, fromDate.toDateString, toDate.toDateString, patientId, response.data.mrno, "Booked")
            .then((response) => {
              setAllAppointments(response.data);
              changeTab("Booked")
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || fromDate;
    setIsFromDatePickerOpen(false);
    setFromDate(currentDate);
  };

  // Handle End Date Change
  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || toDate;
    setIsToDatePickerOpen(false);
    setToDate(currentDate);
  };

  const changeTab = (tab: string) => {
    // console.log("here")
    setAppointments(allAppointments.filter((item) => item.hisStatus === tab))
    console.log("allAppointments: ", allAppointments)
    setActiveTab(tab)
  }

  useFocusEffect(
    useCallback(() => {
      if (useUserSate.getState().loggedIn === false) {
        Alert.alert('Note', 'You must Sign In to view your appointments', [
          {
            text: 'BACK',
            onPress: () => router.back(),
            style: 'default'
          },
          {
            text: 'SIGN IN',
            onPress: () => router.push({
              pathname: "/SignIn",
            }),
            style: 'default'
          },
        ])
      }
      // console.log("here")
      const patientId = useUserSate.getState().userId;
      console.log("patientId: ", patientId)
      let branchId;
      patientService.getByPatientId(patientId)
        .then((response) => {
          branchId = response.data.branchId;
        })
        .catch((error) => {
          console.log(error);
        })
      appointmentService.getAppointments(patientId, branchId)
        .then((response) => {
          setAllAppointments(response.data);
          changeTab("Booked")
        })
        .catch((error) => {
          console.log(error);
        })

    }, [])
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <HeaderWithBackButton isPushBack={true} title={i18n.t("My Appointments")} />
            <MaterialCommunityIcons name="calendar-check-outline" size={24} color={"rgb(59, 35, 20)"} />
          </View>
          {/* <View className="pt-8">
            <Searchbox searchValue={searchValue} setSearchValue={setSearchValue}/>
          </View> */}
          <View className="flex flex-row items-center justify-center">
            <View>
              <Text>Last 1 month</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={isEnabled ? '#3b2314' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View>
              <Text>From January 1</Text>
            </View>
          </View>
          {/* <View className="flex-row justify-between my-4">
            <Pressable onPress={() => setIsFromDatePickerOpen(true)} className="flex-1 bg-gray-300 p-3 rounded-lg mr-2">
              <Text className="text-lg">{i18n.t("From")}: {moment(fromDate).format("DD-MMM-YYYY")}</Text>
            </Pressable>
            {isFromDatePickerOpen && (
              <DateTimePicker value={fromDate} mode="date" display="default" onChange={onStartDateChange} />
            )}
            <Pressable onPress={() => setIsToDatePickerOpen(true)} className="flex-1 bg-gray-300 p-3 rounded-lg ml-2">
              <Text className="text-lg">{i18n.t("To")}: {moment(toDate).format("DD-MMM-YYYY")}</Text>
            </Pressable>
            {isToDatePickerOpen && (
              <DateTimePicker value={toDate} mode="date" display="default" onChange={onEndDateChange} />
            )}
          </View> */}
          <View className="pt-2 flex flex-row  justify-between items-center">
            {tabNames.map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => changeTab(item)}
                className={`flex-1 border-b-2  pb-2 ${activeTab === item
                  ? "border-lime-600"
                  : "border-transparent"
                  }`}
              >
                <Text
                  className={`text-center font-semibold ${activeTab === item ? "text-lime-600" : ""
                    }`}
                >
                  {i18n.t(item)}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="">
            {appointments.length <= 0 &&
              <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No appointments scheduled for this filter")}</Text>
            }
            {appointments.map((item) => (
              <View
                key={`key: ${item.id}`}
                className="p-4 border border-pc-primary rounded-2xl w-full mt-4"
              >
                <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-pc-primary pb-4">
                  <View className="flex flex-row justify-start items-center ">
                    {/* <View className="bg-amber-100 rounded-lg overflow-hidden mr-3 ">
                      <Image source={item.img} />
                    </View> */}

                    <View>
                      <Text className="text-base font-medium pb-2">
                        {item.branchName} - {item.practitionerName}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <View>
                          <Text
                            className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                            {item.speciality}
                          </Text>
                        </View>
                        <View>
                          <Text
                            className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                            {item.department}
                          </Text>
                        </View>
                        <View>
                          <Text
                            className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                            {item.hisStatus}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-[12px] pt-2">
                        <Text> <AntDesign name="star" color={"#ffab00"} /> </Text>
                        {item.age}
                        <Text>
                          <Entypo name="dot-single" />
                        </Text>
                        <Text className="text-pc-primary">
                          <AntDesign name="clockcircle" /> {(new Date(item.startTime)).toDateString()} - {(new Date(item.endTime)).toDateString()}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  {/* <View className=" border border-pc-primary p-2 rounded-md ">
                    <Ionicons
                      name="heart-outline"
                      size={16}
                      color={"rgb(132 204 22)"}
                    />
                  </View> */}
                </View>
                <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
                  {item.sessionStatus === "Upcoming" ? (
                    <TouchableOpacity>
                      <Text
                        onPress={() => setCancelModal(true)}
                        className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center"
                      >
                        {i18n.t("Cancel")}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                        {i18n.t("Book Again")}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {item.sessionStatus === "Upcoming" ? (
                    <Text className="flex-1 text-white border border-pc-primary	 px-4 py-2 rounded-lg bg-[rgb(59,35,20)] text-center">
                      {i18n.t("Change Date")}
                    </Text>
                  ) : (
                    <Text onPress={() => {
                      router.push({
                        pathname: "/RateDental",
                        params: {
                          appointmentId: item.id,
                          patientName: useUserSate.getState().userName
                        }
                      });
                    }}
                      className="flex-1 text-white border border-pc-primary px-4 py-2 rounded-lg bg-[rgb(59,35,20)] text-center">
                      {i18n.t("Leave Review")}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={cancelModal} transparent={true}>
        <View
          className="h-full justify-end items-center"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View className="bg-white w-full pt-16 px-6 pb-6 rounded-t-[60px] ">
            <View className="pb-4 border-b border-dashed text-amber-500">
              <Text className="text-[#ff5630] text-2xl text-center font-semibold ">
                {i18n.t("Cancel Appointment")}
              </Text>
            </View>
            <Text className="text-lg pt-4 text-center text-pc-primary">
              {i18n.t("Are you sure you want to cancel")}?
            </Text>

            <View className="pt-8 flex-row gap-4">
              <Pressable
                onPress={() => setCancelModal(false)}
                className="flex-1"
              >
                <Text className="text-pc-primary	border border-bg-[rgb(59,35,20)] rounded-lg py-4 bg-amber-100 text-center font-medium ">
                  {i18n.t("Cancel")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/CancelAppoinment")}
                className="flex-1"
              >
                <Text className="text-white border border-bg-[rgb(59,35,20)] rounded-lg py-4 bg-[rgb(59,35,20)] text-center font-medium ">
                  {i18n.t("Confirm")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
