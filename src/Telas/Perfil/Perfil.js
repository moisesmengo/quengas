import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, StatusBar } from 'react-native'
import {Icon, Avatar, Input} from 'react-native-elements'
import {carregarImagens} from '../../Utils/Utils'
import {SubirImagensBatch} from '../../Utils/Acoes'

export default function Perfil(){
    return(
        <View>
            <StatusBar backgroundColor="#cd090b" />
            <TopoBG /> 
            <HeaderAvatar />
        </View>
    )
}

function TopoBG(){
    return(
        <View>
            <View style={styles.bg}>
                <Text
                    style={{
                        color: '#e8e3d4', fontSize: 18, fontWeight: 'bold'
                    }}
                >Nome</Text>
            </View>
        </View>
    )
}

function HeaderAvatar (props){

    const trocarFoto = async () =>{
        const resultado = await carregarImagens([1,1])
        const url = await SubirImagensBatch([resultado.imagem], "Perfil")
        alert(url)
    }

    return(
        <View style={styles.avatarinline}>
            <Avatar
                source={require('../../../assets/avatar.png')}
                style={styles.avatar}
                size="large"
            />
            <Avatar.Accessory {...Icon} onPress={trocarFoto} iconStyle={{fontSize: 20}}
                style={{
                    width: 40,
                    height: 40,
                    borderWidth: 2,
                    borderColor: '#cd090b',
                    position: 'absolute',
                    left: 200,
                    borderRadius: 25

                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    bg:{
        width: "100%",
        height: 200,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
        backgroundColor: '#cd090b',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarinline:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -70,     
    },
    avatar:{
        width: 100,
        height: 100,
        backgroundColor: '#c0c0c0',
        borderRadius: 50
    }
})