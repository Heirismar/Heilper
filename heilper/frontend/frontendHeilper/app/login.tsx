import React, { useState, useContext } from 'react';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';
import Hbutton from '@/components/ui/Hbuttom';

export default function TabTwoScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { setCorreoUsuario} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.108:7000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (data.success) {
        setCorreoUsuario(data.correo);
        Alert.alert('Login exitoso', `Bienvenido: ${data.correo}`);
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
                                HEILPER                            
                            </Text>
                            <View style={styles.containerImage}>
                                <Image source={require('@/assets/images/logo.png')} style={styles.imagen}/>
                            </View>
                            <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.htextinput} />
                            <TextInput textContentType='password' placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.htextinput} />
                            <Hbutton sentence="Iniciar Sesión" onPress={handleLogin} />
                            <View style={{ marginTop: 5, flexDirection: 'row' }}>
                              <Text style={{ marginTop: 5, color: '#fff' }}>¿No tienes cuenta? </Text>
                              <TouchableOpacity >
                                  <Link href="/register" style={styles.register}>Regístrate</Link>
                              </TouchableOpacity>
                            </View>
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
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop:15,
    padding:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:206,
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
  register:{
    marginTop: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  }

});