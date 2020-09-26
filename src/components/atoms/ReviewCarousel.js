import React from 'react'
import {View, Text, ImageBackground, Dimensions, StyleSheet} from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from "./Loading/Loading";
import Colors from "../../constants/Colors";
import {backgroundColor} from "react-native-calendars/src/style";
import {Rating} from "react-native-ratings";

const {height,width} = Dimensions.get('window')

const ReviewCarousel = props => {

    const carouselItem = ({item, index}) => {
        let trimmedItem = item.text
        if(item.text.length>120){
            trimmedItem=item.text.substring(0,120)+'...'
        }
        return(
            <View style={styles.commentContainer}>
                <Text style={{...props.textStyle, fontSize: 16, fontWeight: 'bold', margin: 3}}>{item.rating}/5</Text>
                <Text style={props.textStyle}>{trimmedItem}</Text>
                <Text style={{...props.textStyle, color: 'grey', margin: 4, marginLeft: 20}}>- Posted by {item.author_name} {item.relative_time_description}</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Carousel
                enableSnap={true}
                loop={true}
                autoplay={true}
                autoplayInterval={5000}
                data={props.data}
                renderItem={carouselItem}
                sliderWidth={width*0.9}
                itemWidth={width}
                layout='default'
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentContainer: {
        margin: 5,
    }
})

export default ReviewCarousel
