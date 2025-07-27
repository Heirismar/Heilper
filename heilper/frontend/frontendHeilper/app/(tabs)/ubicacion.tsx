import Lista from "@/components/Lista";
import { Image } from 'expo-image';
//import { LinearGradient } from "expo-linear-gradient";
import { SmsFile } from "@/components/SmsFile";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/ui/Header";
const ubicacion= () =>{
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <View  style={styles.gradient}>
                    <Header sentence="Ubicación"/>
                    <Text style={{alignSelf:'center'}}>
                        Envía tu ubicación actual y tu información médica a tus contactos en caso de emergencia.
                    </Text>
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
});

export default ubicacion;