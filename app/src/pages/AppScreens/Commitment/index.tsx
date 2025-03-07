import React, { FC } from "react";

import { ChevronLeft, CircleCheck, CircleHelp, Crown, Hand } from "lucide-react-native";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { CommitMentCard } from "./components/CommitmentCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "..";

import colors from "styles/colors";
import fonts from "styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("screen");

export interface CommitmentCard {
  id: number;
  description: string;
  icon: React.JSX.Element;
}

const commitments: CommitmentCard[] = [
  {
    id: 1,
    description: "Ao se comprometer, você concorda em não recair por apenas um dia.",
    icon: <CircleCheck size={26} color={colors.primary} />
  },
  {
    id: 2,
    description: "Necessidade de conteúdos mais extremos.",
    icon: <CircleHelp size={26} color={colors.primary} />
  },
  {
    id: 3,
    description: "Redução da intimidade e confiança.",
    icon: <Crown size={26} color={colors.primary} />
  }
];

export const Commitment: FC = () => {
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const startSobrietyCounter = async () => {
    const now = Date.now();
    await AsyncStorage.setItem("sobrietyStartTime", now.toString());

    Toast.show({
      type: "success",
      text1: "Iniciado com sucesso !",
      visibilityTime: 2500
    });

    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  };

  const renderHeader = () => (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.headerBackButtonContainer}>
        <ChevronLeft color="white" size={20} />
      </TouchableOpacity>
      <Text style={[styles.fontBold, { fontSize: 20 }]}>Compromisso</Text>
      <View></View>
    </View>
  );

  const renderCommitmentCards = () => (
    <>
      {commitments.map((item) => (
        <CommitMentCard commitment={item} key={item.id} />
      ))}
    </>
  );

  const renderCommitmentButton = () => (
    <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={styles.commitmentButtonContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <TouchableOpacity onPress={startSobrietyCounter}>
        <Text style={styles.fontBold}>Comprometer-se Agora!</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={{ flex: 1 }}>
        
        <ImageBackground style={styles.imageBackgroundContainer} source={require("../../../assets/BackgroundPNG.png")}>
          {renderHeader()}

          <LinearGradient colors={["#3589EC", "#2B4ED4"]} style={styles.handContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Hand color="white" size={52} />
          </LinearGradient>

          <Text style={[styles.fontBold, { fontSize: 24, textAlign: "center", width: 280, marginBottom: 15 }]}>Comprometa-se com a Sobriedade Hoje</Text>
          <Text style={styles.commitmentText}>
            Faça um compromisso consigo mesmo para não se masturbar hoje. Você receberá uma notificação em 24 horas para acompanhar seu progresso.
          </Text>

          {renderCommitmentCards()}
          {renderCommitmentButton()}
          <Toast position="top" topOffset={30} />

          <View style={{ paddingBottom: 150 }}></View>
       
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  headerBackButtonContainer: {
    width: 35,
    height: 35,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF10"
  },
  handContainer: {
    width: 80,
    height: 80,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15
  },
  commitmentText: {
    ...fonts.regularFont,
    color: "#A0A0A0",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20
  },
  commitmentButtonContainer: {
    width: "100%",
    borderRadius: 6,
    height: 45,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  fontBold: {
    ...fonts.boldFont
  }
});
