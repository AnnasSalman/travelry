import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions} from 'react-native'
import {Button} from 'react-native-paper'
import Colors from "../../../constants/Colors";
import { IconButton } from 'react-native-paper'
import AmenityIconButton from "../../atoms/AmenityIconButton/AmenityIconButton";
import Amenities from "../../../constants/Amenities";
import getIcon from "../../../constants/Amenities";


const {height, width} = Dimensions.get('window')

const AmenityPanel = props => {

    const [exitButton, setExitButton] = useState(false)

    return(
        <TouchableWithoutFeedback onPress={()=>{
            props.onPanelPress()
            setExitButton(true)
        }
        }>
            <View style={styles.container}>
                {!exitButton?
                    <View style={styles.notch}/>:null
                }
                {
                    exitButton?
                    <View style={styles.header}>
                        <Text style={styles.title}>Room Facilities</Text>
                    </View>:null
                }
                <View style={styles.mainFacilities}>
                    {
                        props.roomAmenities?
                            props.roomAmenities.map((amenity)=>
                                (
                                <AmenityIconButton
                                    key={amenity}
                                    icon={getIcon('Room', amenity)}
                                    color={'white'}
                                    size={30}
                                    textColor={'white'}
                                >{amenity}
                                </AmenityIconButton>
                            )
                        ):
                            <View style={{...styles.header, alignItems: 'center'}}>
                                <Text style={{...styles.title, color: 'white'}}>No Facilities To Show</Text>
                            </View>
                    }
                </View>
                {
                    exitButton?
                    <IconButton
                    icon={'close-circle'}
                    size={25}
                    color={Colors.ForestBiome.primary}
                    style={styles.exit}
                    onPress={()=>{
                        props.onClose()
                        setExitButton(false)
                    }}
                />:null
                }
                <View style={styles.questions}>
                    <Text style={styles.headingSmaller}>Have Questions?</Text>
                </View>
                <View style={styles.contact}>
                    <Button
                        icon="phone"
                        color='white'
                        mode="outlined"
                        onPress={() => console.log('Pressed')}
                        style={styles.contactButton}
                    >
                        Call us
                    </Button>
                    <Button
                        icon="chat"
                        color='white'
                        mode="outlined"
                        onPress={() => console.log('Pressed')}
                        style={styles.contactButton}
                    >
                        Live Chat
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.background,
        flex: 1,
        borderRadius: 45,
        alignItems: 'center'
    },
    notch: {
        backgroundColor: 'white',
        width: '15%',
        height: 5,
        opacity: 0.6,
        marginTop: 2,
        borderRadius: 5
    },
    mainFacilities: {
        flexDirection: 'row',
        width: '80%',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    exit: {
        position: 'absolute',
        right:10,
        top: 10
    },
    header: {
        width: '80%',
        margin: 15,
        marginBottom: 5
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontSize: 18,
        fontFamily: 'poppins-medium',
    },
    questions: {
        margin: 12,
        width: '80%'
    },
    headingSmaller: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.ForestBiome.primary
    },
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%'
    },
    contactButton: {
        borderColor: Colors.ForestBiome.primary,
        borderWidth: 2,
        borderRadius: 15
    }
})

export default AmenityPanel
