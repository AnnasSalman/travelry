import React, {useState, useRef} from "react";
import{ Text, View, StyleSheet, Image, Dimensions} from 'react-native'
import Colors from "../../../constants/Colors";
import {IconButton, Button} from 'react-native-paper'
import createTourDemoData from "../../../constants/CreateTourDemo";
import Carousel, {Pagination} from 'react-native-snap-carousel';


const {height, width} = Dimensions.get('window')

const TourDemo = props => {

    const [itemIndex, setItemIndex] = useState(0)
    const carousel = useRef(null)

    const _closeHandler = () => {
        props.navigation.goBack()
    }

    const _nextHandler = () => {
        if(itemIndex===createTourDemoData.length-1){
            props.navigation.navigate('addLocations')
        }
        else{
            carousel.current.snapToNext()
        }
    }

    const feature = ({item, index}) =>{
        return(
            <View style={styles.feature}>
                <Text style={styles.title}>{item.title}</Text>
                <Image
                    source={item.image}
                    style={styles.image}
                />
                <Text style={styles.body}>{item.body}</Text>
            </View>
        )
    }


    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <IconButton
                    icon='close'
                    color={Colors.ForestBiome.primary}
                    size={27}
                    onPress={_closeHandler}
                />
            </View>
            <View style={styles.center}>
                <Carousel
                    ref={carousel}
                    data={createTourDemoData}
                    renderItem={feature}
                    sliderWidth={width}
                    itemWidth={width}
                    contentContainerCustomStyle={styles.feature}
                    onSnapToItem={(index) => setItemIndex(index)}
                />
                <Pagination
                    dotsLength={createTourDemoData.length}
                    activeDotIndex={itemIndex}
                    dotStyle={styles.dot}
                    inactiveDotStyle={styles.inactiveDot}
                />
            </View>
            <View style={styles.top}>
                <Button
                    mode="text"
                    onPress={_nextHandler}
                    color={Colors.ForestBiome.primary}
                    style={styles.button}
                >
                    {itemIndex===createTourDemoData.length-1?'Start Tour Creation':'Next'}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 55,
        backgroundColor: '#e1e1dd'
    },
    top:{
        alignItems: 'flex-end'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height: height*0.3,
        marginTop: 10,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    feature: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.background
    },
    body: {
        width: width*0.8,
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular',
        fontSize: 14,
        textAlign: 'center',
    },
    dot: {
        backgroundColor: Colors.ForestBiome.primary
    },
    inactiveDot: {
        backgroundColor: Colors.ForestBiome.background
    },
    button: {
        marginRight: 10
    }
})

TourDemo.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default TourDemo
