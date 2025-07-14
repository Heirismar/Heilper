import Lista from "@/components/Lista";
//import { LinearGradient } from "expo-linear-gradient";
import { SmsFile } from "@/components/SmsFile";
import { useContext } from "react";
import React from "react";
import { AuthContext } from '@/app/AuthContext';  
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/ui/Header";
const Contactos= () =>{
    const { correoUsuario } = useContext(AuthContext);
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <View  style={styles.gradient}>
                      <Header sentence="Contactos"/>
                      <Lista/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles=StyleSheet.create({
    frame:{
        display:'flex',
        flexDirection: 'column',
    },
    gradient:{
        display:'flex',
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        backgroundColor:'lightblue',
    },
});

export default Contactos;