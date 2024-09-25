import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { myAppoinmentData } from "../../constants/data";
import Searchbox from "../../components/ui/Searchbox";

const tabNames = ["Upcoming", "Completed", "Cancelled"];

const Appoinment = () => {
  const [cancelModal, setCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [filteredItem, setFilteredItem] = useState(myAppoinmentData);

  useEffect(() => {
    const filteredData = myAppoinmentData.filter(
      (item) => item.sessionStatus === activeTab
    );

    setFilteredItem(filteredData);
  }, [activeTab]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={24}
              color={"#009281"}
            />
            <Text className="text-2xl font-semibold">My Appoinments</Text>
          </View>
          <View className="pt-8">
            <Searchbox />
          </View>
          <View className="pt-6 flex flex-row  justify-between items-center">
            {tabNames.map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveTab(item)}
                className={`flex-1 border-b  pb-2 ${
                  activeTab === item
                    ? "border-primaryColor"
                    : "border-borderColor"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    activeTab === item ? "text-primaryColor" : ""
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="">
            {filteredItem.map((item, idx) => (
              <View
                key={`key: ${item.id}`}
                className="p-4 border border-borderColor rounded-2xl w-full mt-4"
              >
                <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-borderColor pb-4">
                  <View className="flex flex-row justify-start items-center ">
                    <View className="bg-secondaryBg rounded-lg overflow-hidden mr-3 ">
                      <Image source={item.img} />
                    </View>

                    <View>
                      <Text className="text-base font-medium pb-2">
                        {item.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="">{item.sessionTyps} - </Text>
                        <View>
                          <Text
                            className={`text-[12px] ${
                              item.sessionStatus === "Upcoming" &&
                              "text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md"
                            } ${
                              item.sessionStatus === "Completed" &&
                              "text-primaryColor bg-secondaryBg px-2 py-1 rounded-md"
                            } ${
                              item.sessionStatus === "Cancelled" &&
                              "text-[#f75555] bg-[#feeeee] px-2 py-1 rounded-md"
                            } `}
                          >
                            {item.sessionStatus}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-[12px] pt-2">
                        <Text>
                          <AntDesign name="star" color={"#ffab00"} />
                        </Text>
                        {item.rating}
                        <Text>
                          <Entypo name="dot-single" />
                        </Text>
                        <Text className="text-primaryColor">
                          <AntDesign name="clockcircle" /> {item.availableTime}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View className=" border border-primaryColor p-2 rounded-md ">
                    <Ionicons
                      name="heart-outline"
                      size={16}
                      color={"#009281"}
                    />
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
                  {item.sessionStatus === "Upcoming" ? (
                    <Text
                      onPress={() => setCancelModal(true)}
                      className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center"
                    >
                      Cancel
                    </Text>
                  ) : (
                    <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                      Book Again
                    </Text>
                  )}

                  {item.sessionStatus === "Upcoming" ? (
                    <Text className="flex-1 text-white border border-primaryColor px-4 py-2 rounded-lg bg-primaryColor text-center">
                      Change Date
                    </Text>
                  ) : (
                    <Text className="flex-1 text-white border border-primaryColor px-4 py-2 rounded-lg bg-primaryColor text-center">
                      Leave Review
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={cancelModal} transparent={true}>
        <View
          className="h-full justify-end items-center"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View className="bg-white w-full pt-16 px-6 pb-6 rounded-t-[60px] ">
            <View className="pb-4 border-b border-dashed border-borderColor">
              <Text className="text-[#ff5630] text-2xl text-center font-semibold ">
                Cancel Appointment
              </Text>
            </View>
            <Text className="text-lg pt-4 text-center text-bodyText">
              Are you sure you want to cancel?
            </Text>

            <View className="pt-8 flex-row gap-4">
              <Pressable
                onPress={() => setCancelModal(false)}
                className="flex-1"
              >
                <Text className="text-primaryColor border border-primaryColor rounded-lg py-4 bg-secondaryBg text-center font-medium ">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/CancelAppoinment")}
                className="flex-1"
              >
                <Text className="text-white border border-primaryColor rounded-lg py-4 bg-primaryColor text-center font-medium ">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
