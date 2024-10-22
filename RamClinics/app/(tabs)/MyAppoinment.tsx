import {
  ActivityIndicator,
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
import { useBranches } from "../../domain/contexts/BranchesContext";
import scheduleService from "../../domain/services/ScheduleService";
import patientPolicyService from "../../domain/services/PatientPolicyService";

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
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false); // Control for start date picker modal
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { branches, changeBranches } = useBranches()
  const [branchId, setBranchId] = useState(null)
  const [patientData, setPatientData] = useState(useUserSate.getState().user)
  const [patientPolicyData, setPatientPolicyData] = useState({})
  const [user, setUser] = useState(useUserSate.getState().user);
  const [loader, setLoader] = useState(false);

  const toggleSwitch = (allAppointmentsData: any) => {
    setLoader(true)
    setIsEnabled(previousState => !previousState);
    const currentDate = new Date();
    const currentTimeInstance = moment()
    setToDate(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 6));
    if (isEnabled) {
      setFromDate(firstDayOfMonth);
      let slicedAppointments: any = []
      for (let appt of allAppointmentsData) {
        if (Object.keys(appt).includes("appointmentDate")) {
          let apptDate = new Date(...appt.appointmentDate)
          const slotTimeInstance = moment(apptDate)
          if (moment(slotTimeInstance).isSameOrAfter(moment(firstDayOfYear))) {
            slicedAppointments.push(appt)
          }
        }
      }
      // console.log("slicedAppointments: ", slicedAppointments)
      setAppointments(slicedAppointments)
      changeTab(activeTab)
    } else {
      setFromDate(firstDayOfYear);
      let slicedAppointments: any = []
      allAppointmentsData.forEach((appt: any) => {
        if (Object.keys(appt).includes("appointmentDate")) {
          let apptDate = new Date(...appt.appointmentDate)
          const slotTimeInstance = moment(apptDate)
          if (moment(slotTimeInstance).isSameOrAfter(moment(firstDayOfYear))) {
            slicedAppointments.push(appt)
          }
        }

      })
      // for (let appt of allAppointments) {
      // }
      // console.log("slicedAppointments2: ", slicedAppointments)
      setAppointments(slicedAppointments)
      changeTab(activeTab)
    }
    setLoader(false)
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
    // setAppointments(appointments.filter((item) => item.hisStatus === tab))
    setActiveTab(tab)
  }


  function bookAgain(item: any) {
    console.log("item: ", item)
    console.log("item.department: ", item.department)
    console.log("item.speciality: ", item.speciality)
    let date = new Date()
    if (item.branchId != null && item.department != null && date != null && item.speciality != null) {
      let dateString = moment(date).format("YYYY-MM-DD");
      // serious issue
      let requestBody: any = [{
        date: dateString,
        day: +moment(date).format("D"),
        resourceIds: [item.practitionerId],
        wday: moment(date).format("dddd").substring(0, 3)
      }]
      console.log("user: ", user)
      if (useUserSate.getState().loggedIn == false) {
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
          .then((patientPolicyResponse: any) => {
            setPatientPolicyData(patientPolicyResponse.data[0])
            scheduleService.getDoctorSchedule(item.branchId, item.department, item.speciality, "false", requestBody)
              .then((response) => {
                console.log("data")
                router.push({
                  pathname: "/ScheduleAppointment/",
                  params: {
                    branchId: branchId,
                    department: item.department,
                    speciality: item.speciality,
                    doctor: item.doctorName,
                    resourceId: item.resourceId,
                    date: (new Date()).toString(),
                    params: JSON.stringify(response.data[0]),
                    patientData: JSON.stringify(patientData),
                    patientPolicyData: JSON.stringify(patientPolicyResponse.data[0])
                  }
                })
              })
              .catch((error) => {
                Alert.alert('Note', 'Doctor Schedule not found')
                console.log("error doctor schedule: ", error)
              })
          })
          .catch((error) => {
            console.log("patientPolicyService.byPatientId() error: ", error)
          })
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoader(true)
      console.log("useUserSate.getState().loggedIn: ", useUserSate.getState().user)
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
      } else {
        console.log("here")
        const patientId = useUserSate.getState().userId;
        let branch = branches.find((branch: any) => branch.name === useUserSate.getState().user.branch);
        console.log("branch: ", branch)
        console.log("patientId: ", patientId)
        console.log("branch.id: ", branch.id)
        setBranchId(branch.id)
        appointmentService.getAppointments(patientId, branch.id)
          .then((response) => {
            console.log("completed success")
            setAllAppointments(response.data);
            setLoader(true)
            // setIsEnabled(previousState => !previousState);
            const currentDate = new Date();
            const currentTimeInstance = moment()
            setToDate(currentDate);
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const firstDayOfYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 6));
            if (isEnabled) {
              setFromDate(firstDayOfMonth);
              let slicedAppointments: any = []
              for (let appt of response.data) {
                if (Object.keys(appt).includes("appointmentDate")) {
                  let apptDate = new Date(...appt.appointmentDate)
                  const slotTimeInstance = moment(apptDate)
                  if (moment(slotTimeInstance).isSameOrAfter(moment(firstDayOfYear))) {
                    slicedAppointments.push(appt)
                  }
                }
              }
              // console.log("slicedAppointments: ", slicedAppointments)
              setAppointments(slicedAppointments)
              changeTab(activeTab)
              setLoader(false)
            } else {
              setFromDate(firstDayOfYear);
              let slicedAppointments: any = []
              response.data.forEach((appt: any) => {
                if (Object.keys(appt).includes("appointmentDate")) {
                  let apptDate = new Date(...appt.appointmentDate)
                  const slotTimeInstance = moment(apptDate)
                  if (moment(slotTimeInstance).isSameOrAfter(moment(firstDayOfYear))) {
                    slicedAppointments.push(appt)
                  }
                }

              })
              // for (let appt of allAppointments) {
              // }
              // console.log("slicedAppointments2: ", slicedAppointments)
              setAppointments(slicedAppointments)
              changeTab(activeTab)
              setLoader(false)
            }
            // changeTab("Booked")
          })
          .catch((error: any) => {
            console.log("errorer: ", error);
            setLoader(false)
          })
        // appointmentService.getAppointments(patientId, branchId)
        //   .then((response) => {
        //     setAllAppointments(response.data);
        //     changeTab("Booked")
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
      }

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
              <Text>Last month</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={isEnabled ? '#3b2314' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setLoader(true)
                  toggleSwitch(allAppointments)
                }}
                // onValueChange={toggleSwitch(allAppointments)}
                value={isEnabled}
              />
            </View>
            <View>
              <Text>All</Text>
            </View>
          </View>
            {
              loader && 
              <View className="pt-8">
                <ActivityIndicator size="large" color="#454567" />
              </View>
            }
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
          {/* <View className="pt-2 flex flex-row  justify-between items-center">
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
          </View> */}

          <View>
            {!loader && appointments.length <= 0 &&
              <Text className="text-center text-lg text-gray-600 mt-4">{i18n.t("No appointments scheduled for this filter")}</Text>
            }
            {appointments.map((item: any) => (
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
                        <Text className="text-pc-primary">
                          <AntDesign name="clockcircle" /> {moment(new Date(item.startTime)).format("ddd DD-MM-YYYY hh:mm")}    to    {moment(new Date(item.endTime)).format("ddd DD-MM-YYYY hh:mm")}
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
                  {/* {item.sessionStatus === "Upcoming" ? (
                    <TouchableOpacity>
                      <Text
                        onPress={() => setCancelModal(true)}
                        className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center"
                      >
                        {i18n.t("Cancel")}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                  )} */}
                  <TouchableOpacity
                    onPress={() => {
                      bookAgain(item)
                    }}
                  >
                    <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                      {i18n.t("Book Again")}
                    </Text>
                  </TouchableOpacity>

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
