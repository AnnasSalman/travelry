import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Keys from '../constants/Keys'


const bestHeight = (elements) => {
    let max = 0
    let returnIndex = 0
    elements.forEach((image, index)=>{
        if(image.height>max){
            max=image.height
            returnIndex = index
        }
    })
    return returnIndex
}

const randomImage = (elements) => {
    return Math.floor(Math.random() * elements.length);
}

class Location {
    constructor() {

    }
    storeLocation = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('location', jsonValue)
            if(value.photos){
                //best height image index
                // const bestIndex = bestHeight(value.photos)
                //random image index
                const bestIndex = randomImage(value.photos)
                const pic = await axios.request({
                    url: 'https://maps.googleapis.com/maps/api/place/photo',
                    method: 'get',
                    params:{
                        key: Keys.mapsKey,
                        photoreference: value.photos[bestIndex].photo_reference,
                        maxwidth: 750
                    }
                })
                await AsyncStorage.setItem('backgroundImage', pic.request.responseURL)
            }
            else{
                await AsyncStorage.setItem('backgroundImage', '')
            }

        } catch (e) {
            console.log(e)
            return e
        }
    }

    getLocation = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('location')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            return e
        }
    }

    isLocation = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('location')
            return jsonValue != null ? true : false;
        } catch(e) {
            return e
        }
    }

    getBackgroundImage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('backgroundImage')
            return jsonValue != null ? jsonValue : null;
        } catch(e) {
            return e
        }
    }

    getOnePhoto = async () => {
        try{
            const value = await AsyncStorage.getItem('location')
            const jsonValue = JSON.parse(value)
            const bestIndex = bestHeight(jsonValue.photos)
            const pic = await axios.request({
                url: 'https://maps.googleapis.com/maps/api/place/photo',
                method: 'get',
                params:{
                    key: Keys.mapsKey,
                    photoreference: jsonValue.photos[bestIndex].photo_reference,
                    maxwidth: 750
                }
            })
            return pic.request.responseURL
        }
        catch(e){
            return e
        }
    }
}

export default Location
