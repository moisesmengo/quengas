import React, {useState} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { Icon, Button, Input} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {validarEmail} from '../Utils/Utils'
import {isEmpty} from 'lodash'
import * as firebase from 'firebase'

export default function RegisterForm(props) {
    const [confirmarPassword, setConfirmarPassword] = useState("")
    const {toastRef} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={{
                borderBottomColor: '#ce615e',
                borderBottomWidth: 2,
                width: 100
            }}></View>

            <Input
                placeholder="E-mail"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#5c2a2d',
                    onPress: () => alert ('OIII Quenga')
                }}
                leftIcon={
                    {
                        type: 'material-community',
                        name: 'account-circle-outline',
                        color: '#5c2a2d',
                    }
                }
                            />
             <Input
                placeholder="Senha"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'eye-outline',
                    color: '#5c2a2d',
                    onPress: () => alert ('OIII Quenga')
                }}
                leftIcon={
                    {
                        type: 'material-community',
                        name: 'security',
                        color: '#5c2a2d',
                    }
                }
                onChangeText={(text) => {
                    setPassword(text)
                }}
                secureTextEntry={true}
                value={password}
            />
            <Input
                placeholder="Confirmar Senha"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'eye-outline',
                    color: '#5c2a2d',
                    onPress: () => alert ('OIII Quenga')
                }}
                leftIcon={
                    {
                        type: 'material-community',
                        name: 'security',
                        color: '#5c2a2d',
                    }
                }
                onChangeText={(text) => {
                    setConfirmarPassword(text)
                }}
                secureTextEntry={true}
                value={confirmarPassword}
            />

            <Button title="CRIAR CONTA" 
                containerStyle={styles.btnEntrar} 
                buttonStyle={{backgroundColor:"#ce615e"}}
                onPress = {()=> alert("criar conta")}
            />

            <Button title="INICIAR SESSÃO" 
                containerStyle={styles.btnEntrar} 
                buttonStyle={{backgroundColor:"#0b070b"}}
                onPress = {()=> navigation.goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d1c4b0',
        color: '#0b070b',
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        paddingTop: 20,
    },
    input:{
        width: "90%",
        marginTop: 20,
        height: 50,
    },
    btnEntrar:{
        width: '90%',
        marginTop: 20,
    }
})