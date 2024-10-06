import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import { paymentMethods } from "../../constants/data";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";

const MakePayments = () => {
  const [selectPayment, setSelectPayment] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButton title="Make Payment" isPushBack={true} />

            <View className="p-6 border border-pc-primary rounded-xl mt-8 bg-amber-100">
              <View className="border-b border-dashed pb-4">
                <View className=" flex-row justify-between items-center">
                  <Text className="text-pc-primary">Consulting</Text>
                  <Text className="text-base">$30.00</Text>
                </View>
                <View className=" flex-row justify-between items-center py-4">
                  <Text className="text-pc-primary">Other Manipulation</Text>
                  <Text className="text-base">$35.00</Text>
                </View>
                <View className=" flex-row justify-between items-center">
                  <Text className="text-pc-primary">Other Service</Text>
                  <Text className="text-base">$20.00</Text>
                </View>
              </View>
              <View className=" flex-row justify-between items-center pt-4">
                <Text className=" font-semibold">Total</Text>
                <Text className="font-semibold text-pc-primary text-base">
                  $85.00
                </Text>
              </View>
            </View>

            <View className="pt-6">
              <Text className="text-xl font-semibold ">Payment Methods</Text>
              <View className="flex-row flex-wrap gap-4 pt-5">
                {paymentMethods.map(({ name, img }, idx) => (
                  <Pressable
                    onPress={() => setSelectPayment(idx)}
                    key={idx}
                    className=" w-[45%] justify-center items-center border border-pc-primary py-3 rounded-lg"
                  >
                    <View className="p-2 rounded-full bg-white">
                      <Image source={img} />
                    </View>
                    <Text className="text-base pt-3 pb-5">{name}</Text>
                    <View>
                      <RadioButton isActive={selectPayment === idx} />
                    </View>
                  </Pressable>
                ))}
                <Pressable
                  onPress={() => router.push("/AddCardPage")}
                  className=" w-[45%] justify-center items-center border border-pc-primary py-3 rounded-lg"
                >
                  <View className="h-10 w-10 justify-center items-center rounded-full bg-[rgb(59,35,20)]">
                    <Text className="text-2xl text-white ">+</Text>
                  </View>
                  <Text className="text-base pt-3 font-semibold text-pc-primary">
                    Add Card
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View className="w-full pt-6">
            <LinkButton link="/BookingConfirm" text="Confirm Appoinment" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakePayments;

const styles = StyleSheet.create({});
