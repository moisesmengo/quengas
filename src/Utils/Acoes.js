import firebaseapp from './Firebase'
import * as firebase from 'firebase';

export const validarSesssao = () =>{
    firebase.auth().onAuthStateChanged((user)=>{
        if (user){
            console.log("usuario logado")
        }else{
            console.log("sessão falhou")
        }
    })
}

export const encerrarSessao = () =>{
    firebase.auth().signOut()
}