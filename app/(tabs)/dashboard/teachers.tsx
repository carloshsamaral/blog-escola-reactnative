import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import theme from '../../../styles/theme'
import Header from '../../shared/Header'
import { useRouter } from 'expo-router'
import * as SecureStore from "expo-secure-store"

const CreateTeacherScreen: React.FC = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync('userToken')
      if (!token) {
        router.replace('/(tabs)/authentication')
      }
    }
    checkAuth()
  }, [])
  

  const handleCreateTeacher = async () => {
    const token = await SecureStore.getItemAsync('userToken')
    setLoading(true)
    try {
      const response = await axios.post('http://10.0.0.10:3108/teachers', {
        name,
        email,
        password
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Teacher created successfully', response.data)
      router.push('/(tabs)/dashboard')
    } catch (error) {
      console.log('Error creating teacher:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={theme.headerStyles.container}>
        <Header />
      </View>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.medium }}>
      <Text style={theme.authStyles.label}>Nome</Text>
        <TextInput
          style={theme.inputStyles.container}
          placeholder="Nome"
          placeholderTextColor={theme.colors.textTertiary}
          value={name}
          onChangeText={setName}
        />
        <Text style={theme.authStyles.label}>E-mail</Text>
        <TextInput
          style={theme.inputStyles.container}
          placeholder="E-mail"
          placeholderTextColor={theme.colors.textTertiary}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={theme.authStyles.label}>Senha</Text>
        <TextInput
          style={theme.inputStyles.container}
          placeholder="Senha"
          placeholderTextColor={theme.colors.textTertiary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={theme.authStyles.button}
          onPress={handleCreateTeacher}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={theme.authStyles.buttonText}>Criar Professor</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CreateTeacherScreen
