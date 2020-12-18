import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function ShopButton(){
    const navigation = useNavigation()

    return(
        <TouchableHighlight style={styles.container}
            onPress={()=> {
                navigation.navigate('meus-anuncios')
            }}
        >
            <Icon name="store" color="#e8e3d4" size={30}></Icon>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ce615e',
        alignItems: 'center',
        justifyContent: 'center',
        width: 72,
        height: 72,
        borderRadius: 36,
        top: -15,
        shadowRadius: 5,
        shadowOffset: {height: 10},
        shadowOpacity: 0.3,
        borderWidth: 2,
        borderColor: '#e8e3d4',
        padding: 20
    }
})