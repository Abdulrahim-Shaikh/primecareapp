import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleBg from "../../components/CircleBg";
import LinkButton from "../../components/LinkButton";

const SIZE = 100;
const COLOR = "#84cc16";
const CancelAppoinmentSuccessfully = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-6 my-8 items-center ">
          <View style={styles.dot} className=" items-center justify-center">
            <Feather
              name="check"
              size={48}
              color="white"
              style={{ zIndex: 100 }}
            />

            {[...Array(3).keys()].map((_, idx) => (
              <CircleBg key={idx} index={idx} />
            ))}
          </View>

          <View className="py-20">
            <Text className="text-2xl font-bold text-center">
              Cancel Successfully!
            </Text>
            <Text className="text-[14px] text-pc-primary text-center pt-3 px-6">
              Your appoinment has been cencelled successfully. All details can
              be found in history section.
            </Text>
          </View>

          <LinkButton link="/Home" text="Okay" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelAppoinmentSuccessfully;

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
  },
});
