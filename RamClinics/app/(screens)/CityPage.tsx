import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import cityMasterService from "../../domain/services/CityMasterService";


const CityPage = () => {

    cityMasterService.findAll().then((res) => {
        let specialtyData = res.data
      });

    const cities = ['Yanbu', 'Dammam', 'Khobar', 'Al Ahsa', 'Jubail', 'Dahran'];

    return (
        <SafeAreaView>
            <ScrollView className="p-6">
                <HeaderWithBackButton title="Select City" isPushBack={true} />
                <View className="flex-1 justify-center items-center pt-10 space-y-4">
                    {cities.map((city, index) => (
                        <Pressable
                            onPress={() => router.push("/BranchPage")}
                            className="w-[45%] border border-amber-900 rounded-lg justify-center items-center p-3"
                            key={index}>
                            <Text className="text-base font-semibold pt-3 justify-center items-center">{city}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>

    )

}
export default CityPage;
