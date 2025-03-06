import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens, Intro, SplashScreen, SignUp, SignIn } from "pages";

type InitialRoutesType = {
  SplashScreen: undefined;
  SignIn: undefined;
  AppScreens: undefined;
  SignUp: undefined;
  Intro: undefined;
};

export type InitialRoutesAppNavigationType = NativeStackNavigationProp<InitialRoutesType>;

const Stack = createNativeStackNavigator<InitialRoutesType>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0A0A14"
          },
          gestureEnabled: false
        }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="AppScreens" component={AppScreens} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Intro" component={Intro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
