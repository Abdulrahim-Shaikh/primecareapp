import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const Dot = ({ index, x }: { index: number; x: SharedValue<number> }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#84cc16", "#84cc16", "#84cc16"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });
  return (
    <Animated.View
      style={[styles.dot, animatedDotStyle, animatedColor]}
      className="h-[10px] rounded-full "
    ></Animated.View>
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 10,
  },
});
