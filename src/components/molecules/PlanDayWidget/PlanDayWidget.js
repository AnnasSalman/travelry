import React, {useState} from "react";
import {View, Text, StyleSheet} from 'react-native'
import PlanRoute from "../../atoms/PlanRoute/PlanRoute";
import SegmentedControl from '@react-native-community/segmented-control';
import Colors from "../../../constants/Colors";
import UnderConstruction from "../../atoms/UnderConstruction/UnderConstruction";


const PlanDayWidget = props => {

    const [currentTab, setCurrentTab]= useState(0)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Tour Day {props.day}
            </Text>
            <SegmentedControl
                values={['Route', 'Timeline', 'Bookings']}
                selectedIndex={currentTab}
                fontStyle={{
                    color: Colors.ForestBiome.primary,
                    fontFamily: 'poppins-regular',
                    fontSize: 15
                }}
                tintColor={Colors.ForestBiome.primary}
                backgroundColor={Colors.ForestBiome.background}
                style={styles.tab}
                onChange={(event) => {
                    setCurrentTab(event.nativeEvent.selectedSegmentIndex)
                }}
            />
            {
            currentTab===0?
                <PlanRoute
                waypointNames={props.waypointNames}
                waypoints={props.waypoints}
                originName={props.originName}
                destinationName={props.destinationName}
                originLat={props.originLat}
                originLng={props.originLng}
                destinationLat={props.destinationLat}
                destinationLng={props.destinationLng}
                />:null
            }
            {
                currentTab===1 || currentTab===2?
                    <UnderConstruction/>:null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 15,
        marginRight: 5,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        paddingVertical: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 45,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    tab: {
        borderWidth: 1,
        borderColor: Colors.ForestBiome.primary,
        margin: 10,
        marginTop: 20,
        height: 25,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        marginLeft: 20,
        color: 'white',
        fontFamily: 'poppins-medium',
        fontSize: 21
    }
})

export default PlanDayWidget
