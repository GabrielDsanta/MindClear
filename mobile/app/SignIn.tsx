import React, { useState } from "react";

import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { Button, Input, TitledContainer } from "components/index";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "expo-router";

import Toast from "react-native-toast-message";
import fonts from "styles/fonts";
import useAuthStore from "store/authStore";

export const SignIn = () => {
  const router = useRouter();

  const { signIn } = useAuth();

  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    try {
      const { success, data } = await signIn({ email, password });

      login(data.user, data.token);

      if (success) {
        Toast.show({
          type: "success",
          text1: "Usuário logado com sucesso !",
          visibilityTime: 2500
        });

        setTimeout(() => {
          setLoading(false);
          return router.push("Home");
        }, 1000);
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        Toast.show({
          type: "error",
          text1: "Email ou senha incorretos.",
          visibilityTime: 2500
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao fazer login. Por favor, tente novamente.",
          visibilityTime: 2500
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <TitledContainer handleGoBack={() => router.back()}>
      <Toast position="top" topOffset={80} />
      <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Bem vindo de volta</Text>
        <Input
          label="Email"
          placeholder="Digite o seu email"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
          cursorColor="white"
        />

        <Input
          isPassword
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor="white"
        />

        <Button isLoading={loading} disabled={loading} onPress={handleLogin} title="Fazer login" />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Ainda não tem conta?</Text>
          <TouchableOpacity onPress={() => router.push("SignUp")}>
            <Text style={styles.signupLink}>Fazer Cadastro.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TitledContainer>
  );
};

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A14",
    paddingHorizontal: 10
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  welcomeText: {
    ...fonts.boldFont,
    fontSize: 30,
    marginBottom: 10
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5
  },
  signupText: {
    ...fonts.MediumFont,
    color: "#B3B3B3"
  },

  signupLink: {
    ...fonts.MediumFont,
    color: "#3F5EF6"
  }
});
