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
import { doctorSpecialityData2 } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";

const DoctorSpecialityPage = () => {

  const { branchId, fromSpeciality, department, callCenterFlow } = useLocalSearchParams();
  const [ specialityList, setSpecialityList ] = useState([]);
  const [ searchValue, setSearchValue ] = useState([]);

  const fetchSpecialities = async () => {
    if (department != null) {
      if (+callCenterFlow) {
        const response = await specialityService.getSpecialityServiceByDepartmentTest(department)
        setSpecialityList(response.data)
        console.log("response.data: ", response.data)
      } else {
        const response = await specialityService.getByDept(department)
        setSpecialityList(
          +callCenterFlow
            ? response.data
            : response.data.filter((speciality: any) => speciality.flowType != null && (speciality.flowType === "Old Flow" || speciality.flowType === "Both"))
        )
      }
    } else {
      const response = await specialityService.findAll()
      setSpecialityList(response.data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSpecialities()
    }, [])
  )


  function selectSpeciality(code: any, speciality: any, services: any) {
    console.log("fromSpeciality: ", fromSpeciality)
    console.log("")
    if (+callCenterFlow) {
      router.push({
        pathname: "/ServicesListPage",
        params: {
          city: null,
          fromSpeciality: fromSpeciality,
          department: department,
          callCenterFlow: callCenterFlow,
          specialityCode: code,
          speciality: speciality,
          services: JSON.stringify(services)
        }
      })
      // router.push({
      //   pathname: "/CityPage",
      //   params: {
      //     city: null,
      //     fromSpeciality: fromSpeciality,
      //     department: department,
      //     callCenterFlow: callCenterFlow,
      //     speciality: speciality
      //   }
      // })
    } else {
      if (+fromSpeciality) {
        router.push({
          pathname: "/BranchPage",
          params: {
            city: null,
            fromSpeciality: fromSpeciality,
            department: department,
            speciality: speciality,
            specialityCode: code,
            callCenterFlow: callCenterFlow,
            devices: JSON.stringify(""),
            responsible: "",
            callOrReception: ""
          }
        })
      } else {
        router.push({
          pathname: "/BranchDoctor",
          params: {
            branchId: branchId,
            fromSpeciality: fromSpeciality,
            department: department,
            speciality: speciality
          }
        })
      }
    }
  }


  return (
    <SafeAreaView>
      <ScrollView className="p-6">
        <HeaderWithBackButton title="Doctor Speciality" isPushBack={true} />
        {/* <View className="pt-8 ">
          <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
        </View> */}
        <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
          {specialityList.map(({ code, name, services }, idx) => (
            <Pressable
              onPress={() => { selectSpeciality(code, name, services) }}
              className="w-[45%] border border-pc-primary rounded-lg justify-center items-center p-4"
              key={idx}
            >
              <View className="p-3 rounded-md border border-pc-primary">
                <Image source={specialityIcon} />
              </View>
              <Text className="text-base font-semibold pt-3">{name}</Text>
              {
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
              }
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default DoctorSpecialityPage;

const styles = StyleSheet.create({});
