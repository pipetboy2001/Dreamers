import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
  <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
         ios: {
          position: 'absolute',
          backgroundColor: '#1a1a2e',
         },
         default: {
          backgroundColor: '#1a1a2e',
         },
        }),
        tabBarLabelStyle: {
         color: '#ffffff', // Cambia el color del texto a blanco
        },
      }}
     >

    <Tabs.Screen
      name="Calendar"
      options={{
       title: '📅 Calendario',
       headerShown: false 
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
       title: '🏠 Home',
       headerShown: false 
      }}
    />
    <Tabs.Screen
      name="ConfigApp"
      options={{
       title: '⚙️ Configuración',
       headerShown: false 
      }}
    />
   </Tabs>
  );
}
