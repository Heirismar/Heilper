import { StyleSheet, Text, TextInput, View } from "react-native";

const HtextInput=()=>{
    return(
        <View>
            <TextInput style={styles.htextinput}>
                <Text style={styles.phrase} >
                    Escribe tu frase secreta
                </Text>
            </TextInput>
        </View>
    );
}
const styles=StyleSheet.create({
    htextinput:{
        marginTop:30,
        padding:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:206,
        height:40,
        borderRadius:10,
        borderColor:'white',
        backgroundColor:'#D9D9D9',
    },
    phrase:{
        padding:0,
        color:'gray',
        lineHeight:15,
        fontSize:15,
    },

});

export default HtextInput;