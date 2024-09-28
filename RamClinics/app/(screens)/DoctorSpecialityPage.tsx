import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { doctorSpecialityData2 } from "../../constants/data";
import specialtyService from "../../domain/services/SpecialtyService";

const DoctorSpecialityPage = () => {

  specialtyService.findAll().then((res) => {
    let specialtyData = res.data
  });

  return (
    <SafeAreaView>
      <ScrollView className="p-6">
        <HeaderWithBackButton title="Doctor Speciality" isPushBack={true} />
        <View className="flex-row flex-wrap gap-4 pt-8 pb-16">
          {doctorSpecialityData2.map(({ name, img, totalDoctor }, idx) => (
            <Pressable
              onPress={() => router.push("/CityPage")}
              className="w-[45%] border border-amber-900 rounded-lg justify-center items-center p-4"
              key={idx}
            >
              <View className="p-3 rounded-md border border-amber-900">
                <Image source={img} />
              </View>
              <Text className="text-base font-semibold pt-3">{name}</Text>
              <Text className="item-center flex-row text-amber-900 pt-1">
                {totalDoctor} doctors{" "}
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
