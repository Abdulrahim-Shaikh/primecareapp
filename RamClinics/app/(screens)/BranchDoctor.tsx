import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithBackButton from '../../components/ui/HeaderWithBackButton';
import Searchbox from '../../components/ui/Searchbox';
import DoctorCard from '../../components/ui/DoctorCard';
import doctorService from '../../domain/services/DoctorService';
import resourceService from '../../domain/services/ResourceService';


const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const BranchDoctor = () => {

    const [searchValue, setSearchValue] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);

    const { branchId, fromSpeciality, department, speciality } = useLocalSearchParams();
    let [doctors, setDoctors] = useState([]);
    let [loader, setLoader] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoader(true);
            console.log("\n\n\n\nbranchId: ", branchId);
            if (branchId != null && department != null && speciality != null) {
                resourceService.getResourceBySpeciality(branchId, department, speciality)
                .then((response) => {
                    setDoctors(response.data)
                    setLoader(false);
                })
                .catch((error) => {
                    console.log("error ", error)
                })
            } else {
                if (branchId == null) {
                    doctorService.getAllDoctors()
                        .then((response) => {
                            // console.log("\ndoctorService.getAllDoctors(): \n", response)
                            setDoctors(response.data);
                            setLoader(false);
                        })
                        .catch((error) => {
                            console.log("\ndoctorService.getAllDoctors(): \n", error)
                        })
                } else {
                    doctorService.getAllDoctorsByBranch(branchId)
                    .then((response) => {
                        setDoctors(response.data.filter((doctor: any) => doctor.speciality === speciality));
                        setLoader(false);
                        // console.log("\n\n\n\n\n\ndoctorService.getAllDoctorsByBranch(branchId) response", response);
                    })
                    .catch((error) => {
                        console.log("\n\n\n\n\ndoctorService.getAllDoctorsByBranch(branchId) error", error);
                    })
                }
            }
        },[])
    )

    return (
        <SafeAreaView>
            <ScrollView className="pt-6">
                <View className="px-6">
                    <HeaderWithBackButton isPushBack={true} title="Doctors" />
                </View>

                <View className="pt-8 px-6 ">
                    <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
                </View>

                <View className="flex-row pt-5 gap-3 pl-6">

                    <FlatList
                        horizontal
                        contentContainerStyle={{ gap: 12 }}
                        showsHorizontalScrollIndicator={false}
                        data={categoryList}
                        keyExtractor={(item, index) => "key" + index}
                        renderItem={({ item, index }) => (
                            <Pressable>
                                <Text
                                    onPress={() => setActiveCategory(index)}
                                    className={`text-base border border-amber-900 rounded-md py-1 px-3 ${index === activeCategory ? "text-white bg-amber-900" : ""
                                        }`}
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        )}
                    />
                </View>

                <View className="pb-16 px-6">
                    {
                        doctors.length === 0 || doctors == null
                        ?  <Text className="text-center text-lg text-gray-600 mt-4">No doctors available for selected speciality</Text>
                        : loader 
                            ? 
                            <ActivityIndicator size="large" color="#00ff00" />
                            :
                            doctors.map(({ ...props }, idx) => (
                                <DoctorCard {...props} key={idx} />
                            ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BranchDoctor;