import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { StarBackground } from '@/components/Atoms/StarBackground';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      login(email);
      router.replace('/(tabs)');
    } else {
      alert('Ingresa un correo y contraseña');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />
      
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900">
        <StarBackground />
      </View>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          <View className="items-center mt-10">
            <View className="w-32 h-32 bg-purple-500 rounded-full items-center justify-center mb-2">
              <Text className="text-white text-xl font-bold">Dreamers</Text>
            </View>
            <Text className="text-2xl font-bold text-white">Bienvenido</Text>
            <Text className="text-gray-300 mt-1 text-center px-8">
              Inicia sesión para continuar con tu cuenta
            </Text>
          </View>

          <View className="px-4 w-full mb-10">
            <View className="mb-4">
              <Text className="text-gray-300 mb-1 font-medium">Correo electrónico</Text>
              <View className="flex-row border-b border-gray-500 pb-1 items-center">
                <Ionicons name="mail-outline" size={18} color="#a3a3a3" />
                <TextInput
                  className="flex-1 h-10 pl-2 text-white"
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-300 mb-1 font-medium">Contraseña</Text>
              <View className="flex-row border-b border-gray-500 pb-1 items-center">
                <Ionicons name="lock-closed-outline" size={18} color="#a3a3a3" />
                <TextInput
                  className="flex-1 h-10 pl-2 text-white"
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#a3a3a3"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color="#a3a3a3"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-lg items-center shadow-md"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-md">Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-3 items-center">
              <Text className="text-blue-400 font-medium">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
