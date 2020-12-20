import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import CodeInput from 'react-native-code-input'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../Componentes/Loading'
import {confirmarCodigo, obterToken} from '../../Utils/Acoes'

export default function ConfirmarNumero(props){

    const {route} = props
    const {verificationid} = route.params

    const [loading, setLoading] = useState(false)

    const confirmarCodigoSMS = async (code) =>{
        //const resultado = await confirmarCodigo(verificationid, code)
        alert(await obterToken())
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
                }} codeInputStyle={{borderWidth: 1.5}}
                onFulfill = {(code) =>{
                   confirmarCodigoSMS(code)
                }}
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