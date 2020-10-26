import React from 'react'
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native'
import {IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

const WeatherWidget = props => {

    const weatherIcon = 'http://openweathermap.org/img/wn/'+props.weatherIcon+'@2x.png'

    const getWeatherImage = (code) => {
        if (code==='01d') {
            return 'https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='02d'){
            return 'https://images.unsplash.com/photo-1505224526312-64368469c1f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='03d'){
            return 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='04d'){
            return 'https://images.unsplash.com/photo-1503198515498-d0bd9ed16902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='09d'){
            return 'https://images.unsplash.com/photo-1501691223387-dd0500403074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='10d'){
            return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='11d'){
            return 'https://images.unsplash.com/photo-1511149755252-35875b273fd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='13d'){
            return 'https://images.unsplash.com/photo-1579460424011-7db5f534680c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='50d'){
            return 'https://images.unsplash.com/photo-1478399305562-fbc9c0adb0e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='01n'){
            return 'https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='02n'){
            return 'https://images.unsplash.com/photo-1541782211150-275829de291c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='03n'){
            return 'https://images.unsplash.com/photo-1499578124509-1611b77778c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='04n'){
            return 'https://images.unsplash.com/photo-1514549825720-3ea1e5d3a51d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='09n'){
            return 'https://images.unsplash.com/photo-1517632298125-355d911c3a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='10n'){
            return 'https://images.unsplash.com/photo-1521291668714-23cb608c52f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='11n'){
            return 'https://images.unsplash.com/photo-1504427842454-5c3d7c926047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='13n'){
            return 'https://images.unsplash.com/photo-1544867530-a3700925f2bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }
        else if(code==='50n'){
            return 'https://images.unsplash.com/photo-1503745328377-1f4355a2284b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }

    }

    return(
        <ImageBackground
            style={[props.containerStyle, styles.container]}
            source={{uri: getWeatherImage(props.weatherIcon)}}>
            <LinearGradient
                style={{height: '100%', width: '100%'}}
                colors={['transparent', 'rgba(16,24,32,1)']}
                start={[0.9, 0.5]}
                end={[0.5, 0.0]}
            >
            <View style={styles.column}>
                <IconButton
                    size={35}
                    color={'white'}
                    icon='thermometer'
                />
                <View style={styles.column}>
                    <Text style={props.textStyle}>{props.temperature} °C </Text>
                    <Text style={styles.weather}>{props.weather}</Text>
                </View>
            </View>
                <Image style={props.iconStyle} source={{uri: weatherIcon}}/>
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row:{
        flexDirection: 'row',
        alignItems:'center'
    },
    column:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    weather: {
        fontSize: 13,
        color:'white'
    }
})

export default WeatherWidget
