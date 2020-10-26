import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import {IconButton} from "react-native-paper";

const UnderConstruction = props => {
    return(
        <View style={styles.container}>
            <IconButton
                icon={'alert'}
                color={'yellow'}
                size={50}
            />
            <Text style={styles.text}>Sorry, This feature is under development</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '95%',
        alignItems: 'center'
    },
    text:{
        fontFamily: 'poppins-medium',
        color: 'yellow'
    }
})

export default UnderConstruction
