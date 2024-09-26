import {
  FlatList, StyleSheet,
  Text,
  View,
  ViewToken
} from "react-native";
import React from "react";

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import UpcomingSliderItem from "../ui/UpcomingSliderItem";
import Pagination from "../ui/Pagination";
import { upcomingSliderData } from "../../constants/data";

type ItemProps = {
  id: number;
  title: string;
  desc: string;
  img: any;
};

const UpcomingSlider = () => {
  const flatListRef = useAnimatedRef<FlatList<ItemProps>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View className="pt-8 overflow-hidden">
      <Text className="text-xl font-semibold px-6">Upcoming Shedule</Text>
      <View className="max-h-[245px]">
        <Animated.FlatList
          ref={flatListRef}
          data={upcomingSliderData}
          onScroll={onScroll}
          keyExtractor={(item) => `key:${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <UpcomingSliderItem
                title={item.title}
                desc={item.desc}
                doctorImg={item.img}
              />
            );
          }}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />

        <View className="">
          <Pagination onbordingSliderData={upcomingSliderData} x={x} />
        </View>
      </View>
    </View>
  );
};

export default UpcomingSlider;

const styles = StyleSheet.create({});
