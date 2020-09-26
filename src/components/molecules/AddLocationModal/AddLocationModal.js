import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Keys from "../../../constants/Keys";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Colors from "../../../constants/Colors";
import {IconButton} from "react-native-paper";
import Location from "../../../models/Location";

const AddLocationModal = props => {
    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View>
                    <Text style={styles.title}>
                        Add Location
                    </Text>
                    <Text style={styles.subtitle}>
                        or Use Current Location
                    </Text>
                </View>
                <IconButton
                    icon='close-circle'
                    size={30}
                    color={Colors.ForestBiome.primary}
                    style={styles.icon}
                    onPress={()=>props.navigation.goBack()}
                />
            </View>
            <GooglePlacesAutocomplete
                autoFocus={true}
                styles={autoComplete}
                placeholder='Enter Location'
                fetchDetails={true}
                onPress={async (data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    if(data.terms.length<=1){

                    }
                    else if(data.terms.length>1){
                        const location = new Location()
                        try{
                            await location.storeLocation(details)
                            await props.navigation.state.params.onLocationChange()
                            props.navigation.goBack()
                        }
                        catch(e){
                            console.log(e)
                        }
                    }
                }}
                query={{
                    key: Keys.mapsKey,
                    components: 'country:pk'
                }}
            />
        </View>
    )
}

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
        color: Colors.ForestBiome.secondary
    },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background
    },
    title: {
        color: Colors.ForestBiome.primary,
        marginLeft: 25,
        marginTop: 35,
        fontSize: 28,
        fontFamily: 'poppins-regular'
    },
    subtitle: {
        color: Colors.ForestBiome.primary,
        marginLeft: 30,
        fontSize: 16,
        textDecorationLine: 'underline',
        fontFamily: 'poppins-regular',
        marginBottom: 10
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon:{
        marginTop: 35
    }
})

export default AddLocationModal
