import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import Hbutton from '@/components/ui/Hbuttom';
import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import {ip} from "../app/DireccionIp"
import * as Linking from 'expo-linking';
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

type usuario = {
    correo: string;
    nombre: string;
    apellido: string;
    sangre: string;
    tlf: string;
    direccion: string;
};

type contactos = {
    tlf: string;
};

type enfermedad = {
    codUE: number;
    nombre: string;
};

let urlSms: string | null = null; // Variable global para almacenar la URL
export const SmsFile = () => {
  const [isLoading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tlf, setTlf] = useState('');
  const [direccion, setDireccion] = useState('');
  const [sangre, setSangre] = useState('');
  const { correoUsuario } = useContext(AuthContext);
  const [data, setData] = useState<usuario[]>([]);
  const [dataEnfermedad, setDataEnfermedad] = useState<enfermedad[]>([]);
  const [dataContacto, setDataContacto] = useState<usuario[]>([]);
  const [smsAvailable, setSmsAvailable] = useState(false);

  //Location  

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
        console.log(urlSms);
      }
    }, [location]);
  
    // Abre Google Maps usando Linking
    const openMapWithCurrentLocation = async () => {
      if (url) {
        Linking.openURL(url);
      }
    };
  
  //SMS
  const getUser = async () => {
    try {
      const response = await fetch(`http://${ip}:7000/usuario?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`)
      const json = await response.json();
      console.log(json);
      setData(json);
      setNombre(json[0].nombre);
      setApellido(json[0].apellido);
      setTlf(json[0].tlf);
      setDireccion(json[0].direccion);
      setSangre(json[0].sangre);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const userContacts = async () => {
    try {
      const response = await fetch(`http://${ip}:7000/smsContacto?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`)
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const getDataContacto = async () => {
      try {
        const response = await fetch(`http://${ip}:7000/contacto?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`);
        const json = await response.json();
        console.log(json);
        setDataContacto(json);
        console.log(dataContacto);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getDataEnfermedad = async () => {
      try {
        const response = await fetch(`http://${ip}:7000/enfermedad?correoUsuario=${encodeURIComponent(correoUsuario ?? '')}`);
        const json = await response.json();
        console.log(json);
        setDataEnfermedad(json);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getDataEnfermedad();
    }, []);
  
  
    useEffect(() => {
      getDataContacto();
      userContacts();
    }, []);
    
  useEffect(() => {
    getUser();
  }, []);


  useEffect(() => {
    if (data.length > 0) {
      isSMSAvailable();
    }
  }, [data]);

  const sendSMS = async () => {
    const enfermedades = dataEnfermedad.map(e => e.nombre).join(", ");
    const response = await userContacts();
    const contactos = response.map((contacto: contactos) => contacto.tlf);
    const { result } = await SMS.sendSMSAsync(
      contactos,
      `Soy ${nombre} ${apellido}, mi tipo de sangre es ${sangre}, padezco de ${enfermedades} y esta es mi ubicación actual: ${urlSms}`,
    );
  };

  const isSMSAvailable = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    try {
      if (isAvailable) {
        setSmsAvailable(true);
      } else {
        setSmsAvailable(false);
      }
    } catch (error) {
      console.error('Error checking SMS availability:', error);
    }
  };

  return (
    <Text>
      <Hbutton sentence="Send SMS" onPress={smsAvailable ? sendSMS : undefined} />
    </Text>
  );
};