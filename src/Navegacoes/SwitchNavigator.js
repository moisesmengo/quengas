import React, {useState, useEffect} from 'react'
import Loading from '../Componentes/Loading'
import RotasAutenticadas from './RotasAutenticadas'
import ContaStack from './ContaStack'
import {validarPhone} from '../Utils/Acoes'

export default function SwitchNavigator(){
    const [phoneAuth, setPhoneAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        validarPhone(setPhoneAuth)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    if(loading){
        return <Loading isVisible={loading} />
    }else{
        return phoneAuth ? <RotasAutenticadas /> : <ContaStack/>
    }
}