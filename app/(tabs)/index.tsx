import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../shared/Header';

export default function HomeScreen() {
  const [data, setData] = useState([]); 

  // Função para buscar os dados
  const getPosts = async () => {
    try {
      
      const response = await axios.get('http://10.0.1.12:3108/posts?limit=1000&page=1');
      
      
      setData(response.data); 
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    getPosts();
  }, []); 

  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.content}</Text>
        <Text style={styles.authorCreated}>Autor: {item.author}</Text>
        <Text style={styles.authorCreated}>Criado: {item.createdAt}</Text>
      </View>
    );
  };

  return (
    <View style={styles.homeContainer}>
      <Header />
    <FlatList
      data={data}
      renderItem={renderItem} 
      keyExtractor={(item) => item.id.toString()} 
    />
    </View>
  );
};


const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
  homeContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, 
  },
  authorCreated: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
});

