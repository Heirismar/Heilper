import ListaEn from "@/components/ListaEn";
import ListaUser from "@/components/ListaUser";
import { useContext } from "react";
import React from "react";
import { AuthContext } from '@/app/AuthContext';  
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/ui/Header";
import { ScrollView } from "react-native";
const profile= () =>{
    const { correoUsuario } = useContext(AuthContext);
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View  style={styles.gradient}>
                            <Header sentence="Perfil"/>
                                    <ListaUser/> 
                                    <ListaEn/>
                                    <ListaEn/>                                   
                    </View>
                </ScrollView>
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