import React, {useEffect} from 'react';
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

const image = require('../../assets/homeassets/home2.jpg');
const { width, height } = Dimensions.get('window')


const HomeScreen = props => {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.backgroundImage}>
                    <View style={styles.messageView}>
                        <Text style={styles.message}>
                            Do not miss the{"\n"}
                            wonders of Pakistan
                        </Text>
                        <Text style={{...styles.message, fontSize: 16}}>
                            Plan complete tours, manage Bookings and more
                        </Text>
                    </View>
                </ImageBackground>
                <SearchPanel/>
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
        height: height
    },
    messageView: {
        flex: 1,
        justifyContent: 'center',
        fontFamily: 'poppins-medium',
        marginLeft: 20
    },
    message: {
        fontFamily: 'roboto-regular',
        color: Colors.DarkTheme.onSurface,
        fontSize: 35,
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 7
    }
})

export default HomeScreen;
