import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import WeatherCarouselItem from "../../atoms/WeatherCarouselItem/WeatherCarouselItem";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import moment from "moment";

const {height, width} = Dimensions.get('window')

const WeatherCarousel = ({styles, placeName, weather}) => {

    const [slide, setSlide] = useState(0)

    const _renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={[styles.subTitle, localStyles.subTitle]}>{moment.unix(item.dt).format('MMMM, DD YYYY, ddd')}</Text>
                <WeatherCarouselItem
                    weather={item}
                />
            </View>
        );
    }

    return (
        <View>
            <View style={[localStyles.title, localStyles.row]}>
                <Text style={styles.title}>{placeName}</Text>
                <Pagination
                    dotsLength={weather.length}
                    activeDotIndex={slide}
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 80}}
                    dotStyle={{
                        width: 7,
                        height: 7,
                        borderRadius: 5,
                        marginHorizontal: -5,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
            <Carousel
                data={weather}
                renderItem={_renderItem}
                layout={'stack'}
                layoutCardOffset={`8`}
                sliderWidth={width}
                itemWidth={width-60}
                onSnapToItem={(index) => setSlide(index) }
            />
        </View>
    )
}

const localStyles = StyleSheet.create({
    title: {
        margin: 5
    },
    slide:{

    },
    subTitle: {
        marginLeft: 10,
        marginBottom: 7,
        fontFamily: 'poppins-regular'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default WeatherCarousel
