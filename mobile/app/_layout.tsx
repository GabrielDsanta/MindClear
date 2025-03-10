import React from "react";
import { Stack } from "expo-router/stack";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="PanicPage" options={{ headerShown: false }} />
        <Stack.Screen name="BreathingExercise" options={{ headerShown: false }} />
        <Stack.Screen name="Commitment" options={{ headerShown: false }} />
        <Stack.Screen name="Meditate" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
