import React, {forwardRef} from 'react'
import {Animated, Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native'
import SlidingUpPanel from "rn-sliding-up-panel";
import Colors from "../../../constants/Colors";
import HobbyWidget from "../../atoms/HobbyWidget/HobbyWidget";
import HobbiesData from "../../../constants/Hobbies";
import {IconButton} from "react-native-paper";

const {height, width} = Dimensions.get('window')

const HobbiesPanel = forwardRef( (props, ref) =>{

    const alreadySelected = (key) => {
        if (props.selectedHobbies.includes(key)){
            return true
        }
        else{
            return false
        }
    }

    const onHobbyPressed = (hobby) => {
        props.onHobbyPress(hobby)
    }

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            {
                item.map((hobby, index)=> {
                    return(
                        <TouchableOpacity
                            style={{width: '48%'}}
                            onPress={alreadySelected(hobby.key)?null:()=>onHobbyPressed(hobby)}
                            key={item[index].key}
                        >
                            <HobbyWidget
                                style={styles.hobbyWidget}
                                tint={hobby.tint}
                                barColor={hobby.barColor}
                                textColor={hobby.textColor}
                                key={hobby.name}
                                name={hobby.name}
                                image={hobby.image}
                                subtext={''}
                                isSelected={alreadySelected(hobby.key)}
                                icon={hobby.icon}
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );

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
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Available Hobbies</Text>
                    <IconButton
                        color={Colors.ForestBiome.primary}
                        icon='close'
                        size={26}
                        onPress={props.onClose}
                    />
                </View>
                <FlatList
                    data={HobbiesData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item[0].key}
                />
            </View>
        </SlidingUpPanel>
    )
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        flex: 1,
        padding: 20,
        paddingBottom: 50
    },
    hobbyWidget: {
        width: '100%',
        marginTop: '3%',
        height: height*0.18,
        borderRadius: 10,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    title: {
        color: Colors.ForestBiome.primary,
        fontSize: 20,
        fontFamily: 'poppins-medium',
        fontWeight: 'bold'
    },

})

export default HobbiesPanel
