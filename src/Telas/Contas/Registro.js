import React, {useRef} from 'react' 
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native'
import Toast from 'react-native-easy-toast'

import RegisterForm from '../../Componentes/RegisterForm'

export default function Registro(){
    const toastRef = useRef()
    
    return(
        <View style={styles.container}>
        <StatusBar backgroundColor="#cd090b" />
        <Image 
            source = { require('../../../assets/logo.png') }
            style = {styles.imgLogo}
        />

        <Text style={styles.TextoBanner}>Criar Conta</Text>

        <RegisterForm  toastRef={toastRef} />
        
        <Toast ref={toastRef} position="center" opacity={0.9} />
        
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#cd090b',
    },
    imgLogo: {
        width: 106,
        height: 106,
        marginTop: 40,
        alignSelf: 'center'
    },
    TextoBanner:{
        fontFamily: "Roboto",
        fontWeight: 'bold',
        fontSize: 30,
        color: '#e8e3d4',
        alignSelf: 'center'
    }
})