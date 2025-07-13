import Lista from "@/components/Lista";
import LocationFile from '@/components/LocationFile';
import { Image } from 'expo-image';
//import { LinearGradient } from "expo-linear-gradient";
import { SmsFile } from "@/components/SmsFile";
import { useContext } from "react";
import React from "react";
import { AuthContext } from '@/app/AuthContext';  
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const profile= () =>{
    const { correoUsuario } = useContext(AuthContext);
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <View  style={styles.gradient}>
                            <View style={styles.container1}>
                            <Text style={styles.phrase}>Perfil de {correoUsuario}</Text>
                            </View>
                            <View style={styles.container2}>
                                <Image source={require('@/assets/images/logo.png')} style={styles.imagen}/>
                            </View>
                            <Lista/>
                            <LocationFile/>
                            <SmsFile/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles=StyleSheet.create({
    frame:{
        display:'flex',
    },
    gradient:{
        display:'flex',
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        backgroundColor:'lightblue',
    },

    container1:{
        marginTop:0,
        backgroundColor:'darkblue',
        width:412,
        height:231,
    },
    container2:{
        marginTop:140,
        marginRight:10,
        alignSelf:'flex-end',
        position:'absolute',
        borderWidth:7,
        borderColor:'#6200EE',
        borderRadius:200,
        backgroundColor:'#00EEDA',
        alignItems:'center',
        justifyContent:'center',
        width:236,
        height:231,
    },
    imagen:{
        width:130,
        height:113,
    },
    phrase:{
        color:'#000000ff',
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10,
    },
});

export default profile;