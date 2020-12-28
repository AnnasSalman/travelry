import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import NumberIncrementer from "../../../components/atoms/NumberIncrementer/NumberIncrementer";

const TourSettings = props => {

    const [settings, setSettings] = useState(props.navigation.state.params)

    const _onBack = () => {
        props.navigation.goBack()
    }

    const onAverageChange = (average) => {
        if(average>=3){
            setSettings({...settings, fuelAverage: average})
        }
    }

    const onPriceChange = (price) => {
        if(price>=0){
            setSettings({...settings, fuelPrice: price})
        }
    }

    const _onUpdatePress = () => {
        props.navigation.state.params._onSettingsChanged(settings)
        _onBack()
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Settings'
                subtext={'Fine tune the tour according to your needs'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>
                        Fuel Average (km/l)
                    </Text>
                    <NumberIncrementer
                        color={Colors.ForestBiome.primary}
                        onChange={(value)=>onAverageChange(value)}
                        size={32}
                        step={1}
                    >
                        {settings.fuelAverage}
                    </NumberIncrementer>

                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>
                        Fuel Unit Price (Rs/l)
                    </Text>
                    <NumberIncrementer
                        color={Colors.ForestBiome.primary}
                        onChange={(value)=>onPriceChange(value)}
                        size={32}
                        step={1}
                    >
                        {settings.fuelPrice}
                    </NumberIncrementer>
                </View>
            </ScrollView>
            <View style={styles.bottomView}>
                <Button
                    disabled={JSON.stringify(props.navigation.state.params)===JSON.stringify(settings)}
                    icon="update"
                    mode="contained"
                    onPress={_onUpdatePress}
                    style={styles.button}
                    color={Colors.ForestBiome.primary}
                >
                    Update
                </Button>
            </View>
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
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    settingItem: {
        width: '90%',
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        paddingHorizontal: '5%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginVertical: 25
    },
    scrollView: {
        marginTop: 15
    },
    settingText: {
        color: 'grey',
        fontSize: 18,
        fontFamily: 'poppins-medium'
    },
    bottomView: {
        width: '100%',
        alignItems: 'center'
    },
    button: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 15
    }
})

TourSettings.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default TourSettings
