import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";

const AmenityIconButton = props => {
    return(
        <View style={[props.containerStyles, styles.container,{width: props.size+30}]}>
            <IconButton
                color={props.color}
                size={props.size}
                onPress={props.onPress}
                icon={props.icon}
                style={[styles.button,props.buttonStyles]}
            />
            <Text style={{...styles.text, color: props.textColor}}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    button: {
        marginBottom: 0
    },
    text: {
        textAlign: 'center',
        fontSize: 11
    }
})

export default AmenityIconButton
