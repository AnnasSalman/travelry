import React from 'react'
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from "../../../constants/Colors";
import {Rating} from 'react-native-ratings'
import {IconButton} from "react-native-paper";
import Loading from "../Loading/Loading";


const PlaceCard = props => {

    console.log(props.image)
    const titleFontSizeDetect = () => {
        if(props.title.length<=11){
            return {
                fontSize: 20
            }
        }
        else if(props.title.length<=20){
            return {
                fontSize: 15
            }
        }
        else{
            return{
                fontSize: 13
            }
        }
    }

    const subtitleFontSizeDetect = () => {
        if(props.vicinity.length>22){
            return {fontSize: 10}
        }
        else{
            return {fontSize: 12}
        }

    }


    return(
        <View style={{...props.cardStyle, ...styles.container}}>
            <View
                style={{...styles.image, height: props.cardStyle.height*1.15}}
            >
                <ImageBackground
                    source={props.image?{uri:props.image}:{uri:props.icon}}
                    style={styles.imageBack}
                >
                    <Loading animating={props.imageLoading} type={'Fold'} color={Colors.ForestBiome.primary}/>
                </ImageBackground>
            </View>
            <View style={styles.textBar}>
                <Text style={{...styles.subtitle, fontSize: 10}}>Result {props.index+1}/{props.total}</Text>
                <Text style={{...styles.title, ...titleFontSizeDetect()}}>{props.title}</Text>
                <Text style={{...styles.subtitle, ...subtitleFontSizeDetect()}}>{props.vicinity}</Text>
                <Rating
                    startingValue={props.rating}
                    type='custom'
                    imageSize={25}
                    ratingColor={Colors.ForestBiome.primary}
                    count={5}
                    readonly
                    style={styles.ratings}
                />
                <TouchableOpacity style={styles.directions} onPress={props.onDirectionsPress}>
                    <Text style={styles.buttonText}>Get Directions</Text>
                    <IconButton
                        icon='directions'
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        elevation: 3,
        borderRadius: 5
    },
    image: {
        width: '35%',
        position: 'absolute',
        left: -1,
        bottom: -10,
        borderRadius: 5
    },
    imageBack: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    textBar: {
        marginLeft: '35%',
        height: '100%',
        padding: 15,
        //justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.primary
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.background,
    },
    ratings: {
        margin: 5
    },
    directions: {
        position: 'absolute',
        bottom: -12,
        right: 15,
        width: '85%',
        height: '30%',
        borderRadius: 5,
        backgroundColor: Colors.ForestBiome.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '10%',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'poppins-regular'
    }
})

export default PlaceCard
