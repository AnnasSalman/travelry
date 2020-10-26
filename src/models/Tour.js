import axios from 'axios'

class Tour {
    constructor(coordinates, dates, budget, hobbies) {
        this._coordinates = coordinates
        this._dates = dates
        this._budget = budget
        this._hobbies = hobbies
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
                    hobbies: this._hobbies
                }
            })

            return tourPlan.data
        }
        catch(e){
            return e
        }
    }
}

export default Tour
