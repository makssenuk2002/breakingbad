import axios from "axios";
export const apiService ={
    getEpisodes,
    getCharacters,
    getOneCharacters,
    getQuoteByAuthor,
    getDeathByAuthor,
    getDeathInEpisode,
    getCharactersByName,
    getAllDeath
}
const path = 'https://www.breakingbadapi.com/api'
function  getEpisodes( ){
    return axios.get(
        `${path}/episodes`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}

function  getCharacters( ){
    return axios.get(
        `${path}/characters`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}

function  getOneCharacters(data){
    return axios.get(
        `${path}/characters/${data}`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}
function  getCharactersByName(data){
    return axios.get(
        `${path}/characters?name=${data}`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}
function  getQuoteByAuthor(data){
    return axios.get(
        `${path}/quote/?author=${data}`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}
function  getDeathByAuthor(data){
    return axios.get(
        `${path}/death?name=${data}`, {
            params:data
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}
function  getAllDeath ( ){
    return axios.get(
        `${path}/death`, {
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}
function  getDeathInEpisode(data){
    return axios.get(
        `${path}/death`, {
            params:data
        }).then((res) => {
        return res.data
    }).catch((err) => {
        return Promise.reject(err)
    })
}