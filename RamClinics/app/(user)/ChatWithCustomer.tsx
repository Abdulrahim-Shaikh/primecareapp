import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  Feather,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const ChatWithCustomer = () => {
  const [message, setMessage] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView className="bg-primaryColor ">
        <View className="px-6 pt-6 pb-20">
          <HeaderWithBackButton
            isPushBack={true}
            title="Customer Service"
            isTextWhite={true}
          />
        </View>
        <View className="p-6 bg-secondaryBg rounded-t-3xl -mt-12 pb-24">
          <View className=" justify-center items-center">
            <Text className="text-xs font-semibold px-8 py-2 border border-primaryColor rounded-full">
              10 June, 2023
            </Text>
          </View>
          <View className="pt-8">
            <View className=" justify-end flex-row items-end gap-2">
              <View className=" max-w-[85%]">
                <Text className="text-base text-bodyText p-4 bg-white border border-borderColor rounded-t-xl rounded-bl-xl">
                  Hi, good afternoon Dr. Jenny Wilson
                </Text>
                <Text className="text-base text-bodyText p-4 bg-white border border-borderColor rounded-t-xl rounded-bl-xl mt-2">
                  I'm Andrew. I have a problem with my immune system
                </Text>
              </View>
              <View className="p-1 bg-primaryColor rounded-full">
                <Feather name="check" size={12} color="white" />
              </View>
            </View>
          </View>
          <View className="pt-8">
            <View className=" justify-start flex-row items-start gap-2">
              <View className=" bg-white rounded-lg p-3">
                <Feather name="headphones" size={24} color="#009281" />
              </View>
              <View className="">
                <Text className="text-base text-white p-4 bg-primaryColor  rounded-b-xl rounded-tr-xl max-w-[85%]">
                  Hello, good afternoon Andrew
                </Text>
                <Text className="text-base text-white p-4 bg-primaryColor  rounded-b-xl rounded-tr-xl mt-2 max-w-[85%]">
                  Can you tell me the problem you are having? So that I can
                  identify it
                </Text>
              </View>
            </View>
          </View>
          <View className="pt-8">
            <View className=" justify-start flex-row items-start gap-2">
              <View className=" bg-white rounded-lg p-3">
                <Feather name="headphones" size={24} color="#009281" />
              </View>
              <View className="">
                <Text className="text-base text-white p-4 bg-primaryColor  rounded-b-xl rounded-tr-xl max-w-[85%]">
                  Hello, good afternoon Andrew
                </Text>
                <Text className="text-base text-white p-4 bg-primaryColor  rounded-b-xl rounded-tr-xl mt-2 max-w-[85%]">
                  Can you tell me the problem you are having? So that I can
                  identify it
                </Text>
              </View>
            </View>
          </View>
          <View className="pt-8">
            <View className=" justify-end flex-row items-end gap-2">
              <View className=" max-w-[85%]">
                <Text className="text-base text-bodyText p-4 bg-white border border-borderColor rounded-t-xl rounded-bl-xl">
                  Hi, good afternoon Dr. Jenny Wilson
                </Text>
                <Text className="text-base text-bodyText p-4 bg-white border border-borderColor rounded-t-xl rounded-bl-xl mt-2">
                  I'm Andrew. I have a problem with my immune system
                </Text>
              </View>
              <View className="p-1 bg-primaryColor rounded-full">
                <Feather name="check" size={12} color="white" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className={`absolute bottom-0 right-0 left-0 bg-secondaryBg px-4 pb-4 justify-between ${
          message ? "items-end" : "items-center"
        } flex-row gap-2 `}
      >
        <View className="flex-row">
          {message ? (
            <Text className="pr-2">
              <Entypo name="chevron-small-right" size={28} color="#009281" />
            </Text>
          ) : (
            <>
              <Text>
                <Ionicons name="camera" size={28} color="#009281" />
              </Text>
              <Text className="px-1">
                <MaterialIcons name="image" size={28} color="#009281" />
              </Text>
              <Text>
                <MaterialCommunityIcons
                  name="microphone"
                  size={28}
                  color="#009281"
                />
              </Text>
            </>
          )}
        </View>
        <View
          className={`flex-row px-4 py-2 rounded-[28px] border border-borderColor flex-1 justify-between ${
            message ? "items-end" : "items-center"
          }`}
        >
          <Text className="pr-2">
            <FontAwesome6 name="face-smile" size={20} color="#c3c3ce" />
          </Text>
          <View className="flex-1">
            <TextInput
              onFocus={() => setMessage(true)}
              onBlur={() => setMessage(false)}
              placeholder="Message"
              multiline={true}
              style={{ maxHeight: 80 }}
            />
          </View>
          <Text className="pl-2">
            <Foundation name="paperclip" size={24} color="#c3c3ce" />
          </Text>
        </View>
        <View>
          <Text className="p-3 bg-primaryColor rounded-full">
            <Ionicons name="paper-plane-outline" size={20} color="white" />
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatWithCustomer;

const styles = StyleSheet.create({});
