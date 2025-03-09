import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Animated,
  Easing
} from 'react-native';


// Componente para las estrellas animadas de fondo
export const StarBackground = () => {
  const stars = Array(50).fill(0).map((_, index) => {
    const fadeAnim = new Animated.Value(0.3);

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 2000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 2000 + Math.random() * 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    return {
      id: index,
      left: Math.random() * Dimensions.get('window').width,
      top: Math.random() * Dimensions.get('window').height,
      size: 1 + Math.random() * 2,
      opacity: fadeAnim
    };
  });

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      {stars.map(star => (
        <Animated.View
          key={star.id}
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 50,
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity
          }}
        />
      ))}
    </View>
  );
};