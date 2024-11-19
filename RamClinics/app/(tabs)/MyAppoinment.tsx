import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import appointmentService from "../../domain/services/AppointmentService";
import { useUserSate } from "../../domain/state/UserState";
import moment from "moment";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { useBranches } from "../../domain/contexts/BranchesContext";
import scheduleService from "../../domain/services/ScheduleService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import SelectDropdown from "react-native-select-dropdown";
import specialityService from "../../domain/services/SpecialityService";

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

  const [cancelModal, setCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Booked");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const { branches, changeBranches } = useBranches()
  const [branchId, setBranchId] = useState(null)
  const [patientPolicyData, setPatientPolicyData] = useState({})
  const [user, setUser] = useState(useUserSate.getState().user);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [patientNotFoundModal, setPatientNotFoundModal] = useState(false);
  const [doctorScheduleNotFoundModal, setDoctorScheduleNotFoundModal] = useState(false);
  const [notRegisteredWithBranch, setNotRegisteredWithBranch] = useState(false);

  const filterOptions = [
    { id: 1, name: "Last Month", months: 1 },
    { id: 2, name: "All", months: -1 },
    // { id: 3, name: "6 Months", months: 6 },
  ]

  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
      setLoader(true)
      if (useUserSate.getState().loggedIn === false) {
        setPatientNotFoundModal(true)
      } else {
        const patientId = useUserSate.getState().userId;
        let branch = branches.find((branch: any) => branch.name === useUserSate.getState().user.branch);
        if (branch == undefined || branch == null || branch.length == 0) {
          setNotRegisteredWithBranch(true)
        }
        setBranchId(branch.id)
        appointmentService.getAppointments(patientId, branch.id)
          .then((response) => {
            setAllAppointments(response.data);
            setLoader(true)
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
                  // let apptDate = new Date()
                  // apptDate.setFullYear(appt.appointmentDate[0])
                  // apptDate.setMonth(appt.appointmentDate[1])
                  // apptDate.setDate(appt.appointmentDate[2])
                  let dateString = `${appt.appointmentDate[0]}-${appt.appointmentDate[1]}-${appt.appointmentDate[2]}`
                  const slotTimeInstance = moment(dateString)
                  if (slotTimeInstance.isSameOrAfter(moment(firstDayOfMonth))) {
                    slicedAppointments.push(appt)
                  }
                }
              }
              setAppointments(slicedAppointments)
              changeTab(activeTab)
              setLoader(false)
            } else {
              setFromDate(firstDayOfYear);
              let slicedAppointments: any = []
              response.data.forEach((appt: any) => {
                if (Object.keys(appt).includes("appointmentDate")) {
                  // let apptDate = new Date()
                  // apptDate.setFullYear(appt.appointmentDate[0])
                  // apptDate.setMonth(appt.appointmentDate[1])
                  // apptDate.setDate(appt.appointmentDate[2])
                  let dateString = `${appt.appointmentDate[0]}-${appt.appointmentDate[1]}-${appt.appointmentDate[2]}`
                  const slotTimeInstance = moment(dateString)
                  if (slotTimeInstance.isSameOrAfter(moment(firstDayOfYear))) {
                    slicedAppointments.push(appt)
                  }
                }

              })
              setAppointments(slicedAppointments)
              changeTab(activeTab)
              setLoader(false)
            }
          })
          .catch((error: any) => {
            console.log("errorer: ", error);
            setLoader(false)
          })
      }

    }, [])
  )

  const toggleSwitch = (allAppointmentsData: any, filter: any) => {
    setLoader(true)
    setIsEnabled(previousState => !previousState);
    const currentDate = new Date();
    const currentTimeInstance = moment()
    setToDate(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 6));
    let count = 0
    console.log("allAppointmentsData.length: ", allAppointmentsData.length)
    if (filter.name === "Last Month") {
      setFromDate(firstDayOfMonth);
      let slicedAppointments: any = []
      for (let appt of allAppointmentsData) {
        if (Object.keys(appt).includes("appointmentDate")) {
          let dateString = `${appt.appointmentDate[0]}-${appt.appointmentDate[1]}-${appt.appointmentDate[2]}`
          const slotTimeInstance = moment(dateString)
          if (slotTimeInstance.isSameOrAfter(moment(firstDayOfMonth))) {
            console.log("\n\n\nmoment(firstDayOfMonth): ", moment(firstDayOfMonth))
            count ++;
            slicedAppointments.push(appt)
          }
        }
      }
      console.log("slicedAppointments.length month: ", slicedAppointments.length)
      setAppointments(slicedAppointments)
      changeTab(activeTab)
    } else if (filter.name === "All") {
      setFromDate(firstDayOfYear);
      let slicedAppointments: any = []
      allAppointmentsData.forEach((appt: any) => {
        if (Object.keys(appt).includes("appointmentDate")) {
          let dateString = `${appt.appointmentDate[0]}-${appt.appointmentDate[1]}-${appt.appointmentDate[2]}`
          const slotTimeInstance = moment(dateString)
          if (slotTimeInstance.isSameOrAfter(moment(firstDayOfYear))) {
            console.log("slotTimeInstance: ", slotTimeInstance)
            slicedAppointments.push(appt)
          }
        }

      })
      setAppointments(slicedAppointments)
      changeTab(activeTab)
    }
    setLoader(false)
  }

  const changeTab = (tab: string) => {
    setActiveTab(tab)
  }


  function bookAgain(item: any) {
    setModalVisible(true)
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
      if (useUserSate.getState().loggedIn == false) {
        setPatientNotFoundModal(true)
      } else {
        patientPolicyService.byPatientId(user.id)
          .then((patientPolicyResponse: any) => {
            setPatientPolicyData(patientPolicyResponse.data[0])
            scheduleService.getDoctorSchedule(item.branchId, item.department, item.speciality, "false", requestBody)
              .then((response) => {
                let startTime = new Date(item.startTime)
                let endTime = new Date(item.endTime)
                const interval = moment(endTime).diff(moment(startTime), 'minutes')
                specialityService.getByDept(item.department)
                  .then((specialityListResponse: any) => {
                    for (let s of specialityListResponse.data) {
                      if (s.name == item.speciality) {
                        setModalVisible(false)
                        router.push({
                          pathname: "/SlotsConfirmationPage",
                          params: {
                            city: item.city,
                            branchID: item.branchId,
                            branch: item.branchName,
                            fromSpeciality: 0,
                            department: item.department,
                            speciality: item.speciality,
                            specialityCode: s.code,
                            callCenterFlow: 1,
                            devices: JSON.stringify([]),
                            responsible: "",
                            mobileOrOnline: moment(endTime).diff(moment(startTime), 'minutes'),
                            shift: 'Both',
                            gender: response.data[0].gender,
                            resourceId: response.data[0].practitionerId,
                            callCenterDoctorFlow: 0,
                          }
                        })
                        break;
                      }
                    }
                  })
                  .catch((error: any) => {
                    setModalVisible(false)
                    console.log("specialityService.getByDept error: ", error.response)
                  })
              })
              .catch((error) => {
                setModalVisible(false)
                setDoctorScheduleNotFoundModal(true)
                // Alert.alert('Note', 'Doctor Schedule not found')
                console.log("error doctor schedule: ", error)
              })
          })
          .catch((error) => {
            setModalVisible(false)
            console.log("patientPolicyService.byPatientId() error: ", error)
          })
      }
    }
    setModalVisible(false)
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <HeaderWithBackButton isPushBack={true} title={i18n.t("My Appointments")} />
            <MaterialCommunityIcons name="calendar-check-outline" size={24} color={"rgb(59, 35, 20)"} />
          </View>
          <View className="mt-6 border py-4 pl-4 rounded-xl mb-2 w-1/3">
            <SelectDropdown
              data={filterOptions}
              defaultValue={filterOptions[0]}
              onSelect={(selectedItem, index) => {
                toggleSwitch(allAppointments, selectedItem)
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View>
                    <Text>
                      {(selectedItem && selectedItem.name)}
                    </Text>
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
          </View>
          {
            loader &&
            <View className="pt-2">
              <ActivityIndicator size="large" color="#454567" />
            </View>
          }
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
                        {
                          item.department != null && item.department != "" &&
                          <View>
                            <Text
                              className='text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md'>
                              {item.department}
                            </Text>
                          </View>
                        }
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
                </View>
                <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
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

      <Modal transparent={true} animationType="fade" visible={doctorScheduleNotFoundModal} onRequestClose={() => {
        setDoctorScheduleNotFoundModal(false)
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <View className="flex flex-row justify-center">
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={60}
                color={"#EF4444"}
              />
            </View>
            <Text className="text-xl font-bold text-center mb-4 pt-3">{i18n.t('Doctor schedule not found')}</Text>
            <View className=" flex-row justify-end gap-5 items-center py-4">
              <Pressable onPress={() => {
                setDoctorScheduleNotFoundModal(false)
              }} >
                <Text> {i18n.t('Back')} </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal transparent={true} animationType="fade" visible={notRegisteredWithBranch} onRequestClose={() => setNotRegisteredWithBranch(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <View className="flex flex-row justify-center">
              <MaterialCommunityIcons
                name="information-outline"
                size={60}
                color={"#737373"}
              />
            </View>
            <Text className="text-xl font-bold text-center mb-4 pt-3">{i18n.t('Patient is not registered with any branch')}</Text>
            <View className=" flex-row justify-between gap-5 items-center py-4">
              <Pressable onPress={() => {
                setNotRegisteredWithBranch(false)
                router.back()
              }} >
                <Text> {i18n.t('Back')} </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} animationType="fade" visible={patientNotFoundModal} onRequestClose={() => setPatientNotFoundModal(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <View className="flex flex-row justify-center">
              <MaterialCommunityIcons
                name="information-outline"
                size={60}
                color={"#737373"}
              />
            </View>
            <Text className="text-xl font-bold text-center mb-4 pt-3">{i18n.t('You must sign in to view all your appointments')}</Text>
            <View className=" flex-row justify-between gap-5 items-center py-4">
              <Pressable onPress={() => {
                setPatientNotFoundModal(false)
                router.back()
              }} >
                <Text> {i18n.t('Back')} </Text>
              </Pressable>
              <Pressable onPress={() => {
                setPatientNotFoundModal(false)
                router.push('/SignIn')
              }}>
                <Text> {i18n.t('Sign in')} </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
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
