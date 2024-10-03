import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type Props = {
  searchValue: any;
  setSearchValue: any;
};

const Searchbox = ({ searchValue, setSearchValue }: Props) => {

  // const [searchValue, setSearchValue] = useState("");

  return (
    <View className="flex flex-row justify-start items-center border border-amber-900 rounded-xl p-3 flex-1 mr-1">
      <Ionicons
        color={"#c3c3ce"}
        name="search"
        size={20}
        style={{ marginRight: 8 }}
      />

      <TextInput
        placeholderTextColor="#c3c3ce"
        placeholder="Search"
        className="flex-1"
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
      />
      {searchValue && (
        <Pressable
          onPress={() => setSearchValue("")}
          className="p-1 ml-2 rounded-full bg-lime-300"
        >
          <AntDesign name="close" />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbox;

const styles = StyleSheet.create({});
