import { FlatList, Modal, Pressable, View, ScrollView } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import { Text } from "react-native-elements"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


const FamilyApprovals = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState("Pending");

    const handleCancelButton = () => {

        setModalVisible(false);
    };

    const handleConfirmationRelation = () => {
        setModalVisible(true);
    }
    const handleConfirmButton = () => {

        setStatus("Done");
        setModalVisible(false);
    }
    return (
        <SafeAreaView >
            <ScrollView>
        <View>
            <View className="w-screen">
                <HeaderWithBackButton
                    title="Family Approvals"
                    isPushBack={true}  
                />
            </View>
            <View className="flex flex-row justify-start items-center gap-4 pt-6 pb-8">
                <View className="flex-row border border-pc-primary rounded-lg mb-4 overflow-hidden">
                    <View className="flex-1 p-2">
                        <Text className="text-base font-bold ">
                            Approve to as add Family Member with relation
                            <View>
                                <Text>Added Family Member</Text>
                            </View>
                        </Text>
                            <View className="flex-row justify-between items-center w-full">
                                <Pressable
                                    onPress={handleConfirmationRelation}
                                    style={{ alignSelf: 'flex-start' }}
                                >

                                    <Text className="rounded-md p-1 mt-5 bg-[rgb(59,35,20)] text-left ml-1 text-base font-semibold" style={{ color: 'white' }}>
                                        <AntDesign name="check" size={24} color="white" style={{ paddingRight: 4 }} />
                                        Confirm Relation
                                    </Text>
                                </Pressable>
                                <Text className="ml-3 mt-5" style={{ marginLeft: 130 }}>{status}</Text>
                            </View>

                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={modalVisible}
                                onRequestClose={handleCancelButton}>
                                <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
                                    <View className="bg-white p-4 rounded-lg w-30 shadow-lg justify-center items-center"
                                        style={{ position: 'absolute', top: '26%', left: 70, width: 270 }}>
                                        <View className="w-full items-center justify-center">
                                            <Pressable onPress={handleCancelButton} style={{ position: 'absolute', top: 0, right: 5, padding: 1 }}>
                                                <Entypo name="circle-with-cross" size={22} color="black" />
                                            </Pressable>
                                            <View className="w-12 h-12 rounded-full bg-[rgb(59,35,20)] justify-center items-center">
                                                <MaterialIcons name="family-restroom" size={24} color="white" />
                                            </View>
                                        </View>
                                        <View className="text-lg font-bold mb-4">
                                            <Text>Approve to as Add Family Member with relation</Text>
                                        </View>
                                        <View className="text-lg mb-4">
                                            <Text>Please choose an action</Text>
                                        </View>
                                        <View className="flex-row justify-between w-full">
                                            <Pressable
                                                onPress={handleCancelButton}
                                                style={{ backgroundColor: 'rgb(59,35,20)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                                                <Text style={{ color: 'white' }}>Cancel</Text>
                                            </Pressable>

                                            <Pressable
                                                onPress={handleConfirmButton}
                                                style={{ backgroundColor: 'rgb(59,35,20)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                                                <Text style={{ color: 'white' }}>Confirm</Text>
                                            </Pressable>
                                        </View>

                                    </View>
                                </View>

                            </Modal>
                       

                    </View>

                </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}
export default FamilyApprovals