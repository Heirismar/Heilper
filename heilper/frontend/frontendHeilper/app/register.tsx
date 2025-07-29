import React, { useState, useContext } from 'react';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';
import Hbutton from '@/components/ui/Hbuttom';
import {ip} from "@/app/DireccionIp";

export default function TabTwoScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sangre, setSangre] = useState('');
  const [tlf, setTlf] = useState('');
  const [direccion, setDireccion] = useState('');
  const { setCorreoUsuario} = useContext(AuthContext);

  const handleLogin = async () => {
    if(!correo || !password || !nombre || !apellido || !sangre || !tlf || !direccion) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    try {
      const response = await fetch(`http://${ip}:7000/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo,nombre, apellido, sangre, tlf, direccion, password }),
      });

      const data = await response.json();

      if (data.success) {
        setCorreoUsuario(data.correo);
        router.replace('/(tabs)'); // Redirigir a la pantalla principal
        // puedes navegar a la pantalla principal aquí
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de red');
    }
  };

  return ( 
       <SafeAreaProvider style={styles.frame}>
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient  colors={['#21239A', '#4C0049']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradient}>
                            <Text style={styles.title}>
                                Registro                     
                            </Text>
                            <View style={styles.container}> 
                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Correo</Text>
                                <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nombre</Text>
                                <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Apellido</Text>
                                <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Tipo de sangre</Text>
                                <TextInput placeholder="AB+, O-, ..." value={sangre} onChangeText={setSangre} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Teléfono</Text>
                                <TextInput placeholder="Teléfono" value={tlf} onChangeText={setTlf} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Dirección</Text>
                                <TextInput placeholder="Dirección" value={direccion} onChangeText={setDireccion} style={styles.htextinput} />
                              </View>

                              <View style={styles.inputGroup}>
                                <Text style={styles.label}>Contraseña</Text>
                                <TextInput
                                  textContentType='password'
                                  placeholder="Contraseña"
                                  value={password}
                                  onChangeText={setPassword}
                                  secureTextEntry
                                  style={styles.htextinput}
                                />
                              </View>
                            </View>   
                            <Hbutton sentence="Registrarse" onPress={handleLogin} />
                </LinearGradient>
            </SafeAreaView>
        </SafeAreaProvider>
  );
}

const styles=StyleSheet.create({
  frame:{
    display:'flex',
  },
  containerImage:{
    borderWidth:7,
    borderColor:'#6200EE',
    borderRadius:200,
    backgroundColor:'#00EEDA',
    alignItems:'center',
    justifyContent:'center',
    width:236,
    height:231,
  },
  container:{
    borderRadius:10,
    borderWidth:1,
    borderColor:'#be4be8ff',
    padding:25,
  },
  gradient:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  container2:{
    marginTop:140,
    marginRight:10,
    alignSelf:'center',
    position:'fixed',
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
  title:{
    display:'flex',
    alignContent:'flex-start',
    justifyContent:'center',
    color:'#6200EE',
    gap:0,
    width:223.2,
    height:56,
    fontSize:55,
    lineHeight: 55,
    fontFamily:'normal',
    fontWeight:'bold',
    marginBottom:30,
    padding:0,  
  },
  htextinput:{
    marginTop:5,
    padding:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:240,
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
  label: {
  fontSize: 14,
  fontWeight: 'bold',
  color: 'white',
  marginTop: 10,
  marginBottom: 2,
},
inputGroup: {
  marginBottom: 1,
},
  register:{
    marginTop: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  }

});