import { Link, router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
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
    <Provider>
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
          <Menu.Item onPress={() => handleNavigation('/(tabs)')} title="Home" />
          <Menu.Item onPress={() => handleNavigation('/authentication')} title="Login" />
        </Menu>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
    shadowRadius: 5,
    elevation: 5,
  },
  menuButton: {
    color: '#ED125B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    color: '#ED125B',
    fontSize: 30,
  },
  contentChild: {
    color: '#FFF',
  },
});
