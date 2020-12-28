import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Dimensions, Image, ImageBackground} from "react-native";
import {Button, Provider, Portal, Modal, IconButton} from 'react-native-paper'
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Tours from "../Tours/Tours";
import Carousel from "react-native-snap-carousel";
import Keys from "../../../constants/Keys";
import { Rating } from 'react-native-ratings';
import UserInfo from "../../../models/UserInfo";
import Tour from '../../../models/Tour'
import DropdownAlert from 'react-native-dropdownalert';


const {width, height} = Dimensions.get('window')

const _averageRatings = (ratings) => {
    let sum = 0
    ratings.forEach((rating)=>{
        sum+=rating.stars
    })
    return (sum/ratings.length).toFixed(1)
}

const _renderItem = ({item, index}) => {
    return (
        <View style={styles.cityItem}>
            <ImageBackground
                source={{url: 'https://maps.googleapis.com/maps/api/place/photo?key='+Keys.mapsKey+'&photoreference='+item.place.photos[0].photo_reference+'&maxwidth=650'}}
                style={styles.image}
            >
                <View style={styles.imageOverlay}>
                    <Text style={styles.cityName}>{item.place.name}</Text>
                    <Text style={styles.address}>{item.place.formatted_address}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const TourInitialScreen = props => {

    const alertRef = useRef(null)

    const [modalVisible, setModalVisible] = useState(false);
    const [ratings, setRatings] = useState(props.navigation.state.params.item.ratings)
    const [userInfo, setUserInfo] = useState(null)
    const [liveRating, setLiveRating] = useState(1)
    const [tourRated, setTourRated] = useState(false)
    const [ratingLoading, setRatingLoading] = useState(false)

    useEffect(()=>{
        fetchUserInfo()
    },[])

    const fetchUserInfo = async() => {
        try{
            const userInfo = new UserInfo()
            const userData = await userInfo.getUserInfo()
            setUserInfo(userData)
        }
        catch(e){
            console.log('userData error')
        }
    }

    const findUserRating = () => {
        if(userInfo){
            const result = ratings.find(ratingObj => {
                return ratingObj.userid === userInfo.id
            })
            return result
        }
        else{
            return false
        }
    }

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const _openTour = () => {
        props.navigation.navigate('plan',{tourId: props.navigation.state.params.item._id})
    }

    const _backHandler = () => {
        props.navigation.goBack()
    }

    const onRateTour = async(rating) => {
        const tour = new Tour()
        setRatingLoading(true)
        let ratingStatus = 0
        try{
            if(findUserRating()){
                ratingStatus = await tour.updateTourRating(
                    props.navigation.state.params.item._id,
                    {
                        stars: rating,
                        userid: userInfo.id
                    }
                )
            }
            else{
                ratingStatus = await tour.rateTour(
                    props.navigation.state.params.item._id,
                    {
                        stars: rating,
                        userid: userInfo.id
                    }
                )
            }
            if(ratingStatus === 200){
                setTourRated(true)
                setRatingLoading(false)
                if(findUserRating()){
                    let ratingIndex = 0
                    const resultIndex = ratings.find((ratingObj, index) => {
                        if(ratingObj.userid === userInfo.id){
                            ratingIndex = index
                            return ratingObj
                        }
                    })
                    const tempRatings = ratings
                    tempRatings[ratingIndex] = {
                        stars: rating,
                        userid: userInfo.id
                    }
                    setRatings(tempRatings)
                }
                else{
                    setRatings([...ratings, {
                        stars: rating,
                        userid: userInfo.id
                    }])
                }
            }
            hideModal()
            alertRef.current.alertWithType('success', 'Rating Submitted', 'Tour rated successfully, thanks for your feedback.');
        }
        catch(e){
            hideModal()
            console.log('rating error')
            console.log(e)
            setRatingLoading(false)
        }
    }

    return(
        <Provider>
            <Portal>
                <View style={styles.container}>
                    <CustomHeader
                        text={props.navigation.state.params.item.title}
                        subtext={'Details about your selected tour'}
                        titleStyle={styles.headerText}
                        containerStyle={styles.header}
                        subtitleStyle={styles.sub}
                        onBack={_backHandler}
                    />
                    <View style={styles.body}>
                        <Text style={styles.title}>Cities/Towns</Text>
                        <Carousel
                            data={props.navigation.state.params.item.cities}
                            renderItem={_renderItem}
                            sliderWidth={width}
                            itemWidth={width*0.4}
                        />
                        <Text style={styles.description}>{props.navigation.state.params.item.description}</Text>
                        <View style={styles.bottomBar}>
                            <View style={styles.row}>
                                <View style={styles.statBar}>
                                    <Text style={styles.property}>Total Tour Distance</Text>
                                    <Text style={styles.value}>{Math.floor(props.navigation.state.params.item.totalTourDistance/1000)} km</Text>
                                </View>
                                <View style={{...styles.statBar, marginTop: 25}}>
                                    <Text style={styles.property}>Average Rating</Text>
                                    {
                                        props.navigation.state.params.item.ratings.length>0?
                                            <Text style={styles.value}>
                                                {_averageRatings(ratings)}
                                            </Text>:
                                            <Text style={styles.value}>No ratings yet</Text>
                                    }
                                    {
                                        userInfo?
                                        <View style={{alignItems: 'center', marginTop: 5}}>
                                            <Text style={styles.property}>Your Rating</Text>
                                            {findUserRating()?
                                                <Rating
                                                    readonly
                                                    type={'custom'}
                                                    style={{ paddingVertical: 10 }}
                                                    ratingBackgroundColor={Colors.ForestBiome.background}
                                                    ratingColor={Colors.ForestBiome.primary}
                                                    imageSize={15}
                                                    startingValue={findUserRating().stars}
                                                    tintColor={Colors.ForestBiome.backgroundVariant}
                                                />:
                                                <Text style={styles.value}>N/A</Text>
                                            }
                                            <IconButton
                                                icon={'pencil'}
                                                color={Colors.ForestBiome.primary}
                                                size={20}
                                                onPress={showModal}
                                                style={{marginTop: -10}}
                                            />
                                        </View>:null
                                    }
                                </View>
                                <View style={styles.statBar}>
                                    <Text style={styles.property}>Total Tour Duration</Text>
                                    <Text style={styles.value}>{props.navigation.state.params.item.time} Days</Text>
                                </View>
                            </View>
                            {/*<Button*/}
                            {/*    icon="pine-tree"*/}
                            {/*    mode="contained"*/}
                            {/*    onPress={() => console.log('Pressed')}*/}
                            {/*    color={Colors.ForestBiome.primary}*/}
                            {/*    style={styles.button}*/}
                            {/*>*/}
                            {/*    View Tourist Attractions*/}
                            {/*</Button>*/}
                            <Button
                                icon="routes"
                                mode="contained"
                                onPress={_openTour}
                                color={Colors.ForestBiome.primary}
                                style={styles.button}
                            >
                                View Tour Schedule
                            </Button>
                        </View>
                    </View>
                    <Modal
                        dismissable={false}
                        visible={modalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <View style={styles.innerContainer}>
                            <Rating
                                showRating
                                type={'custom'}
                                style={{ paddingVertical: 10 }}
                                ratingBackgroundColor={Colors.ForestBiome.background}
                                ratingColor={Colors.ForestBiome.primary}
                                imageSize={35}
                                startingValue={findUserRating()?findUserRating().stars:liveRating}
                                minValue={1}
                                tintColor={Colors.ForestBiome.backgroundVariant}
                                onFinishRating={(rating)=>setLiveRating(rating)}
                            />
                            <Button
                                icon="check"
                                mode="outlined"
                                onPress={()=>onRateTour(liveRating)}
                                color={Colors.ForestBiome.primary}
                                style={styles.submit}
                                loading={ratingLoading}
                            >
                                {findUserRating()?'Update Rating':'Submit Rating'}
                            </Button>
                            <IconButton
                                icon={'close'}
                                color={Colors.ForestBiome.primary}
                                size={25}
                                style={styles.buttonClose}
                                onPress={hideModal}
                            />
                        </View>
                    </Modal>
                    <DropdownAlert
                        ref={alertRef}
                        successColor={Colors.ForestBiome.primaryVariant}
                        defaultContainer={{paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10}}
                    />
                </View>
            </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background,
        paddingBottom: 55
    },
    header: {
        marginTop: 20,
        alignItems: 'center'
    },
    headerText: {
        color: Colors.ForestBiome.primary,
    },
    sub:{
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 15,
    },
    image: {
        height: '100%',
        alignItems: 'center'
    },
    cityItem: {
        height: height*0.35,
    },
    imageOverlay: {
        marginTop: '10%',
        width: '100%',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 3,
        opacity: 0.8,
        alignItems: 'center',
    },
    cityName: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'poppins-medium',
        marginTop: '3%',
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 2,
    },
    address: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'poppins-regular',
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        width: '90%',
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 2,
    },
    body: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    description: {
        fontSize: 14,
        color: 'white',
        marginVertical: 15,
        textAlign: 'center',
        width: '90%'
    },
    row: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        color: Colors.ForestBiome.primary,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5
    },
    property: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'poppins-regular',
        fontSize: 12
    },
    statBar: {
        alignItems: 'center',
        marginHorizontal: 15,
        width: '20%'
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 75,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    button: {
        marginVertical: 5,
        width: '90%',
        borderRadius: 15
    },
    modalContainer: {
        alignItems: 'center',
    },
    innerContainer: {
        width: '60%',
        height: '60%',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submit: {
        borderRadius: 20,
        borderColor: Colors.ForestBiome.primary,
        borderWidth: 2,
        marginTop: 12
    },
    buttonClose: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})

TourInitialScreen.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default TourInitialScreen
