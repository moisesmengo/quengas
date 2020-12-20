import firebaseapp from './Firebase'
import * as firebase from 'firebase';

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