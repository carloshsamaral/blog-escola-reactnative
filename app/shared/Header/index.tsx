import { Link } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Button from "../Button";
export default function Header() {
return (
    <View style={styles.card}>

        <Button />
        <Link style={styles.content}
        href={'/(tabs)'}>
        FIAP
        <Text style={styles.contentChild}>.blog</Text>
        </Link>
    </View>
)
}

const styles = StyleSheet.create({
    
    card: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#000',
      alignItems: 'center',
      marginTop: 30,      
      borderRadius: 8,
      padding: 20,
      margin: 10,
      shadowRadius: 5,
      elevation: 5,      
    },
    content:{
        color: '#ED125B',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 30
    },
    contentChild:{
        alignContent: 'center',
        alignItems: 'center',
        color:'#FFF'
    }
  });