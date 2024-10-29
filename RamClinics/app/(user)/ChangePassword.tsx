import { ScrollView, View, Modal, Text, TouchableOpacity, Button, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";
import { useUserSate } from "../../domain/state/UserState";
import patientService from "../../domain/services/PatientService";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChangePassword = () => {
  let user = useUserSate.getState().user;
  const [patient, setPatient] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    patientService.find(user.id).then((res) => {
      // console.log("patientid", res.data)
      setPatient(res.data);
    });
  }, [user.id]);

  const handleSave = () => {
    if (oldPassword !== patient.password) {
      showError("Old password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("New password and confirm password do not match");
      return;
    }

    if (newPassword === oldPassword) {
      showError("New password must be different from the old password");
      return;
    }

    const updatedPatient = { ...patient, password: newPassword };
    patientService.update(updatedPatient)
      .then(() => {
        setSuccessModalVisible(true);
        // Alert.alert("Success", "Password changed successfully");
      })
      .catch((error) => {
        console.error(error);
        showError("Failed to change password");
      });
  };

  const showError = (message: any) => {
    setErrorMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setErrorMessage(null);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Change Password" />
          <View className="pt-8">
            <View>
              <FormField
                placeholder="******"
                name="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
              />
            </View>
            <View className="pt-5">
              <FormField
                placeholder="******"
                name="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>
            <View className="pt-5 pb-8">
              <FormField
                placeholder="******"
                name="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              style={{
                backgroundColor: 'rgb(59,35,20)',
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                Save
              </Text>
            </TouchableOpacity>
            {/* <LinkButton 
              link="/ProfileTab" 
              text="Save" 
              onPress={handleSave}
            /> */}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-4/5 p-5 bg-white rounded-lg shadow-md items-center">
            <Text className="text-lg text-center mb-4">{errorMessage}</Text>
            <TouchableOpacity className="bg-blue-500 p-2 rounded" onPress={closeModal}>
              <Text className="text-black font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} animationType="fade" visible={successModalVisible} onRequestClose={() => setSuccessModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white p-6 rounded-lg w-4/5 relative">
            <View className="flex flex-row justify-center">
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={60}
                color={"#84CC16"}
              />
            </View>
            <Text className="text-xl font-bold text-center mb-4 pt-3">Success - Password Changed Successfully</Text>
            <View className=" flex-row justify-between gap-5 items-center py-4">
              <Pressable onPress={() => {
                setSuccessModalVisible(false)
              }}>
                <Text> Ok </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChangePassword;
