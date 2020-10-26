import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Keys from "../../../constants/Keys";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import CustomHeader from "../../atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import Weather from "../../../models/Weather";
import Photos from "../../../models/Photos";

const AddCityModal = props => {

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Search Location'
                subtext={'Enter keywords to search for your city'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={props.onClose}
            />
            <GooglePlacesAutocomplete
                autoFocus={true}
                styles={autoComplete}
                placeholder='Enter Location'
                fetchDetails={true}
                onPress={async (data, details) => {
                    //console.log(details)
                    const{lat, lng} = details.geometry.location
                    console.log(lat)
                    const weather = new Weather(lat, lng)
                    const photos = new Photos(details.photos)
                    try{
                        const weatherData = await weather.getWeather(7)
                        const photo = await photos.getOnePhoto()
                        props.onSubmit({place: {...details, photo}, weather: weatherData})
                    }
                    catch (e) {
                        console.log(e)
                    }
                    // 'details' is provided when fetchDetails = true
                    // if(data.terms.length<=1){
                    //
                    // }
                    // else if(data.terms.length>1){
                    //     const location = new Location()
                    //     try{
                    //         await location.storeLocation(details)
                    //         await props.navigation.state.params.onAddLocation()
                    //         props.navigation.goBack()
                    //     }
                    //     catch(e){
                    //         console.log(e)
                    //     }
                    // }
                }}
                query={{
                    key: Keys.mapsKey,
                    components: 'country:pk',
                    types:'(cities)'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: Colors.ForestBiome.background
    },
    headerText: {
        color: 'white'
    },
    header: {

    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
})

const autoComplete = {
    textInputContainer: {
        backgroundColor: Colors.ForestBiome.background,
        borderWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    textInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 38,
        backgroundColor: Colors.ForestBiome.background,
        color: Colors.ForestBiome.primary,
        fontSize: 20,
        borderBottomColor: Colors.ForestBiome.primary,
        borderBottomWidth: 2
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    listView: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        color: 'green'
    },
    row: {
        backgroundColor: Colors.ForestBiome.background,
        borderRadius: 15,
        margin: 5
    },
    separator: {
        backgroundColor: Colors.ForestBiome.background
    },
    poweredContainer: {
        backgroundColor: Colors.ForestBiome.background
    },
    description: {
        color: 'white'
    },
}


export default AddCityModal
