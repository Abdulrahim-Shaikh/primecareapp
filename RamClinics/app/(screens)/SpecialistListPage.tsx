import { SafeAreaView, ScrollView, View, Text, FlatList, Pressable, ViewToken, Alert } from "react-native";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/ui/DoctorCard";
import { myAppoinmentData, topDoctorData } from "../../constants/data";
import { router, useGlobalSearchParams, useLocalSearchParams} from "expo-router";
import { useAnimatedRef, useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import branchService from "../../domain/services/BranchService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import patientService from "../../domain/services/PatientService";
import specialityService from "../../domain/services/SpecialityService";
import { useUserSate } from "../../domain/state/UserState";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import scheduleService from "../../domain/services/ScheduleService";
import resourceService from "../../domain/services/ResourceService";
import doctorService from "../../domain/services/DoctorService";


const specialityList = [
  "All",
  "General Dentist",
  "General Practitioner",
  "Dermatology",
  "Internal Medicine",
  "Orthodontics",
  "Pedodontics",
  "Machine"
];

const SpecialityListPage = () => {
    const [ activeCategory, setActiveCategory ] = useState(0);
    const [activeSpeciality, setActiveSpeciality] = useState(0);
    const [branchOptions, setBranchOptions] = useState([])
    const [specialityOptions, setSpecialityOptions] = useState([])
    const [doctor, setDoctor] = useState(null)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const { department } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());  // State for start date
    const [patientData, setPatientData] = useState({})
    const [patientPolicyData, setPatientPolicyData] = useState({})
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [branchId, setBranchId] = useState(null)
    const [selectedDoctor, setSelectedDoctor] = useState(topDoctorData[0])
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);
    // let patientData = {}
    // let patientPolicyData = {}

    let dateAux = new Date();

    const searchSchedule = () => {
        console.log("hereerereeeee")
        console.log("department: ", department)
        console.log("selectedDoctor.speciality: ", selectedDoctor.speciality)
        console.log("doctor: ", doctor)
        console.log("date: ", date)
        if (department != null && date != null && selectedDoctor.speciality != null) {
            console.log("inside")
            console.log("validateForm", department)
            console.log("validateForm", selectedDoctor.speciality)
            let dateString = moment(date).format("YYYY-MM-DD");
            let today= moment().format("YYYY-MM-DD");
            console.log("today: ", today)
            console.log("dateString: ", dateString)
            let requestBody: any = [{
                date: dateString,
                day: 1,
                resourceIds: [selectedDoctor.id],
                wday: "Mon"
            }]
            scheduleService.getDoctorSchedule(branchId, department, selectedDoctor.speciality, "false", requestBody)
                .then((response) => {
                    console.log("rresponse getDoctorSchedule: ", response.data)
                    resourceService.find(response.data[0].practitionerId)
                    .then((response) => {
                        if (response.data.length > 0) {
                            router.push({
                                pathname: "/ScheduleAppointment/",
                                params: {
                                    branchId: branchId? branchId : "7215165",
                                    department: department,
                                    speciality: selectedDoctor.speciality,
                                    doctor: doctor,
                                    date: (new Date(date)).toString(),
                                    params: JSON.stringify(selectedDoctor),
                                    patientData: JSON.stringify(patientData),
                                    patientPolicyData: JSON.stringify(patientPolicyData)
                                }
                            })
                            console.log("response: ", response)
                        }
                    })
                    .catch((error) => {
                        console.log("resourceService.findById() error: ", error)
                    })
                    // setAppointmentEntry(true)
                })
                .catch((err) => {
                    console.log(err);
                })
                            router.push({
                                pathname: "/ScheduleAppointment/",
                                params: {
                                    branchId: branchId? branchId : "7215165",
                                    department: department,
                                    speciality: selectedDoctor.speciality,
                                    doctor: doctor,
                                    date: (new Date(date)).toString(),
                                    params: JSON.stringify(selectedDoctor),
                                    patientData: JSON.stringify(patientData),
                                    patientPolicyData: JSON.stringify(patientPolicyData)
                                }
                            })
            // router.push({
            //     pathname: "/ScheduleAppointment",
            //     params: {
            //         department: option,
            //         speciality: speciality,
            //         doctor: doctor,
            //         date: (new Date(date)).toString()
            //     }
            // })
            console.log("outside")
        }

    }



    useEffect(() => {
        doctorService.getAllDoctors().then((res) => {
            console.log("filtered patient..", res.data)
            setDoctor(res.data);
            setFilteredDoctors(res.data);
        }).catch((error) => {
            console.error("Failed to fetch labratory:", error);
        });
        console.log(`option: '${department}'`)
        patientService.byMobileNo(useUserSate.getState().user.mobile)
        .then((response: any) => {
            console.log("patientService.byMobileNo: ", response)
            setPatientData(response.data[0])


            console.log("response.data[0].registerBranch: ", response.data[0].registerBranch)
            branchService.getBranchByName(response.data.registerBranch)
            .then((response: any) => {
                setBranchId(response.data.id)
            })
            .catch((error) => {
                console.log("branchService.getBranchByName() error: ", error)
            })


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
            console.log("errorrrr: ", error)
        })

        branchService.findAll()
            .then((response) => {
                setBranchOptions(response.data)
            })
            .catch((error) => {
                console.log("branchService.findAll() error: ", error)
            })

        specialityService.getByDept(department)
            .then((response) => {
                // setSpecialities(response.data)
                console.log("getByDept: ", response.data)
                setSpecialityOptions(response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "Old Flow" || speciality.flowType === "Both")))
            })
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 pb-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <View className="px-6">
                            <HeaderWithBackButton isPushBack={true} title="Find your specialist" />
                        </View>
                    </View>
                </View>
                <View className="px-6 ">
                    <Searchbox />
                </View>

                <View className="pb-16 px-6">
                    {filteredDoctors.map((doctor, idx) => (
                        <Pressable
                            onPress={() => {
                                console.log("\n\n\n\nselectdoctro")
                                let item = filteredDoctors[idx]
                                setSelectedDoctor(item)
                                setIsDatePickerOpen(true)
                            }}
                        >
                            <DoctorCard
                            onPress={() => {
                                console.log("\n\n\n\nselectdoctro")
                                let item = filteredDoctors[idx]
                                setSelectedDoctor(item)
                                setIsDatePickerOpen(true)
                            }}
                             {...doctor} key={idx} />
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
                                            searchSchedule()
                                        }}
                                    />
                                </View>
                            )}
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SpecialityListPage;