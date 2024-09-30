import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import arrow from "../../assets/images/arrow.png";
import sliderImgBg from "../../assets/images/doctor_img_bg.png";
import background from "../../assets/images/background.jpg"

type Props = { promotionName: string; description: string; photo: any };

const UpcomingSliderItem = ({ promotionName, description, photo }: Props) => {

  const { width: SCREEN_WIDTH } = useWindowDimensions();

  return (
    <ImageBackground
    source={background}
    resizeMode="cover"
    style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05}} 
    imageStyle={{ borderRadius: 20 }}>
    <View style={{ flex: 1, position: 'relative' }}>
      <View className="flex flex-row justify-between items-center w-full pt-8">
        <View className="max-w-[230px] pl-5 relative z-10">
          <Text className="text-lg font-semibold">
            {promotionName}
          </Text>
          <Text className="text-base pt-1">{description}</Text>
        </View>
      </View>
      <TouchableOpacity 
        className="bg-emerald-500 text-primaryColor border-t-[1px] border-x-[1px] border-b-[1px] border-primaryColor px-4 py-2 rounded-lg"
        style={{ position: 'absolute', right: 15, bottom: 20 }}
      >
        <Text>Book</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  
  );
};

export default UpcomingSliderItem;

const styles = StyleSheet.create({});
