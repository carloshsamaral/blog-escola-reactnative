import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import theme from "../../../../styles/theme";
import Header from "../../../shared/Header";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

const CreatePostScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id?: string };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        router.replace("/(tabs)/authentication");
      }
    }
    checkAuth();
  }, []);

  const fetchPost = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`http://10.0.0.3:3108/posts/${id}`);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.log("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (title.length < 10 || content.length < 10) {
      Alert.alert("Erro", "O título e o conteúdo precisam ter pelo menos 10 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const author = await SecureStore.getItemAsync("userName");
      if (id && id !== "[id]") {
        await axios.put(
          `http://10.0.0.3:3108/posts/${id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert('Post atualizado', 'Post atualizado com sucesso');
      } else {
        await axios.post(
          "http://10.0.0.3:3108/posts",
          { title, content, author },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert('Post cadastrado', 'Post cadastrado com sucesso');
      }
      setTitle("");
      setContent("");
      router.push("/(tabs)/dashboard/posts");
    } catch (error) {
      console.log("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  const isFormValid = title.length >= 10 && content.length >= 10;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={theme.headerStyles.container}>
        <Header />
      </View>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.medium }}>
        <Text style={theme.authStyles.label}>Título</Text>
        <TextInput
          style={theme.inputStyles.container}
          placeholder="Título"
          placeholderTextColor={theme.colors.textTertiary}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={theme.authStyles.label}>Conteúdo</Text>
        <TextInput
          style={[
            theme.inputStyles.container,
            { height: 120, textAlignVertical: "top" },
          ]}
          placeholder="Conteúdo"
          placeholderTextColor={theme.colors.textTertiary}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity
          style={theme.postStyles.button}
          onPress={handleSubmit}
          
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.textPrimary} />
          ) : (
            <Text style={theme.postStyles.buttonText}>
              {id && id !== "[id]" ? "Atualizar Postagem" : "Criar Postagem"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;
