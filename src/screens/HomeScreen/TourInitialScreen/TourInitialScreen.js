import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image, ImageBackground} from "react-native";
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Tours from "../Tours/Tours";
import Carousel from "react-native-snap-carousel";
import Keys from "../../../constants/Keys";

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

    const _backHandler = () => {
        props.navigation.goBack()
    }

    return(
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
                    itemWidth={width*0.5}
                />
                <Text style={styles.description}>{props.navigation.state.params.item.description}</Text>
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
                                    {_averageRatings(props.ratings)}/5
                                </Text>:
                                <Text style={styles.value}>No ratings yet</Text>
                        }
                    </View>
                    <View style={styles.statBar}>
                        <Text style={styles.property}>Total Tour Duration</Text>
                        <Text style={styles.value}>{props.navigation.state.params.item.time} Days</Text>
                    </View>
                </View>
            </View>
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
        height: height*0.40,
    },
    imageOverlay: {
        marginTop: '10%',
        width: '100%',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 3,
        opacity: 0.6,
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
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
    }

})

TourInitialScreen.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default TourInitialScreen
