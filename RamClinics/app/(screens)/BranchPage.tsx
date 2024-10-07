import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import branchService from "../../domain/services/BranchService";
import { useEffect, useState } from "react";
import logoRamClinic from "../../assets/logo/logo-ram-clinic.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";

const BranchPage = () => {

    const { city, fromSpeciality, department, speciality, specialityCode, callCenterFlow, devices, responsible, callOrReception } = useLocalSearchParams();
    const [devicesList, setDevicesList] = useState(JSON.parse(devices.toString()));
    const [branches, setBranches] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (devices != null || devices != "") {
            setDevicesList(JSON.parse(devices.toString()))
        }
        if (+callCenterFlow) {
            let deviceCode: any = ""
            for (let device of devicesList) {
                deviceCode += device.deviceCode + ","
            }
            const getBranchBySpecialityCity = async () => {
                let response = await resourceService.getBranchBySpecialityCity(specialityCode, city, deviceCode)
                console.log("getBranchBySpecialityCity response.data: ", response.data)
                setBranches(response.data)
            }
            getBranchBySpecialityCity()
        } else {
            if (city == null || city == "" || city.length == 0) {
                console.log("department: ", department)
                console.log("speciality: ", speciality)
                branchService.findAll().then((res) => {
                    setBranches(res.data);
                }).catch((error) => {
                    console.log("branchService.findAll() error", error);
                })
            } else {
                branchService.getAllBranchesInCity(city).then((res) => {
                    setBranches(res.data);
                });
            }
        }
    }, []);

    function selectCity(item: any) {
        console.log("branchItem: ", item)
        if (+callCenterFlow) {
            router.push({
                pathname: "/ShiftAndGenderOptions",
                params: {
                    city: city,
                    branch: item,
                    fromSpeciality: fromSpeciality,
                    department: null,
                    speciality: speciality,
                    specialityCode: specialityCode,
                    callCenterFlow: callCenterFlow,
                    devices: devices,
                    responsible: responsible,
                    callOrReception: callOrReception
                }
            })
        } else {
            if (+fromSpeciality) {
                router.push({
                    pathname: "/BranchDoctor",
                    params: {
                        branchId: item.id,
                        fromSpeciality: fromSpeciality,
                        department: null,
                        speciality: speciality
                    }
                })
            } else {
                console.log("\n\n\ngoing from branch page to doctorSpeciality page")
                router.push({
                    pathname: "/DoctorSpecialityPage",
                    params: {
                        branchId: item.id,
                        fromSpeciality: fromSpeciality,
                        department: department,
                        callCenterFlow: 0
                    }
                })
            }
        }
    }


    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Select Branch" isPushBack={true} />
                {/* <View className="pt-8">
                    <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View> */}
                <View className="flex-1 pt-6 space-y-4 ">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={branches}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => (
                            <View className="w-full">
                                <Pressable
                                    className="flex flex-row border border-pc-primary rounded-lg p-4 shadow-sm bg-white"
                                    onPress={() => selectCity(item)}>
                                    <View className="rounded-smg bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                        <Image source={logoRamClinic} style={{ width: 50, height: 50 }} />
                                    </View>
                                    <View className="px-4 flex justify-center">
                                        {
                                            +callCenterFlow
                                                ?
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item}
                                                </Text>
                                                :
                                                <Text className="font-semibold text-lg text-gray-800">
                                                    {item?.name}
                                                </Text>
                                        }
                                        {
                                            +callCenterFlow
                                                ?
                                                <Text className="text-gray-600 pt-1">
                                                    {city}
                                                </Text>
                                                :
                                                <Text className="text-gray-600 pt-1">
                                                    {item?.city}
                                                </Text>
                                        }
                                    </View>
                                </Pressable>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default BranchPage;