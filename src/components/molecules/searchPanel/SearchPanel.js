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
    KeyboardAvoidingView} from 'react-native'

import SlidingUpPanel from "rn-sliding-up-panel";
import { Searchbar, IconButton } from "react-native-paper";
import SearchIconButton from "../../atoms/SearchIconButton";
import Colors from '../../../constants/Colors'
const{ height } = Dimensions.get('window')

class SearchPanel extends React.Component{

    componentDidMount = () => {
        if(true) {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardWillShow',
                () => this._panel.show()
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () => this._panel.show({
                    toValue: height * 0.35,
                    velocity: 0.55
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
                draggableRange={{top: height*0.9, bottom: height * 0.35}}
                animatedValue={new Animated.Value(height * 0.35)}
                snappingPoints={[height * 0.25, height]}
                backdropOpacity={1.0}
                backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
                minimumVelocityThreshold = {0.6}>
                <View style={styles.slideUp}>
                    <TouchableWithoutFeedback onPress={()=>this._panel.show()}>
                        <View style={styles.notch}>
                            <View style={styles.up}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.panelHeader}>
                        <View style={styles.searchBar}>
                            <Text style={styles.title}>Discover</Text>
                            <Searchbar
                                placeholder='Enter a location'
                                icon='map-marker'
                            />
                            <Text style={styles.subHeading}>What would you like to find?</Text>
                            <View style={styles.buttonGroup}>
                                <SearchIconButton
                                    icon="biathlon"
                                >Tours
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="city-variant-outline"
                                >Hotels
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="pine-tree"
                                    >Places
                                </SearchIconButton>
                                <SearchIconButton
                                    icon="star-outline"
                                    >Favorites
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
        marginTop: 6,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15,
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
        backgroundColor: Colors.DarkTheme.background,
        opacity: 0.7
    },
    panelBody: {
        backgroundColor: Colors.DarkTheme.background,
        flex: 1,
    }
});
//
export default SearchPanel;
