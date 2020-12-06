import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from "../../../constants/Colors";

const barFillPercentage = (max, value) => {
    return ((value/max)*100) + '%'
}

const barColor = (value, higher, medium, lower) => {
    if(value > higher){
        return 'red'
    }
    else if(value > medium){
        return Colors.ForestBiome.primary
    }
    else if(value > lower){
        return Colors.ForestBiome.primaryVariant
    }
}

const WeatherEntity = props => {

    return(
        <View style={props.style}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.unit}>{props.unit}</Text>
            <View style={styles.bar}>
                <View style={[styles.barFilled,
                    {
                        width: barFillPercentage(props.max, props.value),
                        backgroundColor: barColor(props.value, props.high, props.medium, props.low)
                    }]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        color: 'grey',
        fontWeight: 'bold',
    },
    value: {
        marginTop: 5,
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold'
    },
    unit: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bar: {
        height: '3%',
        width: '65%',
        backgroundColor: 'grey',
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    barFilled: {
        height: '100%',
        backgroundColor: 'red'
    }
})

export default WeatherEntity
