import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import MapPlaces from "../MapPlaces/MapPlaces";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import PlaceDetail from "../../../models/PlaceDetail";
import Photos from "../../../models/Photos";
import {IconButton} from 'react-native-paper'
import Carousel, {Pagination} from "react-native-snap-carousel";
import SegmentedControl from '@react-native-community/segmented-control';



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
    const [pictureUrls, setPictureurls] = useState( [
            "https://lh3.googleusercontent.com/p/AF1QipN8PL4ieclD2MilJH7iGIOI0NgSF0RX1u1R5QhB=s1600-w750",
            "https://lh3.googleusercontent.com/p/AF1QipP2fvoUjeztffgHAZ6uEUZ4hFQk7hJQ1ug_foPh=s1600-w750",
            "https://lh3.googleusercontent.com/p/AF1QipMN4-Ry91JOgSyTtAIDaC5BbTu1FsJjEhJ7BPcr=s1600-w750",
            "https://lh3.googleusercontent.com/p/AF1QipM9Ewhh3hVyfoaTvmquxy5TKsXHb2zZNIgkB1OP=s1600-w750",
            "https://lh3.googleusercontent.com/p/AF1QipMqj7cGdnkTjMZu_3GPoGeHwRJMXqdcHx4_e32x=s1600-w750",
        ]
    )
    const [index, setIndex] = useState(0)
    const [picLoading, setPicLoading] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    // useEffect(()=>{
    //     getDetails()
    // },[])

    // useEffect(()=>{
    //     getPhotos()
    // },[placeDetails])

    const getDetails = async() => {
        try{
            const placeInfo = new PlaceDetail(place.place_id)
            const details = await placeInfo.getPlaceDetails()
            setPlaceDetails(details)
        }
        catch(e){
            console.log(e)
        }
    }

    const getPhotos = async() => {
        setPicLoading(true)
        try{
            const photos = new Photos(placeDetails.photos)
            const photoUrls = await photos.getPhotos(5)
            setPictureurls(photoUrls)
            setPicLoading(false)
        }
        catch(e){
            setPicLoading(false)
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
            <View style={styles.bottom}>
                <View style={styles.pagination}>
                    <Pagination
                        vertical={true}
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
                    onPress={()=>console.log('heylo')}
                />
                <Text style={styles.name}>Playground</Text>
                <SegmentedControl
                    values={['One', 'Two']}
                    selectedIndex={tabIndex}
                    onChange={(event) => {setTabIndex(event.nativeEvent.selectedSegmentIndex)}}
                />
                {/*<SegmentedControlTab*/}
                {/*    values={["First", "Second"]}*/}
                {/*    selectedIndex={tabIndex}*/}
                {/*    onTabPress={(index)=>setTabIndex(index)}*/}
                {/*    borderRadius={15}*/}
                {/*    tabsContainerStyle={styles.tabsContainerStyle}*/}
                {/*    tabStyle={styles.tabStyle}*/}
                {/*    tabTextStyle={styles.tabTextStyle}*/}
                {/*    activeTabTextStyle={styles.activeTabTextStyle}*/}
                {/*    activeTabStyle={styles.activeTabStyle}*/}
                {/*/>*/}
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
        flex: 0.6,
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
        top: '-2%',
        right: '-4%'
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
    }
})

Place.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Place
