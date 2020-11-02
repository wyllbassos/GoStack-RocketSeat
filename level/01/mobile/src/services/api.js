import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.102:3333'
    //baseURL: 'http://localhost:3333'
})

export default api

/**
 * Android com Emulador localhost
 *  Executar -> adb reverse tcp:3333 tcp:3333
 * 
 * Android com Emulador (android studio): (10.0.2.2)
 * 
 * Android com dispositivo fidico (ip do Computador)
 * 
 */