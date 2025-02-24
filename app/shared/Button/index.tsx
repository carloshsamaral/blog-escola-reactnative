import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'
export default function Button() {

  const router = useRouter()

  const handlePostPress = (id: string) => {
    router.push(`/(tabs)/authentication`)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePostPress}>
        <Text style={styles.buttonText}> &lt; </Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      width: 30,
      height: 30,
      backgroundColor: "#151619",
      justifyContent: 'center',  
      alignItems: 'center',      
      borderRadius: 8,           
      elevation: 5,              
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });