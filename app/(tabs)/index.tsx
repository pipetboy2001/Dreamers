import React, { useState } from 'react';
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
import { useDreams } from '@/hooks/useDreams';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { dreams, addDream } = useDreams(); // Usamos el hook aquí

  const getCurrentDate = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  const handleAddDream = (dream) => {
    addDream(dream); // Guardamos el sueño con el hook
    setModalVisible(false);
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

        {/* LISTA DE SUEÑOS */}
        {dreams.length > 0 ? (
          dreams.map((dream, index) => (
            <View key={index} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: 15,
              borderRadius: 10,
              marginVertical: 5,
            }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>{dream.title}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{dream.description}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 20 }}>
            No hay sueños guardados aún.
          </Text>
        )}

        <TouchableOpacity 
          style={{
            backgroundColor: '#5c6bc0',
            borderRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 30,
            marginVertical: 30,
            alignSelf: 'center',
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
