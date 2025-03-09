import React, { FC, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from ".";

import fonts from "styles/fonts";
import colors from "styles/colors";

const { height } = Dimensions.get("screen");

type BreathingStateType = "start" | "hold" | "end";

export const BreathingExercise: FC = () => {
  const navigation = useNavigation<AppNavigationRoutesProps>();
  const [breathingState, setBreathingState] = useState<BreathingStateType>("start");
  const ballPosition = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(ballPosition, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setBreathingState("hold");

      setTimeout(() => {
        setBreathingState("end");
        setTimeout(() => {
          Animated.timing(ballPosition, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }).start();
        }, 3000);
      }, 3000);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(startAnimation, 1500);
    });

    return unsubscribe;
  }, [navigation]);

  const ballTranslateY = ballPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.5, 0],
  });

  const renderBreathingInstruction = () => {
    switch (breathingState) {
      case "start":
        return <Text style={[styles.fontBold, { fontSize: 22, marginTop: 15 }]}>Inspire quando a bola subir</Text>;
      case "hold":
        return <Text style={[styles.fontBold, { fontSize: 22, marginTop: 15 }]}>Segure</Text>;
      case "end":
        return <Text style={[styles.fontBold, { fontSize: 22, marginTop: 15 }]}>Solte quando a bola descer</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.imageBackgroundContainer} source={require("../../../assets/BackgroundPNG.png")}>
        <LinearGradient colors={["#3589EC25", "#2B4ED425"]} style={styles.reflectionContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={[styles.fontBold, { color: colors.primary }]}>Respire</Text>
        </LinearGradient>

        {renderBreathingInstruction()}
        <Text style={styles.regularFont}>Mantenha o foco na sua respiração</Text>

        <Animated.View style={[styles.ball, { transform: [{ translateY: ballTranslateY }] }]} />

        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.finishButton}>
          <Text style={fonts.semiBoldFont}>Finalizar exercício</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A14",
  },
  imageBackgroundContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  reflectionContainer: {
    width: 170,
    height: 40,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 25,
  },
  finishButton: {
    width: "100%",
    height: 50,
    borderRadius: 10000,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    marginTop: height * 0.55,
  },
  regularFont: {
    ...fonts.regularFont,
    color: "#FFFFFF80",
    marginTop: 5,
  },
  fontBold: {
    ...fonts.boldFont,
    fontSize: 16,
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFD700",
    position: "absolute",
    marginTop: 120,
    shadowColor: "#FFD700",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});