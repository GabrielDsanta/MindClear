import React, { useState } from "react";

import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { Button, Input, TitledContainer } from "components/index";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "expo-router";

import Toast from "react-native-toast-message";
import fonts from "styles/fonts";

export const SignUp = () => {
  const router = useRouter();

  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);

    try {
      const { success } = await signUp({
        name,
        email,
        password
      });

      if (success) {
        Toast.show({
          type: "success",
          text1: "Usuário cadastrado com sucesso !",
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
      <ScrollView contentContainerStyle={styles.contentStyles} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Faça o seu Cadastro</Text>
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
          label="Empresa actuante"
          placeholder="Digite a sua empresa"
          value={name}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setName}
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

        <Input
          isPassword
          label="Confirme a senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor="white"
        />

        <Button isLoading={loading} disabled={loading} onPress={handleSignUp} title="Fazer Cadastro" />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => router.push("SignIn")}>
            <Text style={styles.signupLink}>Fazer Login.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TitledContainer>
  );
};

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A14",
    paddingHorizontal: 10
  },
  welcomeText: {
    ...fonts.boldFont,
    fontSize: 30,
    marginBottom: 10
  },
  contentStyles: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
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
