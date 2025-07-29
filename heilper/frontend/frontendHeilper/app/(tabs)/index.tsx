import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Collapsible } from '@/components/Collapsible';
import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '@/app/AuthContext';  
import Header from "@/components/ui/Header";

const pasosPrimerosAuxilios = {
  asfixia: [
    "1. Pide ayuda inmediatamente.",
    "2. Anima a la persona a toser con fuerza.",
    "3. Si no puede toser, hablar ni respirar, realiza la Maniobra de Heimlich:",
    "   - Ponte detrás de la persona, rodea con tus brazos su abdomen.",
    "   - Coloca un puño cerrado justo arriba del ombligo.",
    "   - Con la otra mano, presiona hacia adentro y arriba rápidamente.",
    "4. Repite hasta que expulse el objeto o llegue ayuda médica.",
  ],
  ahogamiento: [
    "1. Saca a la persona del agua con seguridad.",
    "2. Llama o pide ayuda médica urgente.",
    "3. Verifica si respira; si no, comienza RCP:",
    "   - 30 compresiones torácicas y 2 respiraciones.",
    "4. Continúa hasta que recupere el pulso o llegue ayuda.",
  ],
  cortadas: [
    "1. Lávate las manos o usa guantes si es posible.",
    "2. Aplica presión directa con una gasa o paño limpio.",
    "3. Limpia la herida con agua limpia si el sangrado se detiene.",
    "4. Cubre con un vendaje estéril.",
    "5. Busca atención médica si es profunda o no para de sangrar.",
  ],
  caidas: [
    "1. Verifica si la persona responde y puede moverse.",
    "2. No la muevas si sospechas lesión en cabeza, cuello o espalda.",
    "3. Aplica hielo si hay hinchazón.",
    "4. Si hay fractura aparente, inmoviliza el área afectada.",
    "5. Llama a emergencias si es grave o hay inconsciencia.",
  ],
  sangrado_nasal: [
    "1. Siéntate e inclina la cabeza ligeramente hacia adelante.",
    "2. Pellizca las fosas nasales durante al menos 10 minutos.",
    "3. Respira por la boca mientras aplicas presión.",
    "4. No te acuestes ni inclines la cabeza hacia atrás.",
    "5. Busca ayuda médica si no se detiene en 20 minutos.",
  ],
  quemaduras: [
    "1. Enfría la zona con agua corriente (no helada) durante 10-20 minutos.",
    "2. No revientes ampollas.",
    "3. Cubre con un paño limpio o gasa no adhesiva.",
    "4. No apliques cremas caseras (como mantequilla o pasta dental).",
    "5. Acude al médico si es grave, extensa o en zonas sensibles.",
  ],
};
const renderPasos = (pasos: string[]) => (
  <View style={styles.stepContainer}>
    {pasos.map((paso, index) => (
      <Text key={index} style={styles.stepText}>{paso}</Text>
    ))}
  </View>
);
type RootStackParamList = {
  login: undefined;
  // add other routes here if needed
};
export default function HomeScreen() {
  const { correoUsuario } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!correoUsuario) {
      // Si correoUsuario es null, vacío o falso, navega al Login
      navigation.navigate('login');
    }
  }, [correoUsuario, navigation]);

  return (
    <SafeAreaProvider style={styles.frame}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
         <Header sentence="Primeros auxilios" />
          <View style={styles.gradient}>

            <Collapsible title="Asfixia">
              {renderPasos(pasosPrimerosAuxilios.asfixia)}
            </Collapsible>

            <Collapsible title="Ahogamiento">
              {renderPasos(pasosPrimerosAuxilios.ahogamiento)}
            </Collapsible>

            <Collapsible title="Cortadas">
              {renderPasos(pasosPrimerosAuxilios.cortadas)}
            </Collapsible>

            <Collapsible title="Caídas">
              {renderPasos(pasosPrimerosAuxilios.caidas)}
            </Collapsible>

            <Collapsible title="Sangrado nasal">
              {renderPasos(pasosPrimerosAuxilios.sangrado_nasal)}
            </Collapsible>

            <Collapsible title="Quemaduras">
              {renderPasos(pasosPrimerosAuxilios.quemaduras)}
            </Collapsible>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#f6f3f7ff', // fondo más suave para que resalte el contenido
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: '#f6f3f7ff',
  },
  stepContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#3e1d8ce4', // violeta oscuro translúcido como en ListaEn
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  stepText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: 'Poppins_400Regular', // opcional si usas fuentes Google
  },
});
