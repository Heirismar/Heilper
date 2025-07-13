import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HbuttonProps = {
  sentence: string;
  onPress?: () => void | Promise<void>;
};
const Hbuttom= ({ sentence, onPress }: HbuttonProps) =>{
return(
    <View>
        <TouchableOpacity style={styles.hbuttom} onPress={onPress}>
            <Text style={styles.phrase} >
                {sentence}
            </Text>
        </TouchableOpacity>
    </View>
);
}

const styles=StyleSheet.create({
    hbuttom:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#21239A',
        width:206,
        height:40,
        marginTop:30,
    },

    phrase:{
        color:'white',
        fontWeight:'bold',
        fontSize:15,      
    },
});

export default Hbuttom;

