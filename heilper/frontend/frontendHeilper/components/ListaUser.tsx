import React, { useEffect, useState, useContext} from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity,TextInput, Button, Modal, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Hbuttom from './ui/Hbuttom';
import {ip} from "../app/DireccionIp"

type Data = {
    correo: string;
    nombre: string;
    apellido: string;
    sangre: string;
    tlf: string;
    direccion: string;
};

const ListaUser = () => {
  const router = useRouter();
  const { correoUsuario } =useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [correo, setCorreo] = useState(correoUsuario);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tlf, setTlf] = useState('');
  const [direccion, setDireccion] = useState('');
  const [sangre, setSangre] = useState('');

  const enviarFormulario = () => {
    if (correo !== null) {
      // Editar contacto existente
      fetch(`http://${ip}:7000/usuario/${correoUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          tlf,
          direccion,
          sangre,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Contacto editado:', data);
          getData();
        })
        .catch((error) => {
          console.error('Error al editar contacto:', error);
        });
    } 
    // Limpiar campos y cerrar modal
    console.log('Nombre:', nombre);
    setModalVisible(false);
  };

  const getData = async () => {
    try {
      const response = await fetch(`http://${ip}:7000/usuario?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`);
      const json = await response.json();
      console.log('Datos obtenidos:', json);
      console.log(json);
      setData(json);
      if (json.length > 0) {
        const { nombre, apellido, tlf, direccion, sangre } = json[0];
        setNombre(nombre);
        setApellido(apellido);
        setTlf(tlf);
        setDireccion(direccion);
        setSangre(sangre);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={(styles.stopError)}>
      <View style={styles.containerEncabezado}>
        <Text style={styles.encabezado}>Datos Personales  </Text>
          <TouchableOpacity  onPress={() => {

            setModalVisible(true);
          }}>
            <AntDesign name="edit" size={30} color={"#4C0049"} />
          </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({correo}) => correo}
          renderItem={({item}) => (
            <View >
               <LinearGradient  colors={['#21239A', '#4C0049']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container} >
                <Text style={styles.subtitulo}>
                  {item.nombre} {item.apellido}
                </Text>
                <Text style={styles.descripcion}>
                  Teléfono
                </Text>
                <Text style={styles.subtitulo}>
                  {item.tlf}
                </Text>
                <Text style={styles.descripcion}>
                  Dirección
                </Text>
                  <Text style={styles.subtitulo}>
                  {item.direccion}
                </Text>
                <Text style={styles.descripcion}>
                  Tipo de Sangre
                </Text>
                <Text style={styles.subtitulo}>
                {item.sangre}
                </Text>

              </LinearGradient>
            </View>
          )}
        />
                
      )}


               <Modal
                   visible={modalVisible}
                   animationType="slide"
                   transparent={true}
                   onRequestClose={() => setModalVisible(false)} // para Android
                 >
                   <View style={styles.overlay}>
                     <View style={styles.modalView}>
                       <Text style={styles.titulo}>Datos Personales</Text>
                       <TextInput
                         style={styles.input}
                         placeholder="Nombre"
                         value={nombre}
                         onChangeText={setNombre}
                       />
                        <TextInput
                         style={styles.input}
                         placeholder="Apellido"
                         value={apellido}
                         onChangeText={setApellido}
                       />
                        <TextInput
                          style={styles.input}
                          placeholder="Teléfono"
                          value={tlf}
                          onChangeText={setTlf}
                        />
                       <TextInput
                         style={styles.input}
                         placeholder="Dirección"
                         value={direccion}
                         onChangeText={setDireccion}
                       />
                       <TextInput
                         style={styles.input}
                         placeholder="Tipo de Sangre"
                         value={sangre}
                         onChangeText={setSangre}
                       />
                       <View style={styles.botones}>
                         <Hbuttom sentence='Guardar' onPress={enviarFormulario} />
                         <Hbuttom sentence="Cancelar" onPress={() => setModalVisible(false)} />
                       </View>
                     </View>
                   </View>
              </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
stopError: {
  width: '100%',
  marginTop: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  padding: 0,
},
addContact: {
    backgroundColor: '#21239A',
    borderRadius: '100%',
    padding: 20,
  },
  container: {  
    borderRadius: 20,
    flexDirection: 'column',
    margin:10,
    width:360,
    padding: 10,
    color: '#ffffffff',
    fontWeight: 'bold',
    backgroundColor: '#442294e4',
  },
  containerEncabezado: {
  flexDirection:'row', 
  justifyContent:'space-around', 
  alignItems:'center', 
  alignSelf: 'flex-start',
  marginLeft: 10,
  },
encabezado: {
  fontSize: 30,
  marginBottom: 10,
  fontWeight: 'bold',
  textAlign: 'center',
},


  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor:'#D9D9D9',
  },
  botones: {
    marginTop: 0,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitulo:{
    marginTop: 5,
    marginLeft:10,
    color:'white',
    fontSize: 25,
    fontWeight:'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
    descripcion:{
    marginLeft:5,
    marginTop: 20,
    color:'white',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
});
export default ListaUser;
