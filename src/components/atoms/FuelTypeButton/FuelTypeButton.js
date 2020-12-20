import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {IconButton} from "react-native-paper";

const FuelTypeButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress} style={[props.style, {...styles.container, borderColor: props.isSelected?props.selectedColor:props.unSelectedColor}]}>
            <IconButton
                color={props.isSelected?props.selectedColor:props.unSelectedColor}
                size={40}
                icon={props.icon}
            />
            <Text style={{...styles.text, color: props.isSelected?props.selectedColor:props.unSelectedColor}}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 8
    },
    text: {
        marginTop: -20
    }
})

export default FuelTypeButton
