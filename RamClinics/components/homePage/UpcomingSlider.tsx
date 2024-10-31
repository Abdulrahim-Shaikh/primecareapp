import {
  Alert,
  FlatList, StyleSheet,
  Text,
  View,
  ViewToken
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import UpcomingSliderItem from "../ui/UpcomingSliderItem";
import Pagination from "../ui/Pagination";
import { upcomingSliderData } from "../../constants/data";
import promotionService from "../../domain/services/PromotionSerivce";
import { router, useFocusEffect } from "expo-router";
import translations from "../../constants/locales/ar";
import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import { useLanguage } from "../../domain/contexts/LanguageContext";
import { lang } from "moment";
import promotionServicesService from "../../domain/services/PromotionSerivcesService";

type ItemProps = {
  id: number;
  promotionName: string;
  description: string;
  photo: any;
};

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true;
const UpcomingSlider = () => {
  const { language, changeLanguage } = useLanguage();
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (locale: any) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  useFocusEffect(
    useCallback(() => {
      changeLocale(language)
      changeLanguage(language)
    }, [])
  )

  let [promotionList, setPromotion] = useState([]);
  let [promotionServices, setPromotionServices] = useState([]);

  useEffect(() => {
    promotionService.getPromotion().then((res) => {
      setPromotion(res.data);
    })
    promotionServicesService.getAllServices()
      .then((res) => {
        let today = new Date();
        // setPromotionServices(res.data.filter((promo: any) => promo.showOnline));
        setPromotionServices(res.data);
        console.log('promotion services', res.data);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('An error occurred while booking', err.message);
      });
  }, [])

  const flatListRef = useAnimatedRef<FlatList<ItemProps>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  // const onViewableItemsChanged = ({
  //   viewableItems,
  // }: {
  //   viewableItems: ViewToken[];
  // }) => {
  //   if (viewableItems && viewableItems[0]?.index !== null) {
  //     flatListIndex.value = viewableItems[0]?.index;
  //   }
  // };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <View className="pt-8 overflow-hidden">
      <View className="flex flex-row justify-between items-center w-full px-6">
        <Text className=" text-xl font-semibold">{i18n.t("Upcoming Offers")}</Text>
        <Text
          onPress={() => router.push("/Offers")}
          className=" font-semibold text-pc-primary">
          {i18n.t("View All")}
        </Text>
      </View>
      {promotionServices.length > 0 ? (
        <View className="max-h-[245px]">
          <Animated.FlatList
            ref={flatListRef}
            //data={promotionList}
            data={promotionServices}
            onScroll={onScroll}
            keyExtractor={(item: any) => `key:${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <UpcomingSliderItem
                  id={item.id}
                  promotionName={item.description}
                  description={item.descriptionAr}
                  photo={item.offerImages}
                  //promotionServices={item.promotionServices}
                  promotionServices={[]}
                  promotionService={item}
                />
              );
            }}
            scrollEventThrottle={16}
            horizontal={true}
            bounces={false}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            //onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              minimumViewTime: 300,
              viewAreaCoveragePercentThreshold: 10,
            }}
          />
          <View className="text-lime-600">
            <Pagination onbordingSliderData={promotionList} x={x} />
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-gray-500 text-lg text-center pt-12">{i18n.t("NoAvailableOffers")}</Text>
        </View>
      )}
    </View>

  );
};

export default UpcomingSlider;

const styles = StyleSheet.create({});
