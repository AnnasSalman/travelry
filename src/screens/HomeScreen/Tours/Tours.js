import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Booking from "../Booking/Booking";
import Colors from "../../../constants/Colors";
import {FAB} from 'react-native-paper'
import UserInfo from "../../../models/UserInfo";
import * as Google from "expo-google-app-auth";
import Keys from "../../../constants/Keys";
import Carousel from 'react-native-snap-carousel';
import Tour from "../../../models/Tour";
import TourCard from "../../../components/atoms/TourCard/TourCard";
import {useIsFocused} from "react-navigation-hooks";

const {height, width} = Dimensions.get('window')

const Tours = props => {
    const isFocused = useIsFocused()

    const [highlyRatedTours, setHighlyRatedTours] = useState([])
    const [highlyRatedFetched, setHighlyRatedFetched] = useState(false)
    const [nearbyTours, setNearbyTours] = useState([])
    const [nearbyFetched, setNearbyFetched] = useState(false)

    useEffect(()=>{
        fetchTours('rating')
    },[isFocused])

    useEffect(()=>{
        fetchTours('nearby')
    },[isFocused])

    const fetchTours = async(type) => {
        const tour = new Tour()
        if(type === 'rating'){
            try{
                const ratedTours = await tour.getToursByRating()
                setHighlyRatedTours(ratedTours)
                setHighlyRatedFetched(true)
            }
            catch (e) {
                console.log(e)
            }
        }
        else if(type === 'nearby'){
            try{
                const nearbyTours = await tour.getToursNearMe()
                setNearbyTours(nearbyTours)
                setNearbyFetched(true)
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const _backHandler = () => {
        props.navigation.navigate('Home')
    }

    const signInWithGoogleAsync = async() => {
        const userInfo = new UserInfo()
        try {
            const result = await Google.logInAsync({
                iosClientId: Keys.OAuthID,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                await userInfo.setUserInfo(result.user)
                props.navigation.navigate('tourDemo')
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log('error signing in');
            return { error: true };
        }
    }

    const _newTourHandler = () => {
        const userInfo = new UserInfo()
        userInfo.getUserInfo().then(async(user)=>{
            if(user){
                props.navigation.navigate('tourDemo')
            }
            else{
                await signInWithGoogleAsync()
            }
        }).catch((e)=>{
            console.log(e)
        })
        // props.navigation.navigate('addLocations')
        // props.navigation.navigate('plan')
    }

    const _onViewTour = (item) => {
        props.navigation.navigate('toursInitialScreen', {item})
    }

    const _renderItem = ({item, index}) => {
        return (
            <TourCard
                style={styles.cardStyle}
                cities={item.cities}
                tourId={item._id}
                title={item.title}
                description={item.description}
                user={item.user}
                time={item.time}
                ratings={item.ratings}
                onViewTour={()=>_onViewTour(item)}
            />
        );
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Tours'
                subtext={'Nearby'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_backHandler}
            />
            <ScrollView>
                <Text style={styles.tourCategory}>Highest Rated Tours</Text>
            {
                highlyRatedFetched?
                    <Carousel
                        data={highlyRatedTours}
                        renderItem={_renderItem}
                        sliderWidth={width}
                        itemWidth={width*0.85}
                    />
                    :null
            }
            <Text style={styles.tourCategory}>Tours Close to you</Text>
            {
                nearbyFetched?
                    <Carousel
                        data={nearbyTours}
                        renderItem={_renderItem}
                        sliderWidth={width}
                        itemWidth={width*0.85}
                    />
                    :null
            }
            <View style={{height: 60}}/>
            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={_newTourHandler}
                label={'Create Tour'}
                animated
                color={Colors.ForestBiome.background}
            />
        </View>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 45,
        backgroundColor: Colors.ForestBiome.primary
    },
    cardStyle: {
        width: '100%',
        height: height*0.4,
        marginVertical: 14,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 20,
    },
    tourCategory: {
        color: 'white',
        marginLeft: 20,
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20
    }
})

Tours.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Tours
