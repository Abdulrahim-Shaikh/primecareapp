import {
  Button,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { myAppoinmentData } from "../../constants/data";
import Searchbox from "../../components/ui/Searchbox";
import DateTimePicker from '@react-native-community/datetimepicker';


const tabNames = ["Upcoming", "Completed", "Cancelled"];

const Appoinment = () => {
  const [cancelModal, setCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [filteredItem, setFilteredItem] = useState(myAppoinmentData);
  const [fromDate, setFromDate] = useState(new Date());  // State for start date
  const [toDate, setToDate] = useState(new Date());
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false); // Control for start date picker modal
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false); 

  const onStartDateChange = (selectedDate: any) => {
    const currentDate = selectedDate || fromDate;
    setIsFromDatePickerOpen(Platform.OS === 'ios');
    setFromDate(currentDate);

    // Ensure the end date is after the start date
    if (currentDate > toDate) {
      setToDate(currentDate);
    }
  };

  // Handle End Date Change
  const onEndDateChange = (selectedDate: any) => {
    const currentDate = selectedDate || toDate;
    setIsToDatePickerOpen(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  useEffect(() => {
    const filteredData = myAppoinmentData.filter(
      (item) => item.sessionStatus === activeTab
    );

    setFilteredItem(filteredData);
  }, [activeTab]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" pb-8 px-6">
          <View className="flex flex-row justify-start items-center gap-4 pt-6">
            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={24}
              color={"#009281"}
            />
            <Text className="text-2xl font-semibold">My Appoinments</Text>
          </View>
          <View className="pt-8">
            <Searchbox />
          </View>
          <View>
            <Text>Start Date: {fromDate.toString()}</Text>
            <Button title="Select Start Date" onPress={() => setIsFromDatePickerOpen(true)} />
            <Modal visible={isFromDatePickerOpen} transparent={true} animationType="slide">
              <View>
                {isFromDatePickerOpen && (
                  <DateTimePicker
                    testID="startDatePicker"
                    value={fromDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                    maximumDate={new Date()} // Optional: Limit selection to today or earlier
                  />
                )}
                <Button title="Confirm" onPress={() => setIsFromDatePickerOpen(false)} />
              </View>
            </Modal>


            <Text>End Date: {toDate.toString()}</Text>
            <Button title="Select End Date" onPress={() => setIsToDatePickerOpen(true)} />

            {/* Modal for End Date Picker */}
            <Modal visible={isToDatePickerOpen} transparent={true} animationType="slide">
              <View>
                {isToDatePickerOpen && (
                  <DateTimePicker
                    testID="endDatePicker"
                    value={toDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                    minimumDate={fromDate} // Ensure end date is after start date
                    maximumDate={new Date()} // Optional: Limit selection to today or earlier
                  />
                )}
                <Button title="Confirm" onPress={() => setIsToDatePickerOpen(false)} />
              </View>
            </Modal>
          </View>
          <View className="pt-6 flex flex-row  justify-between items-center">
            {tabNames.map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveTab(item)}
                className={`flex-1 border-b  pb-2 ${
                  activeTab === item
                    ? "border-amber-900"
                    : "text-amber-500"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    activeTab === item ? "text-amber-900" : ""
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="">
            {filteredItem.map((item, idx) => (
              <View
                key={`key: ${item.id}`}
                className="p-4 border border-amber-900 rounded-2xl w-full mt-4"
              >
                <View className="flex flex-row w-full justify-between items-start border-b border-dashed border-amber-900 pb-4">
                  <View className="flex flex-row justify-start items-center ">
                    <View className="bg-amber-100 rounded-lg overflow-hidden mr-3 ">
                      <Image source={item.img} />
                    </View>

                    <View>
                      <Text className="text-base font-medium pb-2">
                        {item.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="">{item.sessionTyps} - </Text>
                        <View>
                          <Text
                            className={`text-[12px] ${
                              item.sessionStatus === "Upcoming" &&
                              "text-[#5554DB] bg-[#d4d4fc] px-2 py-1 rounded-md"
                            } ${
                              item.sessionStatus === "Completed" &&
                              "text-amber-900 bg-amber-100 px-2 py-1 rounded-md"
                            } ${
                              item.sessionStatus === "Cancelled" &&
                              "text-[#f75555] bg-[#feeeee] px-2 py-1 rounded-md"
                            } `}
                          >
                            {item.sessionStatus}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-[12px] pt-2">
                        <Text>
                          <AntDesign name="star" color={"#ffab00"} />
                        </Text>
                        {item.rating}
                        <Text>
                          <Entypo name="dot-single" />
                        </Text>
                        <Text className="text-amber-900">
                          <AntDesign name="clockcircle" /> {item.availableTime}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View className=" border border-amber-900 p-2 rounded-md ">
                    <Ionicons
                      name="heart-outline"
                      size={16}
                      color={"#009281"}
                    />
                  </View>
                </View>
                <View className="flex flex-row justify-between items-center pt-3 gap-4 ">
                  {item.sessionStatus === "Upcoming" ? (
                    <TouchableOpacity>
                      <Text
                        onPress={() => setCancelModal(true)}
                        className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center"
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Text className=" text-primaryColor border-t-[1px] border-x-[1px] border-b-[2px] border-primaryColor px-4 py-2 rounded-lg flex-1 text-center">
                        Book Again
                      </Text>
                    </TouchableOpacity>
                  )}

                  {item.sessionStatus === "Upcoming" ? (
                    <Text className="flex-1 text-white border border-amber-900	 px-4 py-2 rounded-lg bg-amber-900 text-center">
                      Change Date
                    </Text>
                  ) : (
                    <Text className="flex-1 text-white border border-amber-900 px-4 py-2 rounded-lg bg-amber-900 text-center">
                      Leave Review
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal visible={cancelModal} transparent={true}>
        <View
          className="h-full justify-end items-center"
          style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
        >
          <View className="bg-white w-full pt-16 px-6 pb-6 rounded-t-[60px] ">
            <View className="pb-4 border-b border-dashed text-amber-500">
              <Text className="text-[#ff5630] text-2xl text-center font-semibold ">
                Cancel Appointment
              </Text>
            </View>
            <Text className="text-lg pt-4 text-center text-amber-900">
              Are you sure you want to cancel?
            </Text>

            <View className="pt-8 flex-row gap-4">
              <Pressable
                onPress={() => setCancelModal(false)}
                className="flex-1"
              >
                <Text className="text-amber-900	border border-bg-amber-900 rounded-lg py-4 bg-amber-100 text-center font-medium ">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/CancelAppoinment")}
                className="flex-1"
              >
                <Text className="text-white border border-bg-amber-900 rounded-lg py-4 bg-amber-900 text-center font-medium ">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
