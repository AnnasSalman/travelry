import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {IconButton} from 'react-native-paper'

const NumberIncrementer = props => {


    return(
        <View style={[props.style, styles.container]}>
            <IconButton
                icon={'chevron-up'}
                color={props.color}
                size={props.size}
                onPress={()=>props.onChange(props.children+props.step)}
            />
            <Text style={{color: props.color, fontSize: props.size-10, fontWeight: 'bold'}}>{props.children}</Text>
            <IconButton
                icon={'chevron-down'}
                color={props.color}
                size={props.size}
                onPress={()=>props.onChange(props.children-props.step)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})

export default NumberIncrementer
