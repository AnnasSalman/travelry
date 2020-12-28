import React, {useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Animated, ImageBackground} from 'react-native'
import {Button, IconButton, Portal, Modal, Provider} from 'react-native-paper'
import SlidingUpPanel from "rn-sliding-up-panel";
import AmenityPanel from "../../../components/molecules/AmenityPanel/AmenityPanel";
import Colors from "../../../constants/Colors";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {uri} from "../../../constants/Addresses";
import Loading from "../../../components/atoms/Loading/Loading";
import {MaterialIcons, Ionicons} from 'react-native-vector-icons'
import {Rating} from "react-native-ratings";

const {width, height} = Dimensions.get('window')
const animatedValue = new Animated.Value(height * 0.28)
const baseURI = uri

const Room = props => {



    const facilityPanel = useRef(null)

    const [roomState, setroomState] = useState({})
    const [imageLoading, setimageLoading] = useState(false)
    const [paginationIndex, setPaginationIndex] = useState(0)
    const [headingPercentage, setheadingPercenrage] = useState(0)
    const [filters, setfilters] = useState({})
    const [bookingVisible, setbookingVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(()=>{
        setroomState(props.navigation.state.params.item)
        setfilters(props.navigation.state.params.filter)
    },[])

    console.log(roomState)

    const carouselItem = ({item, index}) => {

        return(
                <ImageBackground
                    source={{uri: baseURI + '/hotels/room/images/'+item}}
                    style={styles.carouselItem}
                    onLoadStart={()=>setimageLoading(true)}
                    onLoadEnd={()=>setimageLoading(false)}
                >
                    <Loading animating={imageLoading} color={Colors.ForestBiome.primary} type={'Fold'}/>
                </ImageBackground>

        )
    }

    return(
        <View style={styles.container}>
            {roomState.pictures?
                <View>
                    <Carousel
                        data={roomState.pictures}
                        renderItem={carouselItem}
                        sliderWidth={width}
                        itemWidth={width}
                        layout='tinder'
                        onSnapToItem={(index) => setPaginationIndex(index)}
                    />
                    <View style={styles.header}>
                        <IconButton
                            icon={'chevron-left'}
                            size={35}
                            color={Colors.ForestBiome.primary}
                            onPress={()=>props.navigation.goBack()}
                        />
                    </View>
                    <Pagination
                        dotsLength={roomState.pictures.length}
                        activeDotIndex={paginationIndex}
                        containerStyle={styles.pagination}
                        dotStyle={styles.dots}
                    />
                </View>:null
            }
            {
                roomState.roomInfo?
                <View style={styles.body}>
                    <View style={styles.bodyTop}>
                        <View style={styles.bodyLeft}>
                            <Text style={styles.heading}>{roomState.roomInfo.roomName}</Text>
                            <Text style={styles.subheading}>{roomState.roomInfo.roomType} Rooms at</Text>
                            <Text style={styles.subheading}>{roomState.hotelInfo.hotelName}</Text>
                        </View>
                        <IconButton
                            icon='directions'
                            color={Colors.ForestBiome.primary}
                            size={50}
                            onPress={() => props.navigation.navigate('Home')}
                        />
                    </View>
                    <View style={styles.bodyBottom}>
                        <View style={styles.ratingBar}>
                            <Rating
                                type='star'
                                ratingTextColor='grey'
                                ratingCount={5}
                                imageSize={20}
                                readonly
                                showReadOnlyText={false}
                                showRating={false}
                                style={{width: 100, backgroundColor: 'green'}}
                                // onFinishRating={this.ratingCompleted}
                            />
                            <Text style={styles.ratingText}>2.6</Text>
                        </View>
                        <Text style={styles.bodyText}>4 Ratings</Text>
                        <Text style={styles.bodyText}>{roomState.roomInfo.description?roomState.roomInfo.description:'No Description to Show'}</Text>
                    </View>
                    <View style={styles.bodyInfo}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons
                                name='ios-pricetag'
                                size={25}
                                color={Colors.ForestBiome.background}
                            />
                            <Text style={styles.bodyText}>Rs.<Text style={styles.ratingText}>{roomState.roomInfo.price}</Text>/Night</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcons
                                name='people'
                                size={25}
                                color={Colors.ForestBiome.background}
                            />
                            <Text style={styles.ratingText}>{roomState.roomInfo.amountOfGuests}</Text>
                        </View>
                    </View>

                </View>:
                null
            }
            <SlidingUpPanel
                draggableRange={{top: (height*0.67)-80, bottom: height * 0.28}}
                animatedValue={animatedValue}
                snappingPoints={[height * 0.28, (height*0.67)-85]}
                allowDragging={false}
                ref={facilityPanel}
                showBackdrop={false}
            >
                <AmenityPanel
                    onPanelPress={()=>{
                        facilityPanel.current.show()
                        setheadingPercenrage(15)
                    }}
                    roomAmenities={roomState.amenities}
                    headingPercentage={headingPercentage}
                    onClose={()=>{
                        facilityPanel.current.hide()
                        setheadingPercenrage(0)
                    }}
                />
            </SlidingUpPanel>
            <View style={styles.bottomBar}>
                <Button
                    mode="contained"
                    style={styles.button}
                    color={Colors.ForestBiome.primary}
                    onPress={()=>props.navigation.navigate('booking',{filters, room:roomState})}
                >
                    Reserve Room
                </Button>
            </View>
        </View>
    )
}


Room.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background
    },
    bottomBar: {
        height: height*0.18,
        backgroundColor: Colors.ForestBiome.background,
        position:'absolute',
        left: 0,
        bottom: 0,
        width: width,
        alignItems: 'center',
        paddingTop: height*0.02
    },
    button:{
        height: height*0.07,
        width: width*0.8,
        justifyContent: 'center',
        borderRadius: 15
    },
    body: {
        height: height*0.7,
        borderRadius: 50,
        backgroundColor: 'white',
        position:'absolute',
        left: 0,
        bottom: 0,
        width: width,
        alignItems: 'center',
        paddingTop: height*0.018,
        paddingHorizontal: 15,
        opacity: 0.93
    },
    bodyTop:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    bodyBottom:{
        justifyContent: 'center',
        width: '90%'
    },
    bodyLeft: {
        width: '50%'
    },
    carouselItem: {
        height: height*0.4,
        backgroundColor: Colors.ForestBiome.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pagination: {
        marginTop: -120
    },
    dots: {
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: Colors.ForestBiome.primary
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.ForestBiome.background
    },
    subheading: {
        fontSize: 12,
        color: 'grey',
        fontFamily: 'poppins-medium',
        marginLeft: 5
    },
    bodyText: {
        fontSize: 13,
        color: 'grey',
        fontFamily: 'poppins-medium',
        margin: 3,
        textAlign: 'left'
    },
    ratingBar:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: 'grey',
        fontSize: 22,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    bodyInfo: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 25,
    }
})

export default Room
