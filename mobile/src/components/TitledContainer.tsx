import React, { ReactNode } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Brain, ChevronLeft } from "lucide-react-native";

import colors from "styles/colors";
import fonts from "styles/fonts";

interface TitledContainerProps {
  children: ReactNode;
  disableArrow?: boolean;
  handleGoBack?: () => void;
}

export const TitledContainer = ({ children, disableArrow = false, handleGoBack }: TitledContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0A14" }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerButtonStyles} onPress={handleGoBack}>
          {!disableArrow && (
            <View style={styles.backButtonStyles}>
              <ChevronLeft size={20} color="white" />
            </View>
          )}

          <View style={styles.logoContainerStyles}>
            <Brain strokeWidth={1} color={colors.primary} size={32} />
            <Text style={styles.boldText}>Mind Clear</Text>
          </View>
        </TouchableOpacity>
      </View>

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center"
  },
  containerButtonStyles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10
  },
  backButtonStyles: {
    width: 35,
    height: 35,
    borderRadius: 10000,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF10"
  },
  logoContainerStyles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  boldText: {
    ...fonts.boldFont,
    fontSize: 20
  }
});
