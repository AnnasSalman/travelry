import React from 'react'
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from "../../../constants/Colors";
import {Rating} from 'react-native-ratings'
import {IconButton} from "react-native-paper";
import Loading from "../Loading/Loading";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

const closeness = (lat1, lon1, lat2, lon2) => {
    const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
    if(distance<0.2){
        return(
            <Text style={styles.close}>Short Walk</Text>
        )
    }
    else if(distance<0.4){
        return(
            <Text style={styles.normal}>Normal Walk</Text>
        )
    }
    else if(distance<0.6){
        return(
            <Text style={styles.far}>Long Walk</Text>
        )
    }
    else if(distance<2.3){
        return(
            <Text style={styles.close}>Short Drive</Text>
        )
    }
    else if(distance<5){
        return(
            <Text style={styles.normal}>Normal Drive</Text>
        )
    }
    else if(distance<10){
        return(
            <Text style={styles.far}>Long Drive</Text>
        )
    }
    else if(distance<22){
        return(
            <Text style={styles.far}>A Day Trip</Text>
        )
    }
    else {
        return(
            <Text style={styles.far}>Quite Far</Text>
        )
    }

}

const PlaceCard = props => {

    const titleFontSizeDetect = () => {
        if(props.title.length<=11){
            return {
                fontSize: 20
            }
        }
        else if(props.title.length<=20){
            return {
                fontSize: 15
            }
        }
        else{
            return{
                fontSize: 13
            }
        }
    }

    const subtitleFontSizeDetect = () => {
        if(props.vicinity){
            if(props.vicinity.length>22){
                return {fontSize: 10}
            }
            else{
                return {fontSize: 12}
            }
        }
        else{
            return null
        }

    }


    return(
        <TouchableOpacity onPress={props.onPress}>
        <View style={{...props.cardStyle, ...styles.container}}>
            <View
                style={{...styles.image, height: props.cardStyle.height*1.15}}
            >

                    <ImageBackground
                        source={props.image?{uri:props.image}:{uri:props.icon}}
                        style={styles.imageBack}
                    >
                        <Loading animating={props.imageLoading} type={'Fold'} color={Colors.ForestBiome.primary}/>
                    </ImageBackground>
            </View>
            <View style={styles.textBar}>
                <Text style={{...styles.subtitle, fontSize: 10}}>Result {props.index+1}/{props.total}</Text>
                {
                    <View style={styles.row}>
                        <IconButton
                            icon={'map-marker-distance'}
                            size={14}
                            color={Colors.ForestBiome.background}
                        />
                        {
                            closeness(props.currentLat,props.currentLng,props.locationLat, props.locationLng)
                        }
                    </View>
                }
                <Text style={{...styles.title, ...titleFontSizeDetect()}}>{props.title}</Text>
                {/*{*/}
                {/*    props.vicinity?*/}
                {/*    <Text style={{...styles.subtitle, ...subtitleFontSizeDetect()}}>{props.vicinity.substring(0,60)}</Text>:null*/}
                {/*}*/}
                <Rating
                    startingValue={props.rating}
                    type='custom'
                    imageSize={25}
                    ratingColor={Colors.ForestBiome.primary}
                    count={5}
                    readonly
                    style={styles.ratings}
                />
                <TouchableOpacity style={styles.directions} onPress={props.onDirectionsPress}>
                    <Text style={styles.buttonText}>Get Directions</Text>
                    <IconButton
                        icon='directions'
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        elevation: 3,
        borderRadius: 5
    },
    image: {
        width: '35%',
        position: 'absolute',
        left: -1,
        bottom: -10,
        borderRadius: 5
    },
    imageBack: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    textBar: {
        marginLeft: '35%',
        height: '100%',
        padding: 15,
        //justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.primary
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.background,
    },
    ratings: {
        margin: 5
    },
    directions: {
        position: 'absolute',
        bottom: -12,
        right: 15,
        width: '85%',
        height: '30%',
        borderRadius: 5,
        backgroundColor: Colors.ForestBiome.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '10%',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'poppins-regular'
    },
    close: {
        fontFamily: 'poppins-regular',
        color: Colors.ForestBiome.background,
        shadowRadius: 1,
        shadowOpacity: 0.5,
        shadowColor: Colors.ForestBiome.primaryVariant,
    },
    normal: {
        fontFamily: 'poppins-regular',
        color: Colors.ForestBiome.background
    },
    far: {
        fontFamily: 'poppins-regular',
        color: Colors.ForestBiome.background
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default PlaceCard
