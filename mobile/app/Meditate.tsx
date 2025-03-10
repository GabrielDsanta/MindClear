import React from "react";

import { ChevronLeft } from "lucide-react-native";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MeditateCard } from "./_components/MeditateCard";
import { useRouter } from "expo-router";

import colors from "../src/styles/colors";
import fonts from "../src/styles/fonts";

const { height } = Dimensions.get("screen");

const reflections = [
  {
    id: 1,
    title: "Sentir-se tentado não significa que você é fraco."
  },
  {
    id: 2,
    title: "É a prova de que você está lutando por algo melhor."
  }
];

export const Meditate = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground style={styles.imageBackgroundContainer} source={require("../src/assets/BackgroundPNG.png")}>
          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButtonContainer}>
              <ChevronLeft color="white" size={20} />
            </TouchableOpacity>

            <Text style={[styles.fontBold, { fontSize: 20 }]}>Meditar</Text>
            <View></View>
          </View>

          <LinearGradient colors={["#3589EC30", "#2B4ED430"]} style={styles.reflectionContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={[styles.fontBold, { color: colors.primary }]}>Reflita e respire</Text>
          </LinearGradient>

          {reflections.map((item) => {
            return <MeditateCard title={item.title} key={item.id} />;
          })}

          <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={styles.commitmentButtonContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TouchableOpacity onPress={() => router.push("Home")}>
              <Text style={[styles.fontBold]}>Finalizar reflexão</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ paddingBottom: 150 }}></View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Meditate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A14"
  },
  imageBackgroundContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  reflectionContainer: {
    width: 170,
    height: 40,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 35
  },
  headerBackButtonContainer: {
    width: 35,
    height: 35,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF10"
  },

  commitmentButtonContainer: {
    width: "100%",
    borderRadius: 6,
    height: 45,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.1
  },
  fontBold: {
    ...fonts.boldFont
  }
});
