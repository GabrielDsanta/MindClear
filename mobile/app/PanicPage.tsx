import React, { useEffect, useState } from "react";
import { TitledContainer, Button } from "../src/components/index";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThumbsDown, TriangleAlert, Brain, CircleHelp, HeartCrack, UserRoundX, Wind, MessagesSquare } from "lucide-react-native";
import { PanicCard } from "./_components/PanicCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";

import Toast from "react-native-toast-message";
import colors from "../src/styles/colors";
import fonts from "../src/styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface OptionCard {
  id: number;
  title: string;
  description: string;
  icon: React.JSX.Element;
}

const options: OptionCard[] = [
  {
    id: 1,
    title: "Disfunção Erétil",
    description: "Incapacidade de obter ereção durante o sexo.",
    icon: <Brain size={22} strokeWidth={1} fill={colors.primary} />
  },
  {
    id: 2,
    title: "Dessensibilização",
    description: "Necessidade de conteúdos mais extremos.",
    icon: <CircleHelp size={22} color={colors.primary} />
  },
  {
    id: 3,
    title: "Problemas de Relacionamento",
    description: "Redução da intimidade e confiança.",
    icon: <HeartCrack size={22} color={colors.primary} />
  },
  {
    id: 4,
    title: "Isolamento Social",
    description: "Afastamento de interações sociais.",
    icon: <UserRoundX size={22} color={colors.primary} />
  }
];

const alertsOptions = [
  {
    id: 1,
    description: "O pornô pode dessensibilizar indivíduos à violência e agressão em contextos sexuais."
  },
  {
    id: 2,
    description: "Encare o desafio de parar com o pornô como uma oportunidade de crescimento."
  }
];

export const PanicPage = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [isAlertActivated, setIsAlertActivated] = useState(false);

  const resetSobrietyCounter = async () => {
    try {
      const sobrietyStartTime = await AsyncStorage.getItem("sobrietyStartTime");

      if (sobrietyStartTime) {
        const currentTime = new Date().getTime();
        const sobrietyTime = parseInt(sobrietyStartTime, 10);
        const elapsedTime = currentTime - sobrietyTime;

        // 10 minutos em milissegundos
        const tenMinutesInMillis = 10 * 60 * 1000;

        if (elapsedTime < tenMinutesInMillis) {
          Toast.show({
            type: "error",
            text1: "Finalize sua Recuperação Cerebral primeiro.",
            visibilityTime: 2500
          });
          return;
        }
      }

      await AsyncStorage.removeItem("sobrietyStartTime");
      router.push("Home");
    } catch (error) {
      console.error("Erro ao resetar o contador de sobriedade:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsAlertActivated(false);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <TitledContainer handleGoBack={() => router.back()}>
      <Toast position="top" topOffset={80} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <ImageBackground style={styles.container} source={require("../src/assets/BackgroundPNG.png")}>
          <View style={styles.panicMessageContainer}>
            <Text style={styles.panicMessageText}>Botão de pânico acionado</Text>
          </View>

          {!isAlertActivated ? (
            <>
              <Text style={styles.mainTextStyles}>Recair não vai resolver nada.</Text>

              <Text style={styles.panicMessageTextMedium}>Efeitos da recaída:</Text>

              {options.map((item) => {
                return <PanicCard option={item} key={item.id} />;
              })}
            </>
          ) : (
            <>
              <TriangleAlert style={{ marginTop: 15 }} size={40} color="#FB2828" />

              {alertsOptions.map((item) => {
                return (
                  <View key={item.id} style={[styles.containerAlertOption, item.id === 1 && { backgroundColor: "#FB282825" }]}>
                    <Text style={[styles.boldFont, item.id === 1 && { color: "#FB2828" }]}>{item.description}</Text>
                  </View>
                );
              })}
            </>
          )}

          {!isAlertActivated ? (
            <>
              <Button
                onPress={resetSobrietyCounter}
                title="Recaí"
                backgroundColor="#4C1111"
                iconPosition="left"
                icon={<ThumbsDown size={20} color="white" />}
              />

              <Button
                onPress={() => setIsAlertActivated(true)}
                title="Estou pensando em recair"
                backgroundColor="#DC2626"
                iconPosition="left"
                icon={<TriangleAlert size={20} color="white" />}
              />
            </>
          ) : (
            <>
              <Button
                onPress={() => router.push("Home")}
                title="Conversar no chat"
                iconPosition="left"
                icon={<MessagesSquare size={24} color="white" />}
              />

              <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={styles.startBreathingExercise} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <TouchableOpacity onPress={() => router.push("BreathingExercise")} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Wind size={24} color="white" />

                  <Text style={[styles.boldFont, { fontSize: 16 }]}>Iniciar exercício de respiração</Text>
                </TouchableOpacity>
              </LinearGradient>
            </>
          )}

          <View style={{ paddingBottom: 150 }}></View>
        </ImageBackground>
      </ScrollView>
    </TitledContainer>
  );
};

export default PanicPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: "center"
  },
  panicMessageContainer: {
    backgroundColor: "#FB282840",
    width: 220,
    borderRadius: 100000,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  panicMessageText: {
    ...fonts.semiBoldFont,
    color: "#FB2828",
    fontSize: 14
  },
  mainTextStyles: {
    ...fonts.boldFont,
    fontSize: 32,
    textAlign: "center",
    marginTop: 20
  },
  panicMessageTextMedium: {
    ...fonts.MediumFont,
    color: "#FB2828",
    marginVertical: 10,
    fontSize: 16
  },
  containerAlertOption: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF10",
    marginTop: 25,
    paddingHorizontal: 20
  },
  startBreathingExercise: {
    width: "100%",
    borderRadius: 6,
    height: 45,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  boldFont: {
    ...fonts.semiBoldFont,
    fontSize: 24,
    textAlign: "center"
  }
});
