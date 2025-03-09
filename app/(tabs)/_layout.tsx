import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ccc',
          borderTopWidth: Platform.OS === 'ios' ? 1 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          width: 20,
          height: 20,
        },
        
      }}>
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerShown: false 
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false 
        }}
      />
      <Tabs.Screen
        name="ConfigApp"
        options={{
          title: 'Settings',
          headerShown: false 
        }}
      />
    </Tabs>
  );
}
