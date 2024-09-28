import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";

const cancelReason = [
  "I want to change to another doctor",
  "I want to change package",
  "I don't want to consult",
  "I have recovered from the disease",
  "I have found a suitable medicine",
  "I just want to cancel",
  "I don't want to tell",
  "Others",
];

const CancelAppoinment = () => {
  const [reason, setReason] = useState(0);
  return (
    <SafeAreaView className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWithBackButton isPushBack={true} title="Cancel Appoinment" />

        <View className="pt-8">
          <Text className="text-xl font-semibold">
            Reason for Schedule Change
          </Text>

          <View className="">
            {cancelReason.map((item, idx) => (
              <Pressable
                onPress={() => setReason(idx)}
                key={idx}
                className="flex-row justify-start items-center w-full px-4 py-3 border border-amber-900 rounded-lg mt-4"
              >
                <RadioButton isActive={reason === idx} />
                <Text className="text-amber-900 text-base pl-2">{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="pt-6">
          <Text className="text-base font-semibold pb-3">
            Write your problem
          </Text>
          <View className="px-4 py-3  border rounded-xl w-full border-borderColor">
            <TextInput
              multiline={true}
              placeholder="Write here"
              numberOfLines={5}
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </View>
        <View className="w-full pt-6">
          <LinkButton link="/CancelAppoinmentSuccessfully" text="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelAppoinment;

const styles = StyleSheet.create({});
