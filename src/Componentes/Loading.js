import React from 'react'
import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native'
import {Overlay} from 'react-native-elements'

export default function Loading(props){
    const {isVisible} = props

    return (
        <Overlay 
            isVisible = {isVisible}
            overlayStyle= {styles.overlay}
        >
             <View style={styles.spinner}>
                <ActivityIndicator size={60} color="#ce615e" />
             </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth:1,
        borderColor: '#cd090b',
        borderRadius: 20,
        width:'90%',
        height: Dimensions.get('window').height / 2
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})