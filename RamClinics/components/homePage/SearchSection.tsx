import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Searchbox from "../ui/Searchbox";

const SearchSection = ({
  setShowFilter,
}: {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <View className="pt-8 px-6">
      <Text className="text-bodyText font-semibold pb-2">Friday, July 15</Text>
      <Text className="text-[24px] font-semibold">Let’s Find Your Doctor</Text>
      <View className="flex flex-row justify-between items-center pt-6 w-full">
        <Searchbox />
        <TouchableOpacity
          className="p-3 rounded-lg bg-primaryColor "
          onPress={() => setShowFilter(true)}
        >
          <MaterialIcons name="tune" size={28} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({});
