import { Image, SafeAreaView, ScrollView, View, Text, FlatList, TouchableOpacity, Button, TextInput, ViewToken, Pressable, Alert } from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { myAppoinmentData } from "../../constants/data";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";
import SelectDropdown from "react-native-select-dropdown";
import resourceService from "../../domain/services/ResourceService";
import DateTimePicker from '@react-native-community/datetimepicker';
import scheduleService from "../../domain/services/ScheduleService";
import { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
// import sliderImg1 from "../../assets/images/doc1.png";
import sliderImg2 from "../../assets/images/doc2.png";
// import sliderImg3 from "../../assets/images/doc3.png";
// import sliderImg4 from "../../assets/images/doc3.png";
import branchService from "../../domain/services/BranchService";
import moment from 'moment';
import patientService from "../../domain/services/PatientService";
import patientPolicyService from "../../domain/services/PatientPolicyService";
import { useUserSate } from "../../domain/state/UserState";

const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#d4d4d8',
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

const ServiceListPage = () => {
    const [branchOptions, setBranchOptions] = useState([])
    const [branchId, setBranchId] = useState("")
    const [specialityOptions, setSpecialityOptions] = useState([])
    const [speciality, setSpeciality] = useState("")
    const [doctorOptions, setDoctorOptions] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [doctor, setDoctor] = useState(null)
    const { department } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());  // State for start date
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // Control for start date picker modal
    const [appointmentEntry, setAppointmentEntry] = useState(false)
    const [doctorScheduleData, setDoctorScheduleData] = useState(myAppoinmentData)
    const [patientData, setPatientData] = useState({})
    const [patientPolicyData, setPatientPolicyData] = useState({})
    const [resourceId, setResourceId] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const flatListRef = useAnimatedRef<FlatList<any>>();
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);
    // let patientData = {}
    // let patientPolicyData = {}

    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (viewableItems && viewableItems[0]?.index !== null) {
            flatListIndex.value = viewableItems[0]?.index;
        }
    };

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        console.log(`option: '${department}'`)
        const mobile = useUserSate.getState().user.mobile? useUserSate.getState().user.mobile: "0594951370"
        patientService.byMobileNo(mobile)
        .then((response: any) => {
            console.log("patientService.byMobileNo: ", response)
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

    const [activeCategory, setActiveCategory] = useState(0);
    let dateAux = new Date();



    const search = () => {
        if (department != null && date != null && speciality != null && doctor != null) {
            console.log("validateForm", department)
            console.log("validateForm", speciality)
            let dateString = moment(date).format("YYYY-MM-DD");
            let today= moment().format("YYYY-MM-DD");
            console.log("today: ", today)
            console.log("dateString: ", dateString)
            let requestBody: any = [{
                date: dateString,
                day: 1,
                resourceIds: [resourceId],
                wday: "Mon"
            }]
            scheduleService.getDoctorSchedule(branchId, department, speciality, "false", requestBody)
                .then((response) => {
                    console.log("rresponse getDoctorSchedule: ", response.data)
                    setAppointmentEntry(true)
                    setDoctorScheduleData(response.data)
                    resourceService.find(response.data[0].practitionerId)
                    .then((response) => {
                        if (response.data[0] && response.data[0].photo.length > 0 && response.data[0].photo[0]) {
                            setPhotoUrl(`http://16.24.11.104:8080/HISAdmin/api/resource/file/${response.data[0].photo[0]}`)
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
            // router.push({
            //     pathname: "/ScheduleAppointment",
            //     params: {
            //         department: option,
            //         speciality: speciality,
            //         doctor: doctor,
            //         date: (new Date(date)).toString()
            //     }
            // })
        }
    }


    const [showOptions, setShowOptions] = useState(false);
    const [searchText, setSearchText] = useState("");
    const filterOptions = (text: any) => {
        setSearchText(text);
        setShowOptions(true);
    };




    return (
        <SafeAreaView>
            <ScrollView>
                <View className="pt-8 px-6">
                    <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={"#009281"}
                            onPress={() => router.back()}
                        />
                        <Text className="text-2xl font-semibold">Select your Service</Text>
                    </View>
                    {/* <View className="pt-8">
                        <Searchbox />
                    </View> */}
                    <View className="py-8 gap-4 flex justify-center">
                        <View className="mt-4 flex flex-column gap-5">
                            <View className="flex flex-row justify-center gap-3">
                                <SelectDropdown
                                    data={branchOptions}
                                    onSelect={(selectedItem, index) => {
                                        setBranchId(selectedItem.id)
                                        console.log("selectedItemmmmmm: ", selectedItem.id)
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem && selectedItem.name) || 'Select a Branch'}
                                                </Text>
                                                <MaterialCommunityIcons
                                                    name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                    size={24}
                                                    color={"#009281"}
                                                />
                                            </View>
                                        )
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />
                            </View>
                            <View className="flex flex-row justify-center gap-3">
                                <SelectDropdown
                                    data={[department]}
                                    defaultValue={department}
                                    disabled={true}
                                    onSelect={(selectedItem, index) => {
                                        console.log("hererere")
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem) || 'Select a department'}
                                                </Text>
                                                <MaterialCommunityIcons
                                                    name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                    size={24}
                                                    color={"#009281"}
                                                />
                                            </View>
                                        )
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />
                            </View>
                            {branchId != "" ?
                                <View className="flex flex-row justify-center gap-3">
                                    <SelectDropdown
                                        data={specialityOptions}
                                        onSelect={(selectedItem, index) => {
                                            setSpeciality(selectedItem.name)
                                            resourceService.getResourceBySpeciality(branchId, department, selectedItem.name)
                                                .then((response) => {
                                                    console.log("response2: ", response.data)
                                                    setDoctorOptions(response.data)
                                                })
                                                .catch((error) => {
                                                    console.log("errrr: ", error)
                                                })
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={styles.dropdownButtonStyle}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.name) || 'Select a service'}
                                                    </Text>
                                                    <MaterialCommunityIcons
                                                        name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                        size={24}
                                                        color={"#009281"}
                                                    />
                                                </View>
                                            )
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                    <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                                :
                                <></>
                            }

                            {branchId != "" ?
                                <Pressable 
                                // onPress={() => {
                                // }}
                                className="flex flex-row justify-center gap-3">
                                    <SelectDropdown
                                        data={doctorOptions}
                                        onSelect={(selectedItem, index) => {
                                            setDoctorScheduleData([])
                                            setAppointmentEntry(false)
                                            setDoctor(selectedItem.name)
                                            setResourceId(selectedItem.id)
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={styles.dropdownButtonStyle}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.name) || 'Select a doctor'}
                                                    </Text>
                                                    <MaterialCommunityIcons
                                                        name={isOpened ? "arrow-up-drop-circle-outline" : "arrow-down-drop-circle-outline"}
                                                        size={24}
                                                        color={"#009281"}
                                                    />
                                                </View>
                                            )
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                    <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </Pressable>
                                :
                                <></>
                            }
                            {branchId != "" ?
                                <View className="flex flex-row justify-center gap-3">
                                    <View className="flex flex-column justify-center">
                                        {/* <TouchableOpacity className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                            <Text className="text-white">Select Date</Text>
                                        </TouchableOpacity> */}
                                        <Button onPress={() => setIsDatePickerOpen(true)} title="Select Date" />
                                        <TextInput
                                            onChangeText={() => setIsDatePickerOpen(true)}
                                            value={"Selected: " + (new Date(date)).toString()}
                                        />
                                    </View>
                                    {isDatePickerOpen && (
                                        <View>
                                            <DateTimePicker
                                                value={dateAux}
                                                mode="date"
                                                display="default"
                                                onChange={(selectedDate: any) => {
                                                    console.log("dateeeee: ", selectedDate.nativeEvent.timestamp)
                                                    const currentDate = selectedDate.nativeEvent.timestamp || date;
                                                    setDate(currentDate);
                                                    setIsDatePickerOpen(false);
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                                :
                                <></>
                            }
                            {branchId != "" ?
                                <View className="flex flex-row justify-center gap-3">
                                    <View className="flex flex-column justify-center">
                                        <TouchableOpacity onPress={() => { search() }}
                                            className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                            <Text className="text-white">Search</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            {appointmentEntry ?
                                <View className="">
                                    {doctorScheduleData.map((item, idx) => (
                                        <View key={`key: ${item.id}`} className="p-4 border border-amber-900 rounded-2xl w-full mt-4">
                                            <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-amber-900 pb-4">
                                                <View className="flex flex-row justify-start items-center ">
                                                    <View className="bg-amber-100 rounded-lg overflow-hidden mr-3 ">
                                                        {/* <Image source={{ uri: photoUrl, }} /> */}
                                                    </View>

                                                    <View>
                                                        <Text className="text-base font-medium pb-2">
                                                            {item.name}
                                                        </Text>
                                                        <View className="flex-row items-center">
                                                            <View>
                                                                <Text className="text-[12px] text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md"
                                                                    // className={`text-[12px] ${item.sessionStatus === "Upcoming" &&
                                                                    //     "text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md"
                                                                    //     } ${item.sessionStatus === "Completed" &&
                                                                    //     "text-amber-900 bg-amber-100 px-2 py-1 rounded-md"
                                                                    //     } ${item.sessionStatus === "Cancelled" &&
                                                                    //     "text-[#f75555] bg-[#feeeee] px-2 py-1 rounded-md"
                                                                    //     } `}
                                                                >
                                                                    {item.speciality}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View className=" border border-amber-900 p-2 rounded-md ">
                                                    <Ionicons
                                                        name="heart-outline"
                                                        size={16}
                                                        color={"#009281"}
                                                    />
                                                </View>
                                            </View>
                                            <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
                                                <TouchableOpacity
                                                onPress={() => {
                                                    console.log("item: ", item)
                                                }}
                                                >
                                                    <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center" >
                                                        Cancel
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text>{item.slots.length}</Text>
                                                <Text className="flex-1 text-white border border-amber-900 px-4 py-2 rounded-lg bg-amber-900 text-center"
                                                    onPress={() => 
                                                    { Object.keys(item.slots).length == 0
                                                        ?
                                                            Alert.alert('Note', 'No slots available for appointment', [
                                                                {
                                                                    text: 'OK',
                                                                    // onPress: () => router.push({
                                                                    //     pathname: "/BookAppointment",
                                                                    // }),
                                                                    style: 'default'
                                                                },
                                                            ],
                                                            )
                                                        :
                                                            router.push({
                                                                pathname: "/ScheduleAppointment/",
                                                                params: {
                                                                    branchId: branchId,
                                                                    department: department,
                                                                    speciality: speciality,
                                                                    doctor: doctor,
                                                                    date: (new Date(date)).toString(),
                                                                    params: JSON.stringify(item),
                                                                    patientData: JSON.stringify(patientData),
                                                                    patientPolicyData: JSON.stringify(patientPolicyData)
                                                                }
                                                            })
                                                        }
                                                    }
                                                >
                                                    Schedule Appointment
                                                </Text>

                                            </View>
                                        </View>
                                    ))}
                                </View>
                                // <View className="mt-8 flex flex-row justify-center">
                                //     <View className="flex flex-col justify-center">
                                //         <Text className="flex justify-center justify-self-center">{doctor}</Text>
                                //         <View className="flex flex-row">
                                //             <TouchableOpacity
                                //                 onPress={() => {
                                //                     router.push({
                                //                         pathname: "/ScheduleAppointment",
                                //                         params: {
                                //                             department: department,
                                //                             speciality: speciality,
                                //                             doctor: doctor,
                                //                             date: (new Date(date)).toString(),
                                //                             data: JSON.stringify(doctorScheduleData)
                                //                         }
                                //                     })
                                //                 }}
                                //                 className="flex flex-row justify-center bg-amber-900 border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg">
                                //                 <Text className="text-white">Book Appointment</Text>
                                //             </TouchableOpacity>
                                //         </View>
                                //     </View>
                                // </View>
                                : <></>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ServiceListPage;