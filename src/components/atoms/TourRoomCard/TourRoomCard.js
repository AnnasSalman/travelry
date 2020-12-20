import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, Dimensions} from "react-native";
import Room from "../../../models/Rooms";
import {IconButton} from 'react-native-paper'
import unavailable from '../../../../assets/placeholders/unavailableroom.png'
import Colors from "../../../constants/Colors";

const {height, width} = Dimensions.get('window')

const TourRoomCard = props => {

    const [image, setImages] = useState([])

    useEffect(()=>{
        fetchPictures()
    },[])

    const fetchPictures = async() => {
        const room = new Room()
        try{
            const pictures = await room.getRoomImages(props.hotelid, props.roomid)
            setImages(pictures)
        }
        catch(e){
            console.log('cannot fetch pictures')
        }
    }


    return(
        <View style={props.style}>
            {
                image.length>0?
                    <Image source={image.length>0?{uri: image[0]}:unavailable} style={styles.image}/>
                    :null
            }
            <View style={styles.row}>
                <View style={styles.left}>
                    <IconButton
                        size={30}
                        color={Colors.ForestBiome.primary}
                        icon="account"
                    />
                    <Text style={{...styles.textMedium, marginTop: -15}}>{props.guestLimit}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.type}>{props.type}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.textMedium}>{props.amount}</Text>
                    <Text style={styles.type}>Rooms</Text>
                    <Text style={styles.type}>At</Text>
                    <Text style={styles.textMedium}>Rs {props.price}</Text>
                    <Text style={styles.type}>Per Room</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: height*0.2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 2,
        alignItems: 'center'
    },
    center: {
        flex: 5,
        borderBottomRightRadius: 5
    },
    right: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 3,
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: Colors.ForestBiome.backgroundVariant,
        overflow: 'hidden'
    },
    textMedium: {
        fontFamily: 'poppins-medium',
        fontSize: 18,
        color: Colors.ForestBiome.primary
    },
    textLarge: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    type:{
        fontSize: 12,
        color: 'grey'
    }
})

export default TourRoomCard
