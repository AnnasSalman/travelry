import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, {Marker, Circle, PROVIDER_GOOGLE, Callout} from "react-native-maps";
import Places from "../Places/Places";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import PlaceCard from "../../../components/atoms/PlaceCard/PlaceCard";
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import NearbyPlaces from "../../../models/NearbyPlaces";
import { OpenMapDirections } from 'react-native-navigation-directions';
import {showLocation} from "react-native-map-link";


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.014;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapPlaces = props => {

    const _carousel = useRef(null)
    const _map = useRef(null)

    const [navigationParams, setNavigationParams] = useState(props.navigation.state.params)
    const [nearby, setNearby] = useState([])
    const [images, setImages] = useState([])
    const [imageLoading, setImageLoading] = useState(false)

    useEffect(()=>{
        try{
            console.log('EFFECT CALLED')
            getNearbyPlaces()
        }
        catch(e){
            console.log('ERROR FETCHING NEARBY')
        }
    },[])

    useEffect(()=>{
        try{
            console.log('EFFECT 2 CALLED')
            getPlaceImages(nearby)
        }
        catch(e){
            console.log('ERROR FETCHING IMAGES')
        }
    },[nearby])

    const getNearbyPlaces = async() => {
        const navData = props.navigation.state.params
        try{
            const nearbyPlaces =
                new NearbyPlaces(navData.coordinates.lat+','+navData.coordinates.lng, navData.typeKey, 1500)
            const nearbyPlacesArray = await nearbyPlaces.getNearbyPlaces()
            setNearby(nearbyPlacesArray)
            _map.current.animateToRegion({
                latitude: nearbyPlacesArray[0].geometry.location.lat,
                longitude: nearbyPlacesArray[0].geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
        }
        catch(e){
            return e
        }
    }

    const getPlaceImages = async(placesArray) => {
        setImageLoading(true)
        const navData = props.navigation.state.params
        const nearby = new NearbyPlaces(navData.coordinates.lat+','+navData.coordinates.lng, navData.typeKey, 1500)
        const imagesResponse = []
        for (const element of placesArray){
            try{
                const images = await nearby.getPlaceImages(element.photos[0].photo_reference, 400)
                imagesResponse.push(images)
            }
            catch(e){
                imagesResponse.push('')
            }
        }
        setImages(imagesResponse)
        setImageLoading(false)
    }

    const directionsHandler = (index) => {

        showLocation({
            latitude: nearby[index].geometry.location.lat,
            longitude: nearby[index].geometry.location.lng,
            sourceLatitude: navigationParams.coordinates.lat,  // optionally specify starting location for directions
            sourceLongitude: navigationParams.coordinates.lng,  // not optional if sourceLatitude is specified
            // title: 'The White House',  // optional
            // googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            // dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            // dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            // cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            // appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // // app: 'uber'  // optionally specify specific app to use
        })

        // const startPoint = {
        //     longitude: navigationParams.coordinates.lng,
        //     latitude: navigationParams.coordinates.lat
        // }
        //
        // const endPoint = {
        //     longitude: nearby[index].geometry.location.lng,
        //     latitude: nearby[index].geometry.location.lat
        // }
        //
        // const transportPlan = 'd';
        //
        // OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
        //     console.log(res)
        // });
    }

    const _renderItem = ({item, index}) => {
        return (
            <PlaceCard
                cardStyle={styles.cardStyle}
                title={item.name}
                rating={item.rating}
                vicinity={item.vicinity}
                total={nearby.length}
                index={index}
                image={images[index]}
                onDirectionsPress={()=>directionsHandler(index)}
                icon={item.icon}
                imageLoading={imageLoading}
            />
        );
    }

    const onSlideChange = (index) => {
        _map.current.animateToRegion({
            latitude: nearby[index].geometry.location.lat,
            longitude: nearby[index].geometry.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        })
    }

    const onMarkerPress = (index) => {
        _carousel.current.snapToItem(index)
    }

    return(
        <View>
            <MapView
                initialRegion={{
                    latitude: navigationParams.coordinates.lat,
                    longitude: navigationParams.coordinates.lng,
                    // latitude: 33.5286003,
                    // longitude: 73.1194781,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                ref={_map}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapStyles}
            >
                <Circle
                    center={{latitude: navigationParams.coordinates.lat, longitude: navigationParams.coordinates.lng}}
                    radius={1800}
                    fillColor={'rgba(212,11,40,0.0)'}
                    strokeColor={Colors.ForestBiome.primary}
                    strokeWidth={2}
                />
                <Circle
                    center={{latitude: navigationParams.coordinates.lat, longitude: navigationParams.coordinates.lng}}
                    radius={1000}
                    fillColor={'rgba(212,213,34,0.0)'}
                    strokeColor={Colors.ForestBiome.secondary}
                    strokeWidth={2}
                />
                <Circle
                    center={{latitude: navigationParams.coordinates.lat, longitude: navigationParams.coordinates.lng}}
                    radius={500}
                    fillColor={'rgba(12,113,34,0.03)'}
                    strokeColor={Colors.ForestBiome.primaryVariant}
                    strokeWidth={2}
                />
                {
                    nearby.map((place,index)=>(
                        <Marker
                            //image={require('../../../../assets/placemarkers/park.png')}
                            key={place.place_id}
                            coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
                            onPress={()=>onMarkerPress(index)}
                        >
                            <Callout>
                                <Text>{place.name}</Text>
                            </Callout>
                        </Marker>
                    ))

                }
                <Marker
                    // coordinate={{latitude: currentCoordinates.lat, longitude: currentCoordinates.lng}}
                    coordinate={{latitude: navigationParams.coordinates.lat, longitude: navigationParams.coordinates.lng}}
                    image={require('../../../../assets/placemarkers/me.png')}
                >
                    <Callout>
                        <Text>Current Location</Text>
                    </Callout>
                </Marker>
            </MapView>
            <CustomHeader
                text={props.navigation.state.params.typeName}
                subtext={'near '+ props.navigation.state.params.address.substring(0,48)+'...'}
                containerStyle={styles.header}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                onBack={()=>props.navigation.goBack()}
            />
            <Carousel
                ref={_carousel}
                data={nearby}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width*0.75}
                containerCustomStyle={styles.carouselContainer}
                onSnapToItem={(index)=>onSlideChange(index)}
            />
            <View style={styles.navBar}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    carouselContainer: {
        position: 'absolute',
        bottom: height*0.14,
        overflow: 'visible'
    },
    cardStyle: {
        height: height*0.22,
        backgroundColor: 'rgba(255,255,255,1)',
        //backgroundColor: Colors.ForestBiome.background,
    },
    navBar: {
        height: height*0.07,
        width: width,
        backgroundColor: 'rgba(40, 51, 74, 0.9)',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height*0.14,
        backgroundColor: 'rgba(40, 51, 74, 0.85)'
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 22
    },
    subtitle: {
        color: 'grey',
        fontFamily: 'poppins-regular'
        // color: Colors.ForestBiome.primary
    }
})

const MapStyles=[
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
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
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
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
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
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
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

MapPlaces.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default MapPlaces
