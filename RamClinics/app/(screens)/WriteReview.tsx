import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/session-end-img.png";
import { AntDesign } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import RadioButton from "../../components/ui/RadioButton";
import LinkButton from "../../components/LinkButton";

const WriteReview = () => {
  const [isRecommend, setIsRecommend] = useState(true);
  return (
    <SafeAreaView>
      <ScrollView className="p-6">
        <View>
          <HeaderWithBackButton isPushBack={true} title="Write a Review" />
        </View>
        <View className=" justify-center items-center pt-12 pb-8 border-b border-dashed text-amber-500">
          <Image source={profileImg} />
          <Text className="text-xl pt-8 text-center font-semibold">
            How was your experience with Dr. Dianne Johnson
          </Text>
          <View className="flex-row gap-3 pt-4 ">
            <AntDesign name="star" size={24} color="rgb(132 204 22)" />
            <AntDesign name="star" size={24} color="rgb(132 204 22)" />
            <AntDesign name="star" size={24} color="rgb(132 204 22)" />
            <AntDesign name="star" size={24} color="rgb(132 204 22)" />
            <AntDesign name="staro" size={24} color="rgb(132 204 22)" />
          </View>
        </View>
        <View className="pt-6">
          <View className="flex-row justify-between items-center pb-3">
            <Text className="text-base font-semibold ">Write your review</Text>
            <Text className="text-xs text-pc-primary">Max 250 words</Text>
          </View>
          <View className="px-4 py-3  border rounded-xl w-full text-amber-500">
            <TextInput
              multiline={true}
              placeholder="Write your review"
              numberOfLines={5}
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </View>
        <View className="pt-8">
          <Text className="text-base font-medium">
            Would you recommended Dr. Marvin to your friends
          </Text>
          <View className="flex-row justify-start items-start pt-4 gap-4">
            <Pressable
              onPress={() => setIsRecommend(true)}
              className="flex-row justify-start items-center"
            >
              <RadioButton isActive={isRecommend} />
              <Text className="text-pc-primary pl-2">Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsRecommend(false)}
              className="flex-row justify-start items-center"
            >
              <RadioButton isActive={!isRecommend} />
              <Text className="text-pc-primary pl-2">No</Text>
            </Pressable>
          </View>
        </View>
        <View className="w-full pt-10 pb-20">
          <LinkButton link="/Home" text="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteReview;

const styles = StyleSheet.create({});
