import axios from 'axios'
import Keys from "../constants/Keys";

class NearbyPlaces {
    constructor(coordinates, type, textSearch, radius) {
        this._coordinates = coordinates
        this._type = type
        this.textSearch = textSearch
        this._radius = radius
    }


    getNearbyPlaces = async() => {
        console.log(this.textSearch)
        try{
            if(this.textSearch){
                console.log('text Search')
                const places = await axios.request({
                    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?',
                    method: 'get',
                    params: {
                        query: this._type,
                        key: Keys.mapsKey,
                        location: this._coordinates,
                        radius: this._radius,
                    }
                })

                return places.data.results
            }
            else{
                const places = await axios.request({
                    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                    method: 'get',
                    params: {
                        location: this._coordinates,
                        radius: this._radius,
                        type: this._type,
                        key: Keys.mapsKey
                    }
                })

                return places.data.results
            }
        }
        catch(e){
            console.log(e)
            return e
        }
    }
    getPlaceImages = async(photoreference, maxwidth) => {
        try{
            const images = await axios.request({
                url: 'https://maps.googleapis.com/maps/api/place/photo',
                method: 'get',
                params: {
                    key: Keys.mapsKey,
                    photoreference,
                    maxwidth: maxwidth,
                }
            })
            return images.request.responseURL
        }
        catch(e){
            return e
        }
    }
}

export default NearbyPlaces
