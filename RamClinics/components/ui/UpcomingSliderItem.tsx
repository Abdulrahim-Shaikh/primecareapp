import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import arrow from "../../assets/images/arrow.png";
import sliderImgBg from "../../assets/images/doctor_img_bg.png";

type Props = { title: string; desc: string; doctorImg: any };

const UpcomingSliderItem = ({ title, desc, doctorImg }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  return (
    <View
      style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05 }}
      className=" bg-amber-500 rounded-2xl mt-7"
    >
      <View className="flex flex-row justify-between items-center w-full">
        <View className="max-w-[230px] pl-5 relative z-10">
          <Text className="text-base font-semibold">
            {title} <Image source={arrow} />
          </Text>
          <Text className=" text-xs pt-8">{desc}</Text>
        </View>
        <View className=" relative" style={{ marginTop: -40 }}>
          <Image source={doctorImg} className=" z-10" />
          <View className="absolute top-10 bottom-0 right-0 overflow-hidden">
            <Image
              source={sliderImgBg}
              className="rounded-tr-2xl h-full rounded-br-2xl"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpcomingSliderItem;

const styles = StyleSheet.create({});
