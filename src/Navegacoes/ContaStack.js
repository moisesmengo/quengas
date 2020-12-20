import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import EnviarConfirmacao from '../Telas/Contas/EnviarConfirmacao'
import ConfirmarNumero from '../Telas/Contas/ConfirmarNumero'

const Stack = createStackNavigator()

export default function PerfilStack(){
    return(
        <NavigationContainer>
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
        </NavigationContainer>
    )
}