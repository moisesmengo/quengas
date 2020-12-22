import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import  MeusAnuncios from '../Telas/MeusAnuncios/MeusAnuncios'
import  EditarAnuncio from '../Telas/MeusAnuncios/EditarAnuncio'
import AddAnuncio from '../Telas/MeusAnuncios/AddAnuncio'


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
                component = {AddAnuncio} 
                name = "add-anuncio" 
                options = {{
                title: "Adcionar novo anúncio", 
                headerStyle: {backgroundColor: "#cd090b"},
                headerTintColor: {backgroundColor: "#e8e3d4"},
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