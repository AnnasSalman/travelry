import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Keyboard,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    Platform,
    KeyboardAvoidingView,
} from 'react-native'

import SlidingUpPanel from "rn-sliding-up-panel";
import { Searchbar, IconButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchIconButton from "../../atoms/SearchIconButton";
import Colors from '../../../constants/Colors'
const{ height } = Dimensions.get('window')

class SearchPanel extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        if(true) {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardWillShow',
                () => this._panel.show()
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () =>
                setTimeout(()=>{
                    this._panel.show({
                        toValue: height * 0.35,
                        velocity: 0.55
                    },1000)
                })
            );
        }
        console.log('mount cal')
    }

    componentWillUnmount = () => {
        if(true) {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
        console.log('unmoun ale')
    }

    // _panelShow = () => {
    //     this._panel.show({
    //         toValue: height*0.9,
    //         velocity: 0.65
    //     })
    // }

    render() {
        return (
            <SlidingUpPanel
                ref = {c => this._panel = c}
                draggableRange={{top: height*0.9, bottom: height * 0.43}}
                animatedValue={new Animated.Value(height * 0.43)}
                snappingPoints={[height * 0.42, height]}
                backdropOpacity={1.0}
                backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
                minimumVelocityThreshold = {0.8}>
                <View style={styles.slideUp}>
                    <TouchableWithoutFeedback onPress={()=>this._panel.show()}>
                        <View style={styles.notch}>
                            <View style={styles.up}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.panelHeader}>
                        <View style={styles.searchBar}>
                            <Text style={styles.title}>Search</Text>
                            <TouchableWithoutFeedback onPress={this.props.onSearchPress}>
                                <View style={styles.searchBox}>
                                    <Icon
                                        name='add-location'
                                        size={25}
                                        color={'grey'}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.text}>{this.props.searchBarText}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.subHeading}>What would you like to find?</Text>
                            <View style={styles.buttonGroup}>
                                <SearchIconButton
                                    icon="biathlon"
                                    onPress={this.props.onTourPress}
                                >Tours
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="city-variant-outline"
                                    onPress={this.props.onHotelPress}
                                >Hotels
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="pine-tree"
                                    onPress={this.props.onPlacePress}
                                    >Places
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="star-outline"
                                    onPress={this.props.onRoomPress}
                                    >Rooms
                                </SearchIconButton>
                            </View>
                        </View>
                    </View>
                    <View style={styles.panelBody}>
                        <ScrollView>

                        </ScrollView>
                    </View>
                </View>
            </SlidingUpPanel>
        )
    }
}

const styles = StyleSheet.create({
    notch:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    up: {
        backgroundColor: Colors.DarkTheme.onSurface,
        opacity: 0.5,
        width: 100,
        height: 7,
        borderRadius: 10,
        marginBottom: 5
    },
    slideUp: {
        flex: 1,
        // opacity: 0.6,
    },
    searchBar: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15,
    },
    searchBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: height*0.065,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    title: {
        fontFamily: 'the-bold-font',
        fontSize: 35,
        color: 'white',
        marginBottom: 10,
        marginTop: 10
    },
    buttonGroup: {
        flexDirection: 'row',
        opacity: 1,
        justifyContent: 'center'
    },
    subHeading: {
        marginTop: 15,
        marginLeft: 10,
        fontFamily: 'poppins-regular',
        fontSize: 16,
        color: Colors.DarkTheme.onSurface,
    },
    panelHeader: {
        // backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backgroundColor: Colors.ForestBiome.background
    },
    panelBody: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backgroundColor: Colors.ForestBiome.background
    },
    text: {
        color: 'grey',
        margin: 10
    },
    icon: {
        margin: 10
    }
});
//
export default SearchPanel;
