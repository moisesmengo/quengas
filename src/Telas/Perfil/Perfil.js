import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, StatusBar } from 'react-native'
import {Icon, Avatar, Input} from 'react-native-elements'
import {carregarImagens, validarEmail} from '../../Utils/Utils'
import {encerrarSessao} from '../../Utils/Acoes'
import Loading from '../../Componentes/Loading'
import InputEditavel from '../../Componentes/InputEditavel'
import Modal from '../../Componentes/Modal'
import CodeInput from 'react-native-code-input'
import FirebaseRecapcha from '../../Utils/FirebaseRecapcha'

import {
        SubirImagensBatch, 
        addRegistro, 
        atualizarPerfil,
        ObterUsuario, 
        confirmar,      
        Reautenticar,
        atualizarEmailFirebase
    } from '../../Utils/Acoes'
import { cos } from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'

export default function Perfil(){

    const [imagemPerfil, setImagemPerfil] = useState("")
    const [loading, setLoading] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [editavelNome, setEditavelNome] = useState(false)
    const [editavelEmail, setEditavelEmail] = useState(false)
    const [editavelPhone, setEditavelPhone] = useState(false)

    const [verificationId, setVerificationId] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    const recapcha = useRef()

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

    const atualizarValor = async (input, valor) =>{
        switch(input){
            case "displayName":
                console.log(await atualizarPerfil({displayName: valor}))
                addRegistro("Usuario", usuario.uid, {displayName: valor})
                console.log(usuario)
                break
            case "email":
                if(valor !== usuario.email){
                    if(validarEmail(valor)){
                        const verification = await confirmar(phoneNumber, recapcha)
                        if(verification){
                            setVerificationId(verification)
                            setIsVisible(true)
                        }else{
                            alert("Ocorreu um erro na verificação")
                            setEmail(usuario.email)
                        }
                    }
                    
                }
                break
            case "phoneNumber":
                addRegistro("Usuario", usuario.uid, {phoneNumber: valor})
                break
            }
    }

    const confirmarCodigo = async (verificationid, code)=>{
        setLoading(true)
        const resultado = await Reautenticar(verificationid, code)

        if(resultado.statusresponse){
            const emailresponse = await atualizarEmailFirebase(email)
            const updateregistro = await addRegistro(
                "Usuario", 
                usuario.uid, 
                {email: email})
            
            console.log(emailresponse)
            console.log(updateregistro)
            
            setLoading(false)
            setIsVisible(false)
        }else{
            alert("Ocorreu um erro ao atualizar o E-mail")
        }
    }

    return(
        <ScrollView>
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
                atualizarValor={atualizarValor}
            />

            <ModalVerification
                isVisibleModal = {isVisible}
                setIsVisibleModal = {setIsVisible}
                verificationid = {verificationId}
                confirmarCodigo={confirmarCodigo}
            />

            <FirebaseRecapcha referencia={recapcha} />
            <Loading isVisible={loading} />
        </ScrollView>
    )
}

function TopoBG(){
    return(
        <View>

            <View style={styles.sair}>
                <Icon 
                    type="material-community"
                    size={36}
                    name="exit-to-app"
                    color="#e8e3d4"
                    onPress={()=> encerrarSessao()}
                />
                <Text style={{
                    alignSelf: 'center',
                    color: '#e8e3d4'
                }}>Sair</Text>

            </View>
                
            <View style={styles.bg}>
            
                <Text
                    style={{
                        color: '#e8e3d4', fontSize: 18, fontWeight: 'bold'
                    }}
                >
                Meus Dados
                </Text>
                
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
            setEditavelPhone,
            atualizarValor
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
                atualizarValor={atualizarValor}
            />
            <InputEditavel
                id="email"
                label="E-mail"
                obterValor={obterValor}
                placeholder="exemplo@exemplo.com"
                onChangeInput={onChangeInput}
                editavel={editavelEmail}
                setEditavel={setEditavelEmail}
                atualizarValor={atualizarValor}
            />
            <InputEditavel
                id="phoneNumber"
                label="Telefone"
                obterValor={obterValor}
                placeholder="+55(--)---------"
                onChangeInput={onChangeInput}
                editavel={editavelPhone}
                setEditavel={setEditavelPhone}
                atualizarValor={atualizarValor}
            />
        </View>
    )
}

function ModalVerification(props){
    const {isVisibleModal, setIsVisibleModal, confirmarCodigo, verificationid} = props

    return(
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
            <View style={styles.confirmacao}>
                <Text style={styles.titulomodal}>Confirmar Código</Text>
                <Text style={styles.detalhe}>Foi enviado um código de verificação para seu número de telefone</Text>

                <CodeInput 
                    secureTextEntry
                    activeColor="#cd090b"
                    inactiveColor="#cd090b"
                    autoFocus = {false}
                    inputPosition= "center"
                    size={40}
                    containerStyle={{marginTop: 30}}
                    codeInputStyle={{borderWidth: 1.5}}
                    codeLength={6}
                    onFulfill ={
                        (code) =>{
                            confirmarCodigo(verificationid, code)
                        }
                    }
                />
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    sair:{
        backgroundColor: '#cd090b'
    },
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
    },
    confirmacao:{
        height: 200,
        width: '100%',
        alignItems: 'center'
    },
    titulomodal:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    detalhe:{
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center'
    }
})