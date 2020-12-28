import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

class Hotel{
    constructor() {
    }
    getHotelsNearMe = async() => {
        const jsonValue = await AsyncStorage.getItem('location')
        const lat = JSON.parse(jsonValue).geometry.location.lat
        const lng = JSON.parse(jsonValue).geometry.location.lng
        const hotels = await axios.request({
            url: '/hotels/gethotelsnearme',
            method: 'get',
            params: {
                lat,
                lng
            }
        })
        return hotels.data
    }
}

export default Hotel
