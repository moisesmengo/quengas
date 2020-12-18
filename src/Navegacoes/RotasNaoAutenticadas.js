import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import Login from '../Telas/Contas/Login'
import Registro from '../Telas/Contas/Registro'
import RestaurarSenha from '../Telas/Contas/RestaurarSenha'

const Stack = createStackNavigator()

export default function RotasNaoAutenticadas(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
                <Stack.Screen 
                    component ={Login}
                    name = 'login'
                />
                <Stack.Screen 
                    component ={Registro}
                    name = 'registro'
                />
                <Stack.Screen 
                    component ={RestaurarSenha}
                    name = 'restaurar-senha'
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}