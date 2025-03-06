import React, { FC } from "react";
import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { InitialRoutesAppNavigationType } from "routes/Routes";
import { Brain } from "lucide-react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { wait } from "@utils/wait";
import { Local } from "services/Local";

import fonts from "styles/fonts";
import colors from "styles/colors";

export const SplashScreen: FC = () => {
  const navigation = useNavigation<InitialRoutesAppNavigationType>();

  useQuery("checkUser", async () => {
    try {
      const JWT = await Local.get("JWT");
      
      await wait(2);
      if (JWT !== null) {
        return navigation.navigate("AppScreens");
      } else {
        return navigation.navigate("Intro");
      }
    } catch (error) {
      return navigation.navigate("Intro");
    }
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerContent}>
          <Brain color={colors.primary} size={40} />
          <Text style={styles.titleStyles}>Mind Clear</Text>
        </View>
        <ActivityIndicator size={32} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A0A14",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20
  },
  titleStyles: {
    ...fonts.boldFont,
    color: "white",
    fontSize: 28
  }
});
