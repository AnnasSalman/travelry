import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {IconButton} from 'react-native-paper'
import TourRoomCard from "../../atoms/TourRoomCard/TourRoomCard";
import Colors from "../../../constants/Colors";
import getIcon from "../../../constants/Amenities";
import BookingPackageDetails from "../BookingPackageDetails/BookingPackageDetails";
import VerticalButton from "../../atoms/VerticalButton/VerticalButton";

const TourRoomWidget = props => {

    const [packages, setPackages] = useState(props.bookings)
    const [selectedPackageIndex, setSelectedPackageIndex] = useState(0)

    const normalizeBookingsDuplicates = (bookings) =>{
        const normalizedArray = []
        bookings.rooms.forEach((room,index)=>{
            const foundIndex = normalizedArray.findIndex(foundRoom => foundRoom.roomid === room.roomid)
            if(foundIndex!==-1){
                normalizedArray[foundIndex] = {...normalizedArray[foundIndex], amount: normalizedArray[foundIndex].amount+1}
            }
            else{
                normalizedArray.push({
                    ...room,
                    amount: 1,
                    roomDetails: findRoomDetails(room.roomid, bookings.hotel)
                })
            }
        })
        return normalizedArray
    }

    const calculateTotal = () => {
        let total = 0
        normalizeBookingsDuplicates(packages[selectedPackageIndex]).forEach((room)=>{
            total+=(packages[selectedPackageIndex].stayDuration*room.amount*room.price)
        })
        return total
    }

    const findRoomDetails = (roomId, hotel) => {
        const roomDetailIndex = hotel.roomInfo.findIndex((room)=> roomId === room.key)
        return hotel.roomInfo[roomDetailIndex]
    }

    return(
        <View style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.title}>
                    {packages[selectedPackageIndex].hotel.basicInfo.hotelName}
                    {selectedPackageIndex===0?
                        <Text style={styles.subtext}> Recommended</Text>
                        :null
                    }
                </Text>
                <Text style={styles.smallText}>{packages[selectedPackageIndex].hotel.basicInfo.streetAdd}, {packages[selectedPackageIndex].hotel.basicInfo.add2}, {packages[selectedPackageIndex].hotel.basicInfo.city}</Text>
                <View style={[styles.row, styles.amenityPanel]}>
                    {
                        packages[selectedPackageIndex].hotel.amenities.view.map((viewAmenity)=>(
                            <View key={viewAmenity} style={styles.amenityView}>
                                <IconButton
                                    size={28}
                                    color={Colors.ForestBiome.primary}
                                    icon={getIcon('View', viewAmenity)}
                                    onPress={()=>console.log(packages)}
                                />
                                <Text style={styles.amenityText}>{viewAmenity}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            {
                normalizeBookingsDuplicates(packages[selectedPackageIndex]).map((room)=>
                    (
                        <TourRoomCard
                            key={room.roomid}
                            amount={room.amount}
                            guestLimit={room.guestlimit}
                            price={room.price}
                            name={room.roomDetails.roomName}
                            type={room.roomDetails.roomType}
                            description={room.roomDetails.description?room.roomDetails.description:''}
                            style={styles.tourCard}
                            hotelid={room.hotelid}
                            roomid={room.roomid}
                        />
                    )
                )
            }
            <BookingPackageDetails
                style={styles.bottomView}
                normalizedBookings={normalizeBookingsDuplicates(packages[selectedPackageIndex])}
                days={packages[selectedPackageIndex].stayDuration}
                stayDuration={packages[selectedPackageIndex].stayDuration}
                grandTotal={calculateTotal()}
            />
            <VerticalButton
                color={Colors.ForestBiome.primary}
                tint={Colors.ForestBiome.backgroundVariant}
                amount={packages.length-1}
                description={packages.length-1===0?'no other package available':packages.length-1===1?'other package available':'other packages available'}
                style={styles.button}
                onPress={props.onBookingPackagesPressed}
            >
                View Other Packages
            </VerticalButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10

    },
    tourCard: {
        width: '88%',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    topView: {
        width: '100%',
        paddingHorizontal: '4%',
        marginBottom: 10
    },
    bottomView: {
        width: '90%',
    },
    subtext: {
        color: Colors.ForestBiome.primary,
        fontSize: 14
    },
    smallText: {
        fontSize: 11,
        color: 'grey'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    amenityView: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    amenityText: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular',
        width: 60,
        marginTop: -8,
        fontSize: 11,
        textAlign: 'center'
    },
    amenityPanel: {
        justifyContent: 'center'
    },
    heading: {
        color: 'white',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    packageInfo: {
        color: 'white',
        fontSize: 14,
        width: '25%',
        textAlign: 'center'
    },
    totalHeading: {
        color: 'white',
        fontFamily: 'poppins-regular',
        fontSize: 16,
        marginTop: 8
    },
    totalValue: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 30,
        marginTop: -6
    },
})

export default TourRoomWidget
