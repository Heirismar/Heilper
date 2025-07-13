
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

type Empleado = {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    fecha_ingreso: Date;
    img: string;
};

const Lista = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Empleado[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.0.110:7000/empleado');
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
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.nombre}, {item.id}
            </Text>
          )}
        />
        
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {  
    borderRadius: 10,
    margin:20,
    flex: 1,
    padding: 24,
    color: 'black',
    backgroundColor: 'white',
  },
});
export default Lista;