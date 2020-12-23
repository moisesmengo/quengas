import React, {useCallback, useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native'
import {Icon} from 'react-native-elements'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {ListarMeusAnuncios, eliminarAnuncio} from '../../Utils/Acoes'

export default function MeusAnuncios(){
    const navigation = useNavigation()
    const [anuncios, setAnuncios] = useState({})

    useEffect(()=>{
        (
            async () =>{
                setAnuncios(await ListarMeusAnuncios())
            }
        )()
    },[])

    useFocusEffect(
        useCallback(()=>{
            (
                async () =>{
                    setAnuncios(await ListarMeusAnuncios())
                }
            )()
        }, [])
    )

    return(
        <View style={{flex:1, justifyContent: 'center'}}>

            {
                anuncios.length > 0 ? (
                    <FlatList 
                        data = {anuncios}
                        renderItem={(item)=>(
                            <Anuncio 
                                anuncio = {item}
                                setAnuncios={setAnuncios}
                                navigation={navigation}
                            />
                        )}
                    />
                ) : (
                    <View style={{alignSelf: 'center'}}>
                        <View style={{
                            width: 120,
                            height: 120,
                            borderColor: '#ce615e',
                            borderWidth: 1,
                            borderRadius: 60,
                            alignSelf: 'center'
                        }}>
                        <Icon 
                            type="material-community"
                            size={100}
                            color= "#cd090b"
                            name="cart-plus"
                            style={{margin: 10}}
                        />
                        </View>
                    </View>
                )
            }

            <Icon 
                name="plus"
                type="material-community"
                color="#cd090b"
                containerStyle={styles.btncontainer}
                onPress={()=>{
                    navigation.navigate("add-anuncio")
                }}
                reverse
            />
        </View>
    )
}

const Anuncio = (props) =>{
    const {anuncio, setAnuncios, navigation} = props

    const {description, preco, id, imagens, titulo} = anuncio.item

    return(
        <View style={styles.container}>
            <Image 
                source={{uri : imagens[0]}}
                style={{width: 150, height: 150, borderRadius:10, marginLeft:10}}
                resizeMethod="resize"
            />
            <View style={styles.viewmeio}>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.descrip}>
                    {description.length > 20 ? description.substring(0,20) : description}...
                </Text>
                <Text style={styles.preco}>R$ {parseFloat(preco).toFixed(2)}</Text>

                <View  style={styles.iconbar}>
                    
                    <View style={styles.iconedit}>
                        <Icon 
                            style={styles.iconedit}
                            type="material-community"
                            name="pencil-outline"
                            color="#ffa000"
                            onPress={()=>{
                                navigation.navigate("editar-anuncio", {id})
                                
                            }}
                        />
                    </View>
                    <View style={styles.icondelet}>
                        <Icon 
                            style={styles.icondelet}
                            type="material-community"
                            name="trash-can-outline"
                            color="#d32f2f"
                            onPress={async ()=>{
                            Alert.alert("Remover anúncio", 
                            "Deseja eliminar o anúncio?", [{
                                style: "default",
                                text: 'Confirmar', 
                                onPress: async()=>{
                                    await eliminarAnuncio("Anuncios", id)
                                    setAnuncios(await ListarMeusAnuncios())
                                }
                            },{
                                style: 'default',
                                text: 'Sair'
                            } ])                               
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btncontainer:{
        position: 'absolute',
        bottom: 10, 
        right: 10,
        shadowColor: '#000',
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.2
    },
    container:{
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cd090b',
        shadowColor: '#cd090b',
        shadowOffset: {height: 10},
        shadowOpacity: 0.9
    },
    viewmeio:{
        flex: 1,
        marginRight: 10,
        justifyContent:"center",
        alignItems: 'center'
    },
    titulo:{
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: "center",
        color: '#0b070b'
    },
    descrip:{
        fontSize: 16,
        color: '#a7837d'
    },
    preco:{
        fontSize: 16,
        color: '#5c2a2d'
    },
    iconbar:{
        marginTop: 20,
        flexDirection: 'row'
    },
    icon:{
        borderWidth: 1,
        borderColor: '#25d366',
        padding: 5,
        borderRadius: 60,
        marginLeft: 20
    },
    iconedit:{
        borderWidth: 1,
        borderColor: '#ffa000',
        padding: 5,
        borderRadius: 50,
        marginLeft: 20
    },
    icondelet:{
        borderWidth: 1,
        borderColor: '#d32f2f',
        padding: 5,
        borderRadius: 50,
        marginLeft: 20
    }
})