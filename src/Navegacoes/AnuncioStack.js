import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Anuncio from '../Telas/Anuncio/Anuncios'
import Detalhe from '../Telas/Anuncio/Detalhe'

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
    </Stack.Navigator>
  )
}