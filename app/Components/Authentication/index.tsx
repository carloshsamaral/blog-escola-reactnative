import axios from "axios";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

type UserAuthentication = {
    acess_token: string
    email: string
    name: string
    user_id: string
    
  }

export default function Authentication (){

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [userAuthentication, setUserAuthentication] = useState<UserAuthentication | null>()

    async function handleButton(): Promise<void> {
        const response = await axios.post<UserAuthentication>(`http://10.0.1.12:3108/teachers/signin`, 
            {
                "email": user,
                "password": password
              }
        ).then(function (response){
            setUserAuthentication(response.data)
            
        })
        .catch(function (error){
            
            
        });
    }

    return(
        <View>
                        
            <Text>Digite seu usuário:</Text>
            <TextInput 
            onChangeText={ (inputText) => {setUser(inputText)}}
            value={user}
            placeholder="Digite o login de usuário"
            accessibilityLabel="Login do usuário"
            />

            <Text>Digite a senha:</Text>
            <TextInput 
            onChangeText={ (inputText) => {setPassword(inputText)}}
            value={password}
            placeholder="Digite o senha de usuário"
            accessibilityLabel="Senha do usuário"
            />

            <TouchableOpacity
            onPress={handleButton}
            >
                <Text>Enviar</Text>
            </TouchableOpacity>

        </View>
    );
}