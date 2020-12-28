import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Tours from "../Tours/Tours";
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Hotel from "../../../models/Hotel";
import Carousel from 'react-native-snap-carousel';
import HotelCard from "../../../components/molecules/HotelCard/HotelCard";
import Room from "../../../models/Rooms";

const {height, width} = Dimensions.get('window')

const Hotels = props => {

    const _renderItem = ({item, index}) => {
        return (
            <HotelCard
                style={styles.slide}
                id={item._id}
                roomSliderWidth={width}
                roomItemWidth={width*0.33}
                rooms={item.roomInfo}
                basicInfo={item.basicInfo}
                facilityInfo={item.facilityInfo}
                amenities={item.amenities}
                geometry={item.geometry}
                onRoomPress={(roomItem)=>onRoomPress(roomItem, item.amenities, item.basicInfo, item._id)}
            />
        );
    }

    const [hotels, setHotels] = useState([])

    useEffect(()=>{
        _getNearbyHotels()
    },[])

    const _onBack = () => {
        props.navigation.goBack()
    }

    const _getNearbyHotels = async() => {
        try{
            const hotel = new Hotel()
            const nearbyHotels = await hotel.getHotelsNearMe()
            setHotels(nearbyHotels)
        }
        catch(e){
            console.log(e)
        }
    }

    const onRoomPress = async(item, amenities, hotelInfo, hotelid) => {
        const room = new Room()
        const roomImages = await room.getSimpleRoomImages(hotelid, item.key)
        const today = new Date()
        const tommorrow = new Date()
        tommorrow.setDate(new Date().getDate()+1);
        props.navigation.navigate('roomScreen', {
            item: {
                roomInfo: item,
                amenities: amenities.rooms,
                hotelInfo,
                hotelid,
                pictures: roomImages
            },
            filter: {
                endDate: today,
                from: 0,
                guests: 1,
                startDate: tommorrow,
                to: 100000,
            }})
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Hotels'
                subtext={'Nearby'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            <Carousel
                // ref={(c) => { this._carousel = c; }}
                data={hotels}
                renderItem={_renderItem}
                sliderHeight={height-180}
                itemHeight={height-250}
                vertical
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background,
        paddingBottom: 55
    },
    header: {
        marginTop: 20,
        alignItems: 'center'
    },
    headerText: {
        color: Colors.ForestBiome.primary,
    },
    sub:{
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slide: {
        height: '100%',
        width: '90%',
    }
})

Hotels.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Hotels
