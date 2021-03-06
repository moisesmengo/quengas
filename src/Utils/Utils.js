import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Alert, Linking} from 'react-native'
import { size } from 'lodash'

export const validarEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(reg.test(text) === false){
        return false
    }else{
        return true
    }
}

export const carregarImagens = async (array) =>{
    let imgResponse = {status: false, imagem: ""}
    const resultPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    const cameraPermission = resultPermissions.permissions.mediaLibrary.status

    if (cameraPermission === "denied"){
        alert("Você deve permitir o acesso para carregar as imagens")
    }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: array
        })

        if(!result.cancelled){
            imgResponse = {status: true, imagem: result.uri}
        }
    }

    return imgResponse
}

export const converterImagemBlob = async (rota) =>{
    const arquivo = await fetch(rota)
    const blob = await arquivo.blob()
    return blob
}

export const enviarWhatsapp = (numero, text) =>{
    let link = `whatsapp://send?phone=${numero.substring(1, size(numero))}&text=${text}`
    console.log(link)

    Linking.openURL(link)
    .then((supported)=>{
        if(!supported){
            Alert.alert("Por favor instale o whatsapp para enviar a mensagem")
        }else{
            return Linking.openURL(link)
        }
    })
}