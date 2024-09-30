import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import profileImg from "../../assets/images/doctors_profile.jpeg";
import LinkButton from "../../components/LinkButton";
import doctorService from "../../domain/services/DoctorService";

const DoctorProfile = () => {

  const { id } = useLocalSearchParams();
  console.log("doctors>>>>>>>>>>>" , id)
  let [doctors, setDoctor] = useState([]);
  console.log("doctors>>>>>>>>>>>" ,doctors)

  useEffect(() => {
    doctorService.find(id).then((doc) => {
        setDoctor(doc.data);
    })
}, [])

  return (
    <View className="bg-amber-100 pt-6">
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
        <View className="w-full ">
          
          <View className="bg-amber-900 rounded-t-3xl p-6 -mt-20">
          <View className="ustify-between items-center rounded pb-5">
            <Image style={styles.modalContainer} className="rounded-full" source={profileImg} />
          </View>
            <View className="flex-row justify-between items-start">
              
              <View>
                <Text className="text-white font-semibold">
                  Doctor Name
                </Text>
                <Text className="text-2xl text-white">{doctors.name}</Text>
              </View>
              <View>
                <Text className="bg-white p-[10px] rounded-md">
                  <AntDesign name="heart" size={16} color="#009281" />
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center pt-4 pb-10">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="local-hospital"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Department</Text>
                  <Text className="text-white text-xs font-semibold">{doctors.department}</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="directions-walk"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">Experience</Text>
                  <Text className="text-white text-xs font-semibold">{doctors.experience}</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="star-rate"
                    size={16}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-white text-xs">rating</Text>
                  <Text className="text-white text-xs font-semibold">{doctors.rating} +</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="p-6 bg-slate-50 rounded-t-2xl -mt-10">
            {/* <Text className="text-xl font-semibold">About Doctor</Text>
            <Text className=" text-amber-900 py-5">
              Dr. Dianne Johnson is a dedicated gynecologist committed to
              women's health and well-being. With expertise in obstetrics and
              gynecology, she provides compassionate care, emphasizing
              preventive measures and personalized treatment.
            </Text>

            <LinkButton link="/Appoinment" text="Make an appoinment" /> */}
            <View className="flex-row justify-between items-center pb-2 ">
              <View className="flex-row gap-1 bg-Blue-800 ">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="add-home"
                    size={20}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-amber-900 text-xs">Professional Details</Text>
                  <Text className="text-amber-900 text-md font-semibold">{doctors.professionalDts}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center pt-2 pb-5">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="access-alarms"
                    size={20}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-amber-900 text-xs">Doctor Availability</Text>
                  <Text className="text-amber-900 text-md font-semibold">{doctors.clinicHoursAr}</Text>
                 
              </View>
              {/* <View className="flex-row gap-2">
                <View>
                  <Text className="text-amber-900 text-md font-semibold ">      FRIDAY OFF</Text>
                </View>
              </View> */}
              </View>

            </View>
            <View className="flex-row justify-between items-center  pb-5">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="menu-book"
                    size={20}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-amber-900 text-xs">
                    Qualification
                  </Text>
                  <Text className="text-amber-900 text-md font-semibold">{doctors.qualification},  {doctors.qualificationDtsAr} </Text>
              </View>
              </View>

            </View>

            <View className="flex-row justify-between items-center pb-5">
              <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="account-balance"
                    size={20}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-amber-900 text-xs">
                    Nationality
                  </Text>
                  <Text className="text-amber-900 text-md font-semibold">{doctors.nationality}</Text>

                </View>
              </View>
            </View>
            <View className="flex-row gap-2">
                <Text className="p-2 rounded-md bg-white">
                  <MaterialIcons
                    name="reviews"
                    size={20}
                    color="#009281"
                  />
                </Text>
                <View>
                  <Text className="text-amber-900 text-xs">
                    Reviews
                  </Text>
                  <Text className="text-amber-900 text-md font-semibold">{doctors.reviews}</Text>
                </View>
              </View>

          </View>

        </View>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  modalContainer: {
    width: '15rem',
    height: '15rem',
  }
});
