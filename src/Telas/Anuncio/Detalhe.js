import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import {Avatar, Icon, Input, Button} from 'react-native-elements'
import {obterRegistroID, ObterUsuario} from '../../Utils/Acoes'
import {size} from 'lodash'
import Loading from '../../Componentes/Loading'

export default function Detalhe(props){
    const {route} = props
    const {id, titulo} = route.params

    const [anuncio, setAnuncio] = useState({})
    const [expoPushToken, setExpoPushToken] = useState("")
    const [nomeVendendor, setNomeVendendor] = useState("Nome")
    const [photoVendedor, setPhotoVendedor] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [activeSlide, setActiveSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsvisible] = useState(false)

    const usuarioAtual = ObterUsuario()

    useEffect(()=>{
        (async ()=>{
            setAnuncio((await obterRegistroID("Anuncios", id)).data)
            console.log(anuncio)
        })()
    }, [])

    useEffect(()=>{
        (async ()=>{
            if(size(anuncio) > 0){
                const resultado = (await obterRegistroID("Usuario", anuncio.usuario)).data
            }
        })()
    },[anuncio])

    return(
        <View>
            <Text>Tela de meus detalhe</Text>
        </View>
    )
}