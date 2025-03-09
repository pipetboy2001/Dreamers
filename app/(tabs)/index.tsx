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

const EmotionChip = ({ label, onToggle, selected }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: selected ? 'rgba(92, 107, 192, 0.2)' : 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: selected ? '#5c6bc0' : 'rgba(255,255,255,0.1)',
        margin: 5,
      }}
      onPress={onToggle}
    >
      <Text style={{ color: '#fff', fontSize: 14 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [dreamDate, setDreamDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamDescription, setDreamDescription] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [emotions, setEmotions] = useState([
    { id: 1, label: '😊 Felicidad', selected: false },
    { id: 2, label: '😢 Tristeza', selected: false },
    { id: 3, label: '😨 Miedo', selected: false },
    { id: 4, label: '😡 Enojo', selected: false },
    { id: 5, label: '😲 Sorpresa', selected: false },
    { id: 6, label: '😌 Calma', selected: false },
    { id: 7, label: '🤔 Confusión', selected: false },
    { id: 8, label: '😳 Vergüenza', selected: false },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dreams, setDreams] = useState<string[]>([]);

  const getCurrentDate = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  const toggleEmotion = (id) => {
    setEmotions(emotions.map(emotion => 
      emotion.id === id ? { ...emotion, selected: !emotion.selected } : emotion
    ));
  };

  const saveDream = () => {
    alert('¡Sueño guardado con éxito!');
    setShowForm(false);
    setDreamTitle('');
    setDreamDescription('');
    setDreamType('');
    setEmotions(emotions.map(emotion => ({ ...emotion, selected: false })));
  };

  const handleAddDream = (dream: string) => {
    setDreams((prevDreams) => [...prevDreams, dream]);
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
            {showForm ? '✖ Cancelar' : '✨ Registrar nuevo sueño'}
          </Text>
        </TouchableOpacity>
        <AddDreamModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onAddDream={handleAddDream}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
