import React from 'react'
import {StyleSheet, Image, View} from 'react-native'

const Avatar = props => {
    return(
        <View
            style={[styles.container, props.style]}
        >
            <Image
                source={props.type==='local'?props.placeholder:{url: props.image}}
                style={styles.image}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})

export default Avatar
