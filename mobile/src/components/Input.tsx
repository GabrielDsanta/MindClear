import React, { useState } from "react";
import TextInputMask, { Mask, MaskInputProps } from "react-native-mask-input";

import { View, TextInputProps, StyleSheet, TouchableOpacity, Text } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

interface InputProps extends TextInputProps {
  placeholder: string;
  label: string;
  mask?: Mask;
  isPassword?: boolean;
  containerStyles?: object;
  errorMessage?: string;
}

export const Input = ({ placeholder, label, mask, isPassword = false, containerStyles, errorMessage, ...rest }: InputProps & MaskInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View style={{ justifyContent: "flex-start", alignItems: "flex-start", width: "100%", marginLeft: 20, marginTop: 20 }}>
        <Text style={styles.fontBold}>{label}</Text>
      </View>
      <View
        style={[
          styles.container,
          containerStyles,
          {
            borderColor: errorMessage ? "red" : isFocused ? colors.primary : "white"
          }
        ]}
      >
        <TextInputMask
          cursorColor="white"
          {...rest}
          secureTextEntry={isPassword ? isPasswordVisible : false}
          style={styles.textInput}
          placeholderTextColor="#FFFFFF50"
          placeholder={placeholder ? placeholder : undefined}
          mask={mask ? mask : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && (
          <TouchableOpacity style={styles.iconStyles} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <Feather name="eye" size={20} color="white" /> : <Feather name="eye-off" size={20} color="white" />}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <Text style={styles.errorMessageText}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    color: "#DDDDDD"
  },
  textInput: {
    ...fonts.MediumFont,
    width: "100%",
    color: "white",
    fontSize: 14
  },
  fontBold: {
    ...fonts.boldFont,
    color: "white",
    textAlign: "left"
  },
  iconStyles: {
    position: "absolute",
    right: 20
  },
  errorMessageText: {
    ...fonts.MediumFont,
    fontSize: 12,
    color: "red"
  }
});
