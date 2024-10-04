import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import cityMasterService from "../../domain/services/CityMasterService";
import { useEffect, useState } from "react";
import cityImg from "../../assets/images/Building.png";
import branchService from "../../domain/services/BranchService";

const CityPage = () => {

    const {branchId, fromSpeciality, department, callCenterFlow, speciality} = useLocalSearchParams();
    const [cities, setCities] = useState([]);
    const [branchCounts, setBranchCounts] = useState(Object());

    useEffect(() => {
        if (+callCenterFlow) {
            const cityByBranch = async () => {
                const response = await branchService.cityByDept(department)
                console.log("response cities: ", response.data)
                setCities(response.data);
            }
            cityByBranch()

        } else {
            cityMasterService.findAll().then((res) => {
                setCities(res.data);
            });
        }
    }, []);


    useEffect(() => {
        const fetchBranchCounts = async () => {
            const counts: { [key: string]: number } = {};
            for (const city of cities) {
                const branches = await branchService.getAllBranchesInCity(city.city);
                counts[city.city] = branches.data.length;
            }
            setBranchCounts(counts);
            console.log("count", counts)
        };
        fetchBranchCounts();
    }, [cities]);

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Select City" isPushBack={true} />
                <View className="flex-1 pt-8 space-y-4 ">
                    <FlatList
                        contentContainerStyle={{ gap: 12 }}
                        data={cities}
                        keyExtractor={(item: any, index) => "key" + index}
                        renderItem={({ item }) => {
                            const noOfBranches = branchCounts[item.city] || 0;
                            return (
                                <View className="w-full">
                                    <Pressable
                                        className="flex flex-row border border-amber-900 rounded-lg p-2 shadow-sm bg-white"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/BranchPage",
                                                params: { 
                                                    city: item,
                                                    fromSpeciality: fromSpeciality,
                                                    department: department,
                                                    speciality: speciality
                                                },
                                            })
                                        }
                                    >
                                        <View className="rounded-full bg-white flex justify-center items-center w-20 h-20 border border-gray-200">
                                            <Image source={cityImg} style={{ width: 50, height: 50 }} />
                                        </View>
                                        <View className="px-4 flex justify-center">
                                            <Text className="font-semibold text-lg text-gray-800">
                                                {item}
                                            </Text>
                                            <Text className="text-gray-600 pt-1">
                                                {noOfBranches} Branches
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default CityPage;
