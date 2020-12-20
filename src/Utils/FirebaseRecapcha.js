import React from 'react'
import {Text, View} from 'react-native'

import Constants from "expo-constants"

import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'

export default function FirebaseRecapcha(props){

    const {referencia} = props

    return (
        <FirebaseRecaptchaVerifierModal 
            ref={referencia}
            title="CONFIRME QUE NÃO É UM ROBÔ"
            cancelLabel="X"
            firebaseConfig = {Constants.manifest.extra.firebase}
        />
    )
}