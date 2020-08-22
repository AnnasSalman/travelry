import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import Colors from "../../../constants/Colors";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Loading from "../../atoms/Loading/Loading";

const {height, width} = Dimensions.get('window')

const RoomCard = props => {

    const [loading, setloading] = useState(false)

    return(
        <View style={styles.container}>
            <ImageBackground
                style={styles.picture}
                source={props.image?props.image:require('../../../../assets/placeholders/unavailableroom.png')}
                onLoadStart={()=>setloading(true)}
                onLoadEnd={()=>setloading(false)}
            >
                <Loading animating={loading} color={Colors.ForestBiome.primary} type='Fold'/>
            </ImageBackground>
            <View style={styles.data}>
                <View style={{flex:1}}>
                <Text style={styles.title}>{props.roomName}</Text>
                <Text style={styles.desc}>{props.hotelName}</Text>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={styles.text}>{props.description?(props.description.substring(0,70)+'...'):'No Description Available'}</Text>
                </View>
                </View>
                <Text style={styles.desc}>Rs.<Text style={{...styles.title, fontSize: 20}}>{props.price}</Text> / Night</Text>
                <Rating
                    type='star'
                    ratingTextColor='grey'
                    ratingCount={5}
                    imageSize={20}
                    readonly
                    showReadOnlyText={false}
                    showRating={false}
                    // onFinishRating={this.ratingCompleted}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        marginLeft: width*0.08,
        marginRight: width*0.08,
        overflow: 'hidden'
    },
    picture: {
        height: height*0.30,
        width: width*0.35,
        borderRadius: 15,
        backgroundColor: Colors.ForestBiome.background,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    data: {
        marginTop: height*0.03,
        marginBottom: height*0.03,
        marginLeft: width*0.06,
        marginRight: width*0.06,
        width: 0,
        flexGrow: 1,
        flex: 1,
    },
    title: {
        color: Colors.ForestBiome.background,
        fontFamily: 'poppins-medium',
        fontSize: 17,
        fontWeight: 'bold',
    },
    desc: {
        fontFamily: 'poppins-medium',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
    },
    text: {
        fontSize: 12,
        color: 'grey'
    }
})

export default RoomCard
