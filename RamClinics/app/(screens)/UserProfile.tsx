import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/UserIcon.png";
import LinkButton from "../../components/LinkButton";
import { useUserSate } from "../../domain/state/UserState";
import emptyProfileImg from "../../assets/images/avatar.png";
import patientService from "../../domain/services/PatientService";

const UserProfile = () => {
  const { user, setUser } = useUserSate();
  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/patient/file/";
  let [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await patientService.find(user.id);
        setPatient(res.data)
      } catch (error) {
        console.error("Filter Error", error)
      }
    };
    fetchPatient();
  }, []);

  return (
    <View className="pt-6">
      <View className="h-full justify-between items-start w-full">
        <View className="flex-row justify-between items-center pt-6 px-6 w-full">
          <Text
            onPress={() => router.back()}
            className="bg-amber-900 rounded-full p-2"
          >
            <Ionicons name="chevron-back" color={"white"} size={20} />
          </Text>
          <Text className="">
            <Octicons name="share-android" size={20} color="black" />
          </Text>
        </View>
        <View className="w-full">
          <View className="flex-row justify-center items-start">
            {user && user.profileImg && user.profileImg.length > 0 && user.profileImg[0].length > 0 ?
              <Image source={{ uri: `${sourceUrl}${encodeURIComponent(user.profileImg[0])}` }} className="w-64 h-64 rounded-lg" />
              :
              <Image source={emptyProfileImg} className="w-64 h-64 rounded-lg" />
            }
          </View>
          <View className="text-amber-950 justify-center items-center text m-1">
            {/* <Text className="text-blue-500 text-xl font-semibold">{user && user.email ? user.email : "person@ramclinic.com"}</Text> */}
          </View>
        </View>
        <View className="w-full">
          <View className="bg-amber-900 rounded-t-3xl p-6 ">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className=" text-white">First Name</Text>
                <Text className="text-lime-500 text-md font-semibold text-xl">
                  {user && user.firstName ? user.firstName : "Unknown"}
                </Text>
              </View>
              <View>
                <Text className="text-base text-white">Last Name</Text>
                <Text className="text-lime-500 text-md font-semibold text-xl">
                  {user && user.lastName ? user.lastName : "Person"}
                </Text>
              </View>
              <View>
                <Text className="bg-lime-500 p-[10px] bg-white rounded-md">
                  <AntDesign name="heart" size={20} color="#84cc16" />
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-12 pb-8">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="list"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">MRN NO </Text>
                  <View className="rounded-md">
                    <Text className="text-lime-500 text-md font-bold">{patient && patient.mrno ? patient.mrno : "KHB100105421846"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="2k-plus"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Nationl Id</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-500 text-md font-bold">{patient && patient.nationalId ? patient.nationalId : "28458625824"}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between items-center pb-8 pr-3">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="motion-photos-auto"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Gender </Text>
                  <View className="rounded-md ">
                    <Text className="text-lime-500 text-md font-bold">{patient && patient.gender ? patient.gender : "Dont Know"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2 ml-16">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="people-outline"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Date Of Birth</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-500 text-md font-bold">
                      {patient && patient.dob ? new Date(patient.dob).toLocaleDateString() : "05/06/1999"}
                    </Text>

                  </View>
                </View>
              </View>

            </View>

            <View className="flex-row justify-between items-center pb-20">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="flag"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Nationality</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-500 text-md font-bold">{patient && patient.nationality ? patient.nationality : "India"}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2 pr-1">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="mobile-friendly"
                    size={20}
                    color="#84cc16"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Mobile Number</Text>
                  <View className="rounded-md">
                    <Text className="text-lime-500 text-md font-bold">{user && user.mobile ? user.mobile : "28458625824"}</Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
          <View className="p-2 rounded-t-2xl bg-white -mt-10">
            <LinkButton link="/Appoinment" text="Make an appointment" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
