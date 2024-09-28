import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import DoctorCard from "../../components/ui/DoctorCard";
import { topDoctorData } from "../../constants/data";

const categoryList = [
  "All",
  "General",
  "Dentist",
  "Nutritionist",
  "Cardiologist",
];

const TopDoctor = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView className="pt-6">
        <View className="px-6">
          <HeaderWithBackButton isPushBack={true} title="Top Doctor" />
        </View>

        <View className="pt-8 px-6 ">
          <Searchbox />
        </View>

        <View className="flex-row pt-5 gap-3 pl-6">
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 12 }}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => (
              <Pressable>
                <Text
                  onPress={() => setActiveCategory(index)}
                  className={`text-base border border-primaryColor rounded-md py-1 px-3 ${
                    index === activeCategory ? "text-white bg-amber-900" : ""
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View className="pb-16 px-6">
          {topDoctorData.map(({ ...props }, idx) => (
            <DoctorCard {...props} key={idx} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopDoctor;

const styles = StyleSheet.create({});
