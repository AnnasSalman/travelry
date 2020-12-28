import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, ImageBackground, Dimensions, Linking, FlatList} from 'react-native'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import PlaceDetail from "../../../models/PlaceDetail";
import Photos from "../../../models/Photos";
import {IconButton, Button, Avatar} from 'react-native-paper'
import Carousel, {Pagination} from "react-native-snap-carousel";
import SegmentedControl from '@react-native-community/segmented-control';
import Loading from "../../../components/atoms/Loading/Loading";
import {showLocation} from "react-native-map-link";

const {height, width} = Dimensions.get('window')

const _renderItem = ({item, index}) => {
    return (
        <ImageBackground source={{uri: item}} alt='PlaceDetail' style={styles.imgBackground} imageStyle={styles.image}>

        </ImageBackground>
    );
}

const Place = props => {

    const [place] = useState(props.navigation.state.params)
    const [placeDetails, setPlaceDetails] = useState({})
    const [pictureUrls, setPictureurls] = useState([])
    const [index, setIndex] = useState(0)
    const [picLoading, setPicLoading] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        getPhotos()
    }, [placeDetails])

    const getDetails = async () => {
        try {
            const placeInfo = new PlaceDetail(place.place_id)
            const details = await placeInfo.getPlaceDetails()
            setPlaceDetails(details)
        } catch (e) {
            console.log(e)
        }
    }

    const getPhotos = async () => {
        setPicLoading(true)
        try {
            const photos = new Photos(placeDetails.photos)
            const photoUrls = await photos.getPhotos(5)
            setPictureurls(photoUrls)
            setPicLoading(false)
        } catch (e) {
            setPicLoading(false)
        }
    }

    const onCall = () => {
        let phoneNumber = ''
        if (placeDetails.international_phone_number) {
            phoneNumber = placeDetails.international_phone_number
        } else if (placeDetails.formatted_phone_number) {
            phoneNumber = placeDetails.formatted_phone_number
        }
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phoneNumber + '}';
        } else {
            phoneNumber = 'telprompt:${' + phoneNumber + '}';
        }
        Linking.openURL(phoneNumber);
    }

    const directionsHandler = () => {
        const navdata = props.navigation.state.params

        showLocation({
            latitude: navdata.geometry.location.lat,
            longitude: navdata.geometry.location.lng,
            sourceLatitude: navdata.location.lat,  // optionally specify starting location for directions
            sourceLongitude: navdata.location.lng,  // not optional if sourceLatitude is specified
            // title: 'The White House',  // optional
            // googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            // dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            // dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            // cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            // appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // // app: 'uber'  // optionally specify specific app to use
        })
    }

    const renderReview = ({item}) => {
        return(
            <View style={styles.review}>
                 <View style={styles.row}>
                     <Avatar.Image size={24} source={{uri: item.profile_photo_url}}/>
                     <Text style={styles.bodyText}>{item.author_name}</Text>
                 </View>
                 <Text style={styles.subHeading}>{item.rating} out of 5</Text>
                 <Text style={styles.bodyText}>{item.text}</Text>
            </View>
        )
}

    const body = () => {
        if(tabIndex===0){
            return(
                <View style={styles.bodyContainer}>
                    {/*<Text>Address: {placeDetails.formatted_address}</Text>*/}
                    {
                        placeDetails.opening_hours?
                        <View style={styles.row}>
                            <IconButton
                                icon={placeDetails.opening_hours.open_now?'door-open':'door-closed'}
                                color={placeDetails.opening_hours.open_now?Colors.ForestBiome.primaryVariant:Colors.ForestBiome.primary}
                                size={25}
                            />
                            <Text
                                style={{...styles.subHeading,
                                    color: placeDetails.opening_hours.open_now?
                                        Colors.ForestBiome.primaryVariant:
                                        Colors.ForestBiome.primary}}>
                                {placeDetails.opening_hours.open_now?'Open Now': 'Closed'}
                            </Text>
                        </View>
                            :null
                    }
                    <View style={styles.row}>
                        <IconButton
                            color={Colors.ForestBiome.primary}
                            size={15}
                            icon='earth'
                        />
                        <Text style={styles.bodyText}>{placeDetails.formatted_address}</Text>
                    </View>
                    {placeDetails.international_phone_number || placeDetails.formatted_phone_number?
                        <View style={styles.row}>
                            <IconButton
                                color={Colors.ForestBiome.primary}
                                size={15}
                                icon='phone'
                            />
                            <Text style={styles.bodyText}>{placeDetails.international_phone_number?placeDetails.international_phone_number:placeDetails.formatted_phone_number}</Text>
                        </View>:null
                    }
                    {placeDetails.international_phone_number || placeDetails.formatted_phone_number?
                        <View style={styles.buttonContainer}>
                            <Button
                                icon={'phone'}
                                mode={'contained'}
                                color={Colors.ForestBiome.primary}
                                onPress={()=>onCall()}
                            >
                                Call now
                            </Button>
                        </View>:null
                    }
                </View>
            )
        }
        else{
            return(
                <View style={styles.reviewContainer}>
                    {
                        placeDetails.reviews && placeDetails.reviews.length>0?
                            <FlatList
                                data={placeDetails.reviews}
                                renderItem={renderReview}
                                keyExtractor={item => item.author_url}
                            />:null
                    }
                </View>
            )
        }
    }

    return(
        <View style={styles.container}>
            <Carousel
                data={pictureUrls}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => setIndex(index) }
            />
            <View style={styles.loadingContainer}>
                <Loading type={'Fold'} color={Colors.ForestBiome.primary} animating={picLoading}/>
            </View>
            <View style={styles.bottom}>
                <View style={styles.pagination}>
                    <Pagination
                        dotsLength={pictureUrls.length}
                        activeDotIndex={index}
                        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 3,
                            marginVertical: 4,
                            backgroundColor: Colors.ForestBiome.primary
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>
                <IconButton
                    icon={'directions'}
                    size={45}
                    color={Colors.ForestBiome.background}
                    style={styles.iconButton}
                    onPress={()=>directionsHandler()}
                />
                <Text style={styles.name}>{placeDetails.name}</Text>
                <SegmentedControl
                    values={['Information', 'Reviews']}
                    selectedIndex={tabIndex}
                    tintColor={Colors.ForestBiome.primary}
                    backgroundColor={Colors.ForestBiome.background}
                    fontStyle={{
                        color: Colors.ForestBiome.primary,
                        fontFamily: 'poppins-regular',
                        fontSize: 15
                    }}
                    onChange={(event) => {
                        setTabIndex(event.nativeEvent.selectedSegmentIndex)
                    }}
                    style={styles.tab}
                />
                {
                    body()
                }
            </View>
            <CustomHeader
                text={''}
                //subtext={'near '+ place.address.substring(0,48)+'...'}
                containerStyle={styles.header}
                titleStyle={styles.title}
                //subtitleStyle={styles.subtitle}
                onBack={()=>props.navigation.goBack()}
                type='modal'
                onClose={()=>props.navigation.goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: width,
        // height: height,
        backgroundColor: Colors.ForestBiome.background
    },
    header: {
        position: 'absolute',
        left: 0,
        top: 8,
        width: '95%',
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontSize: 20,
    },
    image: {
        height: '100%'
    },
    imgBackground: {
        flex: 1,
        // height: '65%',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    bottom: {
        padding: '4%',
        flex: 0.9,
    },
    name: {
        color: Colors.ForestBiome.primary,
        fontSize: 24,
        fontFamily: 'poppins-medium'
    },
    iconButton: {
        backgroundColor: Colors.ForestBiome.primary,
        position: 'absolute',
        right: '10%',
        top: '-18%'
    },
    pagination: {
        position: 'absolute',
        top: '-20%',
        left: '4%'
    },
    tab: {
        borderWidth: 1,
        borderColor: Colors.ForestBiome.primary,
        margin: 10,
        marginTop: 20,
        height: 35,
        marginLeft: 20,
        marginRight: 20,
    },
    tabStyle: {
        backgroundColor: Colors.ForestBiome.background,
        borderColor: Colors.ForestBiome.primary
    },
    tabsContainerStyle: {
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    },
    tabTextStyle: {
        color: Colors.ForestBiome.primary
    },
    activeTabTextStyle: {
        color: Colors.ForestBiome.background
    },
    activeTabStyle: {
        backgroundColor: Colors.ForestBiome.primary,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyText: {
        fontSize: 14,
        color: 'white',
        margin: 5,
    },
    subHeading:{
        fontSize: 18,
        margin: 5,
        fontWeight: 'bold',
        color: Colors.ForestBiome.primary
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    review: {
        margin: 15,
    },
    reviewContainer: {
        height: '60%'
    },
    loadingContainer: {
        position: 'absolute',
        left: 30,
        top: 30
    }
})

Place.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Place
