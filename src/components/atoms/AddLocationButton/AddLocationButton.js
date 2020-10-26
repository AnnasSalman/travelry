import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import mapIcon from '../../../../assets/demoAssets/undraw_Map_dark_k9pw.png'

const AddLocationButton = props => {
    return(
        <TouchableOpacity
            style={[props.style, styles.container]}
            onPress={props.onPress}
        >
            <IconButton
                size={25}
                color={Colors.ForestBiome.primary}
                icon='plus'
            />
            <Text style={styles.text}>{props.text}</Text>
            <Image
                source={mapIcon}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.ForestBiome.primary,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    image: {
        height: '70%',
        width: '20%',
        resizeMode: 'contain'
    }
})

export default AddLocationButton
