import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Icon, Button, Divider, Input} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import {validarEmail} from '../Utils/Utils'
import {isEmpty} from 'lodash'
import {validarSesssao} from '../Utils/Acoes'
import * as firebase from 'firebase'

export default function LoginForm(props){

    const {toastRef} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    validarSesssao()

    const iniciarSessao = () =>{
        if(isEmpty(email) || isEmpty(password)) {
            toastRef.current.show("Você deve inserir os valores de E-mail e Senha")
        }else if (!validarEmail(email)){
            toastRef.current.show("Você deve inserir um E-mail válido")
        }else{
            firebase.auth().signInWhithEmailAndPassword(email, password)
                .then(()=>{
                    alert("tudo bem")
                }).catch((err)=> {
                    alert("error")
                    toastRef.current.show("E-mail ou Senha incorretos")
                })
        }
    }

    return(
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

            <Button title="ENTRAR" 
                containerStyle={styles.btnEntrar} 
                buttonStyle={{backgroundColor:"#ce615e"}}
                onPress = {()=> iniciarSessao()}
            />

            <Text style={styles.criarContaTexto}>
                Ainda não é uma Quenga? 
                    <Text 
                        style={styles.conta}
                        onPress={()=> navigation.navigate("registro")}
                    > Criar conta
                    </Text>  
            </Text>

            <Divider 
                style={{
                    backgroundColor: '#ce6153',
                    height: 1,
                    width: '90%',
                    marginTop:10
                }}
            />

            <Text style={styles.ou}>Ou</Text>

            <View style={styles.btnLogin}>
                <TouchableOpacity style={styles.loginSocial}>
                    <Icon 
                        size={24}
                        type='material-community'
                        name='google'
                        color="#e8e3d4"
                        backgroundColor="transparent"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginSocial}>
                    <Icon 
                        size={24}
                        type='material-community'
                        name='facebook'
                        color="#e8e3d4"
                        backgroundColor="transparent"
                    />
                </TouchableOpacity>
            </View>

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
    },
    criarContaTexto:{
        marginTop: 20
    },
    conta:{
        color: "#cd090b",
        fontFamily: 'Roboto',
        fontSize: 15
    },
    ou:{
        fontWeight: 'bold',
        fontSize: 15,
        color: "#cd090b",
    },
    btnLogin:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    loginSocial:{
        marginTop: 10,
        backgroundColor: '#5c2a2d',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5
    }
})