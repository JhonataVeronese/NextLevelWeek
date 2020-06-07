import React from 'react';
import { AppLoading } from 'expo'; //Loading da app enquanto o sistema é carregado
import { StyleSheet, StatusBar } from 'react-native';
import Home from './src/pages/home';
import Routes from './src/routes';
// Importa as fonts instaladas, para instalar comando a baixo
// expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

export default function App() {
  // Carrega as fonts no sitema assim que for iniciado o app
  const [fontsLoad] = useFonts({
    Ubuntu_700Bold, Roboto_400Regular, Roboto_500Medium
  });

  // Se as fontes ainda nao tiverem sido carregadas entao utiliza o AppLoading do expo
  if (!fontsLoad) {
    return <AppLoading />
  }
  return (
    // O bom e velho fragment, Serve para poder retornar mais de um elemento view no mesmo return
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>

  );
}