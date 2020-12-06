import React from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, Dimensions} from 'react-native'
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";
import moment from "moment";
import WeatherEntity from "../WeatherEntity/WeatherEntity";
const {height, width} = Dimensions.get('window')

const WeatherCarouselItem = props => {

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

    return(
        <ImageBackground style={styles.imageBackground} source={{uri: getWeatherImage(props.weather.weather[0].icon)}}>
            <LinearGradient
                colors={['transparent', 'rgba(16,24,32,0.7)']}
                start={[1, 0.9]}
                end={[0.9, 0.8]}
                style={styles.container}
            >
            <View style={styles.left}>
                <View style={styles.row}>
                    <View style={{...styles.tempBar}}>
                        <Text style={styles.heading}>Average Temperature</Text>
                        <Text style={styles.mainTemp}>{Math.floor((props.weather.temp.morn+props.weather.temp.day+props.weather.temp.eve+props.weather.temp.night)/4)}°</Text>
                    </View>
                    <View style={{...styles.tempBar, paddingLeft: 5, flex: 1}}>
                        <View style={styles.row}>
                            <Image source={{uri: 'http://openweathermap.org/img/wn/'+props.weather.weather[0].icon+'@2x.png'}} style={styles.weather}/>
                            <Text style={styles.weatherDesc}>{props.weather.weather[0].description}</Text>
                        </View>
                        <View style={styles.divider}/>
                        <View style={{...styles.row, justifyContent: 'center', width: '100%'}}>
                            <View style={styles.sunTime}>
                                <Text style={styles.heading}>Sunrise</Text>
                                <Text style={styles.time}>{moment.unix(props.weather.sunrise).format('hh:mm A')}</Text>
                            </View>
                            <View style={styles.sunTime}>
                                <Text style={styles.heading}>Sunset</Text>
                                <Text style={styles.time}>{moment.unix(props.weather.sunset).format('hh:mm A')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={[styles.row, {marginTop: 25}]}>
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='Wind'
                            value={Math.floor((props.weather.wind_speed*60*60)/1000)}
                            high={60}
                            medium={30}
                            low={0}
                            max={80}
                            unit='km/h'
                        />
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='Clouds'
                            value={props.weather.clouds}
                            high={60}
                            medium={30}
                            low={0}
                            max={100}
                            unit='%'
                        />
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='Rain'
                            value={props.weather.rain?props.weather.rain:0}
                            high={6}
                            medium={4}
                            low={0}
                            max={8}
                            unit='mm'
                        />
                    </View>
                    <View style={styles.row}>
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='Humidity'
                            value={Math.floor((props.weather.wind_speed*60*60)/1000)}
                            high={70}
                            medium={40}
                            low={0}
                            max={100}
                            unit='%'
                        />
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='Pressure'
                            value={Math.floor((props.weather.pressure*60*60)/1000)}
                            high={60}
                            medium={30}
                            low={0}
                            max={80}
                            unit='hPa'
                        />
                        <WeatherEntity
                            style={styles.weatherEntity}
                            name='UV index'
                            value={Math.floor((props.weather.wind_speed*60*60)/1000)}
                            high={60}
                            medium={30}
                            low={0}
                            max={80}
                            unit='km/h'
                        />
                    </View>
                </View>
            </View>
            <View style={styles.mid}>
                <View style={styles.iconBar}>
                    <Image
                        source={{uri: 'https://img.icons8.com/ios/50/FFFFFF/sunrise--v2.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.temp}>{Math.floor(props.weather.temp.morn)}°</Text>
                </View>
                <View style={styles.iconBar}>
                    <Image
                        source={{uri: 'https://img.icons8.com/ios/50/FFFFFF/sun--v2.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.temp}>{Math.floor(props.weather.temp.day)}°</Text>
                </View>
                <View style={styles.iconBar}>
                    <Image
                        source={{uri: 'https://img.icons8.com/ios/50/FFFFFF/sunset.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.temp}>{Math.floor(props.weather.temp.eve)}°</Text>
                </View>
                <View style={styles.iconBar}>
                    <Image
                        source={{uri: 'https://img.icons8.com/ios/50/FFFFFF/moon-symbol.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.temp}>{Math.floor(props.weather.temp.night)}°</Text>
                </View>
            </View>
            <View style={styles.right}>
                <View style={styles.morning}/>
                <View style={styles.day}/>
                <View style={styles.evening}/>
                <View style={styles.night}/>
            </View>
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground:{
        resizeMode: "cover",
        overflow: 'hidden',
        borderRadius: 15,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 5,
        opacity: 0.99,
    },
    container: {
        flexDirection: 'row',
        height: height*0.57,
        width: '100%'
    },
    left: {
        flex: 20,
        padding: 5,
        paddingTop: 15
    },
    mid: {
        flex: 3,
    },
    right: {
        flex: 0.5,
    },
    morning: {
        flex: 1,
        backgroundColor: '#8DA399'
    },
    day: {
        flex: 1,
        backgroundColor: '#99D7E4'
    },
    evening: {
        flex: 1,
        backgroundColor: '#474A57'
    },
    night: {
        flex: 1,
        backgroundColor: '#38285C'
    },
    icon: {
        width: 25,
        height: 25
    },
    iconBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        opacity: 0.65
    },
    temp: {
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: '#D7D3BA'
    },
    mainTemp: {
        fontFamily: 'poppins-medium',
        fontSize: 60,
        color: 'white'
    },
    heading: {
        color: '#D7D3BA',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tempBar: {
        width: '40%',
        alignItems: 'center'
    },
    weather: {
        height: 50,
        width: 50
    },
    weatherDesc: {
        color: Colors.ForestBiome.primary,
        fontSize: 12,
        fontFamily: 'poppins-regular',
    },
    time: {
        fontSize: 16,
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium'
    },
    sunTime: {
        marginHorizontal: 15,
        alignItems: 'center',
    },
    divider: {
        width: '95%',
        height: 2,
        backgroundColor: 'grey',
        marginBottom: 8,
        borderRadius: 2,
        opacity: 0.7
    },
    weatherEntity: {
        height: height*0.15,
        width: width*0.22,
        marginHorizontal: 5,
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    }
})

export default WeatherCarouselItem
