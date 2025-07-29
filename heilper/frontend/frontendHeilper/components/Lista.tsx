
import React, { useEffect, useState, useContext} from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity,TextInput, Button, Modal, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Hbuttom from './ui/Hbuttom';
import {ip} from "../app/DireccionIp"

type Data = {
    cod: number;
    nombre: string;
    apellido: string;
    tlf: string;
    usuario: string;
};

const Lista = () => {
  const router = useRouter();
  const { correoUsuario } =useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cod, setCod] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tlf, setTlf] = useState('');

  const enviarFormulario = () => {
    if (cod !== null) {
      // Editar contacto existente
      fetch(`http://${ip}:7000/contacto/${cod}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          tlf,
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
    } else {
      // Agregar nuevo contacto
      fetch(`http://${ip}:7000/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          tlf,
          correoUsuario,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Contacto agregado:', data);
          getData();
        })
        .catch((error) => {
          console.error('Error al agregar contacto:', error);
        });
    }
    // Limpiar campos y cerrar modal
    setCod(null);
    setNombre('');
    setApellido('');
    setTlf('');

    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Tlf:', tlf);
    setModalVisible(false);
  };

  const getData = async () => {
    try {
      const response = await fetch(`http://${ip}:7000/contacto?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`);
      const json = await response.json();
      console.log(json);
      setData(json);
      
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({cod}) => cod.toString()}
          renderItem={({item}) => (
            <View style={{flexDirection:'row', width:360}}>
              <View style={styles.icono}>
                <AntDesign name="user" size={30} color={("white")} />
              </View>
              <View style={styles.container} > 
                <Text style={styles.descripcion}>
                  {item.nombre} {item.apellido}  Tlf: {item.tlf}
                </Text>
                <View  style={{flexDirection:'row', marginLeft:5}}>
                  <TouchableOpacity  onPress={() => {
                    setCod(item.cod);
                    setNombre(item.nombre);
                    setApellido(item.apellido);
                    setTlf(item.tlf);
                    setModalVisible(true);
                  }}>
                    <AntDesign name="edit" size={20} color={"white"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:5}} onPress={() => {
                    fetch(`http://${ip}:7000/contacto/${item.cod}`, {
                      method: 'DELETE',
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log('Contacto eliminado:', data);
                        getData();
                      })
                      .catch((error) => {
                        console.error('Error al eliminar contacto:', error);
                      });
                  }}>
                    <AntDesign name="delete" size={20} color={"white"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
                
      )}
          <TouchableOpacity style={styles.addContact} onPress={() => {
                setCod(null);
                setNombre('');
                setApellido('');
                setTlf('');
                setModalVisible(true);
              }}>
            <AntDesign name="adduser" size={30} color={("white")} />
           </TouchableOpacity>


               <Modal
                   visible={modalVisible}
                   animationType="slide"
                   transparent={true}
                   onRequestClose={() => setModalVisible(false)} // para Android
                 >
                   <View style={styles.overlay}>
                     <View style={styles.modalView}>
                       <Text style={styles.titulo}>Contacto</Text>
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
                          keyboardType="phone-pad"
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
    marginTop: 20,
    backgroundColor: '#4C0049',
    borderRadius: '100%',
    padding: 20,
  },
  container: {  
    borderRadius: 10,
    flexDirection: 'row',
    margin:10,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#442294e4',
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
  icono:{
    backgroundColor: '#4C0049',
    width: 50,
    height: 50,
    borderRadius: '100%',
    padding: 10,
    margin:10,
    marginLeft:0,
  },
    descripcion:{
    margin:10,
    borderRadius: 10,
    color:'white',
    shadowColor: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
  },
});
export default Lista;
