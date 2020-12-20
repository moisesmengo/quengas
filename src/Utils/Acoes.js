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