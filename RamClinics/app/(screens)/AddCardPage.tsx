import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import addCardImg from "../../assets/images/add-card.png";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import FormField from "../../components/FormField";
import LinkButton from "../../components/LinkButton";

// import CheckBox from "react-native-check-box";


const AddCardPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" justify-between items-start p-6">
          <View className="w-full">
            <HeaderWithBackButton title="Add Card" isPushBack={true} />
            <View className="pt-6 justify-center items-center ">
              <Image
                source={addCardImg}
                style={{ maxWidth: "100%", objectFit: "contain" }}
              />
            </View>
            <View className="pt-6">
              <FormField placeholder="Amin Smith" name="Card Holder Name" />
            </View>
            <View className="pt-6">
              <FormField
                placeholder="****** 456456"
                name="Card Number"
                keyboardType="phone-pad"
              />
            </View>
            <View className="pt-6 flex-row w-full gap-3">
              <View className="flex-1">
                <FormField
                  placeholder="DD.MM.YYYY"
                  name="Exp Date"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="flex-1">
                <FormField
                  placeholder="****"
                  name="CVC Code"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            <View className="pt-6">
              <FormField placeholder="United States" name="Country" />
            </View>
            <View className="text-pc-primary flex justify-start flex-row items-center w-full pt-2 pb-7">
              {/* <CheckBox
                onClick={() => setChecked((prev) => !prev)}
                isChecked={checked}
                checkBoxColor="rgb(132 204 22)"
                checkedCheckBoxColor="rgb(132 204 22)"
              /> */}
              <Text className="text-base pl-2">
                Set as your default payment method
              </Text>
            </View>
          </View>

          <View className="w-full">
            <LinkButton link="/Home" text="Add Card" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCardPage;

const styles = StyleSheet.create({});
