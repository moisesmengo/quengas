import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Anuncio from '../Telas/Anuncio/Anuncios'
import Contato from '../Telas/Anuncio/Contato'
import Detalhe from '../Telas/Anuncio/Detalhe'
import MensagensLista from '../Telas/Anuncio/MensagensLista'

const Stack = createStackNavigator()

export default function AnuncioStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
        component = {Anuncio} 
        name = "anuncio" 
        options = {{headerShown: false}}
      />

      <Stack.Screen
        component = {Detalhe} 
        name = "detalhe" 
        options = {{
          headerTransparent: true, 
          headerTintColor: "#cd090b",
          title: ""
        }}
      />

      <Stack.Screen
        component = {MensagensLista} 
        name = "mensagem-lista" 
        options = {{
          title: "Mensagens", 
          headerStyle: {backgroundColor: "#cd090b"},
          headerTintColor: {backgroundColor: "#e8e3d4"},
        }}
      />

      <Stack.Screen
        component = {Contato} 
        name = "contato" 
        options = {{
          title: "Contato", 
          headerStyle: {backgroundColor: "#cd090b"},
          headerTintColor: {backgroundColor: "#e8e3d4"},
        }}
      />
    </Stack.Navigator>
  )
}