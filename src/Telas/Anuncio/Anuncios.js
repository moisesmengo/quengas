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
    const [setMensagens, setSetMensagens] = useState("Carregando...")
    const [notificacoes, setNotificacoes] = useState(0)

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
                <Text> {setMensagens} </Text>
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
        rating,
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
            <Text style={styles.quenga}>Quenga</Text>
            <View style={styles.avatarbox}>
                <Avatar source={ photoURL ? {uri: photoURL} :require("../../../assets/avatar.png")} 
                    rounded
                    size="large"
                    style={styles.avatar}
                />
                <Text style={styles.dnome}>{displayName}</Text>
            </View>
            <Rating 
                imageSize={15}
                startingValue={rating}
                style={{paddingLeft: 40, marginTop: 5}}
                readonly
            />
            <Text style={styles.preco}>{preco.toFixed(2)}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
})