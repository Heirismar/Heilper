import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export let urlSms: string | null = null; // Variable global para almacenar la URL

export default function LocationFile() {
  const [url, setUrl] = useState<string>(""); // URL interna para abrir mapas
  const [text, setText] = useState<Location.LocationObject>({} as Location.LocationObject); // Objeto con ubicación
  const [location, setLocation] = useState<Location.LocationObject | null>(null); // Objeto crudo de ubicación
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Errores

  // Solicita la ubicación una sola vez al montar el componente
  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, esto no funciona en emulador Android de Snack. ¡Pruébalo en un dispositivo real!'
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  // Cuando se obtiene la ubicación, genera la URL y el texto
  useEffect(() => {
    if (location) {
      const label = 'Ubicación Actual';
      const parsed = JSON.parse(JSON.stringify(location)); // opcional
      setText(parsed);

      const lat = parsed.coords.latitude;
      const lgt = parsed.coords.longitude;

      const aux = Platform.select({
        ios: `maps:0,0?q=${label}@${lat},${lgt}`,
        android: `geo:${lat},${lgt}?q=${lat},${lgt}(${label})`,
      });

      if (aux) {
        setUrl(aux);
      }

      // URL para compartir por mensaje o navegador
      urlSms = `https://www.google.com/maps/search/?api=1&query=${lat},${lgt}`;
    }
  }, [location]);

  // Abre Google Maps usando Linking
  const openMapWithCurrentLocation = async () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir mi ubicación en el mapa" onPress={openMapWithCurrentLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
