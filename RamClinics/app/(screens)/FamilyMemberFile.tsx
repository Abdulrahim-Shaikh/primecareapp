import { View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import { Text } from "react-native-elements"

const FamilyMemberFile = () => {
    return (
        <View>
            <View className=" flex-1">
                <HeaderWithBackButton
                    title="Family Member File"
                    isPushBack={true}
                />
                <View className="flex-1 justify-center items-center h-full">
                    <Text className="text-base font-bold my-96 text-center">
                        No Family Files Found!
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default FamilyMemberFile