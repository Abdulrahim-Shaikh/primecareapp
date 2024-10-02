import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { doctorSpecialityData2 } from "../../constants/data";
import specialityService from "../../domain/services/SpecialityService";
import specialityIcon from "../../assets/images/docton-speciality-icon-3.png";
import Searchbox from "../../components/ui/Searchbox";

const DoctorSpecialityPage = () => {

  let [specialtyList, setSpecialty] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    specialityService.findAll().then((response) => {
      setSpecialty(response.data);
    })
  }, [])

  // useEffect(() => {
  //   if (searchValue) {
  //     const filtered = specialtyList.filter((doc) =>
  //       doc.name.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //     setSpecialty(filtered); 
  //   } else {
  //     setSpecialty(specialtyList); 
  //   }
  // }, []);

  return (
    <SafeAreaView>
      <ScrollView className="p-6">
        <HeaderWithBackButton title="Doctor Speciality" isPushBack={true} />
        <View className="pt-8 ">
          <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
        </View>
        <View className="flex-row flex-wrap gap-4 pt-6 pb-16">
          {specialtyList.map(({ name }, idx) => (
            <Pressable
              onPress={() => router.push("/CityPage")}
              className="w-[45%] border border-amber-900 rounded-lg justify-center items-center p-4"
              key={idx}
            >
              <View className="p-3 rounded-md border border-amber-900">
                <Image source={specialityIcon} />
              </View>
              <Text className="text-base font-semibold pt-3">{name}</Text>
              <Text className="item-center flex-row text-amber-900 pt-1">
                doctors{" "}
                <Feather name="arrow-right" size={14} color="#454567" />{" "}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorSpecialityPage;

const styles = StyleSheet.create({});
