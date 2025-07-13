import * as ubication from '@/components/LocationFile';
import Hbutton from '@/components/ui/Hbuttom';
import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

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

export const SmsFile = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Empleado[]>([]);
  const [smsAvailable, setSmsAvailable] = useState(false);

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

  useEffect(() => {
    if (data.length > 0) {
      isSMSAvailable();
    }
  }, [data]);

  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
      ['+5804121114470'],
      `${data[1].nombre}, ${data[1].apellido} con el telefono ${data[1].telefono} y el email ${data[1].email} y la direccion ${data[1].direccion} y la fecha de ingreso ${data[1].fecha_ingreso}, esta es mi ubicación actual: ${ubication.urlSms}`,
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