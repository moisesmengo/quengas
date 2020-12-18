import React from 'react'
import {createStackNavigation} from '@react-navigation/stack'

import Anuncio from '../Telas/Anuncio/Anuncios'
import AddAnuncio from '../Telas/Anuncio/AddAnuncio'
import Contato from '../Telas/Anuncio/Contato'
import Detalhe from '../Telas/Anuncio/Detalhe'
import MensagensLista from '../Telas/Anuncio/MensagensLista'

const Stack = createStackNavigation()

export default function AnuncioStack(){
  return(
    <Stack.Navigator>
      <Stack.Scree 
        component = {Anuncio} 
        name = "anuncio" 
        options = {{headerShown: false}}
      />

      <Stack.Scree 
        component = {AddAnuncio} 
        name = "add-anuncio" 
        options = {{
          title: "Adcionar novo anúncio", 
          headerStyle: {backgroundColor: "#cd090b"},
          headerTintColor: {backgroundColor: "#e8e3d4"},
        }}
      />

      <Stack.Scree 
        component = {Detalhe} 
        name = "detalhe" 
        options = {{
          headerTransparent: true, 
          headerTintColor: "#cd090b",
          title: ""
        }}
      />

      <Stack.Scree 
        component = {MensagensLista} 
        name = "mensagem-lista" 
        options = {{
          title: "Mensagens", 
          headerStyle: {backgroundColor: "#cd090b"},
          headerTintColor: {backgroundColor: "#e8e3d4"},
        }}
      />

      <Stack.Scree 
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