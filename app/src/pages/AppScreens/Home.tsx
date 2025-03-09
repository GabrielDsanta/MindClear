import React, { FC, useState, useEffect } from "react";
import { TitledContainer } from "components/TitledContainer";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from ".";
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Button } from "components/Button";
import { TriangleAlert, Hand, Clock, RefreshCw } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import fonts from "styles/fonts";

export const Home: FC = () => {
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const [sobrietyTime, setSobrietyTime] = useState<string>("0 dias");
  const [elapsedTime, setElapsedTime] = useState<string>("0hr0m0s");
  const [brainRecoveryProgress, setBrainRecoveryProgress] = useState<string>("0%");
  const [challengeProgress, setChallengeProgress] = useState<string>("0%");

  const resetSobrietyCounter = async () => {
    await AsyncStorage.removeItem("sobrietyStartTime");
    setSobrietyTime("0 dias");
    setElapsedTime("0hr0m0s");
    setBrainRecoveryProgress("0%");
    setChallengeProgress("0%");
  };

  const calculateSobrietyTime = async () => {
    const storedTime = await AsyncStorage.getItem("sobrietyStartTime");
    if (storedTime) {
      const start = parseInt(storedTime, 10);
      const now = Date.now();
      const difference = now - start;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setSobrietyTime(`${days} dias`);
      setElapsedTime(`${hours}hr${minutes}m${seconds}s`);

      // Lógica para a barra de Recuperação Cerebral (10 minutos)
      const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
      const brainRecoveryPercentage = Math.min((totalMinutes / 10) * 100, 100).toFixed(0);
      setBrainRecoveryProgress(`${brainRecoveryPercentage}%`);

      // Lógica para a barra de Desafio 28 dias
      const challengePercentage = Math.min((days / 28) * 100, 100).toFixed(0);
      setChallengeProgress(`${challengePercentage}%`);
    } else {
      setSobrietyTime("0 dias");
      setElapsedTime("0hr0m0s");
      setBrainRecoveryProgress("0%");
      setChallengeProgress("0%");
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateSobrietyTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadStartTime = async () => {
      const storedTime = await AsyncStorage.getItem("sobrietyStartTime");
      if (storedTime) {
        calculateSobrietyTime();
      }
    };
    loadStartTime();
  }, []);

  const renderProfileImage = () => (
    <View style={styles.containerImage}>
      <Image style={{ width: 140, height: 140 }} resizeMode="cover" source={require("../../../assets/ProfilePicturePNG.png")} />
    </View>
  );

  const renderSobrietyTimer = () => (
    <>
      <Text style={styles.title}>Você está livre de pornografia por:</Text>
      <Text style={styles.timer}>{sobrietyTime}</Text>
      <View style={styles.subTimerContainer}>
        <Text style={styles.subTimer}>{elapsedTime}</Text>
      </View>
    </>
  );

  const renderActionButton = (icon: React.JSX.Element, label: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.alignContainer}>
      <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={styles.actionsContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        {icon}
      </LinearGradient>
      <Text style={[styles.subTimer, { fontSize: 12 }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderProgressBar = (label: string, progress: string, widthPercentage: string) => {
    const screenWidth = Dimensions.get("window").width;
    const width = (parseFloat(widthPercentage) / 100) * screenWidth * 0.85; // 85% do tamanho do container

    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarText}>
          <Text style={styles.fontRegular}>{label}</Text>
          <Text style={styles.fontRegular}>{progress}</Text>
        </View>
        <View style={{ width: "85%", backgroundColor: "#FFFFFF10", borderRadius: 1000 }}>
          <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={{ height: 12, borderRadius: 10000, width }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
        </View>
      </View>
    );
  };

  return (
    <TitledContainer disableArrow>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground style={{ flex: 1 }} source={require("../../../assets/BackgroundPNG.png")}>
          <View style={styles.container}>
            {renderProfileImage()}
            {renderSobrietyTimer()}

            <View style={styles.buttonsContainer}>
              {renderActionButton(<Hand color="white" size={20} />, "Promessa", () => navigation.navigate("Commitment"))}
              {renderActionButton(<Clock color="white" size={20} />, "Meditar", () => navigation.navigate("Meditate"))}
              {renderActionButton(<RefreshCw color="white" size={20} />, "Resetar", resetSobrietyCounter)}
            </View>

            {renderProgressBar("Recuperação Cerebral", brainRecoveryProgress, brainRecoveryProgress)}
            {renderProgressBar("Desafio 28 dias", challengeProgress, challengeProgress)}

            <Button
              onPress={() => navigation.navigate("PanicPage")}
              title="Botão de Pânico"
              backgroundColor="#DC2626"
              iconPosition="left"
              icon={<TriangleAlert size={24} color="white" />}
            />
          </View>

          <View style={{ paddingBottom: 100 }}></View>
        </ImageBackground>
      </ScrollView>
    </TitledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  containerImage: {
    borderWidth: 2,
    width: 140,
    height: 140,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#33AFFF",
    marginBottom: 20,
    marginTop: -20
  },
  title: {
    ...fonts.regularFont,
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 5
  },
  timer: {
    ...fonts.boldFont,
    fontSize: 36
  },
  subTimerContainer: {
    height: 35,
    backgroundColor: "#0E1214",
    width: 130,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10
  },
  subTimer: {
    ...fonts.regularFont,
    fontSize: 16
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  actionsContainer: {
    width: 45,
    height: 45,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  alignContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  progressBarContainer: {
    width: "100%",
    height: 75,
    borderRadius: 15,
    backgroundColor: "#030716",
    padding: 8,
    justifyContent: "center",
    marginTop: 10
  },
  progressBarText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15
  },
  fontRegular: {
    ...fonts.regularFont
  }
});
