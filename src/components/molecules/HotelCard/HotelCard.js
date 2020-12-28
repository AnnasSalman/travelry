import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity} from 'react-native'
import Colors from "../../../constants/Colors";
import Carousel from 'react-native-snap-carousel';
import {uri} from '../../../constants/Addresses'
import HotelRoomCard from "../../atoms/HotelRoomCard/HotelRoomCard";
import getIcon from "../../../constants/Amenities";
import Room from "../../../models/Rooms";

const {height, width} = Dimensions.get('window')


const HotelCard = props => {

    const [coverImage, setCoverImage] = useState({uri: uri + '/hotels/hotel/images/' + props.id + '-hotel1.jpg'})
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentTab, setCurrentTab]= useState(0)
    const [amenities, setAmenities] = useState(['rooms', 'food', 'accessibility', 'view', 'services'])

    console.log(getIcon(amenities[currentTab], 'Wardrobe'))

    const onImageLoadError = () => {
        setCoverImage({uri: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'})
    }

    const onRoomPress = (item) => {
        props.onRoomPress(item)
    }

    const _renderItem = ({item, index}) => {
        return (
            <HotelRoomCard
                style={styles.roomCard}
                image={uri + '/hotels/room/images/' + props.id + '-' + item.key + '-cover.jpg'}
                onPress={()=>onRoomPress(item)}
            />
        );
    }

    return(
        <ImageBackground
            style={[styles.container, props.style]}
            imageStyle={styles.backgroundImage}
            source={coverImage}
            onError={onImageLoadError}
        >
            <View style={styles.body}>
                <View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{props.basicInfo.hotelName}</Text>
                        <Text style={styles.subtitle}>{props.basicInfo.email} | {props.basicInfo.altPhone} | {props.basicInfo.starRating} Star Hotel</Text>
                        <Text style={styles.subtitle}>{props.basicInfo.streetAdd}, {props.basicInfo.add2}</Text>
                        <Text style={styles.subtitle}>{props.basicInfo.city}</Text>
                    </View>
                    <View style={styles.facilityBar}>
                        <Text style={styles.categoryText}>Facilities</Text>
                        {
                            props.facilityInfo.facilities.map((facility)=>(
                                <Text key={facility}
                                      style={styles.subtitle}
                                >
                                    {facility}
                                </Text>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.roomText}>Rooms</Text>
                    <Text style={styles.roomData}>{props.rooms[currentIndex].roomName}</Text>
                    <Text style={styles.roomData}>{props.rooms[currentIndex].roomType}</Text>
                    <Text style={styles.roomData}>{props.rooms[currentIndex].price} Rupees</Text>
                </View>
                <Carousel
                    // ref={(c) => { this._carousel = c; }}
                    data={props.rooms}
                    renderItem={_renderItem}
                    sliderWidth={props.roomSliderWidth}
                    itemWidth={props.roomItemWidth}
                    containerCustomStyle={styles.carousel}
                    onSnapToItem={(index)=>setCurrentIndex(index)}
                    loop
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    roomCard: {
        height: 140,
        width: 140,
    },
    carousel: {
        position: 'absolute',
        bottom: '3%',
        left: 0
    },
    backgroundImage: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    titleBar: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        opacity: 0.9,
        width: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    },
    facilityBar: {
        marginTop: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        opacity: 0.9,
        width: '50%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    },
    roomBar: {
        marginTop: 30,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        opacity: 0.9,
        width: '60%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    },
    title: {
        color: 'white',
        fontSize: 28,
        marginVertical: 2,
        fontWeight: 'bold'
    },
    subtitle: {
        color: Colors.ForestBiome.primary,
        fontSize: 11,
        fontFamily: 'poppins-regular'
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'poppins-medium',
        color: 'white'
    },
    tab: {
        borderWidth: 1,
        borderColor: Colors.ForestBiome.primary,
        margin: 10,
        marginTop: 20,
        height: 25,
        marginLeft: 10,
        marginRight: 10,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        opacity: 0.92,
        justifyContent: 'space-between'
    },
    bottom: {
        borderBottomRightRadius: 25,
        paddingBottom: '45%',
        paddingLeft: 20,
        alignItems: 'center',
    },
    roomText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },
    roomImage: {
        height: '100%',
        width: '100%'
    },
    roomData: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HotelCard
