import React from 'react'
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import AvailablePlaceCard from "../../../components/atoms/AvailablePlaceCard/AvailablePlaceCard";

const {height, width} = Dimensions.get('window')

const AvailablePlaces = props => {

    const _onBack = () => {
        props.navigation.goBack()
    }

    const handlePress = (item, date) => {
        props.navigation.state.params._onNewPlaceSelected(item, date)
        _onBack()
    }
    const renderItem = ({ item }) => (
        <AvailablePlaceCard
            imageReference={item.photos[0].photo_reference}
            name={item.name}
            address={item.formatted_address}
            style={styles.card}
            scoreHighest={props.navigation.state.params.highest}
            scoreCurrent={item.score}
            rating={item.rating}
            reviews={item.user_ratings_total}
            onPress={()=>handlePress(item, props.navigation.state.params.item.date)}
            isSelected={item.place_id===props.navigation.state.params.item.localSelectedLocations.place_id?true:false}
        />
    );

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Available Places'
                subtext={'Select a place from the list based on your hobbies'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            <FlatList
                data={props.navigation.state.params.item.localAvailableLocations}
                renderItem={renderItem}
                keyExtractor={item => item.place_id}
                contentContainerStyle={styles.list}
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
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    card: {
        width: width*0.95,
        height: height*0.28,
        marginVertical: 10
    },
    list: {
        width: '100%',
        alignItems: 'center'
    }
})

AvailablePlaces.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default AvailablePlaces
