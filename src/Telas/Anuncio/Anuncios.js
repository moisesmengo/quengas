import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import {Icon, Avatar, Image, Rating, Badge } from 'react-native-elements'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {size} from 'lodash'
import Busca from '../../Componentes/Busca'
import {ListarAnuncios, ObterUsuario} from '../../Utils/Acoes'

export default function Anuncios(){

    const navigation = useNavigation()
    const [anuncioList, setAnuncioList] = useState([])
    const [search, setSearch] = useState("")
    const [mensagem, setMensagens] = useState("Carregando...")
    const [notificacoes, setNotificacoes] = useState(0)
    const [categoria, setCategoria] = useState("")

    const {photoURL} = ObterUsuario()

    useEffect(()=>{
        (async () =>{
            setAnuncioList(await ListarAnuncios())
        })()
    }, [])

    return(
        <View style={styles.frame}>
            <StatusBar backgroundColor="#cd090b" />
            <View style={styles.header}>
                <KeyboardAwareScrollView>
                    <View style={styles.menu}>
                        <Avatar 
                            rounded
                            size="medium"
                            source={photoURL ? {uri: photoURL} : require("../../../assets/avatar.png")}
                        />

                        <Image 
                            source={require('../../../assets/logo.png')}
                            style={styles.logo}
                        />

                        <View>
                            <Icon
                                type="material-community"
                                name="bell-outline"
                                color="#e8e3d4"
                                size={30}
                            />
                            <Badge 
                                status="error"
                                containerStyle={{position: 'absolute', top:-4, right: -4}}
                                value={2}
                            />
                        </View>
                    </View>
                    <Busca />
                </KeyboardAwareScrollView>
            </View>
            <View style={styles.categoria}>
                <View style={styles.titulocategoria}>
                    <Text style={styles.textcategoria}> - CATEGORIAS - </Text>
                </View>
                <View style={styles.catlist}>
                    <BotaoCategoria 
                        categoriabotao="loiras"
                        categoria={categoria}
                        icon="face"
                        texto="Loiras"
                        setCategoria={setCategoria}
                    />
                    <BotaoCategoria 
                        categoriabotao="morenas"
                        categoria={categoria}
                        icon="face"
                        texto="Morenas"
                        setCategoria={setCategoria}
                    />
                    <BotaoCategoria 
                        categoriabotao="travestis"
                        categoria={categoria}
                        icon="face"
                        texto="Travestís"
                        setCategoria={setCategoria}
                    />
                    <BotaoCategoria 
                        categoriabotao="outras"
                        categoria={categoria}
                        icon="face"
                        texto="Outras"
                        setCategoria={setCategoria}
                    />
                </View>
            </View>

            {size(anuncioList) > 0 ? (
                <FlatList 
                    data={anuncioList}
                    renderItem = {(anuncio) => (
                        <Anuncio
                            anuncio={anuncio} navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index)=>{
                        index.toString()
                    }}
                />
            ):(
                <Text> {mensagem} </Text>
            )}
        </View>
    )
}

function Anuncio(props){

    const {anuncio, navigation} = props
    const {
        titulo,
        description,
        imagens,
        preco,
        id,
        usuario
    } = anuncio.item

    const {displayName, photoURL} = usuario
    
    return(
        <TouchableOpacity style={styles.card}
            onPress={()=>{navigation.navigate("detalhe", {id, titulo})}}
        >
        <Image 
            source={{uri: imagens[0]}}
            style={styles.imganuncio}
        />
        <View style={styles.infobox}>
            <Text style={styles.tiutlo}>{titulo}</Text>
            <Text style={styles.desc}>{description.substring(0,50)}</Text>
            <Text style={styles.quenga}>Usuário</Text>
            <View style={styles.avatarbox}>
                <Avatar source={ photoURL ? {uri: photoURL} :require("../../../assets/avatar.png")} 
                    rounded
                    size="large"
                    style={styles.avatar}
                />
                <Text style={styles.dnome}>{displayName}</Text>
            </View>
           
            <Text style={styles.preco}>{preco.toFixed(2)}</Text>
        </View>
        </TouchableOpacity>
    )
}

function BotaoCategoria(props){
    const {categoriabotao, categoria, icon, texto, setCategoria} = props

    return(
        <TouchableOpacity
            style={categoria===categoriabotao ? styles.categoriahover : styles.categoriabtn}
            onPress={()=>{
                setCategoria(categoriabotao)
            }}
        >
            <Icon 
                type="material-community" 
                name={icon} size={30} 
                color={categoria===categoriabotao ? "#e8e3d4" : "#cd090b"} 
            />
            <Text style={categoria===categoriabotao ? styles.catxhover : styles.catx}>
                {texto}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    titulocategoria:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textcategoria:{
        color:"#0b070b",
        fontSize: 14,
        fontWeight: 'bold'
    },
    categoria:{
        marginTop: 10,
    },
    catxhover:{
        fontSize: 12,
        fontStyle: 'italic',
        color: '#e8e3d4'
    },
    catx:{
        fontSize: 12,
        fontStyle: 'italic',
        color: '#cd090b'
    },
    categoriahover:{
        width: 80,
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset:{width:7.0, height:-8.0},
        shadowOpacity: 0.5,
        shadowColor: "#000",
        backgroundColor: "#cd090b",
        borderRadius: 40,
        elevation: 1
    },
    categoriabtn:{
        width: 80,
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset:{width:7.0, height:-8.0},
        shadowOpacity: 0.5,
        shadowColor: "#000",
        backgroundColor: "#e8e3d4",
        borderRadius: 40,
        elevation: 1
    },
    preco:{
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#cd090b',
        alignSelf: 'center',
    },
    avatar:{
        height: 30,
        width: 30,
        backgroundColor: '#d4d4d4',
        borderRadius: 20
    },
    frame:{
        flex:1,
        backgroundColor: '#e8e3d4'
    },
    header:{
        height: '20%',
        width: '100%',
        backgroundColor: '#cd090b'
    },
    menu:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logo:{
        width: 50, height: 50
    },
    card:{
        width:'100%',
        paddingVertical: 20,
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderBottomColor: '#ce615e',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imganuncio:{
        width: 150,
        height: 200,
        borderRadius: 10
    },
    infobox:{
        paddingLeft: 10,
        alignItems: 'center',
        flex: 1
    },
    tiutlo:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#0b070b'
    },
    quenga:{
        fontSize: 16,
        marginTop: 5,
        color: '#5c2a2d',
        fontWeight: '700'
    },
    avatarbox:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    dnome:{
        marginLeft: 5
    },
    catlist:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: 5
    }
})