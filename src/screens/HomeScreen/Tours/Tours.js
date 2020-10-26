import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Booking from "../Booking/Booking";
import Colors from "../../../constants/Colors";
import {FAB} from 'react-native-paper'

const Tours = props => {

    const _backHandler = () => {
        props.navigation.navigate('Home')
    }

    const _newTourHandler = () => {
        props.navigation.navigate('tourDemo')
        // props.navigation.navigate('addLocations')
        // props.navigation.navigate('plan')
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Tours'
                subtext={'Nearby'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_backHandler}
            />
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={_newTourHandler}
                label={'Create Tour'}
                animated
                color={Colors.ForestBiome.background}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background,
        paddingBottom: 25
    },
    header: {
        marginTop: 20,
        alignItems: 'center'
    },
    headerText: {
        color: Colors.ForestBiome.primary,
    },
    sub:{
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 45,
        backgroundColor: Colors.ForestBiome.primary
    },
})

Tours.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Tours
