import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import HeaderWithBackButton from "../../ui/HeaderWithBackButton";
import CustomSwitch from "../../CustomSwitch";
import CalendarModal from "../../ui/CalendarModal";
import { scheduleDates } from "../../../constants/data";

type PropsType = {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const sortOption = [
  "Popularity",
  "Star Rating (higest first)",
  "Star Rating (higest first)",
  "Best Reviewed First",
  "Mast Reviewed First",
  "Price (lowest first)",
  "Price (higest first)",
];

const workExperience = ["< 1", "1 - 5", "5 - 10", "10 - 15", "15 - 20", "20+"];

const FilterModal = ({ showFilter, setShowFilter }: PropsType) => {
  const [sortBy, setSortBy] = useState(0);
  const [activeGenter, setActiveGender] = useState("Male");
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Modal visible={showFilter} animationType="slide">
      <ScrollView className="p-6">
        <HeaderWithBackButton setModal={setShowFilter} title="Filter" />

        <View className="pt-8 pr-3 flex-row justify-between items-center pb-4 border-b border-dashed border-borderColor">
          <Text className="text-lg font-semibold">Available Today</Text>
          <CustomSwitch />
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold pb-5">Sort Option</Text>

          <View className="px-5 rounded-xl border border-amber-900">
            {sortOption.map((item, idx) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSortBy(idx)}
                key={idx}
                className={`justify-between items-center flex-row py-4 ${
                  sortOption.length - 1 === idx
                    ? ""
                    : "border-b border-dashed border-borderColor"
                } `}
              >
                <Text className="text-base font-medium">{item}</Text>
                <View
                  className={`border  w-5 h-5 rounded-full justify-center items-center ${
                    sortBy === idx
                      ? "border-amber-900"
                      : " border-borderColor"
                  }`}
                >
                  <View
                    className={`w-3 h-3 border  rounded-full ${
                      sortBy === idx
                        ? "border-amber-900 bg-amber-900"
                        : "border-amber-900"
                    } `}
                  ></View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-8 ">
          <Text className="text-lg font-semibold pb-5">Gender</Text>
          <View className=" flex-row gap-4 justify-between items-center w-full">
            {["Male", "Female"].map((item, idx) => (
              <Pressable
                className="flex-1 "
                onPress={() => setActiveGender(item)}
                key={idx}
              >
                <Text
                  className={`text-center  py-4 px-8 rounded-lg border border-amber-900 text-base font-medium ${
                    item === activeGenter
                      ? "bg-amber-900 text-white"
                      : "text-amber-900"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-8 ">
          <Text className="text-lg font-semibold pb-5">
            Work Experience ( years )
          </Text>
          <View className=" flex-row w-full flex-wrap  justify-between items-center gap-4">
            {workExperience.map((item, idx) => (
              <Pressable
                className="w-[45%]"
                onPress={() => setActiveExperience(idx)}
                key={idx}
              >
                <Text
                  className={`text-center  py-4 px-8 rounded-lg border border-amber-900 text-base font-medium ${
                    idx === activeExperience
                      ? "bg-amber-900 text-white"
                      : "text-amber-900"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-8 pb-8">
          <View className="flex-row justify-between items-center pb-5">
            <Text className="text-lg font-semibold ">Schedules</Text>
            <CalendarModal />
          </View>
          <View className="border border-amber-900 rounded-xl p-5 flex-row -mr-20">
            <FlatList
              horizontal
              style={{ marginRight: 60 }}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={scheduleDates}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable className=" items-center p-3 rounded-lg border border-amber-900">
                  <Text className="text-base font-semibold">{item.date}</Text>
                  <Text className="text-[12px]">{item.day}</Text>
                </Pressable>
              )}
            />
          </View>
          <View className="border border-amber-900 rounded-xl p-5 flex-row -mr-20 mt-5">
            <FlatList
              horizontal
              style={{ marginRight: 60 }}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={["10.00Am", "11.00Am", "12.00Pm", "01.00Pm"]}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable className=" items-center py-2 px-3 rounded-lg border border-amber-900">
                  <Text className="text-base font-semibold">{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>

        <View className=" pb-16">
          <Text className="text-lg font-semibold pb-5">Rating</Text>
          <View className=" flex-row -mr-20">
            <FlatList
              horizontal
              style={{ marginRight: 80 }}
              contentContainerStyle={{ gap: 16 }}
              showsHorizontalScrollIndicator={false}
              data={["2.5", "3.0", "3.5", "4.0", "4.5", "5.0"]}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }) => (
                <Pressable className=" items-center py-2 px-4 rounded-lg border border-amber-900">
                  <Text className="text-base font-medium text-amber-900">
                    {item}{" "}
                    <Text>
                      <AntDesign name="staro" size={16} color="#009281" />
                    </Text>{" "}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
