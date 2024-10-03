import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import DoctorCard from "../../components/ui/DoctorCard";
import { topDoctorData } from "../../constants/data";
import { useUserSate } from "../../domain/state/UserState";
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

const TopDoctor = () => {
  const { user, setUser } = useUserSate();
  const [doctor, setDoctor] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    doctorService.getAllDoctors().then((res) => {
      // console.log("filtered patient..", res.data)
      setDoctor(res.data);
      setFilteredDoctors(res.data);
    }).catch((error) => {
      console.error("Failed to fetch labratory:", error);
    });
  }, []);

  useEffect(() => {
    const selectedSpeciality = specialityList[activeSpeciality];
    let filtered = doctor;
    if (selectedSpeciality !== "All") {
      filtered = doctor.filter((doc) => doc.speciality === selectedSpeciality);
    }
    if (searchValue) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setFilteredDoctors(filtered);
  }, [activeSpeciality, searchValue, doctor]);

  return (
    <SafeAreaView>
      <ScrollView className="pt-6">
        <View className="px-6">
          <HeaderWithBackButton isPushBack={true} title="Top Doctor" />
        </View>
        <View className="pt-8 px-6 ">
          <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
        </View>

        <View className="flex-row pt-5 gap-3 pl-6">
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 12 }}
            showsHorizontalScrollIndicator={false}
            data={specialityList}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => (
              <Pressable>
                <Text
                  onPress={() => setActiveSpeciality(index)}
                  className={`text-base border border-amber-900 rounded-md py-1 px-3 ${index === activeSpeciality ? "text-white bg-amber-900" : ""
                    }`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View className="pb-16 px-6">
          {filteredDoctors.map((doc, idx) => (
            <DoctorCard {...doc} key={idx} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopDoctor;

const styles = StyleSheet.create({});
