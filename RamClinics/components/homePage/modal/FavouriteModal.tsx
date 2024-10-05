import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet, View
} from "react-native";
import React, { useState } from "react";
import HeaderWithBackButton from "../../ui/HeaderWithBackButton";
import Searchbox from "../../ui/Searchbox";
import { topDoctorData } from "../../../constants/data";
import DoctorCard from "../../ui/DoctorCard";


type Props = {
  showFavouriteModal: boolean;
  setShowFavouriteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavouriteModal = ({
  setShowFavouriteModal,
  showFavouriteModal,
}: Props) => {

  const [searchValue, setSearchValue] = useState('');

  return (
    <Modal visible={showFavouriteModal} animationType="slide">
      <View className={Platform.OS === 'ios' ? "pt-20 px-6" : "pt-8 px-6"}>
        <HeaderWithBackButton
          setModal={setShowFavouriteModal}
          title="Favourite Modal" />
      </View>
      <ScrollView className="p-6">

        <View className="flex flex-row justify-between items-center pt-6 w-full">
          <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
        </View>
        <View className="pb-16">
          {topDoctorData.map(({ ...props }, idx) => (
            <DoctorCard {...props} key={idx} />
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FavouriteModal;

const styles = StyleSheet.create({});
