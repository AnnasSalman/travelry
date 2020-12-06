import React, {useRef, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native'
import {IconButton} from 'react-native-paper'
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";
import {Transition, Transitioning} from 'react-native-reanimated'

const numberToPosition = (number) => number==0?'1st':number==1?'2nd':'3rd'

const SelectedHobby = props => {

    const nameView = useRef(null)

    const onPressInHandler = () => {
        props.drag()
    }

    return(
        <TouchableOpacity
            style={[props.style, styles.container]}
            onLongPress={onPressInHandler}
        >
            <ImageBackground style={styles.imageBackground} source={{url: props.image}}>
                <View
                    style={
                        props.isActive?
                        {...styles.gradientActive, backgroundColor: props.barColor}:
                        {...styles.gradient, backgroundColor: props.tint}
                    }
                >
                    <View>
                        <Image style={styles.icon} source={{url: props.icon}}/>
                        <Text style={[
                            {color: props.isActive?props.textColor:props.textColor},
                            props.isActive?styles.textSelected:styles.text
                            ]}>
                            {props.name}
                        </Text>
                        <Text style={{...styles.bodyText, color: props.textColor}}>
                            {props.subtext}
                        </Text>
                    </View>
                    {
                        props.isActive?null:
                        <View style={styles.row}>
                            <IconButton
                                color={props.barColor}
                                icon={'delete'}
                                size={30}
                                style={{backgroundColor: props.textColor}}
                                onPress={props.onDelete}
                            />
                        </View>
                    }
                </View>
            </ImageBackground>
            <View style={{...styles.priority, backgroundColor: props.textColor, left: props.isActive?'60%':'2%'}}>
                <Text style={{...styles.priorityText, color: props.barColor}}>{numberToPosition(props.index)} priority</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor: props.isActive ? "blue" : "red",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 12
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        opacity: 0.92,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    gradientActive: {
        flex: 1,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    text:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    textSelected: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    icon: {
        height: 35,
        width: 35
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bodyText: {
        width: 250,
        fontFamily: 'poppins-medium',
        fontSize: 12,
    },
    priority: {
        position: 'absolute',
        top: -15,
        backgroundColor: 'red',
        width: '38%',
        alignItems: 'center',
        justifyContent:'center',
        height: '22%',
        borderRadius: 5
    },
    priorityText: {
        fontWeight: 'bold',
        fontFamily: 'poppins-medium',
        fontSize: 22
    }
})

export default SelectedHobby
