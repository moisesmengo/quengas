import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Perfil from '../Telas/Perfil/Perfil'

const Stack = createStackNavigator()

export default function PerfilStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                component={Perfil} 
                name= "Perfil"
                options = {{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}