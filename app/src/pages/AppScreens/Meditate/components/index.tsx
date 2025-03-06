import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "styles/fonts";

interface MeditateCardProps {
  title: string;
}

export const MeditateCard: FC<MeditateCardProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldFont}>{title}</Text>
    </View>
  );
};

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
