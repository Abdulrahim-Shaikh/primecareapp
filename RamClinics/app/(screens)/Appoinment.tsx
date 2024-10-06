import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import CalendarModal from "../../components/ui/CalendarModal";
import { feesInformation, scheduleDates } from "../../constants/data";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";


const Appoinment = () => {
  const [select, setSelect] = useState(0);

  return (
    <SafeAreaView className="h-full justify-between items-start p-4">
      <View>
        <HeaderWithBackButton title="Appoinment" isPushBack={true} />
        <View className="mt-8 pb-8">
          <View className="flex-row justify-between items-center pb-5">
            <Text className="text-lg font-semibold ">Schedules</Text>
            <CalendarModal />
          </View>
          <View className="border border-pc-primary rounded-xl p-5 flex-row -mr-20">
            <FlatList
              horizontal
              style={{ marginRight: 60 }}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={scheduleDates}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable className=" items-center p-3 rounded-lg border border-pc-primary">
                  <Text className="text-base font-semibold">{item.date}</Text>
                  <Text className="text-[12px]">{item.day}</Text>
                </Pressable>
              )}
            />
          </View>
          <View className="border border-pc-primary rounded-xl p-5 flex-row -mr-20 mt-5">
            <FlatList
              horizontal
              style={{ marginRight: 60 }}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={["10.00Am", "11.00Am", "12.00Pm", "01.00Pm"]}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable className=" items-center py-2 px-3 rounded-lg border border-pc-primary">
                  <Text className="text-base font-semibold">{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
        <View>
          <Text className="text-lg font-semibold ">Fees Information</Text>
          <View className="pt-5 gap-3">
            {feesInformation.map(({ name, desc, price }, idx) => (
              <Pressable
                key={idx}
                onPress={() => setSelect(idx)}
                className="flex-row justify-between items-center py-3 px-4 rounded-lg border text-amber-500"
              >
                <View className="flex-row justify-start items-center ">
                  <RadioButton isActive={select === idx} />

                  <View className="pl-3">
                    <Text className="text-base font-medium">{name}</Text>
                    <Text className="text-xs text-pc-primary">{desc}</Text>
                  </View>
                </View>
                <View>
                  <Text className="text-base font-medium text-pc-primary p-2 bg-amber-100 rounded-lg">
                    ${price}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View className="w-full">
        <LinkButton link="/PatientDetails" text="Continue" />
      </View>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
