import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import doctorService from "../../domain/services/DoctorService";
import doctorImg from "../../assets/images/doctorProfile.jpg";

const DoctorProfile = () => {
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState({});
  // console.log("doctor>>>>", doctor);
  const sourceUrl = "http://16.24.11.104:8080/HISAdmin/api/resource/file/";

  // useEffect(() => {
  //   doctorService.find(id).then((doc) => {
  //     setDoctor(doc.data);
  //   });
  // }, [id]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doc = await doctorService.find(id);
        setDoctor(doc.data);
      } catch (error) {
        console.log("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [id])

  const renderValue = (value: any, placeholder: any) => {
    return value && value.length > 0 && value[0] !== "" ? value : placeholder;
  };

  const renderQualification = () => {
    const qualification = doctor.qualification && doctor.qualification.length > 0 ? doctor.qualification[0] : '';
    const qualificationDtsAr = doctor.qualificationDtsAr || '';

    if (!qualification && !qualificationDtsAr) {
      return "Qualification not specified";
    } else if (!qualification) {
      return "Qualification not specified, Details not available";
    } else if (!qualificationDtsAr) {
      return `${qualification}, Details not available`;
    }

    return `${qualification}, ${qualificationDtsAr}`;
  };

  return (
    <View className="flex-1 bg-amber-100 pt-6 mt-2">
      <View className="flex-row justify-between items-center px-6">
        <Text onPress={() => router.back()} className="bg-amber-900 rounded-full p-2">
          <Ionicons name="chevron-back" color={"white"} size={20} />
        </Text>
        <Text>
          <Octicons name="share-android" size={20} color="black" />
        </Text>
      </View>
      <TouchableOpacity onPress={() =>
        router.push({
          pathname: "/DoctorProfile",
          params: { id: id },
        })
      }>
        <View className="flex items-center justify-center mt-4 mb-6">
          {doctor.photo && doctor.photo.length > 0 && doctor.photo[0] != null ? (
            <Image
              source={{ uri: `${sourceUrl}${encodeURIComponent(doctor.photo[0])}` }}
              className="w-64 h-64 rounded-full border-4 border-amber-900 "
            />
          ) : (
            <Image source={doctorImg} className="w-64 h-64 rounded-full border-4 border-amber-900" />
          )}
        </View>
      </TouchableOpacity>
      <View className="bg-amber-900 rounded-t-3xl p-6 mt-5">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-white font-semibold">Doctor Name</Text>
            <Text className="text-2xl text-white">{doctor.name}</Text>
          </View>
          <View>
            <Text className="bg-white p-[10px] rounded-md">
              <AntDesign name="heart" size={16} color="rgb(132 204 22)" />
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center pt-4 pb-10">
          <DetailItem icon="local-hospital" label="Department" value={renderValue(doctor.department, "N/A")} />
          <DetailItem icon="directions-walk" label="Experience" value={renderValue(doctor.experience, "N/A")} />
          <DetailItem icon="star-rate" label="Rating" value={renderValue(`${doctor.rating} +`, "N/A")} />
        </View>
      </View>

      <View className="p-6 bg-slate-50 rounded-t-2xl -mt-10">
        <View className="flex-row justify-between items-center pb-2">
          <DetailItem icon="add-home" label="Professional Details" value={renderValue(doctor.professionalDts, "Details not available")} isAmber />
        </View>
        <View className="flex-row justify-between items-center pt-2 pb-5">
          <DetailItem icon="access-alarms" label="Doctor Availability" value={renderValue(doctor.clinicHoursAr, "Availability not specified")} isAmber />
        </View>
        <View className="flex-row justify-between items-center pb-5">
          <DetailItem icon="menu-book" label="Qualification" value={renderQualification()} isAmber />
        </View>
        <View className="flex-row justify-between items-center pb-5">
          <DetailItem icon="account-balance" label="Nationality" value={renderValue(doctor.nationality, "Nationality not specified")} isAmber />
        </View>
        <View className="flex-row gap-2">
          <DetailItem icon="reviews" label="Reviews" value={renderValue(doctor.reviews, "No reviews yet")} isAmber />
        </View>
      </View>
    </View>
  );
};

const DetailItem = ({ icon, label, value, isAmber = false }) => (
  <View className="flex-row items-center gap-2">
    <Text className="p-2 rounded-md bg-white">
      <MaterialIcons name={icon} size={20} color="rgb(132 204 22)" />
    </Text>
    <View>
      <Text className={`text-xs ${isAmber ? 'text-amber-900' : 'text-white'}`}>{label}</Text>
      <Text className={`text-md font-semibold ${isAmber ? 'text-amber-900' : 'text-white'}`}>{value}</Text>
    </View>
  </View>
);


export default DoctorProfile;

const styles = {
  modalContainer: {
    width: '15rem',
    height: '15rem',
  },
};