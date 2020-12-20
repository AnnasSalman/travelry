import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

class Tour {
    constructor(coordinates, dates, budget, hobbies, fuelType, fuelAverage, guests) {
        this._coordinates = coordinates
        this._dates = dates
        this._budget = budget
        this._hobbies = hobbies
        this._fuelType = fuelType
        this._fuelAverage = fuelAverage
        this._guests = guests
    }

    fetchTourPlan = async() => {
        try{
            const tourPlan = await axios.request({
                url: '/tours/generatetour',
                method: 'get',
                params:{
                    coordinates: this._coordinates,
                    dates: this._dates,
                    budget: this._budget,
                    hobbies: this._hobbies,
                    fuelType: this._fuelType,
                    fuelAverage: this._fuelAverage,
                    guests: this._guests
                }
            })

            return tourPlan.data
        }
        catch(e){
            return e
        }
    }

    saveTour = async(tour) => {
        try{
            const tourSaved = await axios.request({
                url: '/tours/savetour',
                method: 'post',
                data: {
                    ...tour
                }
            })
            return tourSaved
        }
        catch (e){
            return e
        }
    }

    getTours = async(userId, type) => {
        const fetchedTours = await axios.request({
            url: '/tours/getmytours/'+userId+'/'+type,
            method: 'get',
        })
        return fetchedTours.data
    }

    getToursByRating = async() => {
        const fetchedTours = await axios.request({
            url: '/tours/gettoursbyrating',
            method: 'get',
        })
        return fetchedTours.data
    }

    getToursNearMe = async() => {
        const jsonValue = await AsyncStorage.getItem('location')
        const lat = JSON.parse(jsonValue).geometry.location.lat
        const lng = JSON.parse(jsonValue).geometry.location.lng
        const fetchedTours = await axios.request({
            url: '/tours/gettoursnearme?lat='+lat+'&lng='+lng,
            method: 'get',
        })
        return fetchedTours.data
    }
}

export default Tour
