import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import CustomSwitch from "../../components/CustomSwitch";
import { useLocalSearchParams } from "expo-router";
import specialityService from "../../domain/services/SpecialityService";
import walletService from "../../domain/services/WalletService";
import { useUserSate } from "../../domain/state/UserState";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Wallets = () => {

  let patientId = useUserSate.getState().userId;
  const [balance, setbalance] = useState()
  const { option } = useLocalSearchParams();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await walletService.getBalance(patientId);
        setbalance(res.data);
      } catch (error) {
        console.error("Filter error", error)
      }
    };
    fetchWallet();
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-3">
        <View className="flex flex-row justify-start items-center gap-4 pt-6">
                        <HeaderWithBackButton isPushBack={true} title="Your Wallet" />
                        <MaterialCommunityIcons
                            name="wallet"
                            size={24}
                            color={"rgb(59, 35, 20)"}
                        />
                    </View>
          <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-pc-primary">
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
          {/* <View className="mt-8 p-6 border border-pc-primary bg-amber-100 rounded-xl">
            <Text className="text-base font-semibold text-pc-primary">
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
