import ListaEn from "@/components/ListaEn";
import ListaT from "@/components/ListaT";
import ListaUser from "@/components/ListaUser";
import { useContext } from "react";
import React from "react";
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';  
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/ui/Header";
import { ScrollView } from "react-native";
const profile= () =>{
     const router = useRouter();
    const { correoUsuario } = useContext(AuthContext);
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View  style={styles.gradient}>
                            <Header sentence="Perfil"/>
                                    <ListaUser/> 
                                    <ListaEn/>
                                    <ListaT/>     
                            <TouchableOpacity style={styles.container1} onPress={() => router.replace('/login')}>
                                <Text  style={styles.phrase} >
                                    Cerrar Sesion
                                </Text>
                             </TouchableOpacity>                              
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
        backgroundColor:'#f6f3f7ff',
    },

    container1:{
        display:'flex',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#4C0049',
        width:206,
        height:40,
        marginTop:30,
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
        color:'white',
        fontWeight:'bold',
        fontSize:15,      
    },
});

export default profile;