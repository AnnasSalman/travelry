import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Colors from "../../../constants/Colors";
import {Button, IconButton} from 'react-native-paper'

const {height, width} = Dimensions.get('window')

const DialogPanel = props => {
    return(
        <View style={{...styles.container, backgroundColor: props.color, flex: 1}}>
            <IconButton
                color={Colors.ForestBiome.primary}
                onPress={props.onNo}
                size={25}
                icon={'close-circle'}
                style={styles.closeTop}
            />
            <View style={styles.notch}/>
            <View style={styles.body}>
                <Text style={styles.text}>{props.text}</Text>
                <View style={(props.yesText.length+props.noText.length)<=20?styles.row:{}}>
                    <Button
                        icon="close"
                        mode="outline"
                        color={Colors.ForestBiome.primary}
                        style={(props.yesText.length+props.noText.length)<=20?styles.button:styles.buttonClose}
                        onPress={props.onNo}
                    >
                        {props.noText}
                    </Button>
                    <Button
                        icon="check"
                        mode="contained"
                        color={Colors.ForestBiome.primary}
                        style={(props.yesText.length+props.noText.length)<=20?styles.button:styles.buttonClose}
                        onPress={props.onYes}
                    >
                        {props.yesText}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 15,
        marginBottom: 55,
        paddingBottom: 70,
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notch: {
        width: 50,
        height: 8,
        backgroundColor: Colors.ForestBiome.primary,
        borderRadius: 5,
        marginTop: 10
    },
    text: {
        color: 'white',
        fontFamily: 'poppins-medium',
        fontSize: 18,
        textAlign: 'center',
        width: width*0.7
    },
    row: {
        flexDirection: 'row'
    },
    button: {
        margin: 15
    },
    buttonClose: {
        margin: 5
    },
    closeTop: {
        position: 'absolute',
        right: 0
    }
})

export default DialogPanel
