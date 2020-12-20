import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {IconButton} from 'react-native-paper'
import Colors from "../../../constants/Colors";

const GoogleLoginButton = props => {
    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={[props.style, styles.row]}
        >
            <IconButton
                icon={'google'}
                color={Colors.ForestBiome.primary}
                size={28}
            />
            <Text style={styles.text}>Signin With Google</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginRight: 15,
        color: 'white',
        fontFamily: 'poppins-regular',
        fontSize: 12
    }
})

export default GoogleLoginButton
