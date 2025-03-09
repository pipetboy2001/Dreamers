import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const storedUser = await AsyncStorage.getItem('userSession');
    setIsAuthenticated(!!storedUser);
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  const login = async (email: string) => {
    await AsyncStorage.setItem('userSession', email);
    setIsAuthenticated(true);
  };



  const logout = async () => {
    await AsyncStorage.removeItem('userSession');
    setIsAuthenticated(false);
  };
  
  
  useEffect(() => {
    console.log("Estado de autenticación:", isAuthenticated);
    if (isAuthenticated === false) {
      checkAuth();
    }
  }, [isAuthenticated]);
  
  
  
  return { isAuthenticated, login, logout };
}
