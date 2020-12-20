import React from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import {IconButton} from "react-native-paper";
import getIcon from "../../../constants/Amenities";
import TourRoomCard from "../../../components/atoms/TourRoomCard/TourRoomCard";
import BookingPackageDetails from "../../../components/molecules/BookingPackageDetails/BookingPackageDetails";
import Carousel from 'react-native-snap-carousel';

const {height, width} = Dimensions.get('window')

const BookingPackages = props => {

    const _onRoomSelect = (index) => {
        props.navigation.state.params._onNewPackageSelected(props.navigation.state.params.item.date, index)
        props.navigation.goBack()
    }

    const packages = props.navigation.state.params.item.bookings
    const selectedPackageIndex = 0
    const calculateTotal = (index) => {
        let total = 0
        normalizeBookingsDuplicates(packages[index]).forEach((room)=>{
            total+=(packages[selectedPackageIndex].stayDuration*room.amount*room.price)
        })
        return total
    }
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
    const findRoomDetails = (roomId, hotel) => {
        const roomDetailIndex = hotel.roomInfo.findIndex((room)=> roomId === room.key)
        return hotel.roomInfo[roomDetailIndex]
    }
    const _onBack = () => {
        props.navigation.goBack()
    }

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.packageItem}>
                <View style={styles.topView}>
                    <Text style={styles.title}>
                        {item.hotel.basicInfo.hotelName}
                        {index===0?
                            <Text style={styles.subtext}> Recommended</Text>
                            :null
                        }
                    </Text>
                    <Text style={styles.smallText}>{item.hotel.basicInfo.streetAdd}, {item.hotel.basicInfo.add2}, {item.hotel.basicInfo.city}</Text>
                    <View style={[styles.row, styles.amenityPanel]}>
                        {
                            item.hotel.amenities.view.map((viewAmenity)=>(
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
                <ScrollView>
                    {
                        normalizeBookingsDuplicates(item).map((room)=>
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
                        normalizedBookings={normalizeBookingsDuplicates(item)}
                        days={item.stayDuration}
                        stayDuration={item.stayDuration}
                        grandTotal={calculateTotal(index)}
                        onViewOtherPackagesPress={props.onBookingPackagesPressed}
                    />
                    <View style={{height: 20}}/>
                </ScrollView>
                {
                    index!==0?
                        <TouchableOpacity
                            onPress={()=>_onRoomSelect(index)}
                            style={styles.selectButton}
                        >
                            <Text style={styles.buttonText}>Select</Text>
                        </TouchableOpacity>:
                        null
                }
                {
                    index===0?
                        <IconButton
                            icon={'check'}
                            color={Colors.ForestBiome.backgroundVariant}
                            size={28}
                            style={styles.selected}
                        />
                        :null
                }
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Available Packages'
                subtext={'Select the most suitable package for you'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
        <Carousel
            data={props.navigation.state.params.item.bookings}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width-100}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.background,
        flex: 1,
        paddingBottom: 50,
        paddingTop: 25,
    },
    headerText: {
        color: 'white'
    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    packageItem: {
        width: '100%',
        height: '95%',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 15,
        paddingVertical: 10

    },
    tourCard: {
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden',
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
        width: '100%',
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
    selectButton: {
        position: 'absolute',
        right: -6,
        bottom: -15,
        width: '40%',
        height: '8%',
        backgroundColor: Colors.ForestBiome.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: Colors.ForestBiome.backgroundVariant,
        fontFamily: 'poppins-medium',
        fontSize: 16
    },
    selected: {
        backgroundColor: Colors.ForestBiome.primary,
        position: 'absolute',
        top: -15,
        right: -15
    }
})

BookingPackages.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};


export default BookingPackages
