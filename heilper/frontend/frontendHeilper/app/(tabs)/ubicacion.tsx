import Lista from "@/components/Lista";
import LocationFile from '@/components/LocationFile';
import { Image } from 'expo-image';
//import { LinearGradient } from "expo-linear-gradient";
import { SmsFile } from "@/components/SmsFile";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const ubicacion= () =>{
    return(
        <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <View  style={styles.gradient}>
                            <View style={styles.container1}>
                                
                            </View>
                            <View style={styles.container2}>
                                <Image source={require('@/assets/images/logo.png')} style={styles.imagen}/>
                            </View>
                            <LocationFile/>
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