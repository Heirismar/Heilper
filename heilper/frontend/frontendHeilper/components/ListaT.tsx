
import React, { useEffect, useState, useContext} from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/app/AuthContext';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity,TextInput, Button, Modal, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Hbuttom from './ui/Hbuttom';

type Data = {
    codUT: number;
    nombre: string;
    descripcion: string;
    duracion: string;
};

const ListaT = () => {
  const router = useRouter();
  const { correoUsuario } =useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [codUT, setCodUT] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState('');


  const enviarFormulario = () => {
    if (codUT !== null) {
      // Editar contacto existente
      fetch(`http://192.168.0.108:7000/tratamiento/${codUT}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          duracion,
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
      fetch('http://192.168.0.108:7000/tratamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          duracion,
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
    setCodUT(null);
    setNombre('');
    setDescripcion('');
    setDuracion('');

    console.log('Nombre:', nombre);
    setModalVisible(false);
  };

  const getData = async () => {
    try {
      const response = await fetch(`http://192.168.0.108:7000/tratamiento?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`);
      const json = await response.json();
      console.log(json);
      setData(json);
      if (json.length > 0) {
        const { nombre, descripcion, duracion } = json[0];
        setNombre(nombre);
        setDescripcion(descripcion);
        setDuracion(duracion);
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
        <Text style={styles.encabezado}>Tratamientos  </Text>
      <TouchableOpacity style={styles.addContact} onPress={() => {
                setCodUT(null);
                setNombre('');
                setDuracion('');
                setModalVisible(true);
              }}>
            <AntDesign name="pluscircleo" size={20} color={("white")} />
      </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({codUT}) => codUT.toString()}
          renderItem={({item}) => (
            <View style={styles.container} >
              <Text style={[styles.container]}>
                <AntDesign name="medicinebox" size={30} color="gray" /> {'\n'}
                    Nombre: {item.nombre} {'\n'}
                    Duración: {item.duracion} {'\n'}
                    Descripción: {item.descripcion} {'\n'}
              </Text>
              <TouchableOpacity  onPress={() => {
                setCodUT(item.codUT);
                setNombre(item.nombre);
                setDescripcion(item.descripcion);
                setDuracion(item.duracion);
                setModalVisible(true);
              }}>
                <AntDesign name="edit" size={20} color={"gray"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                fetch(`http://192.168.0.108:7000/tratamiento/${item.codUT}`, {
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
                <AntDesign name="delete" size={20} color={"gray"} />
              </TouchableOpacity>
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
                       <Text style={styles.titulo}>Tratamientos</Text>
                       <TextInput
                         style={styles.input}
                         placeholder="Nombre"
                         value={nombre}
                         onChangeText={setNombre}
                       />
                       <TextInput
                         style={styles.input}
                         placeholder="Duración"
                         value={duracion}
                         onChangeText={setDuracion}
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
    padding: 8,
  },
  container: {  
    borderRadius: 10,
    flexDirection: 'row',
    margin:10,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },

containerEncabezado: {
  flexDirection:'row', 
  justifyContent:'space-around', 
  alignItems:'center', 
  alignSelf: 'flex-start',
  marginLeft: 10,
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
  encabezado: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default ListaT;
