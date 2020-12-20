import React, {useState, useEffect, useRef, useCallback} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Keys from "../constants/Keys";
import UserInfo from "../models/UserInfo";
import SignOutButton from "../components/atoms/SignOutButton/SignOutButton";
import {
    View,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import SearchPanel from '../components/molecules/searchPanel/SearchPanel'
import Colors from "../constants/Colors";
import Location from "../models/Location";
import * as Google from 'expo-google-app-auth';
import { Menu, Provider, Button } from 'react-native-paper';
import Avatar from "../components/atoms/Avatar/Avatar";
import GoogleLoginButton from "../components/atoms/GoogleLoginButton/GoogleLoginButton";
import {useIsFocused} from "react-navigation-hooks";


const image = require('../../assets/homeassets/home2.jpg');
const { width, height } = Dimensions.get('window')

const HomeScreen = props => {

    const isFocused = useIsFocused()

    const [loc, setLoc] = useState('')
    const [fullLocation, setfullLocation] = useState(null)
    const [background, setBackground] = useState(image)
    const [reviews, setReviews] = useState([])
    const [userInfo, setUserInfo] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)


    const signInWithGoogleAsync = async() => {
        const userInfo = new UserInfo()
        try {
            const result = await Google.logInAsync({
                iosClientId: Keys.OAuthID,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                await userInfo.setUserInfo(result.user)
                console.log(result.user)
                setUserInfo(result.user)
                setLoggedIn(true)
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log('error signing in');
            return { error: true };
        }
    }

    const fetchUser = () => {
        const userInfo = new UserInfo()
        userInfo.getUserInfo()
            .then((info)=>{
                if(info){
                    setUserInfo(info)
                    setLoggedIn(true)
                }
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    useEffect(()=>{
        const getLocation = async () => {
            try{
                const location =new Location()
                const locationData = await location.getLocation()
                if(locationData){
                    setLoc(locationData.name)
                    setfullLocation(locationData)
                    if(locationData.reviews){
                        setReviews(locationData.reviews)
                    }
                }
                else{
                    console.log('no location data')
                }
                try{
                    const pic = await location.getBackgroundImage()
                    setBackground({uri: pic})
                }
                catch{
                    setBackground(image)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        getLocation()
    },[])

    useEffect(()=>{
        if(isFocused){
            fetchUser()
        }
    },[isFocused])

    const onLocationChange = async() => {
        try{
            const location =new Location()
            const locationData = await location.getLocation()
            if(locationData){
                setLoc(locationData.name)
                setfullLocation(locationData)
                if(locationData.reviews){
                    setReviews(locationData.reviews)
                }
                else{
                    setReviews([])
                }
            }
            else{
                console.log('no location data')
            }
            try{
                const pic = await location.getBackgroundImage()
                if(pic){
                    setBackground({uri: pic})
                }
                else{
                    setBackground(image)
                }
            }
            catch(e){
                setBackground(image)
            }
        }
        catch(e){
            console.log(e)
        }
    }

    const locationSubtitle = () => {
        if(fullLocation && fullLocation.formatted_address){
            return fullLocation.formatted_address
        }
        else if(fullLocation && fullLocation.vicinity){
            return fullLocation.vicinity
        }
        else{
            return null
        }
    }

    const onSignOut = () => {
        const userInfo = new UserInfo()
        userInfo.removeUser().then(()=>{
            setLoggedIn(false)
            setUserInfo(null)
        }).catch((e)=>{
            console.log(e)
        })
    }


        return (
            <Provider style={styles.container}>
                <ImageBackground source={background} style={styles.backgroundImage}>
                    <LinearGradient
                        style={styles.backgroundImage}
                        colors={['transparent', 'rgba(16,24,32,1)']}
                        start={[0.8, 0.0]}
                        end={[0.0, 0.6]}
                    >
                    <View style={styles.messageView}>
                        {
                            loc!==''?
                                <View>
                                    <Text style={styles.message}>
                                        {loc}
                                    </Text>
                                    <Text style={styles.messageSmall}>
                                        {locationSubtitle()}
                                    </Text>
                                    {/*<ReviewCarousel*/}
                                    {/*    textStyle={{...styles.message, fontSize: 13}}*/}
                                    {/*    data={reviews}*/}
                                    {/*/>*/}
                                </View> :
                                <View>
                                    <Text style={styles.message}>
                                        Explore the{"\n"}
                                        wonders of Pakistan
                                    </Text>
                                    <Text style={{...styles.message, fontSize: 16}}>
                                        Plan complete tours, manage Bookings, explore places and more
                                    </Text>
                                </View>

                        }

                    </View>
                    </LinearGradient>
                </ImageBackground>
                <Avatar
                    type={loggedIn?'url':'local'}
                    style={styles.avatar}
                    placeholder={require('../../assets/placeholders/user.png')}
                    image={loggedIn?userInfo.photoUrl:'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png'}
                />
                {!loggedIn?
                    <GoogleLoginButton
                        style={styles.loginButton}
                        onPress={()=>signInWithGoogleAsync()}
                    />:
                    <SignOutButton
                        style={styles.signoutButton}
                        onPress={()=>onSignOut()}
                    />
                }
                <SearchPanel
                    searchBarText={loc===''?'Enter a Location':loc}
                    onRoomPress={()=>props.navigation.navigate('room')}
                    onHotelPress={()=>props.navigation.navigate('generalTourInfo')}
                    onTourPress={()=>props.navigation.navigate('toursScreen') }
                    // onTourPress={()=>props.navigation.navigate('plan')}
                    onSearchPress={()=>props.navigation.navigate('AddLocation', {onLocationChange: ()=>onLocationChange()})}
                    onPlacePress={()=>props.navigation.navigate('placesScreen')}
                />
            </Provider>
        )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height*0.59
    },
    messageView: {
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'poppins-medium',
        marginLeft: 20,
        marginBottom: 0,
        width: width*0.85
    },
    message: {
        fontFamily: 'rock-salt',
        color: Colors.DarkTheme.onSurface,
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 4,
    },
    messageSmall:{
        fontFamily: 'poppins-regular',
        color: '#A9A9A9',
        fontSize: 10,
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 4,
        width: '65%',
        marginTop: -10
    },
    avatar: {
        position: 'absolute',
        top: '4%',
        right: '3%',
        borderRadius: 25,
        width: 45,
        height: 45
    },
    loginButton: {
        position: 'absolute',
        top: '4%',
        left: '3%',
        height: 45,
        borderRadius: 25,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    },
    signoutButton: {
        position: 'absolute',
        top: '4%',
        right: '15%',
        height: 45,
        borderRadius: 25,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    },
})

export default HomeScreen;
