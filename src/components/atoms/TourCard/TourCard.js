import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Keys from "../../../constants/Keys";
import Colors from "../../../constants/Colors";

const _averageRatings = (ratings) => {
    let sum = 0
    ratings.forEach((rating)=>{
        sum+=rating.stars
    })
    return (sum/ratings.length).toFixed(1)
}

const TourCard = props => {

    return(
        <View style={[props.style]}>
            <View style={[styles.row, {height: '58%'}]}>
                {
                    props.cities.map((city)=> (
                        <View
                            style={[styles.imageView, {width: 100/props.cities.length+'%'}]}
                            key={city.place.place_id}
                        >
                            <Image
                                style={styles.image}
                                source={{url: 'https://maps.googleapis.com/maps/api/place/photo?key='+Keys.mapsKey+'&photoreference='+city.place.photos[0].photo_reference+'&maxwidth=650'}}
                            />
                        </View>
                    ))
                }
            </View>
            <View style={styles.row}>
                <View style={styles.titleAndDescription}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                </View>
                <View style={styles.timeAndRating}>
                    <Text style={styles.days}>{props.time} Days</Text>
                    {
                        props.ratings.length>0?
                            <Text style={styles.rating}>
                                {_averageRatings(props.ratings)}/5
                            </Text>:
                            <Text style={styles.rating}>No ratings yet</Text>
                    }
                </View>
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={props.onViewTour}
            >
                <Text style={styles.buttonText}>View Tour</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    imageView: {
        height: '100%',
    },
    titleAndDescription: {
        flex: 3
    },
    timeAndRating: {
        flex: 1,
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 18,
        width: '90%',
        marginVertical: 8,
        marginLeft: 10
    },
    description: {
        color: 'white',
        fontFamily: 'poppins-regular',
        fontSize: 10,
        width: '75%',
        marginVertical: 8,
        marginLeft: 10,
    },
    days: {
        color: Colors.ForestBiome.primary,
        marginVertical: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    rating: {
        color: 'white',
        fontSize: 12
    },
    viewButton: {
        backgroundColor: Colors.ForestBiome.primary,
        height: '15%',
        width: 120,
        position: 'absolute',
        right: '3%',
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: Colors.ForestBiome.backgroundVariant,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default TourCard
