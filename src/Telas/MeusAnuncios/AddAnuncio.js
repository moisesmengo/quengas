import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import {Input, Image, Button, Icon, Avatar, AirbnbRating} from 'react-native-elements'
import {map, size, filter, isEmpty} from 'lodash'
import {useNavigation} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../Componentes/Loading'
import {carregarImagens} from '../../Utils/Utils'
import {SubirImagensBatch, addRegistro, addAnuncioFirebase, ObterUsuario} from '../../Utils/Acoes'


export default function AddAnuncio(){

    const [titulo, setTitulo] = useState("")
    const [description, setDescription] = useState("")
    const [preco, setPreco] = useState(0.00)
    const [imagens, setImagens] = useState([])
    const [categoria, setCategoria] = useState("")
    const [errors, setErros] = useState(5)
    const [rating, setRating] = useState([])
    const [loading, setLoading] = useState(false)

    const btnref = useRef()
    const navigation = useNavigation()

    const addAnuncio = async () =>{
        setErros({})
        if(isEmpty(titulo)){
            setErros({titulo: "O campo de título é obrigatório"})
        }else if (isEmpty(description)){
            setErros({description: "O campo de descrição é obrigatório"})
        }else if (!parseFloat(preco) > 0){
            setErros({preco: "O anúncio deve ter um preço"})
        }else if (isEmpty(categoria)){
            Alert.alert("Selecionar Categoria","Por favor selecione uma categoria para o anúncio", [
                {style: "cancel", text: 'Entendi'}
            ])
        }else if (isEmpty(imagens)){
            Alert.alert("Selecionar Imagens","Por favor selecione uma imagem para o anúncio", [
                {style: "cancel", text: 'Entendi'}
            ])
        }else{
            setLoading(true)
            const urlImagens = await SubirImagensBatch(imagens, "ImagensAnuncios")
            const anuncio = {
                titulo,
                description,
                preco,
                usuario: ObterUsuario().uid,
                imagens: urlImagens,
                status:1,
                datacriacao : new Date(),
                categoria,
            }

            const registrarAnuncio = await addAnuncioFirebase("Anuncios", anuncio)

            if(registrarAnuncio.statusresponse){
                setLoading(false)
                Alert.alert("Anúncio registrado", 
                "O anúncio foi registrado corretamente",
                [{
                    style: 'cancel',
                    text: 'Aceitar',
                    onPress: () => navigation.navigate("meus-anuncios")
                }]
                )
            } else {
                setLoading(false)
                Alert.alert("Falha no registro", 
                "Ocorreu um erro ao registrar o anúncio",
                [{
                    style: 'cancel',
                    text: 'Aceitar',
                }]
                )
            }
        }
    }

    return(
        <KeyboardAwareScrollView style={styles.container}>
            <View
                style={{
                    borderBottomColor: '#ce615e',
                    borderBottomWidth: 2,
                    width:100,
                    marginTop: 20,
                    alignSelf: 'center'
                }}
            />
            <Input 
                placeholder="Título"
                onChangeText={(text) => setTitulo(text)}
                inputStyle={styles.input}
                errorMessage={errors.titulo}
            />
             <Input 
                placeholder="Descrição"
                onChangeText={(text) => setDescription(text)}
                inputStyle={styles.textarea}
                errorMessage={errors.description}
                multiline={true}
            />
             <Input 
                placeholder="Preço"
                onChangeText={(text) => setPreco(parseFloat(text))}
                inputStyle={styles.input}
                errorMessage={errors.preco}
                keyboardType='number-pad'
            />

            <Text style={styles.textlabel}>Qualidade do serviço</Text>
            <AirbnbRating count={5}
                reviews={["Péssimo", "Ruim", "Normal", "Bom", "Excelente"]}
                defaultRating={5}
                size={35}
                onFinishRating={(value) => {
                    setRating(value)
                }}
            />
            <View>
                <Text style={styles.textlabel}>Adcionar imagens</Text>
                <SubirImagens imagens={imagens} setImagens={setImagens} />
                <Text style={styles.textlabel}>Adcionar categoria</Text>
                <ListaCat categoria={categoria} setCategoria={setCategoria} />
            </View>
            <Button 
                title="Adcionar novo anúncio"
                buttonStyle={styles.button}
                ref={btnref}
                onPress={addAnuncio}
            />

            <Loading isVisible={Loading} />

        </KeyboardAwareScrollView>
    )
}

function SubirImagens(props){
    const {imagens, setImagens} = props

    const removerImagem = (img) =>{
        Alert.alert("Remover imagem!", "Deseja mesmo remover a imagem?",
        [{
            text: 'cancelar',
            style: 'cancel'
        },{
            text: 'Excluir', 
            onPress: () =>{
                setImagens(filter(imagens, (imagemURL)=> imagemURL !== img))
            }
        }])
    }

    return(
        <ScrollView style={styles.viewimagens} horizontal={true}>
            {
                size(imagens) < 5 && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#a7837d"
                        containerStyle={styles.containerIcon}
                        onPress={async() =>{
                            const resultado = await carregarImagens([1,1])
                            if(resultado.status){
                                setImagens([...imagens, resultado.imagem])
                            }
                        }}
                    />
                )
            }

            {map(imagens, (imagem, index) =>(
                <Avatar key={index} 
                    style={styles.miniatura}
                    source={{uri: imagem}}
                    onPress={()=>{
                        removerImagem(imagem)
                    }}
                />
            ))}
        </ScrollView>
    )
}

function ListaCat (props){
    const {categoria, setCategoria} = props
    return(
        <View style={styles.botoes}>
            <TouchableOpacity
                style={styles.btncategoria}
                onPress={()=>{
                    setCategoria('loiras')
                }}
            >
                <Icon  
                    type="material-community"
                    size={24}
                    name="face"
                    color={categoria === 'loiras' ? "#cd090b" : "#ce615e"}
                    reverse
                />
                <Text>Loiras</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btncategoria}
                onPress={()=>{
                    setCategoria('morenas')
                }}
            >
                <Icon  
                    type="material-community"
                    size={24}
                    name="face"
                    color={categoria === 'morenas' ? "#cd090b" : "#ce615e"}
                    reverse
                />
                <Text>Morenas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btncategoria}
                onPress={()=>{
                    setCategoria('traveco')
                }}
            >
                <Icon  
                    type="material-community"
                    size={24}
                    name="face"
                    color={categoria === 'traveco' ? "#cd090b" : "#ce615e"}
                    reverse
                />
                <Text>Travestis</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btncategoria}
                onPress={()=>{
                    setCategoria('outras')
                }}
            >
                <Icon  
                    type="material-community"
                    size={24}
                    name="face"
                    color={categoria === 'outras' ? "#cd090b" : "#ce615e"}
                    reverse
                />
                <Text>Outras</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e8e3d4',
        borderRadius: 50,
        margin: 10,
        padding: 10,
        elevation: 3
    },
    input:{
        width: '90%',
        borderRadius:10,
        borderBottomColor: '#a7837d',
        marginTop: 10,
        paddingHorizontal: 20,
        height:60
    },
    textarea:{
        height:120
    },
    textlabel:{
        fontSize: 20,
        fontFamily:'Roboto',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0b070b'
    },
    button:{
        backgroundColor: '#5c2a2d',
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal: 20
    },
    viewimagens:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10, 
        height: 150,
        width: 100,
        backgroundColor: '#d1c4b0',
        padding: 10
    },
    miniatura:{
        width: 100,
        height: 150,
        marginRight: 10
    },
    botoes:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btncategoria:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})