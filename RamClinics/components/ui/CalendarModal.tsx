import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

const CalendarModal = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <View>
      <Pressable className="" onPress={() => setShowCalendar(true)}>
        <View className=" justify-end items-center flex-row gap-2">
          <Text>January-2024</Text>
          <Text className="p-1 bg-white rounded-full">
            <Entypo name="chevron-small-right" size={24} color="rgb(132 204 22)" />
          </Text>
        </View>
      </Pressable>

      <Modal
        transparent
        visible={showCalendar}
        animationType="fade"
        className="justify-center items-center"
      >
        <View
          className="flex justify-center items-center h-full "
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View className="bg-white bg-opacity-50 h-[400px] w-[80%] justify-center items-center rounded-xl">
            <Pressable
              className="absolute -top-10 -right-4 z-20"
              onPress={() => setShowCalendar(false)}
            >
              <Text className="bg-white p-2 rounded-full">
                <AntDesign name="close" size={20} color="rgb(132 204 22)" />
              </Text>
            </Pressable>
            <View className="w-full px-4">
              <Calendar
                onDayPress={(day) => {
                  setSelected(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "#00adf5",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#00adf5",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#2d4150",
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});
