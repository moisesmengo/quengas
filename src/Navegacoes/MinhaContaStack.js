import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import  MeusAnuncios from '../Telas/MeusAnuncios/MeusAnuncios'
import  EditarAnuncio from '../Telas/MeusAnuncios/EditarAnuncio'

const Stack = new createStackNavigator()

export default function MinhaContaStack(){
    return(
        <Stack.Navigator screenOptions = {{
            headerStyle: { backgroundColor: "#cd090b"},
            headerTintColor: "#e8e3d4"
        }}>
            <Stack.Screen
                component={MeusAnuncios} 
                name = "meus-anuncios" 
                options ={{
                    title: "Meus Anúncios",

                }}
            />
            <Stack.Screen
                component={EditarAnuncio} 
                name = "editar-anuncio" 
                options ={{
                    title: "Editar Anúncio",

                }}
            />
        </Stack.Navigator>
    )
}