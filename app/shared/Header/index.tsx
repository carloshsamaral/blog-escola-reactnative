import { Link, router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { useState } from 'react';

export default function Header() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleNavigation = (path: string) => {
    closeMenu();
    router.push(path);
  };

  return (
    <View style={styles.card}>
      <Link style={styles.content} href={'/(tabs)'}>
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
          <Menu.Item onPress={() => handleNavigation('/(tabs)')} title="Home" />
          <Menu.Item onPress={() => handleNavigation('/authentication')} title="Login" />
          <Menu.Item onPress={() => handleNavigation('/(tabs)/dashboard/posts')} title="Posts Admin" />
          <Menu.Item onPress={() => handleNavigation('/(tabs)/dashboard/create-post')} title="Nova Postagem" />
          <Menu.Item onPress={() => handleNavigation('/(tabs)/dashboard/teachers')} title="Cadastrar professores" />
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 25,
    shadowRadius: 5,
    elevation: 5
  },
  menuButton: {
    color: '#ED125B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    color: '#ED125B',
    fontSize: 30
  },
  contentChild: {
    color: '#FFF',
  },
});
