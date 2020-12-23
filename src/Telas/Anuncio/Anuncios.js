import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import {Icon, Avatar, Image, Rating, Badge } from 'react-native-elements'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {size} from 'lodash'
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
            console.log(await ListarAnuncios())
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
                </KeyboardAwareScrollView>
            </View>
            <Text>Tela de  anuncios</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})