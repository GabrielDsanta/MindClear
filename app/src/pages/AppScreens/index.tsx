import React, { FC } from "react";

import { BottomTabBar, BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Host } from "react-native-portalize";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "./Home";
import { House, Settings } from "lucide-react-native";
import { PanicPage } from "./PanicPage";
import { Options } from "./Options";
import { Commitment } from "./Commitment";
import { Meditate } from "./Meditate";
import { BreathingExercise } from "./BreathingExercise";

import colors from "styles/colors";
import fonts from "styles/fonts";

type AppRoutesType = {
  Home: undefined;
  Options: undefined;
  PanicPage: undefined;
  Commitment: undefined;
  Meditate: undefined;
  BreathingExercise: undefined;
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutesType>;

const Tab = createBottomTabNavigator<AppRoutesType>();

export const AppScreens: FC<{}> = () => {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#020510",
            borderTopWidth: 1,
            height: "10%",
            width: "100%",
            justifyContent: "center",
            paddingTop: 20,
            borderColor: "#121520"
          }
        }}
        tabBar={(props) => <BottomTabBar {...props} />}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <View style={[styles.activeBottomTabStyles, { width: 120 }]}>
                    <House strokeWidth={1} color="white" size={32} />
                    <Text style={styles.fontBold}>Home</Text>
                  </View>
                );
              }
              return <House style={{ marginBottom: 5 }} strokeWidth={1} color="white" size={32} />;
            }
          }}
        />

        <Tab.Screen
          name="Options"
          component={Options}
          options={{
            tabBarIcon: ({ focused }) => {
              if (focused) {
                return (
                  <View style={styles.activeBottomTabStyles}>
                    <Settings strokeWidth={1} color="white" size={32} />
                    <Text style={styles.fontBold}>Definições</Text>
                  </View>
                );
              }
              return <Settings style={{ marginBottom: 5 }} strokeWidth={1} color="white" size={32} />;
            }
          }}
        />

        <Tab.Screen name="PanicPage" component={PanicPage} options={{ tabBarItemStyle: { display: "none" } }} />
        <Tab.Screen name="Commitment" component={Commitment} options={{ tabBarItemStyle: { display: "none" } }} />
        <Tab.Screen name="Meditate" component={Meditate} options={{ tabBarItemStyle: { display: "none" } }} />
        <Tab.Screen name="BreathingExercise" component={BreathingExercise} options={{ tabBarItemStyle: { display: "none" } }} />
      </Tab.Navigator>
    </Host>
  );
};

const styles = StyleSheet.create({
  activeBottomTabStyles: {
    height: 50,
    borderRadius: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.blue100,
    width: 145,
    marginBottom: 5
  },
  fontBold: {
    ...fonts.boldFont
  }
});
