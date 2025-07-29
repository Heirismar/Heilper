import Lista from "@/components/Lista";
import { Image } from 'expo-image';
//import { LinearGradient } from "expo-linear-gradient";
import { SmsFile } from "@/components/SmsFile";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/ui/Header";
import AntDesign from '@expo/vector-icons/AntDesign';
const ubicacion= () =>{
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header sentence="Ubicación"/>
                <View  style={styles.gradient}>
                    <View style={styles.container}>
                    <AntDesign name="enviromento" size={400} color={"#4C0049"}/>
                    <Text style={{alignSelf:'center', margin:30, fontFamily: 'Poppins_600SemiBold'}}>
                        Envía tu ubicación actual y tu información médica{"\n"}      a tus contactos en caso de emergencia.
                    </Text>
                    <SmsFile/>
                    </View>
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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f6f3f7ff',
    },
    container: {
        marginLeft: -20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
      },

    imagen:{
        width:130,
        height:113,
    },
});

export default ubicacion;