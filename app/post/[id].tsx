import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import theme from '../../styles/theme'
import Header from '../shared/Header/index'

type Post = {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

const PostDetails: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPost = async () => {
    if (!id) return
    setLoading(true)
    try {
      const { data } = await axios.get<Post>(`http://10.0.1.12:3108/posts/${id}`)
      setPost(data)
    } catch (error) {
      console.log('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  if (!post) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.textPrimary }}>Postagem não encontrada</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.medium, paddingTop: theme.spacing.medium }}>
      <Header />
      <View style={theme.postStyles.container}>
        <View style={theme.postStyles.author}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: 'https://github.com/shadcn.png' }} style={theme.postStyles.profileImage} />
            <Text style={theme.postStyles.authorName}>{post.author}</Text>
          </View>
          <Text style={theme.postStyles.date}>{new Date(post.createdAt).toLocaleDateString()}</Text>
        </View>
        <Text style={theme.postStyles.title}>{post.title}</Text>
        <Text style={theme.postStyles.content}>{post.content}</Text>
      </View>
    </View>
  )
}

export default PostDetails
