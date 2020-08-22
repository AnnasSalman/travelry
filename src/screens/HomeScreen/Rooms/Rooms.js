import React, {useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, Animated, Dimensions, FlatList} from 'react-native'
import Colors from "../../../constants/Colors";
import SlidingUpPanel from "rn-sliding-up-panel";
import {IconButton} from "react-native-paper";
import FilterPanel from "../../../components/molecules/FilterPanel/FilterPanel";
import axios from 'axios'
import Room from "../../../models/Rooms";
import RoomCard from "../../../components/molecules/RoomCard/RoomCard";
import {uri} from "../../../constants/Addresses";
import Loading from "../../../components/atoms/Loading/Loading";

const baseURI= uri
const {width, height} = Dimensions.get('window')
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate()+1)

const Rooms = props => {

    const filterPanel = useRef(null)

    const [roomState, setroomState] = useState([])
    const [filterApplied, setfilterApplied] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(()=>{
        setloading(true)
        onFilterApply({guests: 1, startDate: today, endDate: tomorrow, from: 0, to: 100000})
        setloading(false)
    },[])

    const onFilterApply = async ({guests, startDate, endDate, from, to}) => {
        setloading(true)
        const rooms = new Room()
        try{
            const roomsResponse = await rooms.requestRooms(guests, from, to, startDate, endDate)
            console.log(roomsResponse.length)
            setroomState(roomsResponse)
            setTimeout(()=>{
                filterPanel.current.hide()
            }, 400)
            setloading(false)
        }
        catch(e){
            console.log(e)
            setloading(false)
            filterPanel.current.hide()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon='arrow-left'
                    color={Colors.ForestBiome.secondary}
                    size={30}
                    onPress={() => props.navigation.navigate('Home')}
                />
                <Text style={styles.text}>Found 4 Rooms Near you</Text>
                <IconButton
                    icon='filter-variant'
                    color={Colors.ForestBiome.secondary}
                    size={30}
                    onPress={() => filterPanel.current.show(height * 0.97)}
                />
            </View>
            <View style={styles.listContainer}>
                {loading?
                    <Loading color={Colors.ForestBiome.primary} animating={loading} type='Fold'/>
                    :<FlatList
                    data={roomState}
                    renderItem={({item})=>(
                        <RoomCard
                            roomName={item.roomInfo.roomName}
                            hotelName={item.hotelInfo.hotelName}
                            description={item.roomInfo.description}
                            price={item.roomInfo.price}
                            image={item.pictures.includes(item.hotelid+'-'+item.roomInfo.key+'-cover'+'.jpg')?
                                {uri: baseURI + '/hotels/room/images/'+item.hotelid+'-'+item.roomInfo.key+'-cover'+'.jpg'}:
                                null
                            }
                        />
                    )}
                    keyExtractor={item => item.roomInfo.key}
                />}
            </View>
            <View style={styles.bottomBar}>

            </View>
            <SlidingUpPanel
                ref={filterPanel} allowDragging={false}
            >
                <FilterPanel onClose={() => filterPanel.current.hide()} onSubmit={(val) => onFilterApply(val)} loading={loading}/>
            </SlidingUpPanel>
        </View>
    )
    }

Rooms.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.ForestBiome.background,
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 20
    },
    listContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 25,
    },
    bottomBar: {
        height: 60,
        backgroundColor: Colors.ForestBiome.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position:'absolute',
        left: 0,
        bottom: 0,
        width: width
    }
})

export default Rooms
