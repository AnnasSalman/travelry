import React from 'react'
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native'
import {IconButton} from 'react-native-paper'
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";

const HobbyWidget = props => {
    return(
        <View style={[props.style, styles.box]}>
            <ImageBackground style={styles.image} source={{url: props.image}}>
                <LinearGradient
                    colors={['transparent', props.isSelected?Colors.ForestBiome.backgroundVariant:props.tint]}
                    start={[0.5, 0]}
                    end={[0.5, 0.95]}
                    style={styles.container}
                >
                    {
                        props.isSelected?
                        <View>
                            <IconButton
                                icon={'check-circle'}
                                color={Colors.ForestBiome.primary}
                                size={25}
                            />
                        </View>
                            :null
                    }
                </LinearGradient>
            </ImageBackground>
            <View style={{...styles.bottom, backgroundColor: props.isSelected?Colors.ForestBiome.backgroundVariant:props.barColor}}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={{url: props.icon}}/>
                    <Text style={{...styles.text, color: props.isSelected?'grey':props.textColor}}>{props.name}</Text>
                </View>
                <Text style={{...styles.subtext, color: props.textColor}}>{props.subtext}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    icon: {
        height: 18,
        width: 18
    },
    box: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    image: {
        flex: 1.3,
    },
    bottom: {
        flex: 1,
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 15
    },
    subtext: {
        fontFamily: 'poppins-regular',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    selectedText: {
        color: Colors.ForestBiome.primary,
        fontWeight: 'bold',
        fontSize: 12
    },
    rowSimple: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default HobbyWidget
