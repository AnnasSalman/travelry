import axios from 'axios'
import Keys from "../constants/Keys";

class PlaceDetail {
    constructor(placeID) {
        this._placeID = placeID
    }

    getPlaceDetails = async() => {
        const details = await axios.request({
            url: 'https://maps.googleapis.com/maps/api/place/details/json',
            method: 'get',
            params:{
                key: Keys.mapsKey,
                place_id: this._placeID
            }
        })
        return details.data.result
    }
}

export default PlaceDetail
