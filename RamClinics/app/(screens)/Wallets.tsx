import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import CustomSwitch from "../../components/CustomSwitch";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";
import walletService from "../../domain/services/WalletService";
import { useUserSate } from "../../domain/state/UserState";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import doctorService from "../../domain/services/DoctorService";
import branchService from "../../domain/services/BranchService";
import { Picker } from "@react-native-picker/picker";

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const Wallets = () => {

  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  let patientId = useUserSate.getState().userId;
  let primaryBranch = useUserSate.getState().branch;
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [primaryBranchId, setPrimaryBranchId] = useState('');
  const [showBranches, setShowBranches] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState('');
  const [noAccount, setNoAccount] = useState(true);
  const [patientWallets, setPatientWallets] = useState([]);
  const [patientWallet, setPatientWallet] = useState();
  const [doctorName, setDoctorName] = useState();
  const [doctorWallet, setDoctorWallet] = useState();
  const [showRefill, setShowRefill] = useState(false);
  const [showRefillDoctor, setShowRefillDoctor] = useState(false);
  const { option } = useLocalSearchParams();
  const [refillAmount, setRefillAmt] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const [showTransferPatient, setShowTransferPat] = useState(false);
  const [transferAmount, setTransferAmt] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState('');
  const [refillWalletFailed, setRefillWalletFailed] = useState(false);

  let refillAccountNo = '';
  let account = {
    "status": "Active",
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const branchesResponse = await branchService.findAll();
      setBranches(branchesResponse.data);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    }
    finally {
    }
  };

  //get acccount by primary branch
  useEffect(() => {
    let primBranch: any = branches.find((b: any) => b.name === primaryBranch);
    if (primBranch) {
      console.log('primBranch', primBranch.id);
      setPrimaryBranchId(primBranch.id);
      walletService.getAccountsByPatientId(patientId, primBranch.id)
        .then((response) => {
          if (response.data.length === 0) {
            setNoAccount(true);
          } else {
            setNoAccount(false);
            setPatientWallet(response.data.find((wallet: any) => wallet.doctorName === 'GENERAL'));
            console.log("patient General Wallet: ", response.data.find((wallet: any) => wallet.doctorName === 'GENERAL'));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch Account:", error);
        })
    }
  }, [branches]);


  //get doctors by branch
  useEffect(() => {
    doctorService.getAllDoctorsByBranch(selectedBranchId)
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch doctors:", error);
      })
  }, [selectedBranchId]);


  useEffect(() => {
    setShowBranches(false);
    const doctor = doctors.find((doc: any) => doc.id === selectedDoc);
    setDoctorName(doctor?.name);
  }, [selectedDoc]);


  //get acccount by selected branch and doctor
  useEffect(() => {
    walletService.getAccountsByPatientId(patientId, selectedBranchId)
      .then((response) => {
        console.log('Accounts >>>>', response.data);
        setPatientWallet(response.data.find((wallet: any) => wallet.doctorName === 'GENERAL'));
        setDoctorWallet(response.data.find((wallet: any) => wallet.doctorId === selectedDoc));
      })
      .catch((error) => {
        console.error("Failed to fetch Account (2):", error);
      })

  }, [selectedBranchId, selectedDoc]);

  const refill = (type: String) => {
    setShowRefill(false);
    setShowRefillDoctor(false);
    let branchId = '';
    let doctorId = '';
    if (type === 'doctor') {
      doctorId = selectedDoc;
      if (doctorWallet) {
        refillAccountNo = doctorWallet.accountId;
      }
      else {
        refillAccountNo = 'none';
      }
    } else {
      refillAccountNo = 'none';
      doctorId = '0';
    }
    if (selectedBranchId) {
      branchId = selectedBranchId;
    } else {
      branchId = primaryBranchId;
    }

    walletService.refillWallet(refillAccountNo, 'paymentLink', +refillAmount, +branchId, +doctorId, patientId)
      .then((response) => {
        let msg = 'Entered Amount ' + refillAmount + ', sent payment link to patient Successfully! (Check SMS)';
        setSuccessModalMessage(msg);
        setSuccessModal(true);
        // Alert.alert('Success', msg);
        setRefillAmt('0');
      })
      .catch((error) => {
        setRefillWalletFailed(true);
        // Alert.alert('Error', 'Failed to refill wallet');
        console.error("Failed to refill wallet", error);
      })
  };

  const transferToDoctor = () => {
    walletService.transferToDoctorWallet(patientWallet?.accountId, +transferAmount, +selectedBranchId, +selectedDoc, patientId)
      .then((response) => {
        let msg = 'Entered Amount ' + transferAmount + ' transferred Successfully!';
        setSuccessModalMessage(msg);
        setSuccessModal(true);
        // Alert.alert('Success', msg);
        setTransferAmt('0');
        setShowTransfer(false);
      })
      .catch((error) => {
        setRefillWalletFailed(true);
        // Alert.alert('Error', 'Failed to transfer to doctor');
        console.error("Failed to refill wallet:", error.response ? error.response.data : error.message);
      })
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-3">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <HeaderWithBackButton isPushBack={true} title={i18n.t("urwallet1")} />
            <MaterialCommunityIcons name="wallet" size={24} color={"rgb(59, 35, 20)"}
            />
          </View>
          <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-pc-primary">
              {i18n.t("urwallet2")}
            </Text>
            <View className=" flex-row justify-between items-center py-6 border-b border-dashed text-amber-500">
              <Text className="text-2xl font-medium">{i18n.t("balanc")}</Text>
              {noAccount ?
                <Text className="text-xl font-medium">No Account, Refill First</Text>
                :
                <Text className="text-3xl font-semibold">{patientWallet?.currency + " " + patientWallet?.balance}</Text>
              }
            </View>
            <View className=" flex-row justify-between items-center py-4 text-amber-500">
              <Button title={selectedDoc ? "Change Doctor" : "Transfer to Doctor"} color="#841584" onPress={() => setShowBranches(true)} />
              <Button title="Refill" color="green" onPress={() => setShowRefill(true)} />
            </View>
          </View>
        </View>
        {showBranches && (
          <View className="pt-5 p-3">
            <View className="border border-indigo-950 rounded-lg mb-4">
              <Picker
                selectedValue={selectedBranchId} onValueChange={(itemValue) => { setSelectedBranchId(itemValue); }} className="h-12">
                <Picker.Item label={i18n.t("Select Branch")} value="" />
                {branches.map((branch: any) => (
                  <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                ))}
              </Picker>
            </View>
            <View className="border border-indigo-950 rounded-lg mb-4">
              <Picker
                selectedValue={selectedDoc} onValueChange={(itemValue) => { setSelectedDoc(itemValue); }} className="h-12">
                <Picker.Item label={i18n.t("Select doctor")} value="" />
                {doctors.map((doctor: any) => (
                  <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
                ))}
              </Picker>
            </View>
          </View>
        )}
        {selectedDoc && (
          <View className="px-3">
            <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-pc-primary"> {i18n.t("doctorWalt")} </Text>
                <Text className="text-xl font-semibold text-pc-primary"> {doctorName} </Text>
              </View>
              <View className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed text-amber-500">
                <Text className="text-2xl font-medium">{i18n.t("balanc")}</Text>
                {doctorWallet ?
                  <Text className="text-2xl font-semibold">{doctorWallet?.currency} {doctorWallet?.balance}</Text>
                  :
                  <Text className="text-xl font-medium">No Wallet, Refill First</Text>
                }
              </View>
              {doctorWallet ? (
                <>
                  {/* disabled={doctorWallet.balance <= 0} */}
                  <View className=" flex-row justify-between items-center py-4 text-amber-500">
                    <Button title="Transfer to Doctor" color="#841584" onPress={() => setShowTransfer(true)} disabled={patientWallet?.balance <= 0} />
                    <Button title="Refill" color="green" onPress={() => setShowRefillDoctor(true)} />
                  </View>
                  <View className=" flex-row justify-between items-center text-amber-500">
                    <Button title="Transfer to You" color="#78450f" onPress={() => setShowTransferPat(true)} disabled={doctorWallet?.balance <= 0} />
                  </View>
                </>
              )
                :
                <View className=" flex-row justify-end items-center py-4 text-amber-500">
                  <Button title="Refill" color="green" onPress={() => setShowRefillDoctor(true)} />
                </View>
              }
            </View>
          </View>
        )}

        <Modal transparent={true} animationType="fade" visible={showRefill} onRequestClose={() => setShowRefill(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Pressable className="absolute top-3 right-3" onPress={() => setShowRefill(false)}>
                <AntDesign name="closecircle" size={24} color="#3B2314" />
              </Pressable>
              <Text className="text-xl font-bold text-center mb-4 mt-7"> Enter the Amount to Refill</Text>
              <TextInput onChangeText={setRefillAmt} value={refillAmount} placeholder="0" keyboardType="numeric" className="border border-gray-400 rounded-lg p-1 mx-3 my-2" />
              <View className=" flex-row justify-between items-center py-4">
                <Button title="Cancel" color="red" onPress={() => setShowRefill(false)} />
                <Button title="Refill" color="green" onPress={() => refill('patient')} />
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} animationType="fade" visible={showRefillDoctor} onRequestClose={() => setShowRefillDoctor(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Pressable className="absolute top-3 right-3" onPress={() => setShowRefillDoctor(false)}>
                <AntDesign name="closecircle" size={24} color="#78450f" />
              </Pressable>
              <Text className="text-xl font-bold text-center mb-4 mt-7"> Enter the Amount to Refill</Text>
              <TextInput onChangeText={setRefillAmt} value={refillAmount} placeholder="0" keyboardType="numeric" className="border border-gray-400 rounded-lg p-1 mx-3 my-2" />
              <View className=" flex-row justify-between items-center py-4">
                <Button title="Cancel" color="red" onPress={() => setShowRefillDoctor(false)} />
                <Button title="Refill" color="green" onPress={() => refill('doctor')} />
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} animationType="fade" visible={showTransfer} onRequestClose={() => setShowTransfer(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Pressable className="absolute top-3 right-3" onPress={() => setShowTransfer(false)}>
                <AntDesign name="closecircle" size={24} color="#78450f" />
              </Pressable>
              <Text className="text-xl font-bold text-center mb-4 mt-7"> Enter the Amount to Transfer</Text>
              <TextInput onChangeText={setTransferAmt} value={transferAmount} placeholder="0" keyboardType="numeric" className="border border-gray-400 rounded-lg p-1 mx-3 my-2" />
              <View className=" flex-row justify-between items-center py-4">
                <Button title="Cancel" color="red" onPress={() => setShowTransfer(false)} />
                <Button title="Transfer" color="green" onPress={() => transferToDoctor()} />
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} animationType="fade" visible={showTransferPatient} onRequestClose={() => setShowTransferPat(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <Pressable className="absolute top-3 right-3" onPress={() => setShowTransferPat(false)}>
                <AntDesign name="closecircle" size={24} color="#78450f" />
              </Pressable>
              <Text className="text-xl font-bold text-center mb-4 mt-7">Coming Soon</Text>
              <Text className="text-xs text-center mb-4 mt-7">Visit RAM Clinics Reception for a Refund.</Text>
              {/* <TextInput onChangeText={setTransferAmt} value={transferAmount} placeholder="0" keyboardType="numeric" className="border border-gray-400 rounded-lg p-1 mx-3 my-2" />
              <View className=" flex-row justify-between items-center py-4">
                <Button title="Cancel" color="red" onPress={() => setShowTransfer(false)} />
                <Button title="Transfer" color="green" onPress={() => transferToDoctor()} />
              </View> */}
            </View>
          </View>
        </Modal>
        <Modal transparent={true} animationType="fade" visible={successModal} onRequestClose={() => setSuccessModal(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="bg-white p-6 rounded-lg w-4/5 relative">
              <View className="flex flex-row justify-center">
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={60}
                  color={"#84CC16"}
                />
              </View>
              <Text className="text-xl font-bold text-center mb-2 mt-1">Error</Text>
              <Text className="text-xl font-bold text-center mb-4">Failed to refill wallet</Text>
              <View className=" flex-row justify-between gap-5 items-center py-4">
                <Pressable onPress={() => {
                  setSuccessModal(false)
                }}>
                  <Text> Ok </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallets;

const styles = StyleSheet.create({});
