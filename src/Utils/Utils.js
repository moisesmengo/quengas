export const validarEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(reg.test(text) === false){
        return false
    }else{
        return true
    }
}