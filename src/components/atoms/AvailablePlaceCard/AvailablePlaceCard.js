import React from 'react'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import Keys from "../../../constants/Keys";

const AvailablePlaceCard = props => {
    return(
        <TouchableOpacity onPress={props.isSelected?null:props.onPress} style={{width: '100%'}}>
            <ImageBackground
                style={
                    [
                        props.style,
                        styles.container,
                        {
                            height: props.isSelected?props.style.height+30:props.style.height,
                            width: props.isSelected?props.style.width-30:props.style.width
                        }
                    ]
                }
                source={{url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference='+props.imageReference+'&key='+Keys.mapsKey}}>
                <View style={props.isSelected?stylesSelected.content:styles.content}>
                    <Text style={props.isSelected?stylesSelected.title:styles.title}>{props.name}</Text>
                    <Text style={props.isSelected?stylesSelected.subtitle:styles.subtitle}>{props.address}</Text>
                    <View style={styles.row}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={props.isSelected?stylesSelected.rating:styles.rating}>{props.rating}<Text style={styles.small}>/5</Text></Text>
                            <Text style={props.isSelected?stylesSelected.small:styles.small}>Rating</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={props.isSelected?stylesSelected.rating:styles.rating}>{props.reviews}</Text>
                            <Text style={props.isSelected?stylesSelected.small:styles.small}>Reviews</Text>
                        </View>
                    </View>
                    <Text style={props.isSelected?stylesSelected.statText:styles.statText}>Personalised Travelry Score</Text>
                    <View style={props.isSelected?stylesSelected.bar:styles.bar}>
                        <View style={{height: '100%', width: ((props.scoreCurrent/props.scoreHighest)*100)+'%', backgroundColor: Colors.ForestBiome.primary}}/>
                    </View>
                </View>
            </ImageBackground>
            {
                props.isSelected?
                    <IconButton
                        color={Colors.ForestBiome.backgroundVariant}
                        size={28}
                        icon={'check'}
                        style={stylesSelected.icon}
                    />
                    :null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 5,
        overflow: 'hidden'
    },
    content: {
        height: '100%',
        width: '45%',
        backgroundColor: Colors.ForestBiome.background,
        opacity: 0.85,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontWeight: 'bold',
        fontSize: 18,
        width: '80%',
        textAlign: 'center',
        marginVertical: 5
    },
    subtitle: {
        color: 'white',
        fontSize: 10,
        width: '90%',
        textAlign: 'center'
    },
    statText: {
        color: 'white',
        fontSize: 12,
        marginVertical: 6,
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center'
    },
    bar: {
        width: '90%',
        height: 5,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 5,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '30%',
        width: '60%'
    },
    rating: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    small: {
        color: Colors.ForestBiome.primary,
        fontSize: 12
    }
})
const stylesSelected = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 5,
        overflow: 'hidden',
    },
    content: {
        height: '100%',
        width: '55%',
        backgroundColor: 'white',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontWeight: 'bold',
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
        marginVertical: 5
    },
    subtitle: {
        fontSize: 11,
        width: '90%',
        textAlign: 'center'
    },
    statText: {
        fontSize: 14,
        marginVertical: 5,
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center'
    },
    bar: {
        width: '90%',
        height: 7,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 5,
        overflow: 'hidden'
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    small: {
        color: Colors.ForestBiome.primary,
        fontSize: 12
    },
    icon:{
        position: 'absolute',
        top: -5,
        left: -10,
        backgroundColor: Colors.ForestBiome.primary
    }
})

export default AvailablePlaceCard
