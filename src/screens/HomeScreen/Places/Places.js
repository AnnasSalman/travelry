import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {Searchbar, IconButton} from "react-native-paper";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import TypeCarousel from "../../../components/molecules/TypeCarousel/TypeCarousel";
import PlaceTypes from "../../../constants/PlaceTypes";
import Location from "../../../models/Location";

const {height, width} = Dimensions.get('window')

const randomize = (number) => {
    return Math.round(Math.random()*(number+1))
}

const Places = props => {

    const [searchQuery, setSearchQuery] = useState('');
    const [randoms, setRandoms] = useState({three: randomize(4), two: randomize(2)})
    const [location, setLocation] = useState({name: '', formatted_address: ''})
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(()=>{
        try{
            getLocation()
        }
        catch(e){
            console.log(e)
        }
    },[])

    const joinAddress = (addArray) => {
        let address = ''
        addArray.forEach((add,index)=>{
            if(index<3){
                address+=addArray[index].long_name
                if(index<3){
                    address+=', '
                }
                else{
                    address+=', '
                }
            }
        })
        return address
    }

    const getLocation = async() => {
        const location = new Location()
        try{
            const locationData = await location.getLocation()
            setLocation(locationData)
        }
        catch{
            console.log('location not present')
        }
    }

    const typeSelectHandler = async(item) => {
        console.log(item)
        const key = item.key
        const name = item.name
        const marker = item.marker
        props.navigation.navigate('mapScreen',
            {
                coordinates: location.geometry.location,
                marker,
                locationName: location.name,
                address: location.formatted_address,
                typeName: name,
                typeKey: key,
                textSearch: item.textSearch?true:false
            })
    }

    const searchHandler = (event) => {
        const searchText = event.nativeEvent.text
        props.navigation.navigate('mapScreen',
            {
                coordinates: location.geometry.location,
                locationName: location.name,
                address: location.formatted_address,
                typeName: searchText.toUpperCase(),
                typeKey: searchText,
                textSearch: true
            })

    }

    return(
        <View style={styles.container}>
            <View style={styles.locationBar}>
                <IconButton
                    icon='map-marker'
                    size={20}
                    color={Colors.ForestBiome.primary}
                />
                <View>
                    <Text style={styles.locationText}>{location.name}</Text>
                    <Text style={styles.smallText}>{location.formatted_address}</Text>
                </View>
            </View>
            <CustomHeader
                text='Places Nearby'
                containerStyle={styles.header}
                titleStyle={styles.title}
                onBack={()=>props.navigation.navigate('Home')}
                theme={{ colors: {
                    text: styles.searchBarTextStyles.color,
                        placeholder: 'white',
                        primary: 'white'
                } }}
            />
            <Searchbar
                iconColor={Colors.ForestBiome.primary}
                cursorColor={'blue'}
                placeholderTextColor={Colors.ForestBiome.primary}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={styles.searchBarTextStyles}
                onSubmitEditing={(event)=>searchHandler(event)}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Parks And Recreation</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.parksAndRecreation.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.parksAndRecreation}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Services</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.services.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.services}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Transit And Public Transport</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.transitAndPublicTransport.length}</Text>

                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.transitAndPublicTransport}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Service People</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.servicePeople.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.servicePeople}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Health</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.health.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.health}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Food and Restaurants</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.foodAndRestaurants.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.foodAndRestaurants}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Retail And Commercial</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.retailAndCommercial.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.retailAndCommercial}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
                <View style={styles.category}>
                    <View style={styles.subtitleBar}>
                        <Text style={styles.subtitle}>Places Of Worship</Text>
                        <Text style={styles.subtitle}>{PlaceTypes.placesOfWorship.length}</Text>
                    </View>
                    <TypeCarousel
                        style={styles.carousel}
                        data={PlaceTypes.placesOfWorship}
                        onTypeSelect={(key, marker)=>typeSelectHandler(key, marker)}
                        three={randoms.three}
                        two={randoms.two}
                    />
                </View>
            </ScrollView>
            <View style={styles.navBar}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: height*0.029,
        paddingLeft: width*0.02,
        paddingRight: width*0.02,
        flex: 1,
        backgroundColor: Colors.ForestBiome.background
    },
    title: {
        color: 'white',
        fontFamily: 'poppins-medium'
    },
    subtitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.ForestBiome.primary,
        marginTop: height*0.01,
        marginBottom: height*0.02,
        marginLeft: width*0.13,
        fontFamily: 'poppins-regular'

    },
    carousel: {
        width: width*0.9,
    },
    category:{
        marginBottom: 10,
        marginTop: 15
    },
    navBar:{
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        opacity: 0.6,
        height: 55,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    subtitleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: width*0.13
    },
    searchBar: {
        backgroundColor: Colors.ForestBiome.background,
        shadowColor: Colors.ForestBiome.primary,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        height: '6%',
        marginLeft: width*0.07,
        marginRight: width*0.07,
        marginBottom: 10
    },
    searchBarTextStyles: {
        color: 'white',
        fontSize: 16
    },
    locationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '6%',
        marginLeft: 12
    },
    locationText: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    smallText: {
        color: Colors.ForestBiome.primary,
        fontSize: 10,
        fontFamily: 'poppins-regular'
    }
})


Places.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Places
