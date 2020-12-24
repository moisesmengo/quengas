import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import {Avatar, Icon, Input, Button, Image} from 'react-native-elements'
import {obterRegistroID, ObterUsuario} from '../../Utils/Acoes'
import {size, map} from 'lodash'
import Loading from '../../Componentes/Loading'
export default function Detalhe(props){
    const {route} = props
    const {id, titulo} = route.params

    const [anuncio, setAnuncio] = useState({})
    const [expoPushToken, setExpoPushToken] = useState("")
    const [nomeVendendor, setNomeVendendor] = useState("Nome")
    const [photoVendedor, setPhotoVendedor] = useState("")
    const [phoneVendedor, setPhoneVendedor] = useState("")
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
                setPhoneVendedor(resultado.phoneNumber)
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
                    backgroundColor: '#ce615e',
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
                        borderBottomColor: '#000',
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
                                        console.log("MSG")
                                    }}
                                /><Icon 
                                type="material-community"
                                name="whatsapp"
                                color="#25d366"
                                size={40}
                                onPress = {()=>{
                                    console.log("MSG")
                                }}
                            />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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