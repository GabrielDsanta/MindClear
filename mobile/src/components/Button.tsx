import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "styles/colors";

import fonts from "styles/fonts";

interface ButtonProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = ({ title, disabled, onPress, backgroundColor, icon, iconPosition = "left", isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.button, disabled && styles.buttonDisabled, backgroundColor && { backgroundColor, borderColor: backgroundColor }])}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={32} color={colors.primary} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles.buttonText}>{title}</Text>
          {icon && iconPosition === "right" && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    width: "100%",
    marginTop: 25
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    ...fonts.boldFont,
    textAlign: "center"
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    marginHorizontal: 10
  }
});
