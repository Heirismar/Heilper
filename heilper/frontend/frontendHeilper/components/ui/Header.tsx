import { StyleSheet, Text,  View } from "react-native";

type HeaderProps = {
  sentence: string;
};
const Header = ({sentence}: HeaderProps) =>{
return(
    <View style={styles.header}>
            <Text style={styles.phrase} >
                {sentence}
            </Text>
    </View>
);
}

const styles=StyleSheet.create({
    header:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        backgroundColor:'#21239A',
        margin:0,
        padding:0,
        paddingBottom:10,
        width:412,
        height:77,
    },

    phrase:{
        padding:10,
        color:'white',
        fontWeight:'bold',
        fontSize:25,      
    },
});

export default Header;

