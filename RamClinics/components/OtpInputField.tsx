import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";

type Nullable<T> = T | null;

type PropsType = {
  disabled: boolean;
  onPress(otp: string[]): void;
};

const OtpInputField = ({ disabled, onPress }: PropsType) => {

  const otpInputRef = useRef<TextInput>(null);

  const handleFocusInput = () => {
      otpInputRef.current?.focus();
  };

  useEffect(() => {
    handleFocusInput()
      // otpInputRef.current?.focus();
  })
  
  // useFocusEffect(
  //   useCallback(() => {
  //   }, [])
  // )


  const inputRefs = useRef<Array<Nullable<TextInput>>>([]);
  const [otpValue, setOtpValue] = useState<string[]>(["", "", "", ""]);

  const handleChange = (text: string, idx: number) => {
    const updatedOtpValue = [...otpValue];
    updatedOtpValue[idx] = text;
    setOtpValue(updatedOtpValue);

    onPress(updatedOtpValue);

    if (text.length !== 0) {
      return inputRefs.current[idx + 1]?.focus();
    }
    return inputRefs.current[idx - 1]?.focus();
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    const { nativeEvent } = event;
    if (nativeEvent.key === "Backspace") {
      handleChange("", idx);
    }
  };

  return (
    <View className="flex flex-row justify-center items-center gap-4">
      {[...new Array(4)].map((_, idx) => (
        <View
          key={idx}
          className="border border-pc-primary py-3 px-5 rounded-lg flex justify-center items-center"
        >
          <TextInput
            ref={(otpInputRef) => {
              if (otpInputRef && !inputRefs.current.includes(otpInputRef)) {
                inputRefs.current = [...inputRefs.current, otpInputRef];
              }
            }}
            className="text-center text-xl font-semibold"
            placeholder=""
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChange(text, idx)}
            onKeyPress={(event) => handleBackspace(event, idx)}
          />
        </View>
      ))}
    </View>
  );
};

export default OtpInputField;

const styles = StyleSheet.create({});
