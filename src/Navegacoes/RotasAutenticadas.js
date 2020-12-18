import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon} from 'react-native-elements'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'

import AnuncioStack from './AnuncioStack'
import PerfilStack from './PerfilStack'
import MinhaContaStack from './MinhaContaStack'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                component = {AnuncioStack}
                name = "anuncio"
                options ={{
                    title: "Anuncio"
                }}
            />

            <Tab.Screen 
                component = {MinhaContaStack}
                name = "minha-conta"
                options ={{
                    title: ""
                }}
            />

            <Tab.Screen 
                component = {PerfilStack}
                name = "conta"
                options ={{
                    title: "Conta"
                }}
            />
        </Tab.Navigator>
    )
}

export default function RotasAutenticadas(){
    return(
        <NavigationContainer>
            <TabBar />
        </NavigationContainer>
    )
}