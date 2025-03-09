import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StarBackground } from '@/components/Atoms/StarBackground';
import AddDreamModal from '@/components/organisms/AddDreamModal';
import { Dream } from '@/interfaces/IDreams';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const getCurrentDate = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  const [dreams, setDreams] = useState<Dream[]>([]);

  // Cargar los sueños desde localStorage al cargar el componente
  useEffect(() => {
    const storedDreams = localStorage.getItem('dreams');
    if (storedDreams) {
      const parsedDreams = JSON.parse(storedDreams);
      setDreams(parsedDreams);
      console.log('Sueños almacenados:', parsedDreams); // Aquí hacemos el console.log
    }
  }, []);
  

  // Guardar los sueños en localStorage cada vez que cambian
  useEffect(() => {
    if (dreams.length > 0) {
      localStorage.setItem('dreams', JSON.stringify(dreams));
    }
  }, [dreams]);

  const handleAddDream = (dream: Dream) => {
    setDreams(prevDreams => [...prevDreams, dream]);
    setModalVisible(false);  // Close the modal after saving the dream
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />
      <StarBackground />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.1)',
        }}>
          <Text style={{ fontSize: 30, fontWeight: '300', color: '#e2e2e2' }}>DreamJournal</Text>
          <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 5 }}>Captura tus aventuras nocturnas</Text>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={{ fontSize: 18, color: '#a9c2cb' }}>{getCurrentDate()}</Text>
        </View>
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 15,
          padding: 20,
          marginVertical: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
          borderLeftWidth: 4,
          borderLeftColor: '#5c6bc0',
        }}>
          <Text style={{
            fontSize: 17,
            lineHeight: 24,
            fontStyle: 'italic',
            color: '#fff',
          }}>
            "Los sueños son la poesía del inconsciente. Escúchalos con atención, pues contienen sabiduría que tu mente consciente aún no ha descubierto."
          </Text>
          <Text style={{
            marginTop: 10,
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'right',
          }}>— Carl Jung</Text>
        </View>
        <TouchableOpacity 
          style={{
            backgroundColor: '#5c6bc0',
            borderRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 30,
            marginVertical: 30,
            alignSelf: 'center',
            shadowColor: 'rgba(92, 107, 192, 0.3)',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
            textAlign: 'center',
          }}>
            ✨ Registrar nuevo sueño
          </Text>
        </TouchableOpacity>
        <AddDreamModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleAddDream}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
