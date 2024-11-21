import Header from "@/app/shared/Header";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';


type UserAuthentication = {
  acess_token: string;
  email: string;
  name: string;
  user_id: string;
};

export default function Authentication() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [userAuthentication, setUserAuthentication] =
    useState<UserAuthentication | null>();

    

      async function handleButton(): Promise<void> {
        try {
          const response = await axios.post<UserAuthentication>(`http://10.0.0.10:3108/teachers/signin`, {
            email: user,
            password: password,
          });
      
          console.log(response.data)
          if (response && response.data && response.data.access_token) {
            // Salva o token no SecureStore
            await SecureStore.setItemAsync("userToken", response.data.access_token);
            console.log("Token salvo com sucesso!");
            router.push("/(tabs)")
          } else {
            console.log("Token não foi retornado na resposta.");
          }
        } catch (error) {
          console.error("Erro durante a requisição ou ao salvar o token:", error);
        }
      }
      

  return (
    <View>
      <Header />
      <View>
        <Text>Digite seu usuário:</Text>
        <TextInput
          onChangeText={(inputText) => {
            setUser(inputText);
          }}
          value={user}
          placeholder="Digite o login de usuário"
          accessibilityLabel="Login do usuário"
        />

        <Text>Digite a senha:</Text>
        <TextInput
          onChangeText={(inputText) => {
            setPassword(inputText);
          }}
          value={password}
          placeholder="Digite o senha de usuário"
          accessibilityLabel="Senha do usuário"
        />

        <TouchableOpacity onPress={handleButton}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>

      
    </View>

    
  );
}
