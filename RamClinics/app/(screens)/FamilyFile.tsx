import { Alert, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import patientService from "../../domain/services/PatientService";
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from "@react-native-picker/picker";
import { router, useRouter } from "expo-router";





const FamilYFile = () => {
    const [familyFile, setFamilyFile] = useState(null);
    const [familyMember, setFamilyMember] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newMember, setNewMember] = useState("");
    const [selectedRelations, setSelectedRelations] = useState();
    const [selectedValue, setSelectedValue] = useState("Father");
    const [message, setMessage] = useState("");


    const patientId = 'PNT099701'
    const parentId = 'PNT01234'
    const router = useRouter();

    useEffect(() => {
        patientService.find(patientId).then((res) => {
            // console.log("fetch familyFile", res.data);
            // console.log("fetch familyMember", res.data);
            setFamilyFile(res.data);
            setFamilyMember(res.data);
        }).catch((error) => {
            console.error("Failed to fetch familyFile:", error);
        });
    }, []);
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleAddMember = () => {
        console.log("Adding new member:", newMember);
        // setNewMember(member);
        setModalVisible(true);


    };

    const handleCancel = () => {

        setModalVisible(false);
        setMessage('');

    };
    const handleNewAddedMember = () => {

        if (!newMember.trim()) {
            setMessage('Please provide a valid Patient ID.');
            setModalVisible(false);

        }
        else {
            setMessage('Added new member successfully!');
            console.log("Adding new member:", newMember);
            setModalVisible(false);
            setNewMember(" ");

        }
    }

    return (
        <SafeAreaView className="h-full justify-between items-start p-4">
            <View>
                <View className="w-screen">
                    <HeaderWithBackButton
                        title="Family File"
                        isPushBack={true}
                    />
                    <View>
                        <Pressable onPress={() => router.push("/FamilyMemberFile")}
                        className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full 	">
                            <MaterialIcons name="family-restroom" size={24} color="black" />
                            <Text className="rounded-md p-0 mt-2 text-left ml-10 text-base font-semibold	">
                                Family Members Files
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => router.push("/FamilyApprovals")}
                    className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full" >
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
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={handleCancel}
                    >
                        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
                            <View className="bg-white p-4 rounded-lg w-70 shadow-lg justify-center items-center" style={{ position: 'absolute', top: '26%', left: 70 }}>

                                <View className="w-full items-center justify-center">
                                    <Pressable onPress={handleCancel} style={{ position: 'absolute', top: 0, right: 5, padding: 1 }}>
                                        {/* <Text style={{ color: 'black' }}>X</Text> */}
                                        <Entypo name="circle-with-cross" size={22} color="black" />
                                    </Pressable>
                                    <View className="w-12 h-12 rounded-full bg-amber-900 justify-center items-center">
                                        <MaterialIcons name="family-restroom" size={24} color="white" />
                                    </View>

                                </View>

                                <Text className="text-lg font-bold mb-4" style={{ 'textDecorationLine': 'underline', top: 2, textDecorationColor: '#B45309', paddingBottom: 3, }}>
                                    Add  Family Member
                                </Text>

                                <View className="flex-row">
                                    <Text className="mx-0	">Relation</Text>
                                    <Picker className="bg-amber-900  rounded-md	 flex-1" style={{ marginLeft: 30, width: 90, color: 'white' }}
                                        selectedValue={selectedValue}
                                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                    >
                                        <Picker.Item label="Father" value="father" />
                                        <Picker.Item label="Mother" value="mother" />
                                        <Picker.Item label="Son" value="son" />
                                        <Picker.Item label="Daughter" value="daughter" />
                                        <Picker.Item label="Brother" value="brother" />
                                        <Picker.Item label="GrandFather" value="grandfather" />
                                        <Picker.Item label="GrandMother" value="grandmother" />
                                        <Picker.Item label="Aunt" value="aunt" />
                                        <Picker.Item label="Cousin (male)" value="cousin_male" />
                                        <Picker.Item label="Cousin (female)" value="cousin_female" />
                                        <Picker.Item label="Husband" value="husband" />
                                        <Picker.Item label="Wife" value="wife" />
                                        <Picker.Item label="Grandson" value="grandson" />
                                        <Picker.Item label="Granddaughter" value="granddaughter" />
                                        <Picker.Item label="Stepbrother" value="stepbrother" />
                                        <Picker.Item label="Stepsister" value="stepsister" />
                                        <Picker.Item label="Father-in-law" value="father_in_law" />
                                        <Picker.Item label="Mother-in-law" value="mother_in_law" />
                                        <Picker.Item label="Son-in-law" value="son_in_law" />
                                        <Picker.Item label="Daughter-in-law" value="daughter_in_law" />
                                        <Picker.Item label="Nephew" value="nephew" />
                                    </Picker>
                                </View>
                                <TextInput
                                    placeholder=" member ID"
                                    value={newMember}
                                    onChangeText={setNewMember}
                                    className="border border-gray-300 p-2 rounded-md mb-4"

                                />


                                {/* <View className="flex-row justify-between bg-amber-900  rounded-md">
                                    <Pressable onPress={() => {
                                        console.log("New member added:", newMember);
                                        setModalVisible(false);
                                    }} style={{ padding: 10 }}>
                                        <Text style={{ color: 'white' }}>Add Member</Text>
                                    </Pressable>
                                </View> */}
                                <View className="flex-row justify-between bg-amber-900  rounded-md">
                                    <Pressable onPress={handleNewAddedMember}
                                        style={{ padding: 10 }}>
                                        <Text style={{ color: 'white' }}>Add Member</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>
                    </Modal>
                    {/* <Pressable
                        className="flex flex-row border border-amber-900 p-2 rounded-lg mt-4 w-full"
                        onPress={handleAddMember}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        <AntDesign name="plus" size={20} color="black" className="mt-2 ml-2 " />
                        <Text className="rounded-md p-1 mt-1  text-left ml-14 text-base font-semibold">
                            Add Members
                        </Text>
                    </Pressable> */}
                    {message ? (
                        <View className="my-9	justify-center items-center">
                            <Text className="w-60 h-12 my-9 pt-4 pl-4 rounded-md bg-amber-900 justify-center items-center" style={{ color: 'white' }}>
                                {message}
                            </Text>

                        </View>
                    ) : null}

                </View>
            </View>
        </SafeAreaView>
    )
}
export default FamilYFile



