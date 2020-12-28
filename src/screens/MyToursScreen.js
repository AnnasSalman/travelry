import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import CustomHeader from "../components/atoms/CustomHeader/CustomHeader";
import Colors from "../constants/Colors";
import SegmentedControl from "@react-native-community/segmented-control";
import TourCard from "../components/atoms/TourCard/TourCard";
import Tour from "../models/Tour";
import UserInfo from "../models/UserInfo";
import {Button} from "react-native-paper";
import GoogleLoginButton from "../components/atoms/GoogleLoginButton/GoogleLoginButton";
import * as Google from "expo-google-app-auth";
import Keys from "../constants/Keys";
import Loading from "../components/atoms/Loading/Loading";
import {useIsFocused} from "react-navigation-hooks";

const {height, width} = Dimensions.get('window')

const MyToursScreen = props => {

    const isFocused = useIsFocused()

    const [currentTab, setCurrentTab] = useState(0)
    const [published, setPublished] = useState([])
    const [saved, setSaved] = useState([])
    const [fetched, setFetched] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const _onViewTour = (item) => {
        props.navigation.navigate('toursInitialScreen', {item})
    }

    useEffect(()=>{
        setLoading(true)
        fetchTours()
        setLoading(false)
    },[loggedIn, isFocused])

    const signInWithGoogleAsync = async() => {
        const userInfo = new UserInfo()
        try {
            const result = await Google.logInAsync({
                iosClientId: Keys.OAuthID,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                await userInfo.setUserInfo(result.user)
                setLoggedIn(true)
            } else {
                console.log('cancelled');
            }
        } catch (e) {
            console.log('error signing in');
            return { error: true };
        }
    }

    const fetchTours = async() => {
        const tour = new Tour()
        const userInfo = new UserInfo()
        let id = ''
        try{
            const user = await userInfo.getUserInfo()
            if(user){
                id = user.id
            }
            else{
                setFetched(false)
                setLoggedIn(false)
                setSaved([])
            }
        }
        catch(e){
            console.log(e)
        }
        try{
            console.log('entered')
            const publishedTours = await tour.getTours(id, 'published')
            const savedTours = await tour.getTours(id, 'saved')
            setPublished(publishedTours)
            setSaved(savedTours)
            setFetched(true)
            setLoggedIn(true)
        }
        catch(e){
            console.log(e)
        }
    }

    const renderItem = ({ item }) => (
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

    return(
        <View style={styles.container}>
            <CustomHeader
                text='My Tours'
                subtext={'Your saved and published tours'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                // onBack={_backHandler}
            />
            <SegmentedControl
                values={['Saved', 'Published']}
                selectedIndex={currentTab}
                fontStyle={{
                    color: Colors.ForestBiome.primary,
                    fontFamily: 'poppins-regular',
                    fontSize: 15
                }}
                tintColor={Colors.ForestBiome.primary}
                backgroundColor={Colors.ForestBiome.background}
                style={styles.tab}
                onChange={(event) => {
                    setCurrentTab(event.nativeEvent.selectedSegmentIndex)
                }}
            />
            {
                (fetched && currentTab===0)?
                    <FlatList
                        data={saved}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                    :null
            }
            {
                (fetched && currentTab===1)?
                    <FlatList
                        data={published}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                    :null
            }
            {
                loading?
                    <View style={styles.notLoggedInContainer}>
                        <Loading animating type={'Fold'}/>
                    </View>:null
            }
            {
                !loggedIn?
                    <View style={styles.notLoggedInContainer}>
                        <Text style={styles.warningText}>You need to be logged in to view your tours</Text>
                        <GoogleLoginButton
                            style={styles.loginButton}
                            onPress={()=>signInWithGoogleAsync()}
                        />
                    </View>
                    :null
            }
        </View>
    );
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
        color: 'white',
    },
    sub:{
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    tab: {
        borderWidth: 1,
        borderColor: Colors.ForestBiome.primary,
        margin: 10,
        marginTop: 20,
        height: 25,
        marginLeft: 20,
        marginRight: 20,
    },
    notLoggedInContainer: {
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningText: {
        color: Colors.ForestBiome.secondary,
        fontSize: 16,
        fontFamily: 'poppins-regular'

    },
    loginButton: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 25,
        marginTop: 10
    },
    cardStyle: {
        width: '100%',
        height: height*0.4,
        marginVertical: 14,
        backgroundColor: Colors.ForestBiome.backgroundVariant
    }
})

export default MyToursScreen;
