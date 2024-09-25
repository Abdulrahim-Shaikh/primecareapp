import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HeaderWithBackButton from "../../ui/HeaderWithBackButton";

const sortByOptions = [
  "All Time",
  "Last 7 Days",
  "Last 1 Month",
  "Last 6 Month",
];

type PropsType = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationModal = ({
  showNotification,
  setShowNotification,
}: PropsType) => {
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);

  return (
    <Modal visible={showNotification} animationType="slide">
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton
            setModal={setShowNotification}
            title="Notification"
          />

          <View className="pt-8 pb-5 border-b border-dashed border-borderColor flex flex-row justify-between items-center ">
            <Text className=" text-lg font-semibold">Latest Update</Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-[12px]">Short By{":"}</Text>

              <Pressable className="z-50 border border-borderColor rounded-lg">
                <Text
                  className="px-4 py-2"
                  onPress={() => setShow((prev) => !prev)}
                >
                  {sortBy} <Feather name="chevron-down" size={18} />
                </Text>
                <TouchableOpacity
                  className={`absolute top-10 right-0 z-50 ${
                    show ? "" : "hidden"
                  } `}
                >
                  <View className="flex flex-col z-50 bg-primaryColor py-3 w-[140px] rounded-xl">
                    {sortByOptions.map((item, idx) => (
                      <Text
                        onPress={() => {
                          setSortBy(item);
                          setShow(false);
                        }}
                        key={idx}
                        className="text-white py-1 px-5"
                      >
                        {item}
                      </Text>
                    ))}
                  </View>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>

          <View className="pt-5" style={{ zIndex: -1 }}>
            <Text className="text-bodyText font-semibold">
              Today, April 20-2022
            </Text>
            <View className="pt-5 ">
              <View className="p-4 rounded-2xl border bg-white border-borderColor flex flex-row justify-start items-center ">
                <View>
                  <Text className="text-primaryColor p-4 rounded-full bg-secondaryBg mr-4">
                    <MaterialCommunityIcons name="close-box" size={24} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className=" text-base font-semibold">
                    Appointment Cancel!
                  </Text>
                  <Text className="text-[12px] text-bodyText">
                    Never miss a medical appointment with our reliable
                    appointment alarm system!
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-5 ">
              <View className="p-4 rounded-2xl border bg-white border-borderColor flex flex-row justify-start items-center ">
                <View>
                  <Text className="text-primaryColor p-4 rounded-full bg-secondaryBg mr-4">
                    <FontAwesome name="calendar-check-o" size={24} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className=" text-base font-semibold">
                    New Services Available!
                  </Text>
                  <Text className="text-[12px] text-bodyText">
                    Explore our expanded range of services for improved health
                    and wellness.
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-5 ">
              <View className="p-4 rounded-2xl border bg-white border-borderColor flex flex-row justify-start items-center ">
                <View>
                  <Text className="text-primaryColor p-4 rounded-full bg-secondaryBg mr-4">
                    <FontAwesome name="calendar-check-o" size={24} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className=" text-base font-semibold">
                    Schedule Changed!
                  </Text>
                  <Text className="text-[12px] text-bodyText">
                    Schedule Updated! Please check for changes in your
                    appointments.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="pt-5" style={{ zIndex: -1 }}>
            <Text className="text-bodyText font-semibold">
              Yesterday, April 19-2022
            </Text>
            <View className="pt-5 ">
              <View className="p-4 rounded-2xl border bg-white border-borderColor flex flex-row justify-start items-center ">
                <View>
                  <Text className="text-primaryColor p-4 rounded-full bg-secondaryBg mr-4">
                    <Feather name="bell" size={24} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className=" text-base font-semibold">
                    Appointment Success!
                  </Text>
                  <Text className="text-[12px] text-bodyText">
                    Your appointment has been successfully scheduled. See you
                    then! Stay healthy!
                  </Text>
                </View>
              </View>
            </View>
            <View className="pt-5 ">
              <View className="p-4 rounded-2xl border bg-white border-borderColor flex flex-row justify-start items-center ">
                <View>
                  <Text className="text-primaryColor p-4 rounded-full bg-secondaryBg mr-4">
                    <FontAwesome name="calendar-check-o" size={24} />
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className=" text-base font-semibold">
                    New Services Available!
                  </Text>
                  <Text className="text-[12px] text-bodyText">
                    Explore our expanded range of services for improved health
                    and wellness.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({});
