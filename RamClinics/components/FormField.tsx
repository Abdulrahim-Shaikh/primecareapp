import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

type PropsType = {
  name?: string;
  placeholder: string;
  otherStyle?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  value?: string;
  onChangeText(value: any): void;
  onEnter(value: any): void;
};

const FormField = ({  
  name,
  placeholder,
  otherStyle,
  keyboardType,
  value,
  onChangeText,
  onEnter
}: PropsType) => {
  const [focus, setFocus] = useState(false);
  return (
    <View className={`w-full ${otherStyle}`}>
      {name && <Text className="text-base font-medium">{name}</Text>}
      <View
        className={`px-4 py-3  border rounded-xl w-full mt-2 ${
          focus ? "border-amber-900 " : "text-amber-500"
        }`}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#c3c3ce"
          className="w-full"
          secureTextEntry={
            name === "Password" ||
            name === "Old Password" ||
            name === "New Password" ||
            name === "Confirm Password"
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType={keyboardType ? keyboardType : "default"}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onEnter}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
