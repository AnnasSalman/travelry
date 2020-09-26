import axios from "axios";

class Booking {
    constructor(hotelid, roomid, numberOfRooms, from, to) {
        this._hotelid = hotelid;
        this._roomid = roomid;
        this._numberOfRooms = numberOfRooms;
        this._from = from;
        this._to = to;
    }

    checkAvailability = async()=>{
        try{
            const availability = await axios.get('/bookings/hotel/checkroomsavailability',{
                params:{
                    hotelid: this._hotelid,
                    roomid: this._roomid,
                    number: this._numberOfRooms,
                    from: this._from,
                    to: this._to
                }
            })
            this._rooms = availability.data.rooms
            return availability.data
        }
        catch(e){
            return(e)
        }
    }

    bookRooms = async () => {
        try{
            const booking = axios.post('/bookings/rooms/book', {
                roomSpecificIds: this._rooms,
                from: this._from,
                to: this._to
            })
            return booking
        }
        catch(e){
            return e
        }

    }


    get hotelid() {
        return this._hotelid;
    }

    get roomid() {
        return this._roomid;
    }

    get numberOfRooms() {
        return this._numberOfRooms;
    }

    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }


    set hotelid(value) {
        this._hotelid = value;
    }

    set roomid(value) {
        this._roomid = value;
    }

    set numberOfRooms(value) {
        this._numberOfRooms = value;
    }

    set from(value) {
        this._from = value;
    }

    set to(value) {
        this._to = value;
    }
}

export default Booking
