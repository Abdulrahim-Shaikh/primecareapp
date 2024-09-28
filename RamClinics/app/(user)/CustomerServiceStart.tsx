import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";

const CustomerServiceStart = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="Customer Service" />

          <View className="pt-8">
            <View>
              <FormField placeholder="Full Name" name="Full Name" />
            </View>
            <View className="pt-4">
              <FormField
                placeholder="Phone Number"
                name="Phone Number"
                keyboardType="phone-pad"
              />
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

            <View className="pt-8">
              <LinkButton link="/ChatWithCustomer" text="Send Message" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerServiceStart;

const styles = StyleSheet.create({});
