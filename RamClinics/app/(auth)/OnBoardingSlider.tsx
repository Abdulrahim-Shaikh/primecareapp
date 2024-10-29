import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { router } from "expo-router";
import OnBoardingSliderItem, { ItemProps } from "../../components/ui/OnBoardingSliderItem";
import Pagination from "../../components/ui/Pagination";
import SliderButton from "../../components/ui/SliderButton";
import { onbordingSliderData } from "../../constants/data";

const OnBoardingSlider = () => {
  const flatListRef = useAnimatedRef<FlatList<ItemProps>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView className="bg-[rgb(59,35,20)]">
      <View className=" absolute pt-8  w-full ">
        <View className="flex-row justify-between items-start w-full px-6">
          <View className="gap-4">
            <Image
              source={require("../../assets/images/onbording-screen-slider-img1.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
            <Image
              source={require("../../assets/images/onbording-screen-slider-img2.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
            <Image
              source={require("../../assets/images/onbording-screen-slider-img3.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
          </View>
          <View className="gap-4">
            <Image
              source={require("../../assets/images/onbording-screen-slider-img4.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
            <Image
              source={require("../../assets/images/onbording-screen-slider-img5.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
            <Image
              source={require("../../assets/images/onbording-screen-slider-img1.png")}
              style={{ maxHeight: 180, maxWidth: 160, borderRadius: 20 }}
            />
          </View>
        </View>
      </View>
      <View className="  justify-end items-center h-full">
        <View className=" bg-white max-h-[380px] flex-1 rounded-t-3xl pb-8">
          <Animated.FlatList
            ref={flatListRef}
            data={onbordingSliderData}
            onScroll={onScroll}
            keyExtractor={(item) => `key:${item.id}`}
            renderItem={({ item, index }) => {
              return <OnBoardingSliderItem item={item} idx={index} />;
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

          <View className="py-7">
            <Pagination onbordingSliderData={onbordingSliderData} x={x} />
          </View>
          <View className="flex justify-between items-center flex-row px-6">
            <Pressable onPress={() => router.push("/SignIn")}>
              <Text className="font-semibold text-pc-primary">Skip</Text>
            </Pressable>
            <SliderButton
              flatListRef={flatListRef}
              flatListIndex={flatListIndex}
              dataLength={onbordingSliderData.length}
              x={x}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingSlider;

const styles = StyleSheet.create({});
