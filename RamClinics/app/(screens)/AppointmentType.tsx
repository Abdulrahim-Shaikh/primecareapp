import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { doctorSpecialityData2, servicesList } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";
import resourceService from "../../domain/services/ResourceService";

const AppointmentTypePage = () => {

    const { city, fromSpeciality, department, callCenterFlow, specialityCode, speciality, subServices } = useLocalSearchParams();
    const [subServicesList, setSubServicesList] = useState([]);
    const [searchValue, setSearchValue] = useState([]);

    useFocusEffect(
        useCallback(() => {
            setSubServicesList(JSON.parse(subServices.toString()))
            console.log("subServices: ", subServices)
        }, [])
    )


    function selectSubService(responsible: any, devices: any, callOrReception: any) {
        if (+callCenterFlow) {
            console.log("devices: ", devices)
            router.push({
                pathname: "/CityPage",
                params: {
                    branchId: null,
                    fromSpeciality: fromSpeciality,
                    department: department,
                    callCenterFlow: callCenterFlow,
                    specialityCode: specialityCode,
                    speciality: speciality,
                    responsible: (responsible == null || responsible == "" || responsible == undefined) ? "Doctor" : responsible,
                    devices: JSON.stringify(devices),
                    callOrReception: callOrReception
                }
            })
        }
    }


    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Appointment Type" isPushBack={true} />
                <View className="pt-8 ">
                    <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View>
                <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
                    {subServicesList.map(({ subServiceNameEn, subServiceNameAr, responsible, callOrReception, devices }, idx) => (
                        <Pressable
                            onPress={() => { selectSubService(responsible, devices, callOrReception) }}
                            className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4"
                            key={idx}
                        >
                            <View className="p-3 rounded-md border border-pc-primary">
                                <Image source={specialityIcon} />
                            </View>
                            <Text className="text-base font-semibold pt-3">{subServiceNameEn} {subServiceNameAr}</Text>
                            <Text className="item-center flex-row text-pc-primary pt-1">
                                Select branch {" "}
                                <Feather name="arrow-right" size={14} color="#454567" />{" "}
                            </Text>
                            {/* {
                                +fromSpeciality
                                    ?
                                    <Text className="item-center flex-row text-pc-primary pt-1">
                                        Select branch {" "}
                                        <Feather name="arrow-right" size={14} color="#454567" />{" "}
                                    </Text>
                                    :
                                    <Text className="item-center flex-row text-pc-primary pt-1">
                                        Select doctor {" "}
                                        <Feather name="arrow-right" size={14} color="#454567" />{" "}
                                    </Text>
                            } */}
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default AppointmentTypePage;

const styles = StyleSheet.create({});
