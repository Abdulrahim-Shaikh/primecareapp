import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithBackButton from '../../components/ui/HeaderWithBackButton';
import Searchbox from '../../components/ui/Searchbox';
import DoctorCard from '../../components/ui/DoctorCard';
import doctorService from '../../domain/services/DoctorService';


const categoryList = [
    "All",
    "General",
    "Dentist",
    "Nutritionist",
    "Cardiologist",
];

const BranchDoctor = () => {

    const [activeCategory, setActiveCategory] = useState(0);

    const { branchId } = useLocalSearchParams();

    let [doctors, setDoctor] = useState([]);

    useEffect(() => {
        doctorService.getAllDoctorsByBranch(branchId).then((response) => {
            setDoctor(response.data);
        })
    }, [])

    return (
        <SafeAreaView>
            <ScrollView className="pt-6">
                <View className="px-6">
                    <HeaderWithBackButton isPushBack={true} title="Doctors" />
                </View>

                <View className="pt-8 px-6 ">
                    <Searchbox />
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
                    {doctors.map(({ ...props }, idx) => (
                        <DoctorCard {...props} key={idx} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default BranchDoctor;