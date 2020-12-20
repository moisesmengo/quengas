import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RotasAutenticadas from './src/Navegacoes/RotasAutenticadas'
import RotasNaoAutenticadas from './src/Navegacoes/RotasNaoAutenticadas'
import { encerrarSessao, validarSesssao } from './src/Utils/Acoes'
import SwitchNavigator  from './src/Navegacoes/SwitchNavigator'
import Loading from './src/Componentes/Loading';
import {decode, encode} from 'base-64'

if(!global.btoa){
  global.btoa = encode
}
if(!global.atob){
  global.atob = decode
}

export default function App() {

  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    validarSesssao(setUser)
    setLoading(false)
  }, [])
  
  if(loading){
    return <Loading isVisible={loading} />
  }

  return (
      user ? < SwitchNavigator /> : <RotasNaoAutenticadas />
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
