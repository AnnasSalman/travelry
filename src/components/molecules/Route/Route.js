import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Keys from "../../../constants/Keys";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 33.5286003;
const LONGITUDE = 73.1194781;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Route = () => {

    const mapView = useRef(null)

    const [state, setState] = useState(  {
        coordinates: [
            {
                latitude: 33.5286003,
                longitude: 73.1194781,
            },
            {
                latitude: 33.5661555453319,
                longitude: 73.077163570581,
            },
        ],
    });

    const onMapPress = (e) => {
        setState({
            coordinates: [
                ...state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    }

    return(
        <View>
            <MapView
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                style={styles.map}
                ref={mapView}
                onPress={onMapPress}

            >
                {/*<MapViewDirections*/}
                {/*    origin={state.coordinates[0]}*/}
                {/*    destination={state.coordinates[1]}*/}
                {/*    apikey={Keys.mapsKey}*/}
                {/*    strokeWidth={6}*/}
                {/*    strokeColor="hotpink"*/}
                {/*    onReady={(res)=>console.log(res)}*/}
                {/*    onStart={(res)=>console.log(res)}*/}
                {/*/>*/}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default Route
