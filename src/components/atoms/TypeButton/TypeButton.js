import React, {useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import image from '../../../../assets/homeassets/home2.jpg'
import Colors from "../../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../Loading/Loading";


const {height, width} = Dimensions.get('window')

const unit = width*0.30
const normalHeight = unit
const normalWidth = unit
const verticalHeight = (unit*2)+8
const verticalWidth = unit
const horizontalHeight = unit
const horizontalWidth = (unit*2)+8

const TypeButton = props => {

    const [loading, setLoading] = useState(false)

    const styleDetect = () => {
        if(props.type==='normal'){
            return styles.dimensions
        }
        else if(props.type==='vertical'){
            return styles.dimensionsVertical
        }
        else if(props.type==='horizontal'){
            return styles.dimensionsHorizontal
        }
        else if(props.type==='large'){
            return styles.dimensionsLarge
        }
        else{
            return null
        }
    }

    const textStyleDetect = () => {
        if(props.type==='normal'){
            return {fontSize: 12}
        }
        else{
            return {fontSize: 14}
        }
    }

    return(
        <TouchableOpacity style={{...styles.container, ...styleDetect(), ...props.style}} onPress={props.onPress}>
            <ImageBackground
                source={props.image}
                style={{...styles.image,...styleDetect()}}
                onLoadStart={()=>setLoading(true)}
                onLoadEnd={()=>setLoading(false)}
            >
                <LinearGradient
                    style={styles.gradient}
                    colors={['transparent', 'rgba(0,0,0,0.55)']}
                    start={[0.5, 0]}
                    end={[0.0, 0.6]}
                >
                    <Loading animating={loading} color={Colors.ForestBiome.primary}/>
                    <Text style={{...styles.text,...textStyleDetect(),...props.textStyle}}>{props.text}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden'
    },
    dimensions: {
        height: normalHeight,
        width: normalWidth,
    },
    dimensionsHorizontal: {
        height: horizontalHeight,
        width: horizontalWidth,
    },
    dimensionsVertical: {
        height: verticalHeight,
        width: verticalWidth,
    },
    dimensionsLarge: {
        height: normalHeight*2,
        width: verticalWidth*2,
    },
    image: {
        flex: 1,
    },
    text: {
        marginLeft: '8%',
        marginRight: '8%',
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: Colors.DarkTheme.background,
        textShadowRadius: 3,
        fontFamily: 'poppins-medium'
    },
    gradient: {
        flex: 1,
        paddingBottom: 16,
        justifyContent: 'flex-end'
    }
})

export default TypeButton
