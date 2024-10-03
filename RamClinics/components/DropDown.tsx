import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, Text, View } from "react-native";

const sortByOptions = ["7 Days", "1 Month", "6 Month", "All Time"];

const DropDown = () => {
  return (
    <SelectDropdown
      data={sortByOptions}
      onSelect={(selectedItem, index) => {}}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View>
            <Text className="px-3 py-2">
              {(selectedItem && selectedItem) || "All Time"}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View className="">
            <Text className="text-white py-1 pl-1">{item}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        backgroundColor: "rgb(132 204 22)",
        padding: 12,
        borderRadius: 12,

        right: 50!,
      }}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    right: 10,
    backgroundColor: "transparent",
  },
});
