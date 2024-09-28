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
import { Octicons } from "@expo/vector-icons";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";
import Searchbox from "../../components/ui/Searchbox";
import { faqData } from "../../constants/data";

const categoryList = ["General", "Login", "Account", "Doctor", "Lab"];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButton isPushBack={true} title="FAQ" />

          <View className="pt-8">
            <Searchbox />

            <View className="flex-row pt-5 gap-3">
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
                      className={`text-base border border-amber-900 rounded-md py-1 px-3 ${
                        index === activeCategory
                          ? "text-white bg-amber-900"
                          : ""
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            <View className="pt-8 gap-4">
              {faqData.map(({ id, question, answer }, idx) => (
                <Pressable
                  onPress={() => setActiveFaq(idx)}
                  className="p-4 rounded-xl border text-amber-500"
                  key={id}
                >
                  <View className="flex-row justify-between items-start">
                    <Text className="font-semibold text-base pr-5">
                      {question}
                    </Text>
                    <Text>
                      <Octicons
                        name={activeFaq === idx ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="black"
                      />
                    </Text>
                  </View>
                  {activeFaq === idx && (
                    <Text className="pt-3  border-t border-dashed mt-3 text-amber-500">
                      {answer}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqPage;

const styles = StyleSheet.create({});
