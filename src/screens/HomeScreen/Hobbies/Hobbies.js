import React, {useRef, useState} from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import {FAB} from 'react-native-paper'
import Plan from "../Plan/Plan";
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import HobbiesPanel from "../../../components/molecules/HobbiesPanel/HobbiesPanel";
import DraggableFlatList from "react-native-draggable-flatlist";
import HobbiesData from "../../../constants/Hobbies";
import SelectedHobby from "../../../components/atoms/SelectedHobby/SelectedHobby";

const {height, width} = Dimensions.get('window')

const exampleData = [...Array(20)].map((d, index) => ({
    key: `item-${index}`, // For example only -- don't use index as your key!
    label: index,
    backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));

const Hobbies = props => {

    const hPanel = useRef(null)

    const [state, setState] = useState({data: []})

    const _onNext = () => {
        const tourHobbies = state.data.map((hobbyObject)=>hobbyObject.key)
        console.log(tourHobbies)
        props.navigation.navigate('generalTourInfo', {...props.navigation.state.params, hobbies: tourHobbies})
    }

    const _onBack = () => {
        props.navigation.goBack()
    }

    const addHobbies = (hobby) => {
        const currentHobbies = state.data
        currentHobbies.push(hobby)
        setState({...state, data: currentHobbies})
        _onPanelHide()
    }

    const _onPanelOpen = () => {
        setTimeout(()=>{
            hPanel.current.show()
        },200)
    }

    const _onPanelHide = () => {
        setTimeout(()=>{
            hPanel.current.hide()
        },200)
    }

    const onDelete = (index) => {
        const tempHobbies = state.data
        tempHobbies.splice(index, 1)
        setState({...state, data: tempHobbies})
    }

    const renderItem = ({ item, index, drag, isActive }) => {
        return (
            <SelectedHobby
                style={styles.hobbySelected}
                tint={item.tint}
                barColor={item.barColor}
                textColor={item.textColor}
                name={item.name}
                image={item.image}
                subtext={item.subtext}
                icon={item.icon}
                index={index}
                drag={drag}
                isActive={isActive}
                onDelete={()=>onDelete(index)}
            />
        );
    };

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Hobbies & Preferences'
                subtext={'Select three types of places you like.'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={()=>_onBack()}
            />
            <View style={styles.body}>
                <DraggableFlatList
                    data={state.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.key}
                    onDragEnd={({ data }) => setState({ data })}
                    style={{paddingBottom: 150}}
                />
            </View>
            <View style={styles.fabBar}>
                {
                    state.data.length>0?
                        <FAB
                            style={styles.fab}
                            label='Continue'
                            icon="check"
                            onPress={_onNext}
                            color={Colors.ForestBiome.background}
                        />
                        :null
                }
                {
                    state.data.length<3?
                        <FAB
                            style={styles.fab}
                            icon="plus"
                            onPress={_onPanelOpen}
                            color={Colors.ForestBiome.background}
                        />
                        :null
                }
            </View>
            <HobbiesPanel
                ref={hPanel}
                onClose={_onPanelHide}
                onHobbyPress={(hobby)=>addHobbies(hobby)}
                selectedHobbies={state.data.map((hobby)=>hobby.key)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.background,
        flex: 1,
        paddingBottom: 50,
        paddingTop: 25,
    },
    headerText: {
        color: 'white'
    },
    body: {
        flex: 1,
        paddingTop: 10
    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    hobbySelected: {
        height: height*0.23,
        width: width
    },
    fabBar: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 50,
        right: 10,
        alignItems: 'flex-end'
    },
    fab: {
        marginHorizontal: 10,
        backgroundColor: Colors.ForestBiome.primary,
    },
    placeMaker: {
        height: 50
    }
})

Hobbies.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Hobbies
