import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function NotFoundScreen() {
  const [contador, setContador] = useState(5);

  useEffect(() => {
    if (contador <= 0) return;

    const temporizador = setTimeout(() => {
      setContador(contador - 1);
    }, 1000);

    return () => clearTimeout(temporizador);
  }, [contador]);

  return (
    <>
      <Stack.Screen
        options={{ title: "¡Página no encontrada!", headerShown: false }}
      />
      <View className="flex-1 items-center justify-center p-5 bg-gradient-to-b from-purple-900 to-indigo-900">
        {/* Número 404 grande */}
        <Text className="text-9xl font-bold text-white opacity-20">404</Text>

        {/* Contenido principal */}
        <View className="absolute items-center">
          <View className="w-24 h-24 mb-6 items-center justify-center rounded-full bg-purple-500 shadow-lg">
            <Text className="text-4xl">🔍</Text>
          </View>

          <Text className="text-3xl font-bold text-white mb-2 text-center">
            ¡Ups! Página no encontrada
          </Text>
          <Text className="text-lg text-purple-200 mb-8 text-center px-4">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </Text>

          {/* Botones de navegación */}
          <View className="flex-row space-x-4">
            <Link href="/" asChild>
              <View className="bg-white rounded-lg px-6 py-3 shadow-md">
                <Text className="text-purple-900 font-semibold">
                  {contador > 0 ? `Inicio (${contador})` : "Volver al inicio"}
                </Text>
              </View>
            </Link>
          </View>

          {/* Mensaje adicional */}
          <Text className="text-purple-300 mt-12 text-center">
            Si crees que esto es un error, por favor contacta con nuestro equipo
            de soporte.
          </Text>
        </View>
      </View>
    </>
  );
}
