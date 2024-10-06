import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

type Nullable<T> = T | null;

type PropsType = {
  disabled: boolean;
  onPress(otp: string[]): void;
};

const OtpInputField = ({ disabled, onPress }: PropsType) => {
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
            ref={(ref) => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref];
              }
            }}
            className="text-center text-xl font-semibold"
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
