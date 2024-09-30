import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { View, Modal, Text, Pressable } from "react-native";

const Promotions = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(true);
            return () => setModalVisible(false);
        }, [])
    );

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={closeModal}>
                <View className="flex-1 items-center justify-center bg-transparent">
                    <View className="bg-white w-4/5 rounded-lg p-5 relative">
                        <Pressable className="absolute top-3 right-3" onPress={closeModal}>
                            <AntDesign name="closecircle" size={24} color="#78450f" />
                        </Pressable>
                        <View className="flex items-center mb-4">
                            <AntDesign name="gift" size={40} color="#78450f" />
                        </View>
                        <Text className="text-lg font-bold text-center mb-4 mt-4">
                            Select the Service You Want to Book
                        </Text>
                        <Text className="text-center text-gray-500 mb-6">
                            Please select one
                        </Text>
                        <View className="flex-row justify-between mt-4">
                            <Pressable className="flex-1 bg-amber-900 py-2 rounded-lg mr-2" onPress={() => { closeModal(); router.push('/Offers') }}>
                                <Text className="text-center text-white font-bold">Offers</Text>
                            </Pressable>
                            <Pressable className="flex-1 bg-amber-900 py-2 rounded-lg ml-2" onPress={() => { closeModal(); router.push('/Packages') }}>
                                <Text className="text-center text-white font-bold">Packages</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default Promotions;