import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
/* @hide */
import * as Device from 'expo-device';
/* @end */
import * as Location from 'expo-location';


export let urlSms: string | null = null; // Variable para almacenar la URL
export default function LocationFile() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      /* @hide */
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  let lgt;
  let lat;
  let url: string | null = null; // Variable para almacenar la URL;
  let label='Ubicación Actual';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.parse(JSON.stringify(location));
     lgt=text.coords.longitude;
     lat=text.coords.latitude;
     
  }

  // Crear URL para Google Maps
  url = Platform.select({
    ios: `maps:0,0?q=${label}@${lat},${lgt}`,
    android: `geo:${lat},${lgt}?q=${lat},${lgt}(${label})`,
  });

// URL enviada para visualizar ubicación actual en Google Maps en el navegador 
  urlSms=  `https://www.google.com/maps/search/?api=1&query=${lat},${lgt}`;

  const openMapWithCurrentLocation = async () => {
    // Abrir Google Maps
    Linking.openURL(url);
  };
  
  return (
    <View style={styles.container}>
       <Button title="Abrir mi ubicación en el mapa" onPress={openMapWithCurrentLocation} />
    </View>//colocar {text} como texto mostrará todas las propiedades obtenidas de location
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color:'red',
  },
});
