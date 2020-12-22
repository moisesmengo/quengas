import React, {useCallback, useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image } from 'react-native'
import {Icon} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {ListarMeusAnuncios} from '../../Utils/Acoes'

export default function MeusAnuncios(){
    const navigation = useNavigation()

    useEffect(()=>{
        (
            async () =>{
                console.log(await ListarMeusAnuncios())
            }
        )()
    },[])

    return(
        <View style={{flex:1, justifyContent: 'center'}}>
            <Text>Tela de meus anuncios</Text>
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

const styles = StyleSheet.create({
    btncontainer:{
        position: 'absolute',
        bottom: 10, 
        right: 10,
        shadowColor: '#000',
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.2
    }
})