import React from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import Keys from "../../../constants/Keys";

const TourPlanPlaceWidget = props => {
    return(
        <ImageBackground style={[props.style, styles.container]} source={{url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key='+Keys.mapsKey+'&photoreference='+props.imageReference}}>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        overflow: 'hidden',
    }
})

export default TourPlanPlaceWidget
