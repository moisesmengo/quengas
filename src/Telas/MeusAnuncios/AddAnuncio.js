import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import {Input, Image, Button, Icon, Avatar} from 'react-native-elements'
import {map, size, filter, isEmpty} from 'lodash'
import {useNavigation} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../Componentes/Loading'


export default function AddAnuncio(){

    const [titulo, setTitulo] = useState("")
    const [description, setDescription] = useState("")
    const [preco, setPreco] = useState(0.00)
    const [imagens, setImagens] = useState([])
    const [categoria, setCategoria] = useState("")
    const [errors, setErros] = useState([])

    const btnref = useRef()
    const navigation = useNavigation()

    return(
        <KeyboardAwareScrollView style={styles.container}>
            <View
                style={{
                    borderBottomColor: '#ce615e',
                    borderBottomWidth: 2,
                    width:100,
                    marginTop: 20,
                    alignSelf: 'center'
                }}
            />
            <Input 
                placeholder="Título"
                onChangeText={(text) => setTitulo(text)}
                inputStyle={styles.input}
                errorMessage={errors.titulo}
            />
             <Input 
                placeholder="Descrição"
                onChangeText={(text) => setDescription(text)}
                inputStyle={styles.input}
                errorMessage={errors.description}
            />
             <Input 
                placeholder="Preço"
                onChangeText={(text) => setPreco(text)}
                inputStyle={styles.input}
                errorMessage={errors.preco}
            />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e8e3d4',
        borderRadius: 50,
        margin: 5,
        padding: 5,
        elevation: 3
    },
    input:{
        width: '90%',
        borderRadius:10,
        borderBottomColor: '#a7837d',
        marginTop: 20,
        paddingHorizontal: 20,
        height:50
    }
})