import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {Button, IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import Loading from "../../../components/atoms/Loading/Loading";
import Booking from "../../../models/Booking";
import moment from "moment";
import DropdownAlert from "react-native-dropdownalert";

const {height, width} = Dimensions.get('window')

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

const NumberOfRooms = props => {

    const alert = useRef(null)

    const [rooms, setRooms] = useState(1)
    const [loading, setloading] = useState(false)

    const [availabilityResponse, setavailabilityResponse] = useState({})

    const onSubmit = async() => {
        const recieved = (props.navigation.state.params)
        setloading(true)
        try{
            const booking = new Booking(recieved.room.hotelid, recieved.room.roomInfo.key, rooms, recieved.startDate, recieved.endDate)
            const availability = await booking.checkAvailability()
            console.log(availability)
            setloading(false)
            setavailabilityResponse(availability)
        }
        catch(e){
            setloading(false)
        }
    }

    const onConfirmBooking = async() => {
        const recieved = (props.navigation.state.params)
        try{
            const booking = new Booking(recieved.room.hotelid, recieved.room.roomInfo.key, rooms, recieved.startDate, recieved.endDate)
            const availability = await booking.checkAvailability()
            const booked = await booking.bookRooms()
            alert.current.alertWithType('custom','Booking Successful', 'Your Rooms are reserved')
        }
        catch(e){
            alert.current.alertWithType('error','Booking Failed', 'Check Your Internet connection or maybe someone else booked the room')

        }
        setTimeout(()=>{
            props.navigation.navigate('roomScreen')
        },4000)
    }

    const message = () => {
        const recieved = (props.navigation.state.params)
        if(availabilityResponse && availabilityResponse.rooms){
            if(availabilityResponse.status){
                return(
                    <View>
                        <View style={styles.messageBox}>
                            <IconButton
                                icon='check-circle-outline'
                                size={40}
                                color={Colors.ForestBiome.primaryVariant}
                            />
                            <Text style={styles.message}>Your {availabilityResponse.length>1?availabilityResponse.length:null}{availabilityResponse.length>1?' rooms are':'room is'} available</Text>
                            <Text style={styles.message}>between</Text>
                            <Text style={styles.messageImp}>{recieved.startDate}</Text>
                            <Text style={styles.message}>and</Text>
                            <Text style={styles.messageImp}>{recieved.endDate}</Text>
                            <Text style={{...styles.message, fontSize: 12}}>Your Total Payment Will be</Text>
                            <Text style={{...styles.message, fontSize: 15, color: Colors.ForestBiome.primary}}>Rupees {(getDates(recieved.startDate, recieved.endDate).length-1)*recieved.room.roomInfo.price*rooms}</Text>

                        </View>
                        <View>
                            <Button
                                mode="outlined"
                                style={{...styles.smallerButtonImpact}}
                                color={Colors.ForestBiome.primary}
                                onPress={()=>onConfirmBooking()}
                                loading={loading}
                                disabled={loading}
                            >
                                Confirm Booking
                            </Button>
                            <Button
                                mode="outlined"
                                style={styles.smallerButton}
                                color={Colors.ForestBiome.primary}
                                onPress={()=>setavailabilityResponse({})}
                                loading={loading}
                                disabled={loading}
                            >
                                Change Booking Details
                            </Button>
                            <Button
                                mode="outlined"
                                style={styles.smallerButton}
                                color={Colors.ForestBiome.primary}
                                onPress={()=>props.navigation.navigate('roomScreen')}
                                loading={loading}
                                disabled={loading}
                            >
                                Quit Booking
                            </Button>
                        </View>
                    </View>
                    )
            }
            else{
                return(
                    <View>
                        <View style={styles.messageBox}>
                            <IconButton
                                icon='alert-circle-outline'
                                size={40}
                                color={Colors.ForestBiome.primary}
                            />
                            <Text style={styles.messageImp}>The Rooms You Are Looking For Are Unavailable for the given Dates :(</Text>
                            <Text style={{...styles.message, fontSize: 12}}>Try searching for different Rooms</Text>
                        </View>
                        <Button
                            mode="outlined"
                            style={{...styles.smallerButton, marginTop: 15}}
                            color={Colors.ForestBiome.primary}
                            onPress={()=>setavailabilityResponse({})}
                            loading={loading}
                            disabled={loading}
                        >
                            Change Booking Details
                        </Button>
                        <Button
                            mode="outlined"
                            style={styles.smallerButton}
                            color={Colors.ForestBiome.primary}
                            onPress={()=>props.navigation.navigate('roomScreen')}
                            loading={loading}
                            disabled={loading}
                        >
                            Quit Booking
                        </Button>
                    </View>
                )
            }
        }
        else{
            return null
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton
                        icon='chevron-left'
                        color={Colors.ForestBiome.primary}
                        size={30}
                        onPress={()=>props.navigation.goBack()}
                    />
                    <Text style={styles.heading}>Booking Details</Text>
                </View>
                <IconButton
                    icon='close-circle'
                    color={Colors.ForestBiome.primary}
                    size={30}
                    onPress={()=>props.navigation.navigate('roomScreen')}
                />
            </View>
            {!(availabilityResponse && availabilityResponse.rooms)?
                <Text style={styles.subHeading}>Step 2/2 - Pick the Number of Rooms</Text>:
                <Text style={styles.subHeading}>Step 2/2 - Check your Current Booking Status</Text>
            }
            <View style={styles.body}>
                {!(availabilityResponse && availabilityResponse.rooms)?
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 40}}>
                    <IconButton
                        icon='minus'
                        color={Colors.ForestBiome.primary}
                        size={35}
                        onPress={()=>{if(rooms>1){setRooms(rooms-1)}}}
                    />
                    <Text style={styles.value}>{rooms}</Text>
                    <IconButton
                        icon='plus'
                        color={Colors.ForestBiome.primary}
                        size={35}
                        onPress={()=>setRooms(rooms+1)}
                    />
                </View>:null}
                <Loading animating={loading} type='Fold' color={Colors.ForestBiome.primary}/>
                {
                    message()
                }


            </View>
            {!(availabilityResponse && availabilityResponse.rooms)?
            <View style={styles.bottom}>
                <Button
                    mode="contained"
                    style={styles.button}
                    color={Colors.ForestBiome.primary}
                    onPress={()=>onSubmit()}
                    loading={loading}
                    disabled={loading}
                >
                    Check Availability
                </Button>
            </View>:null
            }
            <DropdownAlert ref={alert} containerStyle={styles.alert} titleStyle={{color: Colors.ForestBiome.secondary, fontSize: 18}}/>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background
    },
    header: {
        padding: 40,
        paddingHorizontal: 10,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body:{
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    heading: {
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.primary,
        fontSize: 26,
    },
    value: {
        color: 'white',
        fontSize: 25
    },
    subHeading: {
        color: Colors.ForestBiome.primary,
        paddingHorizontal: 40,
        paddingBottom: 10,
        fontSize: 15,
    },
    button:{
        height: height*0.07,
        width: width*0.8,
        justifyContent: 'center',
        borderRadius: 15,
    },
    bottom: {
        alignItems:'center',
        position: 'absolute',
        bottom: 60,
        width: '100%'
    },
    message: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    messageImp: {
        color: Colors.ForestBiome.primary,
        fontSize: 24,
        textAlign:'center',
        margin: 5
    },
    actionBar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallerButton:{
        width: '100%',
        margin: 2,
        borderWidth: 0
    },
    smallerButtonImpact : {
        borderColor: Colors.ForestBiome.primary,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
    },
    messageBox: {
        borderWidth: 1,
        padding: 15,
        borderColor: Colors.ForestBiome.primary,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        alignItems: 'center'
    },
    alert: {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: Colors.ForestBiome.primaryVariant,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    }
})

NumberOfRooms.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default NumberOfRooms

