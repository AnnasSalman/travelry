import axios from 'axios'
import Keys from "../constants/Keys";

class Photos {
    constructor(photos) {
        this._photos = photos
    }

    getPhotos = async(num) => {
        const pictureUrls = []
        let range = 0
        if(this._photos.length>=num){
            range=num
        }
        else{
            range=this._photos.length
        }
        for(let i = 0; i < range; i++){
            try{
                const pic = await axios.request({
                    url: 'https://maps.googleapis.com/maps/api/place/photo',
                    method: 'get',
                    params:{
                        key: Keys.mapsKey,
                        photoreference: this._photos[i].photo_reference,
                        maxwidth: 550
                    }
                })
                pictureUrls.push(pic.request.responseURL)
            }
            catch(e){
                return e
            }
        }
        return pictureUrls
    }

    getOnePhoto = async() => {
        try{
            const pic = await axios.request({
                url: 'https://maps.googleapis.com/maps/api/place/photo',
                method: 'get',
                params:{
                    key: Keys.mapsKey,
                    photoreference: this._photos[0].photo_reference,
                    maxwidth: 550
                }
            })
            return pic.request.responseURL
        }
        catch (e) {
            return(e)
        }
    }
}



export default Photos
