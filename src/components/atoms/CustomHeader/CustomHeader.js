import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {IconButton} from "react-native-paper";

const CustomHeader = props => {

    const closeButton = () => {
        if(props.type==='modal'){
            return(
                <IconButton
                    icon={'close'}
                    color={props.titleStyle && props.titleStyle.color?props.titleStyle.color:'black'}
                    size={30}
                    onPress={props.onClose}
                />
            )
        }
        else if(props.type==='simple'){
            return null
        }
        else{
            return null
        }
    }

    return(
        <View style={{...styles.containerStyle, ...props.containerStyle}}>
            <View style={styles.left}>
                <IconButton
                    icon='chevron-left'
                    color={props.titleStyle && props.titleStyle.color?props.titleStyle.color:'black'}
                    size={30}
                    onPress={props.onBack}
                />
                <View>
                    <Text style={{...styles.title, ...props.titleStyle}}>{props.text}</Text>
                    {
                        props.subtext?
                            <Text style={{...styles.subtitle, ...props.subtitleStyle}}>{props.subtext}</Text>
                            :null
                    }
                </View>
            </View>
            {
                closeButton()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CustomHeader
