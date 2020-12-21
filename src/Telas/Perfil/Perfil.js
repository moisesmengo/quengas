import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, StatusBar } from 'react-native'
import {Icon, Avatar, Input} from 'react-native-elements'
import {carregarImagens} from '../../Utils/Utils'
import Loading from '../../Componentes/Loading'
import InputEditavel from '../../Componentes/InputEditavel'

import {SubirImagensBatch, addRegistro, atualizarPerfil, ObterUsuario} from '../../Utils/Acoes'

export default function Perfil(){

    const [imagemPerfil, setImagemPerfil] = useState("")
    const [loading, setLoading] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [editavelNome, setEditavelNome] = useState(false)
    const [editavelEmail, setEditavelEmail] = useState(false)
    const [editavelPhone, setEditavelPhone] = useState(false)

    const usuario = ObterUsuario()

    useEffect(()=>{
        setImagemPerfil(usuario.photoURL)

        const {displayName, phoneNumber,email} = usuario

        setDisplayName(displayName)
        setPhoneNumber(phoneNumber)
        setEmail(email)
    }, [])

    const onChangeInput = (input, valor)=>{
        switch(input){
            case "displayName":
                setDisplayName(valor)
                break
            case "email":
                setEmail(valor)
                break
            case "phoneNumber":
                setPhoneNumber(valor)
                break
            }
    }

    const obterValor = (input)=>{
        switch(input){
            case "displayName":
                return displayName
                break
            case "email":
                return email
                break
            case "phoneNumber":
                return phoneNumber
                break
            }
    }

    return(
        <View>
            <StatusBar backgroundColor="#cd090b" />
            <TopoBG /> 
            <HeaderAvatar 
                usuario={usuario} 
                imagemPerfil={imagemPerfil} 
                setImagemPerfil={setImagemPerfil}
                setLoading={setLoading}
            />
            <FormDados 
                onChangeInput={onChangeInput}
                obterValor={obterValor}
                editavelEmail={editavelEmail}
                setEditavelEmail={setEditavelEmail}
                editavelNome={editavelNome}
                setEditavelNome={setEditavelNome}
                setEditavelPhone={setEditavelPhone}
                editavelPhone={editavelPhone}
            />
            <Loading isVisible={loading} />
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

    const {usuario, setImagemPerfil, imagemPerfil, setLoading} = props
    const {uid} = usuario

    const trocarFoto = async () =>{
        const resultado = await carregarImagens([1,1])
        if(resultado.status){
            setLoading(true)
            const url = await SubirImagensBatch([resultado.imagem], "Perfil")
            const update = await atualizarPerfil({
                photoURL: url[0]
            })
            const response = await addRegistro("Usuario", uid, {
                photoURL: url[0]
            })
    
            if(response.statusresponse){
                setImagemPerfil(url[0])
                setLoading(false)
            }else{
                setLoading(false)
                alert("Erro ao enviar foto")
            }
        }
        
    }

    return(
        <View style={styles.avatarinline}>
            <Avatar
                source={ imagemPerfil 
                    ?  {uri: imagemPerfil}
                    : require('../../../assets/avatar.png')}
                style={styles.avatar}
                rounded
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

function FormDados (props){
    const {
            onChangeInput,
            obterValor,
            editavelEmail,
            editavelNome,
            editavelPhone,
            setEditavelEmail,
            setEditavelNome,
            setEditavelPhone
    } = props
    return(
        <View>
            <InputEditavel
                id="displayName"
                label="Nome"
                obterValor={obterValor}
                placeholder="Nome"
                onChangeInput={onChangeInput}
                editavel={editavelNome}
                setEditavel={setEditavelNome}
            />
            <InputEditavel
                id="email"
                label="E-mail"
                obterValor={obterValor}
                placeholder="exemplo@exemplo.com"
                onChangeInput={onChangeInput}
                editavel={editavelEmail}
                setEditavel={setEditavelEmail}
            />
            <InputEditavel
                id="phoneNumber"
                label="Telefone"
                obterValor={obterValor}
                placeholder="+55(--)---------"
                onChangeInput={onChangeInput}
                editavel={editavelPhone}
                setEditavel={setEditavelPhone}
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
        borderRadius: 50,
    }
})