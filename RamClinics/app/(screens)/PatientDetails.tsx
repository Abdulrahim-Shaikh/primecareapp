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
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";

const PatientDetails = () => {
  const [selectAge, setSelectAge] = useState(0);
  const [activeGenter, setActiveGender] = useState("Male");
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButton title="Patient Details" isPushBack={true} />
            <View className="pt-8">
              <FormField placeholder="Sa Kibb" name="Full Name" />

              <View className="pt-6">
                <Text className="text-base font-medium">
                  Select Your Age Range *
                </Text>
                <View className=" justify-between items-center flex-row gap-3 pt-3">
                  {["20", "30", "40", "50", "60"].map((item, idx) => (
                    <Text
                      onPress={() => setSelectAge(idx)}
                      key={idx}
                      className={`border border-pc-primary rounded-md py-2 flex-1 font-medium text-center ${
                        selectAge === idx
                          ? "text-white bg-[rgb(59,35,20)]"
                          : "text-pc-primary"
                      } `}
                    >
                      {item}+
                    </Text>
                  ))}
                </View>
              </View>

              <View className="pt-6">
                <FormField
                  placeholder="Phone number"
                  name="Phone Number"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="mt-6 ">
                <Text className="text-base font-semibold pb-3">Gender</Text>
                <View className=" flex-row gap-4 justify-between items-center w-full">
                  {["Male", "Female"].map((item, idx) => (
                    <Pressable
                      className="flex-1 "
                      onPress={() => setActiveGender(item)}
                      key={idx}
                    >
                      <Text
                        className={`text-center  py-2 px-8 rounded-lg border border-pc-primary text-base font-medium ${
                          item === activeGenter
                            ? "bg-[rgb(59,35,20)] text-white"
                            : "text-pc-primary"
                        }`}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="pt-6">
                <Text className="text-base font-semibold pb-3">
                  Write your problem
                </Text>
                <View className="px-4 py-3  border rounded-xl w-full text-amber-500">
                  <TextInput
                    multiline={true}
                    placeholder="Write here"
                    numberOfLines={5}
                    style={{ textAlignVertical: "top" }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="w-full pt-6">
            <LinkButton link="/MakePayments" text="Continue" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({});
