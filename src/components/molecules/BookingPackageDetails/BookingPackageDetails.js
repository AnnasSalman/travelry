import React from 'react'
import {View, Text, StyleSheet} from "react-native";
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";

const BookingPackageDetails = props => {
    return(
        <View style={props.style}>
            <Text style={styles.heading}>Your Package:</Text>
            {
                props.normalizedBookings.map((room)=>
                    (
                        <View key={room.roomid} style={styles.row}>
                            <IconButton
                                color={Colors.ForestBiome.primary}
                                size={20}
                                icon={'bed-empty'}
                            />
                            <Text style={styles.packageInfo}> {room.amount} {room.roomDetails.roomName}{room.roomDetails.roomName[room.roomDetails.roomName.length-1]==='s'?null:'s'}</Text>
                            <Text style={styles.packageInfo}> {props.days} Days</Text>
                            <Text style={styles.packageInfo}> for {props.stayDuration*room.amount*room.price}</Text>
                        </View>
                    )
                )
            }
            <View style={styles.divider}/>
            <Text style={styles.totalHeading}>Total</Text>
            <Text style={styles.totalValue}>{props.grandTotal} <Text style={styles.totalHeading}>Rupees</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold'
    },
    packageInfo: {
        color: 'white',
        fontSize: 14,
        width: '25%',
        textAlign: 'center'
    },
    totalHeading: {
        color: 'white',
        fontFamily: 'poppins-regular',
        fontSize: 16,
        marginTop: 8
    },
    totalValue: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 30,
        marginTop: -6
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: Colors.ForestBiome.primary,
        marginVertical: 8
    },
    button: {
        width: '60%',
        marginVertical: 5
    }
})

export default BookingPackageDetails
