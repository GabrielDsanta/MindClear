import React from "react";

import { OptionCard } from "../PanicPage";
import { StyleSheet, Text, View } from "react-native";

import fonts from "../../src/styles/fonts";

interface PanicCardProps {
  option: OptionCard;
}

export const PanicCard = ({ option }: PanicCardProps) => {
  const { description, icon, title } = option;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
        <Text style={styles.fontBold}>{title}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default PanicCard

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#3589EC20",
    marginBottom: 10
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  descriptionText: {
    ...fonts.regularFont,
    color: "#A0A0A0",
    marginTop: 7,
    fontSize: 13
  },
  fontBold: {
    ...fonts.semiBoldFont
  }
});
