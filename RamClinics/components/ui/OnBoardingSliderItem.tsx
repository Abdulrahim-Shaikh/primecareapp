import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";

export type ItemProps = {
  id: number;
  title: string;
  colorTitle: string;
  description: string;
};

type Props = {
  item: ItemProps;
  idx: number;
};

const OnBoardingSliderItem = ({ item, idx }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <View className=" pt-8  ">
      <View
        style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05 }}
        className=" justify-start items-center flex flex-1"
      >
        <Text className="text-4xl font-semibold text-center">
          {item.title}{" "}
          <Text className=" text-amber-900">{item.colorTitle}</Text>
        </Text>
        <Text className="text-center pt-5 text-base text-amber-900">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingSliderItem;

const styles = StyleSheet.create({});
