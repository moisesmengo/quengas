import React, {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {SearchBar} from 'react-native-elements'

export default function Busca(){
    return(
        <SearchBar 
            placeholder="O que você procura?"
            containerStyle={{
                backgroundColor: 'transparent',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
            }}
            inputContainerStyle={{
                backgroundColor: '#e8e3d4',
                alignItems: 'center'
            }}
            inputStyle={{
                fontFamily: 'Roboto',
                fontSize: 20
            }}
        />
    )
}

const styles = StyleSheet.create({

})