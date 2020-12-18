import React from 'react'
import {createStackNavigation} from '@react-navigation/stack'

import Perfil from '../Telas/Perfil/Perfil'

const Stack = createStackNavigation()

export function PerfilStack(){
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