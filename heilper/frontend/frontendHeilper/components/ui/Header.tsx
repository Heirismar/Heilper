import { StyleSheet, Text,  View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type HeaderProps = {
  sentence: string;
};
const Header = ({sentence}: HeaderProps) =>{
return(
    
    <LinearGradient  colors={['#21239A', '#4C0049']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
            
        <View >
            <Text style={styles.phrase} >
                {sentence}
            </Text>
        </View>

    </LinearGradient>

);
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1A237E', // Azul oscuro elegante
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    elevation: 6, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  phrase: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 26,
    alignSelf:'center',
    letterSpacing: 0.5,
    fontFamily: 'Poppins_600SemiBold',
  },
    gradient:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
});


export default Header;

