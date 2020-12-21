import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import AnuncioStack from './AnuncioStack'
import PerfilStack from './PerfilStack'
import MinhaContaStack from './MinhaContaStack'
import ShopButton from '../Componentes/ShopButton'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabBar = () => {
    return (
        <Tab.Navigator
            initialRouteName="anuncio"
            tabBarOptions={{
                inactiveTintColor: "#e8e3d4",
                activeTintColor: "#e8e3d4",
                style:{
                    borderTopLeftRadius: 60,
                    borderTopRightRadius: 60,
                    alignItems: "center",
                    backgroundColor: "#cd090b",
                    paddingBottom: 5,
                }
            }}
            screenOptions = {({route}) => ({
                tabBarIcon: ({cor}) => mostrarIcon(route, cor)
            })}
        >
            <Tab.Screen 
                component = {AnuncioStack}
                name = "anuncio"
                options ={{
                    title: "Anuncio"
                }}
            />

            <Tab.Screen 
                component = {MinhaContaStack}
                name = "meus-anuncios"
                options ={{
                    title: "", tabBarIcon: () => <ShopButton/>
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

function mostrarIcon(route, cor){
    let iconName = ""
    switch(route.name){
        case "anuncio":
            iconName = "cart-outline"
            break
        case "conta":
            iconName = "account-circle-outline"
            break
        case "minha-conta":
            iconName = "cart-outline"
            break
    }

    return (
        <Icon type="material-community" name={iconName} size={24} color={cor="#e8e3d4"}/>
    )
}

export default function RotasAutenticadas(){
    return(
        <NavigationContainer>
            <TabBar />
        </NavigationContainer>
    )
}