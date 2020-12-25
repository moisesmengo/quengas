import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native'
import {Avatar, Icon, Input, Button, Image} from 'react-native-elements'
import {addRegistro, obterRegistroID, ObterUsuario, 
        sendPushNotification, setMensagemNotificacao} from '../../Utils/Acoes'
import {size, map} from 'lodash'
import {enviarWhatsapp} from '../../Utils/Utils'
import Loading from '../../Componentes/Loading'
import Modal from '../../Componentes/Modal'


export default function Detalhe(props){
    const {route} = props
    const {id, titulo} = route.params

    const [anuncio, setAnuncio] = useState({})
    const [expoPushToken, setExpoPushToken] = useState("")
    const [nomeVendendor, setNomeVendendor] = useState("Nome")
    const [photoVendedor, setPhotoVendedor] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [imagens, setImagens] = useState([])
    const [mensagem, setMensagem] = useState("")
    const [activeSlide, setActiveSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsvisible] = useState(false)

    const usuarioAtual = ObterUsuario()

    useEffect(()=>{
        (async ()=>{
            setAnuncio((await obterRegistroID("Anuncios", id)).data)
            setImagens(anuncio.imagens)
        })()
    }, [])

    useEffect(()=>{
        (async ()=>{
            if(size(anuncio) > 0){
                const resultado = (await obterRegistroID("Usuario", anuncio.usuario)).data

                setExpoPushToken(resultado.token)
                setNomeVendendor(resultado.displayName)
                setPhotoVendedor(resultado.photoURL)
                setPhoneNumber(resultado.phoneNumber)
            }
        })()
    },[anuncio])

    if(anuncio.lenght !== 0){
        return(
            <ScrollView style={styles.container}> 

                <ScrollView horizontal={true} style={{
                    width: 400,
                    height: 220,
                    flexDirection: 'row',
                    backgroundColor: '#cd090b',
                }}>
                    {
                        map(anuncio.imagens, (img, index) =>(
                            <Image key={index} 
                                source={{uri: img}}
                                style={styles.imganuncio}
                            />
                        ))
                    }
                </ScrollView>
                
                <View style={styles.boxsuperior}>
                    <View style={{
                        borderBottomColor: '#ce615e',
                        borderBottomWidth: 2,
                        width: 100,
                        alignSelf: 'center'
                    }}/>
                        
                    <Text style={styles.titulo}>{anuncio.titulo}</Text>
                    <Text style={styles.preco}>{parseFloat(anuncio.preco).toFixed(2)}</Text>


                    <View>
                        <Text style={styles.description}> {anuncio.description} </Text>
                    </View>

                    <Text style={styles.titulo}>Entrar em contato com a prostituta</Text>
                    <View  style={styles.avatarbox}>
                        <Avatar 
                            source={photoVendedor ? {uri: photoVendedor } : 
                                require("../../../assets/avatar.png")
                            }
                            style={styles.avatar}
                            rounded
                            size='large'
                        />
                       
                        <View>
                            <Text style={styles.displayname}>{nomeVendendor ? nomeVendendor : "Anônimo"}</Text>
                            <View style={styles.boxinternoavatar}>
                                <Icon 
                                    type="material-community"
                                    name="message-text-outline"
                                    color="#25d366"
                                    size={40}
                                    onPress = {()=>{
                                        setIsvisible(true)
                                    }}
                                /><Icon 
                                type="material-community"
                                name="whatsapp"
                                color="#25d366"
                                size={40}
                                onPress = {()=>{
                                    const mensagemWhatssapp = `Olá ${nomeVendendor},
                                        meu nome é ${usuarioAtual.displayName}. Vi seu
                                        anúncio ${anuncio.titulo} que está no Quenga's
                                        `
                                    enviarWhatsapp(phoneNumber, mensagem)
                                }}
                            />
                            </View>
                        </View>
                    </View>
                    <EnviarMensagem
                        isVisible={isVisible}
                        setIsvisible={setIsvisible}
                        nomeVendendor={nomeVendendor}
                        avatarVendedor={photoVendedor}
                        mensagem={mensagem}
                        setMensagem={setMensagem}
                        receiver={anuncio.usuario}
                        sender={usuarioAtual.uid}
                        token={expoPushToken}
                        anuncio={anuncio}
                        setLoading={setLoading}
                        nomeCliente={usuarioAtual.displayName}
                    />

                    <Loading isVisible={loading} />
                </View>

            </ScrollView>
        )
    }
}

