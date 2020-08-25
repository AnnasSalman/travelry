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
import DropdownAlert from "react-native-dropdownalert";

const baseURI= uri
const {width, height} = Dimensions.get('window')
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate()+1)

const Rooms = props => {

    const filterPanel = useRef(null)
    const alert = useRef(null)

    const [roomState, setroomState] = useState([])
    const [filterApplied, setfilterApplied] = useState(false)
    const [loading, setloading] = useState(false)
    const [filter, setfilter] = useState({})
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(()=>{
        setloading(true)
        onFilterApply({guests: 1, startDate: today, endDate: tomorrow, from: 0, to: 100000})
        setloading(false)
    },[])
    useEffect(()=>{
        if(filterApplied){
            const text='Found '+roomState.length+' Rooms '
            const text2 = 'that allow at least '+filter.guests+
                ' guests between the price limit '+filter.from+' to '+filter.to+' during '+filter.startDate.substring(0,10)+' & '+filter.endDate.substring(0,10)
            alert.current.alertWithType('custom',text,text2)
        }
    },[filter])

    const onFilterApply = async ({guests, startDate, endDate, from, to}) => {
        setfilter({guests, startDate, endDate, from, to})
        setloading(true)
        const rooms = new Room()
        try{
            const roomsResponse = await rooms.requestRooms(guests, from, to, startDate, endDate)
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
                <Text style={styles.text}>Available Rooms</Text>
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
                            onPress={()=>{
                                props.navigation.navigate('roomScreen', {item, filter})
                            }}
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
                <FilterPanel
                    animatedValue={animatedValue}
                    onClose={() => filterPanel.current.hide()}
                    onSubmit={(val) => {
                        setfilterApplied(true)
                        onFilterApply(val)
                    }}
                    loading={loading}
                />
            </SlidingUpPanel>
            <DropdownAlert ref={alert} containerStyle={styles.alert} titleStyle={{color: Colors.ForestBiome.secondary, fontSize: 18}}/>
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
    },
    criteria: {
        margin: 10,
        marginTop: 0,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    desc: {
        color: 'grey',
        fontSize: 12
    },
    alert: {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: Colors.ForestBiome.background,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    }
})

export default Rooms
