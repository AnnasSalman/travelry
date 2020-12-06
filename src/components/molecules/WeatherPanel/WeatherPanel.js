import React, {forwardRef, useState} from 'react'
import {View, Text, StyleSheet, Animated, Dimensions, ImageBackground, Image} from 'react-native'
import SlidingUpPanel from "rn-sliding-up-panel";
import {LinearGradient} from "expo-linear-gradient";
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import WeatherEntity from "../../atoms/WeatherEntity/WeatherEntity";
import SegmentedControl from "@react-native-community/segmented-control";
import WeatherCarousel from "../WeatherCarousel/WeatherCarousel";
import moment from "moment";

const {height, width} = Dimensions.get('window')
const winHeight = height*0.82

const getWeatherImage = (code) => {
    if (code==='01d') {
        return 'https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='02d'){
        return 'https://images.unsplash.com/photo-1505224526312-64368469c1f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='03d'){
        return 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='04d'){
        return 'https://images.unsplash.com/photo-1503198515498-d0bd9ed16902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='09d'){
        return 'https://images.unsplash.com/photo-1501691223387-dd0500403074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='10d'){
        return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='11d'){
        return 'https://images.unsplash.com/photo-1511149755252-35875b273fd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='13d'){
        return 'https://images.unsplash.com/photo-1579460424011-7db5f534680c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='50d'){
        return 'https://images.unsplash.com/photo-1478399305562-fbc9c0adb0e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='01n'){
        return 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='02n'){
        return 'https://images.unsplash.com/photo-1541782211150-275829de291c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='03n'){
        return 'https://images.unsplash.com/photo-1499578124509-1611b77778c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='04n'){
        return 'https://images.unsplash.com/photo-1514549825720-3ea1e5d3a51d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='09n'){
        return 'https://images.unsplash.com/photo-1517632298125-355d911c3a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='10n'){
        return 'https://images.unsplash.com/photo-1521291668714-23cb608c52f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='11n'){
        return 'https://images.unsplash.com/photo-1504427842454-5c3d7c926047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='13n'){
        return 'https://images.unsplash.com/photo-1544867530-a3700925f2bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60'
    }
    else if(code==='50n'){
        return 'https://images.unsplash.com/photo-1551536637-f5f1984f1398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }
}

const WeatherPanel = forwardRef( (props, ref) => {

    return(
        <SlidingUpPanel
            ref={ref}
            height={height*0.89}
            draggableRange={{bottom: 0, top: height*0.89}}
            animatedValue={new Animated.Value(0)}
            snappingPoints={[0, height * 0.89]}
            backdropOpacity={1.0}
            minimumVelocityThreshold = {0.9}
            showBackdrop={false}
            allowDragging={false}
        >
            <ImageBackground
                source={{uri: getWeatherImage(props.currentWeather.weather[0].icon)}}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    style={styles.backgroundImage}
                    colors={['transparent', 'rgba(16,24,32,1)']}
                    start={[0.9, 0.0]}
                    end={[0.0, 0.0]}
                    style={styles.container}
                >
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <SegmentedControl
                            values={['Now', 'This Week']}
                            selectedIndex={props.currentTab}
                            fontStyle={{
                                color: 'white',
                                fontFamily: 'poppins-regular',
                                fontSize: 12
                            }}
                            tintColor={'#F5F5F5'}
                            backgroundColor={Colors.ForestBiome.background}
                            style={styles.tab}
                            onChange={(event) => {
                                // setCurrentTab(event.nativeEvent.selectedSegmentIndex)
                                props.onChange(event.nativeEvent.selectedSegmentIndex)
                            }}
                        />
                        <IconButton
                            size={25}
                            color={'white'}
                            icon={'close-circle'}
                            onPress={props.onClose}
                        />
                    </View>
                    {
                        props.currentTab === 0?
                        <View>
                            <View style={styles.titleBar}>
                                <Text style={styles.title}>{props.place.name}</Text>
                                <Text style={styles.subTitle}> as of {moment.unix(props.currentWeather.dt).format('MMMM, DD YYYY hh:mm A')}</Text>
                            </View>
                            <View style={styles.tempBar}>
                                <Text style={styles.temp}>{Math.floor(props.currentWeather.temp)}°</Text>
                                <View style={styles.row}>
                                    <Image
                                        source={{uri: 'http://openweathermap.org/img/wn/'+props.currentWeather.weather[0].icon+'@2x.png'}}
                                        style={styles.weatherLogo}
                                    />
                                    <Text style={styles.weatherText}>{props.currentWeather.weather[0].description}</Text>
                                </View>
                            </View>
                            <View style={styles.divider}/>
                            <View style={[styles.row, styles.bottomBar]}>
                                <WeatherEntity
                                    style={styles.weatherEntity}
                                    name='Wind'
                                    value={Math.floor((props.currentWeather.wind_speed*60*60)/1000)}
                                    high={60}
                                    medium={30}
                                    low={0}
                                    max={80}
                                    unit='km/h'
                                />
                                <WeatherEntity
                                    style={styles.weatherEntity}
                                    name='Clouds'
                                    value={props.currentWeather.clouds}
                                    high={70}
                                    medium={40}
                                    low={0}
                                    max={100}
                                    unit='%'
                                />
                                <WeatherEntity
                                    style={styles.weatherEntity}
                                    name='Humidity'
                                    value={props.currentWeather.humidity}
                                    high={70}
                                    medium={40}
                                    low={0}
                                    max={100}
                                    unit='%'
                                />
                            </View>
                        </View>:
                        <WeatherCarousel
                            weather={props.dailyWeather}
                            placeName={props.place.name}
                            styles={styles}
                        />
                    }
                </LinearGradient>
            </ImageBackground>
        </SlidingUpPanel>
    )
})

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "cover",
        flex: 1,
        borderRadius: 15,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    },
    titleBar: {
        height: winHeight*0.2,
        margin: 5,
    },
    tempBar: {
        height: winHeight*0.35,
        width: width,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    bottomBar: {
        height: winHeight*0.23,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    temp: {
        fontSize: 100,
        color: '#F5F5F5',
        fontFamily: 'poppins-regular',
        marginLeft: 5,
    },
    title: {
        fontSize: 30,
        color: '#F5F5F5',
        fontFamily: 'poppins-medium',
    },
    subTitle: {
        fontSize: 13,
        color: '#F5F5F5',
        fontFamily: 'poppins-regular',
    },
    weatherLogo: {
        height: 60,
        resizeMode: 'cover',
        width: 60,
        marginTop: -20
    },
    divider: {
        height: 3,
        width: width*0.9,
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: 0.2,
        marginTop: 10,
        marginBottom: 10,
    },
    weatherText: {
        fontSize: 20,
        fontFamily: 'poppins-regular',
        color: '#F5F5F5',
        marginBottom: 20
    },
    weatherEntity: {
        height: winHeight*0.2,
        width: width*0.25,
        marginHorizontal: 5,
    },
    tab: {
        borderWidth: 1,
        borderColor: Colors.ForestBiome.background,
        height: 25,
        width: '50%'
        // margin: 10,
        // marginTop: 20,
        // height: 25,
        // marginLeft: 20,
        // marginRight: 20,
    },
})

export default WeatherPanel
