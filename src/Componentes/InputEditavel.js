import React, {useRef} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {Icon} from 'react-native-elements'

export default function InputEditavel(props) {

    const {label, placeholder, onChangeInput, obterValor, id, editavel, setEditavel} = props

    const editar = ()=>{
        setEditavel(!editavel)
    }

    return (
        <View style={styles.input}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.row}>
                <TextInput 
                    style={styles.textimputinterna} 
                    key={id}
                    placeholder={placeholder}
                    value={obterValor(id)}
                    onChangeText={(text)=>{
                        onChangeInput(id, text)
                    }}
                />
                { editavel ? 
                    ( <Icon 
                        name="content-save" 
                        type="material-community" 
                        size={24} 
                        onPress={editar} 
                        style={styles.icon}
                    />) :  ( <Icon 
                        name="pencil" 
                        type="material-community" 
                        size={24} 
                        onPress={editar} 
                        style={styles.icon}
                    />)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    label:{
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0b070b',
        fontSize: 16
    },
    textimputinterna:{
        fontSize: 20,
        width: '80%'
    },
    input:{
        borderBottomColor: '#d1c4b0',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10
    }
})