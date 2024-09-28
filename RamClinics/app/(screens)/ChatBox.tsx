import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AntDesign,
    Entypo,
    Feather, FontAwesome6,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from "@expo/vector-icons";
import profileImg from "../../assets/images/done-profile-img.png";
import profileImg2 from "../../assets/images/chat-reply-img.png";
import { router } from "expo-router";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";

const ChatBox = () => {
  const [message, setMessage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFile, setShowFile] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView className="bg-amber-900 ">
        <View className="px-6 pt-6 pb-20 flex-row justify-between items-center">
          <View className="flex-row">
            <HeaderWithBackButton isPushBack={true} isTextWhite={true} />
            <View className="flex-row justify-start items-center gap-3 pl-2">
              <View>
                <Image source={profileImg} style={{ width: 60, height: 60 }} />
              </View>
              <View>
                <Text className="text-lg font-semibold text-white">
                  Dr. Dianne Johnson
                </Text>
                <Text className="text-white">Online</Text>
              </View>
            </View>
          </View>

          <View>
            <Pressable
              onPress={() => setShowMore((prev) => !prev)}
              className="text-white rounded-full border border-white p-1 justify-center items-center"
            >
              <Feather name="more-horizontal" size={16} color="white" />
            </Pressable>

            <View
              className={`p-5 rounded-2xl bg-white absolute top-7 right-0 w-[200px] ${
                showMore ? "" : "hidden"
              }`}
            >
              <Pressable
                onPress={() => router.push("/AudioCall")}
                className=" flex-row items-center"
              >
                <View className="p-2 bg-secondaryBg border border-primaryColor rounded-full items-center justify-center">
                  <Ionicons name="call-outline" size={16} color="#009281" />
                </View>
                <Text className="pl-2 text-base">Audio Call</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/VideoCall")}
                className=" flex-row items-center mt-3 border-b border-dashed border-borderColor pb-3"
              >
                <View className="p-2 bg-secondaryBg border border-primaryColor rounded-full items-center justify-center">
                  <Feather name="video" size={16} color="#009281" />
                </View>
                <Text className="pl-2 text-base">Video Call</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/EndChatSession")}
                className=" flex-row items-center pt-3"
              >
                <View className="p-2 bg-[#FF5630] border border-[#FF5630] rounded-full items-center justify-center">
                  <AntDesign name="delete" size={16} color="white" />
                </View>
                <Text className="pl-2 text-base text-[#FF5630]">
                  End Session
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          className="p-6 bg-secondaryBg rounded-t-3xl -mt-12 pb-24"
          style={{ zIndex: -1 }}
        >
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
              <View className="p-1 bg-amber-900 rounded-full">
                <Feather name="check" size={12} color="white" />
              </View>
            </View>
          </View>
          <View className="pt-8">
            <View className=" justify-start flex-row items-start gap-2">
              <View>
                <Image source={profileImg2} />
                <Text className="text-xs text-bodyText text-center">09.12</Text>
              </View>

              <View className="">
                <Text className="text-base text-white p-4 bg-amber-900  rounded-b-xl rounded-tr-xl max-w-[85%]">
                  Hello, good afternoon Andrew
                </Text>
                <Text className="text-base text-white p-4 bg-amber-900  rounded-b-xl rounded-tr-xl mt-2 max-w-[85%]">
                  Can you tell me the problem you are having? So that I can
                  identify it
                </Text>
              </View>
            </View>
          </View>
          <View className="pt-8">
            <View className=" justify-start flex-row items-start gap-2">
              <View>
                <Image source={profileImg2} />
                <Text className="text-xs text-bodyText text-center">09.10</Text>
              </View>
              <View className="">
                <Text className="text-base text-white p-4 bg-amber-900  rounded-b-xl rounded-tr-xl max-w-[85%]">
                  Hello, good afternoon Andrew
                </Text>
                <Text className="text-base text-white p-4 bg-amber-900  rounded-b-xl rounded-tr-xl mt-2 max-w-[85%]">
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
              <View className="p-1 bg-amber-900 rounded-full">
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
          <Pressable onPress={() => setShowFile((prev) => !prev)}>
            <Text className="pl-2">
              <Foundation name="paperclip" size={24} color="#c3c3ce" />
            </Text>
          </Pressable>
        </View>
        <View>
          <Text className="p-3 bg-amber-900 rounded-full">
            <Ionicons name="paper-plane-outline" size={20} color="white" />
          </Text>
        </View>
      </View>

      <Modal className=" h-full" visible={showFile} transparent>
        <Pressable
          onPress={() => setShowFile(false)}
          className=" justify-end items-start h-full px-6 pb-20"
        >
          <View className="p-7 rounded-2xl bg-white w-full justify-between items-center flex-row">
            <View className="p-5 rounded-full bg-[#5554db] justify-center items-center">
              <AntDesign name="filetext1" size={28} color="white" />
            </View>
            <View className="p-6 rounded-full bg-[#F75555] justify-center items-center">
              <Feather name="image" size={28} color="white" />
            </View>
            <View className="p-6 rounded-full bg-amber-900 justify-center items-center">
              <Feather name="headphones" size={28} color="white" />
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatBox;

const styles = StyleSheet.create({});
