import React from 'react'
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native'
import Colors from "../../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {backgroundColor} from "react-native-calendars/src/style";
import Keys from "../../../constants/Keys";

const CityImageWidget = props => {
    return(
        <ImageBackground
            style={props.containerStyle}
            source={{
                uri: 'https://maps.googleapis.com/maps/api/staticmap?key='+Keys.mapsKey+'&center='+props.mapWidgetCenter+'&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=800x600'
            }}
        >
        <LinearGradient
            style={{flex: 1}}
            colors={['transparent', 'rgba(16,24,32,1)']}
            start={[0.8, 0.0]}
            end={[0.0, 0.6]}
        >
            <Image
                style={props.imageStyle}
                source={{uri: props.image}}
            />
            <Text style={props.titleStyle}>{props.title}</Text>
            <Text style={[props.titleStyle, styles.subtitle]}>{props.subtitle}</Text>
        </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 9,
        marginTop: 2
    }
})

export default CityImageWidget
