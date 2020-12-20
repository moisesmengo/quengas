import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Image, Alert } from 'react-native'
import CodeInput from 'react-native-code-input'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../Componentes/Loading'
import {confirmarCodigo, obterToken, ObterUsuario, addRegistro} from '../../Utils/Acoes'

export default function ConfirmarNumero(props){

    const { route } = props
    const {verificationid} = route.params

    const [loading, setLoading] = useState(false)

    const confirmarCodigoSMS = async (code) =>{

        setLoading(true)

        const resultado = await confirmarCodigo(verificationid, code)

        console.log(resultado)

        if(resultado){
            const token = await obterToken()
            const {uid, displayName, photoURL, email, phoneNumber} = ObterUsuario()

            const registro = await addRegistro("Usuario", uid, {
                token,
                displayName,
                photoURL,
                email,
                phoneNumber,
                datacriacao: new Date()
            })
            setLoading(false)

        }else{
            Alert.alert(
                "Error",
                "Por favor valide o código de verificação!!!",
                [{
                    style: "default",
                    text: "Entendido"
                }]
            )
            setLoading(false)

        }
    }

    return(
        <View style={styles.container}>
            <Image 
                source={require("../../../assets/logo.png")}
                style={styles.imglogo}
            />
            <Text style={styles.titulo}>Por favor verifique seus SMS's e
                 digite o código de confirmação</Text>
            <CodeInput
                activeColor="#e8e3d4" inactiveColor="#e8e3d4"
                autoFocus = {true}  inputPosition="center"
                size={50} codeLength={6} containerStyle= {{
                    marginTop: 30
                }}
                codeInputStyle={{borderWidth: 1.5}}
                onFulfill = {(code) =>{
                   confirmarCodigoSMS(code)
                }}
                secureTextEntry
            />

            <Loading isVisible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cd090b',
        paddingHorizontal: 20
    },
    imglogo:{
        width: 106,
        height: 106,
        alignSelf: 'center',
        marginTop: 20
    },
    titulo:{
        fontSize: 20,
        textAlign: 'center',
        color: '#e8e3d4',
        marginVertical: 20,
    }
})