import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar sueños almacenados al iniciar
  useEffect(() => {
    loadDreams();
  }, []);

  // Función para cargar sueños desde AsyncStorage
  const loadDreams = async () => {
    try {
      setLoading(true);
      const storedDreams = await AsyncStorage.getItem('dreams');
      if (storedDreams) {
        setDreams(JSON.parse(storedDreams));
      }
    } catch (err) {
      setError('Error al cargar los sueños');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar sueños en AsyncStorage
  const saveDreams = async (newDreams) => {
    try {
      await AsyncStorage.getItem('dreams_backup').then(backup => {
        if (!backup) {
          AsyncStorage.setItem('dreams_backup', JSON.stringify(newDreams));
        }
      });
      
      await AsyncStorage.setItem('dreams', JSON.stringify(newDreams));
      setDreams(newDreams);
    } catch (err) {
      setError('Error al guardar los sueños');
      console.error(err);
    }
  };

  // Añadir un nuevo sueño
  const addDream = (newDream) => {
    // Asegurarse de que el sueño tenga una fecha
    const dreamWithDate = {
      ...newDream,
      date: newDream.date || new Date().toISOString(),
      id: Date.now().toString()
    };
    
    const updatedDreams = [...dreams, dreamWithDate];
    saveDreams(updatedDreams);
  };

  // Actualizar un sueño existente
  const updateDream = (dreamId, updatedDream) => {
    const updatedDreams = dreams.map(dream => 
      dream.id === dreamId ? { ...dream, ...updatedDream } : dream
    );
    saveDreams(updatedDreams);
  };

  // Eliminar un sueño
  const deleteDream = (dreamId) => {
    const updatedDreams = dreams.filter(dream => dream.id !== dreamId);
    saveDreams(updatedDreams);
  };

  // Obtener sueños por fecha
  const getDreamsByDate = (date) => {
    const targetDate = new Date(date);
    
    return dreams.filter(dream => {
      const dreamDate = new Date(dream.date);
      return (
        dreamDate.getDate() === targetDate.getDate() &&
        dreamDate.getMonth() === targetDate.getMonth() &&
        dreamDate.getFullYear() === targetDate.getFullYear()
      );
    });
  };

  return {
    dreams,
    loading,
    error,
    addDream,
    updateDream,
    deleteDream,
    getDreamsByDate,
    reloadDreams: loadDreams
  };
};