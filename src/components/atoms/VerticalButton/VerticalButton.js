import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Colors from "../../../constants/Colors";

const VerticalButton = props => {
    const styles = StyleSheet.create({
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: props.color
        },
        description: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.ForestBiome.primary,
            borderRadius: 15,
            paddingVertical: 4,
            paddingHorizontal: '5%',
            marginVertical: 5
        },
        descriptionText: {
            color: props.tint,
            width: '85%',
        },
        circle: {
            backgroundColor: props.tint,
            borderRadius: 10,
            width: 18,
            alignItems: 'center'
        },
        circleText: {
            color: props.color
        }
    })

    return(
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={styles.text}>{props.children}</Text>
            </TouchableOpacity>
            <View style={styles.description}>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{props.amount}</Text>
                </View>
                <Text style={styles.descriptionText}> {props.description}</Text>
            </View>
        </View>

    )
}

export default VerticalButton
