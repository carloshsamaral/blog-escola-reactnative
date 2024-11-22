import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import theme from '../../../styles/theme'
import Header from '../../shared/Header'
import { useRouter, useLocalSearchParams } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const CreatePostScreen: React.FC = () => {
  const router = useRouter()
  const { postId } = useLocalSearchParams() as { postId?: string }
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  /*
  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync('userToken')
      if (!token) {
        router.replace('/(tabs)/authentication')
      }
    }
    checkAuth()
  }, [])
  */

  const fetchPost = async () => {
    if (!postId) return
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:3108/posts/${postId}`)
      setTitle(data.title)
      setContent(data.content)
    } catch (error) {
      console.log('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!title || !content) return
    setLoading(true)
    try {
      const token = await SecureStore.getItemAsync('userToken')
      if (postId) {
        await axios.put(
          `http://localhost:3108/posts/${postId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          'http://localhost:3108/posts',
          { title, content, author: 'teste' },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setTitle('')
      setContent('')
      router.push('/(tabs)/dashboard/posts')
    } catch (error) {
      console.log('Error submitting post:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (postId) fetchPost()
  }, [postId])

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={theme.headerStyles.container}>
        <Header />
      </View>
      <View style={{ flex: 1, padding: theme.spacing.medium, justifyContent: 'center' }}>
        <TextInput
          style={theme.inputStyles.container}
          placeholder="Título"
          placeholderTextColor={theme.colors.textTertiary}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[theme.inputStyles.container, { height: 120, textAlignVertical: 'top' }]}
          placeholder="Conteúdo"
          placeholderTextColor={theme.colors.textTertiary}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity
          style={theme.postStyles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.textPrimary} />
          ) : (
            <Text style={theme.postStyles.buttonText}>{postId ? 'Atualizar Postagem' : 'Criar Postagem'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CreatePostScreen