function EnviarMensagem(props){
    const {isVisible, setIsvisible, nomeVendendor, avatarVendedor,
         mensagem, setMensagem, receiver, sender, token, anuncio, setLoading,
         nomeCliente
        } = props

    const enviarNotificacao = async () =>{
       if(!mensagem){
           Alert.alert("Validação", "Por favor preencha o campo de mensagem",  
           [{
            style:"default",
            text:"Entendi"
           }]
           )
       }else{
           setLoading(true)
           const notificacao = {
               sender: sender,
               receiver: receiver,
               mensagem,
               dataDeCriacao : new Date(),
               anuncioId: anuncio.id,
               anucioTitulo: anuncio.titulo,
               visto: 0
           }

           const resultado = await addRegistro("Notificacoes", notificacao)

           if(resultado.statusresponse){
               const mensagemNotification = setMensagemNotificacao(
                   token, 
                   `Cliente Interessado - ${anuncio.titulo}`,
                   `${nomeCliente}, te enviou uma mensagem`,
                   {data: "Interessado!"}
                )

                const resposta = await sendPushNotification(mensagemNotification)
                setLoading(false)

                if(resposta){
                    Alert.alert("Mensage Enviada", "Foi enviada uma mensagem para a dona do anúncio", [{
                        style: 'cancel',
                        text: 'Entendi',
                        onPress: ()=> setIsvisible(false),
                    }])
                    setMensagem("")
                } else{
                    Alert.alert("Erro", "Erro ao enviar a mensagem", [{
                        style: 'cancel',
                        text: 'Entendi'
                    }])
                    setLoading(false)
                }
           }
       }
    }

    return(
        <Modal
            isVisible={isVisible}
            setIsvisible={setIsvisible}
        >
            <View 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 16,
                    borderRadius: 20
                }}
            >

                <Avatar 
                    source={avatarVendedor ? {uri:avatarVendedor} : require("../../../assets/avatar.png")}
                    style={styles.photovend}
                />

                <Text style={{
                    color: '#0b070b',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Enviar mensagem para {nomeVendendor}</Text>

                <Input placeholder="Escreva sua mensagem" 
                    multiline={true} style={styles.textarea}
                    onChangeText={(text)=>{
                        setMensagem(text)
                    }}
                    value={mensagem}
                />

                <Button 
                    title="Enviar Mensagem"
                    buttonStyle={styles.btnmensagem}
                    containerStyle={{width: '90%'}}
                    onPress={enviarNotificacao}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    btnmensagem:{
        backgroundColor: '#5c2a2d'
    },
    textarea:{
        height: 150
    },
    photovend:{
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    boxsuperior: {
        backgroundColor: '#e8e3d4',
        marginTop: -50,
        paddingTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center'
    }, 
    container:{
        backgroundColor: '#e8e3d4',
        flex: 1,
    },
    titulo:{
        color: "#0b070b",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    },
    preco:{
        fontSize: 18,
        color: '#5c2a2d',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    description:{
        fontWeight: '300',
        fontSize: 16,
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
        color: '#a7837d',
        textAlign: 'center'
    },
    avatarbox:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        flex: 1
    },
    avatar:{
        width: 60,
        height: 60
    },
    boxinternoavatar:{
        justifyContent: 'center',
        flexDirection: 'row'
    },
    displayname:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0b070b'
    },
    imganuncio:{
        width: 100,
        height: 150,
        borderRadius: 0,
        marginHorizontal: 10,
        marginVertical: 10
    },
})