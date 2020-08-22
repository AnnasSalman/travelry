import axios from "axios";

class Room {
    constructor() {
        this.rooms = {}
        this.uniqueRoomDetails={}
    }
    async requestRooms(guests, from, to, startDate, endDate) {
        try{
            const roomsRes = await axios.get('/bookings/findrooms',
                {
                    params: {
                        guests,
                        lower: from,
                        upper: to,
                        from: startDate,
                        to: endDate
                    }
                })
            this.rooms = (roomsRes.data)
            const roomids = []
            const uniRooms = []
            roomsRes.data.forEach((roomRes)=>{
                if(!roomids.includes(roomRes.roomid)){
                    roomids.push(roomRes.roomid)
                    uniRooms.push({hotelid: roomRes.hotelid, roomid: roomRes.roomid})
                }
            })
            const roomDetailResponses = []
            for (const uniRoom of uniRooms) {
                const contents = await axios.get('/bookings/findroomsbyid/'+ uniRoom.hotelid+'/'+uniRoom.roomid);
                const pics = await axios.get('/hotels/'+uniRoom.hotelid+'/getimages/'+uniRoom.roomid)
                roomDetailResponses.push({...contents.data, pictures: pics.data})
            }
            this.uniqueRoomDetails = roomDetailResponses
            return this.uniqueRoomDetails
        }
        catch (e) {
            return e
        }
    }
}

export default Room
