import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RotasAutenticadas from './src/Navegacoes/RotasAutenticadas'
import RotasNaoAutenticadas from './src/Navegacoes/RotasNaoAutenticadas'

export default function App() {
  return (
    <RotasNaoAutenticadas />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
