import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../src/styles/fonts";

interface MeditateCardProps {
  title: string;
}

export const MeditateCard = ({ title }: MeditateCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldFont}>{title}</Text>
    </View>
  );
};

export default MeditateCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 190,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF10",
    marginTop: 30,
    paddingHorizontal: 20
  },
  boldFont: {
    ...fonts.semiBoldFont,
    fontSize: 24,
    textAlign: "center"
  }
});
