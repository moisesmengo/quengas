import React, {useState} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { Icon, Button, Input} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {validarEmail} from '../Utils/Utils'
import {isEmpty, size} from 'lodash'
import * as firebase from 'firebase'


export default function RegisterForm(props) {
    const [confirmarPassword, setConfirmarPassword] = useState("")
    const {toastRef} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const criarConta = () =>{
        if(isEmpty(email) || isEmpty(password) || isEmpty(confirmarPassword)){
            toastRef.current.show("Preencha todos os campos!")
        }else if (!validarEmail(email)){
            toastRef.current.show("E-mail não é valido!")
        }else if (password !== confirmarPassword){
            toastRef.current.show("As senhas devem ser iguais!")
        }else if (size(password) < 6){
            toastRef.current.show("As senhas devem ter ao menos 6 caracteres!")
        }
    }

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
                onChangeText={(text) => {
                    setEmail(text)
                }}
                value={email}
                            />
             <Input
                placeholder="Senha"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: show ? 'eye-off-outline' : 'eye-outline',
                    color: '#5c2a2d',
                    onPress: () =>setShow(!show)
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
                secureTextEntry={!show}
                value={password}
            />
            <Input
                placeholder="Confirmar Senha"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: showConfirm ? 'eye-off-outline' : 'eye-outline',
                    color: '#5c2a2d',
                    onPress: () =>setShowConfirm(!showConfirm)
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
                secureTextEntry={!showConfirm}
                value={confirmarPassword}
            />

            <Button title="CRIAR CONTA" 
                containerStyle={styles.btnEntrar} 
                buttonStyle={{backgroundColor:"#ce615e"}}
                onPress = {()=> criarConta()}
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