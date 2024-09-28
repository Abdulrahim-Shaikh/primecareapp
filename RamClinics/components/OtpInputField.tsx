import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputKeyPressEventData,
    View,
} from "react-native";
import React, { useRef } from "react";

type Nullable<T> = T | null;

const OtpInputField = ({ disabled }: { disabled: boolean }) => {
  const inputRefs = useRef<Array<Nullable<TextInput>>>([]);

  const handleChange = (text: string, idx: number) => {
    if (text.length !== 0) {
      return inputRefs?.current[idx + 1]?.focus();
    }
    return inputRefs?.current[idx - 1]?.focus();
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
      {[...new Array(4)].map((item, idx) => (
        <View
          key={idx}
          className="border border-amber-900 py-3 px-5 rounded-lg flex justify-center items-center"
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
            testID={`OTPInput-${idx}`}
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
