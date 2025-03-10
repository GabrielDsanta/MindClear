import React from "react";
import { Tabs } from "expo-router";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { House, Settings } from "lucide-react-native";

import colors from "../../src/styles/colors";
import fonts from "../../src/styles/fonts";

export default function TabLayout() {
  return (
    <Tabs
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
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
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
      <Tabs.Screen
        name="Options"
        options={{
          title: "Options",
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
    </Tabs>
  );
}

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
