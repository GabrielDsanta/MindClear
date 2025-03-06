import React, { FC } from "react";
import { CommitmentCard } from "..";
import { StyleSheet, Text, View } from "react-native";

import fonts from "styles/fonts";

interface CommitMentCardProps {
  commitment: CommitmentCard;
}

export const CommitMentCard: FC<CommitMentCardProps> = ({ commitment }) => {
  const { description, icon } = commitment;
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#3589EC20",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  descriptionText: {
    ...fonts.regularFont,
    color: "#A0A0A0",
    fontSize: 14,
    maxWidth: 300
  },
  fontBold: {
    ...fonts.semiBoldFont
  }
});
