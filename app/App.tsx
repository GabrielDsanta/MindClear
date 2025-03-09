import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from "@expo-google-fonts/inter";

import {
  useFonts as useFontsPoppins,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from "@expo-google-fonts/poppins";

import configureStore from "./src/redux/store/configureStore";
import Routes from "./src/routes/Routes";

const queryClient = new QueryClient();

const store = configureStore();

export default function App() {
  let [fontsLoaded] = useFonts(fonts);
  let [fontsLoadedPoppins] = useFontsPoppins(fontsPoppins);
  if (!fontsLoaded) {
    return <View />;
  }

  if (!fontsLoadedPoppins) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000000" }}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
            <Routes />
          </SafeAreaView>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const fonts = {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
};

const fontsPoppins = {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
};
