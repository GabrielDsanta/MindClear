import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Brain, Mail } from "lucide-react-native";
import { Button } from "components/Button";
import { useRouter } from "expo-router";

import IntroSVG from "../src/assets/IntroSVG.svg";

import colors from "styles/colors";
import fonts from "styles/fonts";

export const Intro = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainerStyles}>
        <Brain strokeWidth={1} color={colors.primary} size={52} />
        <Text style={styles.boldText}>Mind Clear</Text>
      </View>

      <IntroSVG />

      <View style={styles.containerJump}>
        <Button
          onPress={() => router.push("SignIn")}
          title="Continuar com Email"
          backgroundColor="#3F5EF6"
          icon={<Mail color="white" size={20} />}
          iconPosition="right"
        />

        <TouchableOpacity onPress={() => router.push("Home")} style={styles.jumpButton}>
          <Text style={[styles.regularText, { color: "#B3B3B3" }]}>Quer pular esta etapa?</Text>
          <Text style={[styles.regularText, { color: "#3F5EF6" }]}>Pular</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Intro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#0A0A14"
  },
  logoContainerStyles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 70
  },
  containerJump: {
    marginTop: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  jumpButton: {
    marginBottom: 50,
    marginTop: 20,
    gap: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  boldText: {
    ...fonts.boldFont,
    fontSize: 30
  },
  regularText: {
    ...fonts.regularFont,
    fontSize: 15
  }
});
