import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import CustomSwitch from "../../components/CustomSwitch";
import { useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";
import walletService from "../../domain/services/WalletService";
import { useUserSate } from "../../domain/state/UserState";

const Wallets = () => {

  let patientId = useUserSate.getState().userId;
  const [balance, setbalance] = useState()
  const { option } = useLocalSearchParams();

  useEffect(() => {
      walletService.getBalance(patientId)
          .then((response) => {
              setbalance(response.data)
          })
          .catch((error) => {
              console.log(error)
          })
  })
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Wallets" />
          <View className="mt-8 p-6 border border-amber-900 bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-amber-900">
              Your Wallet
            </Text>
            <View className=" flex-row justify-between items-center py-6 border-b border-dashed text-amber-500">
              <Text className="text-2xl font-medium">Balance</Text>
              <Text className="text-3xl font-semibold">{balance}</Text>
            </View>
            <View className=" flex-row justify-between items-center py-4 text-amber-500">
              {/* <Button title="Transfer to Doctor" color="#841584" />
              <Button title="Refill" color="green" /> */}
            </View>
          </View>
          {/* <View className="mt-8 p-6 border border-amber-900 bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-amber-900">
              Doctor Wallet
            </Text>
            <View className=" flex-row justify-between items-center pt-6 pb-4 border-b border-dashed text-amber-500">
              <Text className="text-2xl font-medium">Balance</Text>
              <Text className="text-3xl font-semibold">1.0</Text>
            </View>
            <View className=" flex-row justify-between items-center py-4 text-amber-500">
              <Button title="Transfer to Patient" color="#841584" />
              <Button title="Refill" color="green" />
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallets;

const styles = StyleSheet.create({});
