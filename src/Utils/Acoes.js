import firebaseapp from './Firebase'
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Plataform} from 'react-native'
import "firebase/firestore"
import uuid from 'random-uuid-v4'
import {map} from 'lodash'
import {converterImagemBlob} from '../Utils/Utils'

const db = firebase.firestore(firebaseapp)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
})

export const validarSesssao = (setValidarSessao) =>{
    firebase.auth().onAuthStateChanged((user)=>{
        if (user){
            setValidarSessao(true)
        }else{
            setValidarSessao(false)
        }
    })
}

export const encerrarSessao = () =>{
    firebase.auth().signOut()
}

export const validarPhone = (setphoneauth) =>{
     db.collection("Usuario")
        .doc(ObterUsuario().uid)
        .onSnapshot(snapshot => {
            setphoneauth(snapshot.exists)
        })
    
}

export const confirmar = async (numero, recapcha) =>{
    let verificationid = ""

    await firebase
        .auth().currentUser.reauthenticateWithPhoneNumber(numero, recapcha.current)
        .then((response) =>{
            verificationid = response.verificationId
        }).catch(error => console.log(error))

    return verificationid
}

export const confirmarCodigo = async (verificationid, codigo) =>{
    let resultado =false
    const credenciais = firebase.auth.PhoneAuthProvider.credential(
        verificationid,
        codigo
    )

    await firebase.auth().currentUser.linkWithCredential(credenciais)
        .then(response => resultado = true)
        .catch(err => console.log(err))

    return resultado
}

export const obterToken =  async ()=> {
    let token = ""
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
}

export const ObterUsuario = () =>{
      return firebase.auth().currentUser
}

export const addRegistro = async (collec, doc, data) =>{

    const resultado = {
        error: "",
        statusresponse : false,
    }

    await db.collection(collec).doc(doc).set(data)
        .then(response => {
            resultado.statusresponse = true
        }).catch(err => {
            resultado.error = err
        })
}

export const SubirImagensBatch =  async (imagens, rota) =>{
    const imagensUrl = []
    await Promise.all(
        map(imagens, async(imagem)=>{
            const blob = await converterImagemBlob(imagem)
            const ref = firebase.storage().ref(rota).child(uuid())
    
            await ref.put(blob).then( async(result)=>{
                await firebase.storage().ref(`${rota}/${result.metadata.name}`)
                    .getDownloadURL().then((imagemUrl) =>{
                        imagensUrl.push(imagemUrl)
                    })
            })
        })
    )
    return imagensUrl
}