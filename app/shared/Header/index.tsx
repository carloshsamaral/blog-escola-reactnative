import { Link, router } from "expo-router";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Menu } from "react-native-paper";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, []); 

  const handleNavigation = (path: string) => {
    closeMenu();
    router.push(path);
  };

  const onPressLogout = async () => {
    closeMenu();
    Alert.alert('Usuário deslogado', "Usuário deslogado com sucesso.")
    await SecureStore.setItemAsync("userToken", ""); 
    setIsAuthenticated(false); 
    router.replace("/(tabs)"); 
  };

  return (
    <View style={styles.card}>
      
      <Link
        style={styles.content}
        href={isAuthenticated ? "/(tabs)/dashboard/posts" : "/(tabs)"}
      >
        FIAP
        <Text style={styles.contentChild}>.blog</Text>
      </Link>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Text onPress={openMenu} style={styles.menuButton}>
            Menu
          </Text>
        }
      >
        <View style={{ flex: 1 }}>
          <Menu.Item
            onPress={() => {
              
              if (isAuthenticated) {
                handleNavigation("/(tabs)/dashboard/posts");
              } else {
                
                handleNavigation("/(tabs)");
              }
            }}
            title="Home"
          />
          {!isAuthenticated && (
            <Menu.Item
              onPress={() => handleNavigation("/authentication")}
              title="Login"
            />
          )}
          {isAuthenticated && (
            <>

              <Menu.Item
                onPress={() =>
                  handleNavigation("/(tabs)/dashboard/create-post/[id]")
                }
                title="Nova Postagem"
              />
              <Menu.Item
                onPress={() => handleNavigation("/(tabs)/dashboard/teachers")}
                title="Cadastrar professores"
              />
              <Menu.Item onPress={() => onPressLogout()} title="Deslogar" />
            </>
          )}
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    alignItems: "center",
    padding: 25,
    shadowRadius: 5,
    elevation: 5,
  },
  menuButton: {
    color: "#ED125B",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    color: "#ED125B",
    fontSize: 30,
  },
  contentChild: {
    color: "#FFF",
  },
});
