import { SafeAreaView, ScrollView, View, Text, FlatList, Pressable, ViewToken, Alert } from "react-native";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/ui/DoctorCard";
import { myAppoinmentData, topDoctorData } from "../../constants/data";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
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
    const [activeCategory, setActiveCategory] = useState(0);
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
    const [searchValue, setSearchValue] = useState('');
    // let patientData = {}
    // let patientPolicyData = {}

    let dateAux = new Date();

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
                <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View>

                <View className="pb-16 px-6">
                    {filteredDoctors.map((doctor, idx) => (
                        <Pressable >
                            <DoctorCard {...doctor} key={idx} />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SpecialityListPage;