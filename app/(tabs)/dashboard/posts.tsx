import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import theme from "../../../styles/theme";
import Header from "../../shared/Header";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";

type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

const AdminPostsScreen: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        router.replace("/(tabs)/authentication");
      }
    }
    checkAuth();
  }, []);

  const fetchPosts = async () => {
    const token = await SecureStore.getItemAsync("userToken");
 
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data } = await axios.get<Post[]>(
        `http://10.0.0.10:3108/posts/admin?limit=10&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
            cache: "no-store"
          },
        }
      );
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasMore(data.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      setIsSearching(false);
      setFilteredPosts([]);
      return;
    }
    setLoading(true);
    setIsSearching(true);
    try {
      const { data } = await axios.get<Post[]>(
        `http://10.0.0.10:3108/posts/search?keyword=${query}`
      );
      setFilteredPosts(data);
    } catch (error) {
      console.log("Error searching posts:", error);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostPress = (id: string) => {
    router.push(`/post/${id}`);
  };

  const handleEditPress = (post: Post) => {
    router.push(`/(tabs)/dashboard/create-post/${post._id}`);
  };

  const handleDelete = async (id: string) => {
    const token = await SecureStore.getItemAsync("userToken");
    try {
      await axios.delete(`http://10.0.0.10:3108/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      console.log("Post deleted successfully");
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={theme.postStyles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handlePostPress(item._id)}
      >
        <View style={theme.postStyles.author}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              style={theme.postStyles.profileImage}
            />
            <Text style={theme.postStyles.authorName}>{item.author}</Text>
          </View>
          <Text style={theme.postStyles.date}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={theme.postStyles.title}>{item.title}</Text>
        <Text style={theme.postStyles.content}>{item.content}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => handleEditPress(item)}>
          <AntDesign name="edit" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderList = () => {
    if (isSearching && search && filteredPosts.length === 0) {
      return (
        <Text
          style={{
            color: theme.colors.textSecondary,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Nenhum item encontrado
        </Text>
      );
    }
    return (
      <FlatList
        data={isSearching ? filteredPosts : posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        onEndReached={isSearching ? undefined : fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !isSearching ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : null
        }
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={theme.headerStyles.container}>
        <Header />
      </View>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.medium }}>
        <TextInput
          style={[
            theme.inputStyles.container,
            focused && theme.inputStyles.focused,
          ]}
          placeholder="Buscar"
          placeholderTextColor={theme.colors.textTertiary}
          value={search}
          onChangeText={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={theme.colors.primary}
        />
        {renderList()}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminPostsScreen;
