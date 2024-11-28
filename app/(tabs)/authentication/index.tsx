import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import axios from "axios";
import theme from "../../../styles/theme";
import Header from "@/app/shared/Header";

type UserAuthentication = {
  access_token: string;
  email: string;
  name: string;
  user_id: string;
};

export default function authentication() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleButton(): Promise<void> {
    setErrorMessage("");
    try {
      const response = await axios.post<UserAuthentication>(
        `http://localhost:3108/teachers/signin`,
        {
          email: user,
          password: password,
        }
      );

      if (response && response.data && response.data.access_token) {
        await SecureStore.setItemAsync("userToken", response.data.access_token);
        router.replace("/dashboard");
      } else {
        setErrorMessage("Login falhou. Por favor, verifique suas credenciais.");
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("Erro ao fazer login. Tente novamente.");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={theme.headerStyles.container}>
        <Header />
      </View>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.medium }}>
        <Text style={theme.authStyles.label}>E-mail</Text>
        <TextInput
          onChangeText={setUser}
          value={user}
          placeholder="Digite o e-mail"
          placeholderTextColor={theme.colors.textTertiary}
          accessibilityLabel="Login do usuário"
          style={theme.inputStyles.container}
        />
        <Text style={theme.authStyles.label}>Senha</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Digite a senha"
          placeholderTextColor={theme.colors.textTertiary}
          accessibilityLabel="Senha do usuário"
          style={theme.inputStyles.container}
          secureTextEntry
        />
        {errorMessage ? <Text style={{ color: "red", marginBottom: 16 }}>{errorMessage}</Text> : null}
        <TouchableOpacity onPress={handleButton} style={theme.authStyles.button}>
          <Text style={theme.authStyles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
