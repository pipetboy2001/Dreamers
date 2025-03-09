import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login'); // Redirigir después de cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});