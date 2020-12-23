import React, {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {SearchBar} from 'react-native-elements'
import {Buscar} from '../Utils/Acoes'

export default function Busca( props ){
    const { 
        setAnuncioList,
        atualizarAnuncios,
        setSearch,
        search,
        setMensagens} = props

        useEffect(()=>{
            let resultados = []
            if (search){
                (async ()=>{
                    resultados = await Buscar(search)
                    setAnuncioList(resultados)
                    if(resultados.length ==0){
                        setMensagens("Não foram encontrados dados para a busca "+ search)
                    }
                })()
            }
        }, [search])

    return(
        <SearchBar 
            placeholder="O que você procura?"
            containerStyle={{
                backgroundColor: 'transparent',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
            }}
            inputContainerStyle={{
                backgroundColor: '#e8e3d4',
                alignItems: 'center'
            }}
            inputStyle={{
                fontFamily: 'Roboto',
                fontSize: 20
            }}
            onChangeText={text => setSearch(text)}
            value={search}
            onClear={()=>{
                setSearch("")
                setAnuncioList([])
                atualizarAnuncios()
            }}
        />
    )
}

const styles = StyleSheet.create({

})