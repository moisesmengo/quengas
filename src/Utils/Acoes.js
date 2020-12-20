import firebaseapp from './Firebase'
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

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

export const validarPhone = (setPhoneAuth) =>{
    firebase.auth().onAuthStateChanged((user)=>{
        if (user.phoneNumber){
            setPhoneAuth(true)
        }
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