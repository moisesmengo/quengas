import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, Image } from 'react-native'
import {Button, colors, Icon} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {isEmpty, matchesProperty} from 'lodash'
import CountryPicker from 'react-native-country-picker-modal'


export default function EnviarConfirmacao(){

    const [country, setCountry] = useState("BR")
    const [callingCode, setCallingCode] = useState("55")
    const [phone, setPhone] = useState("")

    return(
        <View style={styles.container}>
            <Image 
                source={require("../../../assets/logo.png")}
                style={styles.imglogo}
            />
            <View style={styles.painel}>
                <View 
                    style={{
                        borderBottomColor: '#ce615e',
                        borderBottomWidth: 2,
                        width: 100
                    }}
                />    

                <View style={styles.painelinterno}>
                    <Icon 
                        name="whatsapp"
                        type="material-community"
                        size={100}
                        color="#25d366"
                    />

                    <Text style={styles.titulo}>Por favor Insira seu número de WhatsApp</Text>
                    <View style={styles.telefone}>
                        <CountryPicker  
                            withFlag
                            withCallingCode
                            withFilter
                            withCallingCodeButton
                            countryCode={country}
                            onSelect={(Country) => {
                                setCountry(Country.cca2)
                                setCallingCode(...Country.callingCode)
                            }}
                        />

                        <Text style={{color: '#e8e3d4'}}> | </Text>
                        <TextInput
                            placeholder="Número de Whatsapp"
                            style={styles.input}
                            placeholderTextColor="#e8e3d4"
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />

                    </View>

                    <Button
                        title="Confirmar Número"
                        buttonStyle={{
                            backgroundColor: "#cd090b",
                            marginHorizontal: 20,
                        }}
                        containerStyle={{marginVertical: 20}}
                    />

                </View>
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#cd090b',
    },
    imglogo:{
        width: 106,
        height: 106,
        alignSelf: 'center',
        marginVertical: 40
    },
    painel:{
        flex: 1,
        backgroundColor: '#e8e3d4',
        paddingTop: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: 'center',
    },
    painelinterno:{
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 20
    },
    titulo:{
        fontSize: 16,
        textAlign: 'center',
        color: '#0b070b',
        fontWeight: 'bold'
    },
    telefone:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(205, 9, 11, 0.5)'
    },
    input:{
        width: '80%',
        height: 50,
       marginLeft: 5
    }
})