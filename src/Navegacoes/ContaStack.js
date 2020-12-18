import React from 'react'
import {createStackNavigation} from '@react-navigation/stack'

import EnviarConfirmacao from '../Telas/Contas/EnviarConfirmacao'
import ConfirmarNumero from '../Telas/Contas/ConfirmarNumero'

const Stack = createStackNavigation()

export function PerfilStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                component={EnviarConfirmacao} 
                name= "enviar-confirmacao"
                options = {{
                    title: "Confirme seu número de celular",
                    headerStyle: {backgroundColor: "#cd090b"},
                    headerTintColor: "#e8e3d4"
                }}
            />

            <Stack.Screen 
                component={ConfirmarNumero} 
                name= "confirmar-numero"
                options = {{
                    title: "Confirmar número",
                    headerStyle: {backgroundColor: "#cd090b"},
                    headerTintColor: "#e8e3d4"
                }}
            />
        </Stack.Navigator>
    )
}