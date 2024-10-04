import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { doctorSpecialityData } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";

const DoctorSpeciality = () => {

  let [specialtyList, setSpecialty] = useState([]);

  useEffect(() => {
    specialityService.findAll().then((response) => {
      setSpecialty(response.data);
    })
  }, [])

  return (
    <View className="pt-8">
      <View className="flex flex-row justify-between items-center w-full px-6">
        <Text className=" text-xl font-semibold">Doctor Speciality</Text>
        <Text
          onPress={() =>
            router.push({
              pathname: "/DoctorSpecialityPage",
              params: { 
                branchId: null,
                fromSpeciality: 1,
                department: null,
                callCenterFlow: 0
              }
            })
          }
          className=" font-semibold text-amber-900">
          View All
        </Text>
      </View>

      <View className="h-[90px] pt-5">

          {
            specialtyList.length === 0
            ?
            <Text className="text-center text-lg text-gray-600 mt-4">No Doctors found</Text>
            :

            <FlatList
              horizontal
              contentContainerStyle={{ gap: 8 }}
              showsHorizontalScrollIndicator={false}
              data={specialtyList}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item }) => (
                <View className="">
                  <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg"
                    onPress={() =>
                      router.push({
                        pathname: "/BranchPage",
                        params: { 
                          city: null,
                          fromSpeciality: 1,
                          department: null,
                          speciality: item.name,
                        }
                      })
                    }
                    >
                    <Text className=" bg-amber-900 rounded-md p-3 flex justify-center items-center">
                      <Ionicons name={'medical'} size={24} color={"white"} />
                    </Text>
                    <View className="px-3">
                      <Text className="font-semibold">{item.name} </Text>
                      <View>
                        <Text className="font-bodyText pt-1">
                          doctors{" "}
                          <AntDesign name="arrowright" />
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          }
      </View>
    </View>
  );
};

export default DoctorSpeciality;

const styles = StyleSheet.create({});
