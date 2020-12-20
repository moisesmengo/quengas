import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import CodeInput from 'react-native-code-input'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../Componentes/Loading'

export default function ConfirmarNumero(){
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
                size={50} codeLenght={6} containerStyle= {{
                    marginTop: 30
                }} codeInputStyle={{borderWidth: 1.5}}
                onFullfill = {(code) =>{
                    console.log(code)
                }}
            />
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