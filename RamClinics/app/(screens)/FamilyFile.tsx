import { Pressable, SafeAreaView, Text, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const FamilYFile = () => {
    return (
        <SafeAreaView className="h-full justify-between items-start p-4">
            <View>
                <View className="w-screen">
                    <HeaderWithBackButton
                        title="Family File"
                        isPushBack={true}
                    />
                    <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full 	">
                    <MaterialIcons name="family-restroom" size={24} color="black" className="mt-2 ml-2" />
                        <Text className="rounded-md p-1 mt-2 	 text-left ml-14 text-base font-semibold	">
                            Family Members Files
                        </Text>
                    </Pressable>
                    <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full">
                    <MaterialIcons name="approval" size={24} color="black" className="mt-2 ml-2" />
                        <Text className="rounded-md p-1 mt-1  text-left ml-14 text-base font-semibold	">
                            Family Approvals
                        </Text>
                    </Pressable>
                    <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full">
                        <AntDesign name="plus" size={20} color="black" className="mt-2 ml-2 "/>
                        <Text className="rounded-md p-1 mt-1  text-left ml-14 text-base font-semibold">
                            Add Members
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default FamilYFile