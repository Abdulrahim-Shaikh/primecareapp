import { Alert, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import patientService from "../../domain/services/PatientService";



const FamilYFile = () => {
    const [familyFile, setFamilyFile] = useState(null);
    const [familyMember, setFamilyMember] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newMember, setNewMember] = useState("");

    const patientId = 'PNT099701'
    const parentId = 'PNT01234'
    useEffect(() => {
        patientService.find(patientId).then((res) => {
            console.log("fetch familyFile", res.data);
            console.log("fetch familyMember", res.data);
            setFamilyFile(res.data);
            setFamilyMember(res.data);
        }).catch((error) => {
            console.error("Failed to fetch familyFile:", error);
        });
    }, []);

    const handleAddMember = () => {
        console.log("Adding new member:", newMember);
        // setNewMember(member);
        setModalVisible(true);

    };

    const handleCancel = () => {

        setModalVisible(false);

    };

    return (
        <SafeAreaView className="h-full justify-between items-start p-4">
            <View>
                <View className="w-screen">
                    <HeaderWithBackButton
                        title="Family File"
                        isPushBack={true}
                    />
                    <View>
                        <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full 	">
                            <MaterialIcons name="family-restroom" size={24} color="black" />
                            <Text className="rounded-md p-0 mt-2 text-left ml-10 text-base font-semibold	">
                                Family Members Files
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full">
                        <MaterialIcons name="approval" size={24} color="black" className="mt-2 ml-2" />
                        <Text className="rounded-md p-1 mt-1  text-left ml-10 text-base font-semibold	">
                            Family Approvals
                        </Text>
                    </Pressable>
                    {/* <Modal
                        transparent={true} 
                        animationType="slide" 
                        visible={modalVisible} 
                        onRequestClose={handleCancel}>    
                        </Modal>
                    <Pressable className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full"
                        onPress={() => handleAddMember()} style={{ alignSelf: 'flex-start' }}>
                        <AntDesign name="plus" size={20} color="black" className="mt-2 ml-2 " />
                        <Text className="rounded-md p-1 mt-1  text-left ml-14 text-base font-semibold">
                            Add Members
                        </Text>
                    </Pressable> */}
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={handleCancel}
                    >
                        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
                            <View className="bg-white p-4 rounded-lg w-80 shadow-lg justify-center items-center">
                                <View className="w-12 h-12 rounded-full bg-amber-900 justify-center items-center mr-0">
                                    <MaterialIcons name="family-restroom" size={24} color="white" />
                                </View>
                                <Text className="text-lg font-bold mb-4">Add  Family Member</Text>

                                <TextInput
                                    placeholder=" member ID"
                                    value={newMember}
                                    onChangeText={setNewMember}
                                    className="border border-gray-300 p-2 rounded-md mb-4"
                                />


                                <View className="flex-row justify-between">
                                    <Pressable onPress={handleCancel} style={{ padding: 10 }}>
                                        <Text style={{ color: 'gray' }}>X</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        console.log("New member added:", newMember);
                                        setModalVisible(false);
                                    }} style={{ padding: 10 }}>
                                        <Text style={{ color: 'brown' }}>Add Member</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Pressable
                        className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full"
                        onPress={handleAddMember}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        <AntDesign name="plus" size={20} color="black" className="mt-2 ml-2 " />
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



