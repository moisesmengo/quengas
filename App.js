import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import RotasAutenticadas from './src/Navegacoes/RotasAutenticadas'
import RotasNaoAutenticadas from './src/Navegacoes/RotasNaoAutenticadas'
import { encerrarSessao, validarSesssao, IniciarNotificacoes } from './src/Utils/Acoes'
import SwitchNavigator  from './src/Navegacoes/SwitchNavigator'
import Loading from './src/Componentes/Loading';
import {decode, encode} from 'base-64'

if(!global.btoa){
  global.btoa = encode
}
if(!global.atob){
  global.atob = decode
}

YellowBox.ignoreWarnings(["Animated", "Setting a timer", "YellowBox has been" ,
  "Failed prop type: Invalid prop `isVisible`"
])

export default function App() {

  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(()=>{
    setLoading(true)
    validarSesssao(setUser)
    IniciarNotificacoes(notificationListener, responseListener)
    setLoading(false)
  }, [])
  
  if(loading){
    return <Loading isVisible={loading} />
  }

  return (
      user ? < SwitchNavigator /> : <RotasNaoAutenticadas />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
