import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { StarBackground } from '@/components/Atoms/StarBackground';
import AddDreamModal from '@/components/organisms/AddDreamModal';
import { useDreams } from '@/hooks/useDreams';

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { dreams, addDream } = useDreams();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const getCurrentDate = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  const handleAddDream = (dream) => {
    addDream(dream);
    setModalVisible(false);
  };

  const getDreamEmoji = (mood) => {
    const emojis = {
      good: "✨",
      neutral: "💭",
      bad: "🌩️",
      default: "🌙"
    };
    return emojis[mood] || emojis.default;
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#262650]">
      <StatusBar backgroundColor="#0f0f1a" barStyle="light-content" />
      <StarBackground />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
        <View className="flex-row items-center">
          <Text className="text-2xl">🌙</Text>
          <Text className="text-2xl font-bold text-white ml-2">Registro de sueños de hoy</Text>
        </View>
        <TouchableOpacity className="bg-[#332f5c] p-2 rounded-full">
          <Text className="text-xl">📅</Text>
        </TouchableOpacity>
      </View>
      
      {/* Date display with subtle card effect */}
      <View className="mx-6 my-4 bg-[rgba(30,30,60,0.4)] p-3 rounded-xl border border-[rgba(255,255,255,0.1)]">
        <Text className="text-[#a9c2cb] text-base font-medium">{getCurrentDate()}</Text>
      </View>

      <ScrollView 
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Dream counter */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#e2e2e2] text-lg font-semibold">Tus sueños</Text>
          <Text className="text-[#8e94f2] text-base">
            {dreams.length} {dreams.length === 1 ? 'sueño' : 'sueños'}
          </Text>
        </View>

        {/* Dream list */}
        <Animated.View style={{ opacity: fadeAnim }}>
          {dreams.length > 0 ? (
            dreams.map((dream, index) => (
              <TouchableOpacity
                key={index}
                className="bg-[rgba(40,40,80,0.7)] mb-4 rounded-xl overflow-hidden border border-[rgba(120,120,160,0.2)]"
                activeOpacity={0.7}
              >
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white text-lg font-semibold">{dream.title}</Text>
                    <Text className="text-2xl">{getDreamEmoji(dream.mood)}</Text>
                  </View>
                  <Text className="text-[rgba(255,255,255,0.7)] text-base mb-3" numberOfLines={2}>
                    {dream.description}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-[#8e94f2] text-xs">
                      {dream.date || 'Hoy'}
                    </Text>
                    <Text>▶️</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <View className="bg-[rgba(30,30,60,0.5)] p-6 rounded-full mb-4">
                <Text className="text-3xl">🌙</Text>
              </View>
              <Text className="text-[rgba(255,255,255,0.7)] text-lg text-center mb-2">
                No hay sueños guardados aún
              </Text>
              <Text className="text-[rgba(255,255,255,0.4)] text-base text-center px-6">
                Registra tu primer sueño para comenzar a darle seguimiento a tus aventuras nocturnas
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Floating action button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-[#6a5ae0] w-16 h-16 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-2xl">➕</Text>
      </TouchableOpacity>

      <AddDreamModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddDream}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;