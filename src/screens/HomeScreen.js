import React, {useState, useEffect} from 'react';
import ReviewCarousel from "../components/atoms/ReviewCarousel";
import { LinearGradient } from 'expo-linear-gradient';
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

const image = require('../../assets/homeassets/home2.jpg');
const { width, height } = Dimensions.get('window')

const HomeScreen = props => {

    const [loc, setLoc] = useState('')
    const [fullLocation, setfullLocation] = useState(null)
    const [background, setBackground] = useState(image)
    const [reviews, setReviews] = useState([])

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

        return (
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.backgroundImage}>
                    <LinearGradient
                        style={styles.backgroundImage}
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
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
                                    <ReviewCarousel
                                        textStyle={{...styles.message, fontSize: 13}}
                                        data={reviews}
                                    />
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
                <SearchPanel
                    searchBarText={loc===''?'Enter a Location':loc}
                    onRoomPress={()=>props.navigation.navigate('room')}
                    onTourPress={()=>props.navigation.navigate('toursScreen')}
                    onSearchPress={()=>props.navigation.navigate('AddLocation', {onLocationChange: ()=>onLocationChange()})}
                    onPlacePress={()=>props.navigation.navigate('placesScreen')}
                />
            </View>
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
        height: height*0.6
    },
    messageView: {
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'poppins-medium',
        marginLeft: 20,
        marginBottom: 45,
        width: width*0.9
    },
    message: {
        fontFamily: 'roboto-medium',
        color: Colors.DarkTheme.onSurface,
        fontSize: 24,
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 4
    }
})

export default HomeScreen;
