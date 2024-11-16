import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function Button() {
return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
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
      width: 30,      // Largura do botão (ajuste conforme necessário)
      height: 30,     // Altura do botão (deve ser igual à largura para ser quadrado)
      backgroundColor: "#151619",
      justifyContent: 'center',  
      alignItems: 'center',      
      borderRadius: 8,           
      elevation: 5,              
    },
    buttonText: {
      color: 'white',  // Cor do texto
      fontSize: 16,    // Tamanho da fonte
      fontWeight: 'bold',
    },
  });