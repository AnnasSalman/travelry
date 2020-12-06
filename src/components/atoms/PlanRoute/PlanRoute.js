import React, {useState} from "react"
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {IconButton} from "react-native-paper";
import MapView, {Marker, Circle, PROVIDER_GOOGLE, Callout} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Keys from "../../../constants/Keys";
import Colors from "../../../constants/Colors";

const width = Dimensions.get('window').width*0.8
const height = Dimensions.get('window').width*0.2

function timeConvert(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let hourText = ''
    let minuteText = ''
    if(rhours === 1){
        hourText = ' hr'
    }
    if(rhours > 1){
        hourText = ' hrs'
    }
    if(rminutes === 1){
        minuteText = ' min'
    }
    if(rminutes > 1){
        minuteText = ' mins'
    }
    if(rhours<1){
        return rminutes + minuteText
    }
    if(rminutes===0){
        return rhours + hourText
    }
    return rhours + hourText + ' ' + rminutes + minuteText;
}

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.100;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const PlanRoute = props => {

    const [stats, setStats] = useState({
        distance: 'NA',
        duration: 'NA'
    })

    const _onStatsFetched = (stats) => {
        setStats({
            distance: stats.distance,
            duration: stats.duration
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.title}>Day Goal</Text>
                {props.children}
                <Text style={styles.instruction}>Travel from <Text style={styles.highlight}>{props.originName}</Text> to <Text style={styles.highlight}>Murree {props.destinationName}</Text></Text>
                {props.waypointNames.length>0?
                    <View style={styles.body}>
                        <Text style={styles.instruction}>via</Text>
                        {
                            props.waypointNames.map((name)=>(
                                <View key={name}>
                                    <Text style={styles.instruction}><Text style={styles.highlight}>{name}</Text></Text>
                                </View>
                            ))
                        }
                    </View>
                    :null
                }
            </View>
            <MapView
                initialRegion={{
                    latitude: parseFloat(props.originLat),
                    longitude: parseFloat(props.originLng),
                    latitudeDelta: parseFloat(LATITUDE_DELTA),
                    longitudeDelta: parseFloat(LONGITUDE_DELTA),
                }}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapStyles}
            >
                <MapViewDirections
                    origin={{latitude: parseFloat(props.originLat), longitude: parseFloat(props.originLng)}}
                    destination={{latitude: parseFloat(props.destinationLat), longitude: parseFloat(props.destinationLng)}}
                    apikey={Keys.mapsKey}
                    strokeWidth={4}
                    strokeColor={Colors.ForestBiome.primary}
                    waypoints={props.waypoints}
                    onReady={(stats)=>{_onStatsFetched(stats)}}
                />
            </MapView>
            <View style={styles.bottomBar}>
                <View style={{...styles.statBox, flex: 0.95}}>
                    <Text style={styles.statDescription}>Total Distance</Text>
                    <Text style={styles.stat}>{Math.round(stats.distance * 10) / 10} km</Text>
                </View>
                <View style={styles.divider}/>
                <IconButton
                    icon='directions'
                    color={Colors.ForestBiome.primary}
                    size={38}
                    style={{flex: 0.5}}
                />
                <View style={styles.divider}/>
                <View style={styles.statBox}>
                    <Text style={styles.statDescription}>ETA without stays</Text>
                    <Text style={styles.stat}>{timeConvert(stats.duration)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width*0.75,
        height: Dimensions.get('window').height*0.2,
        borderRadius: 10
    },
    container: {
        alignItems: 'center'
    },
    column: {
        width: '100%',
        marginLeft: 50
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontSize: 12,
        fontFamily: 'poppins-regular'
    },
    instruction: {
        width: width*0.9,
        color: 'grey',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        marginBottom: 8
    },
    highlight: {
        color: 'white',
        fontSize: 14
    },
    body: {
        marginTop: 10
    },
    bottomBar: {
        width: '80%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    stat: {
        fontSize: 16,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.primary,
        textAlign: 'center'
    },
    statBox: {
        flex: 1
    },
    divider: {
      width: 2,
      height: 60,
      backgroundColor: Colors.ForestBiome.primary,
        margin: 8

    },
    statDescription: {
        fontSize: 10,
        fontFamily: 'poppins-regular',
        color: 'grey',
        marginBottom: 5,
        textAlign: 'center'
    },
})

const MapStyles =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2f3948"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ]


export default PlanRoute
