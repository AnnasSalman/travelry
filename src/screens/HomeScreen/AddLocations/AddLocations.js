import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, Animated} from 'react-native'
import {Provider, Portal, Modal, Button, FAB, Dialog} from 'react-native-paper'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import CityWidget from "../../../components/molecules/CityWidget/CityWidget";
import AddCityModal from "../../../components/molecules/AddCityModal/AddCityModal";
import Carousel, {Pagination} from "react-native-snap-carousel";
import SlidingUpPanel from "rn-sliding-up-panel";
import DialogPanel from "../../../components/atoms/DialogPanel/DialogPanel";
import WeatherPanel from "../../../components/molecules/WeatherPanel/WeatherPanel";

const {height, width} = Dimensions.get('window')

const AddLocations = props => {

    const [origins, setOrigins] = useState([])
    const [destinations, setDestinations] = useState([])
    const [cityType, setCityType] = useState('')
    const [visible, setVisible] = useState(false);
    const [destinationIndex, setDestinationIndex] = useState(0)
    const [state, setState] = useState({ open: false });
    const [deleteItem, setDetleteItem] = useState(null)
    const [deleteMessage, setDeleteMessage] = useState('')
    const [currentTab, setCurrentTab] = useState(0)
    const [selectedWeather, setSelectedWeather] = useState(null)

    const destinationRef = useRef(null)
    const errorPanel = useRef(null)
    const originErrorPanel = useRef(null)
    const weatherPanel = useRef(null)
    const firstUpdate = useRef(true);

    useEffect(()=> {
        if(deleteItem && deleteItem.type === 'destination'){
            setDeleteMessage('destination '+destinations[deleteItem.index].place.name)
        }
        else if (deleteItem && deleteItem.type === 'origin'){
            setDeleteMessage('origin '+origins[deleteItem.index].place.name)
        }
        else {
            setDeleteMessage('')
        }
    },[deleteItem])
    useLayoutEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else if (selectedWeather === null) {

        }
        else{
            showWeatherPanel()
        }
    },[selectedWeather])

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    const _showModal = () => setVisible(true);

    const _hideModal = () => setVisible(false);

    const _onBack = () => {
        props.navigation.navigate('toursScreen')
    }

    const _onAddLocationHandler = (type) => {
        setCityType(type)
        _showModal()
    }

    const _onDestinationChange = (index) => {
        setDestinationIndex(index)
    }

    const _onAddLocation = (data) => {
        if(cityType==='origin'){
            const originTemp = origins
            originTemp.push(data)
            setOrigins(originTemp)
            _hideModal()
        }
        else{
            const destinationTemp = destinations
            destinationTemp.push(data)
            setDestinations(destinationTemp)
            _hideModal()
        }
    }

    const _onDelete = () => {
        setTimeout(() => {
            errorPanel.current.hide()
        });
        if (deleteItem.type === 'origin') {
            const originsTemp = origins
            originsTemp.splice(0,1)
            setOrigins(originsTemp)
            setState({open:false})
        }
        else if (deleteItem.type === 'destination'){
            const destinationsTemp = destinations
            destinationsTemp.splice(deleteItem.index, 1)
            setDestinations(destinationsTemp)
            destinationRef.current.snapToPrev()
            setState({open:false})
        }
    }

    const _onDeleteDialog = (type, index) =>{
        setTimeout(() => {
            errorPanel.current.show()
        });
        setDetleteItem({type, index})
    }

    const _onDialogDeleteDismiss = () => {
        errorPanel.current.hide()
    }

    const _onDialogOriginDismiss = () => {
        originErrorPanel.current.hide()
    }

    const _onOriginUpdate = () => {
        _onDelete()
        _showModal()
    }

    const _onOriginPressed = (type) => {
        if(origins.length===1){
            setTimeout(() => {
                originErrorPanel.current.show()
            });
            setDetleteItem({type: 'origin', index: 0})
            setCityType(type)
        }
        else{
            setCityType(type)
            _showModal()
        }
    }

    const onWeatherTabChange = (val) => {
        setTimeout(function(){
            weatherPanel.current.show()
        });
        setCurrentTab(val)
    }

    const onWeatherPanelClose = () => {
        // setTimeout(()=>{
        //     weatherPanel.current.hide()
        // })
        setSelectedWeather(null)
    }

    const showWeatherPanel = () => {
        setTimeout(function(){
            weatherPanel.current.show()
        });
    }

    const onWeatherPress = (type, index) => {
        if(type === 'origin'){
            setSelectedWeather(origins[index])
        }
        else{
            setSelectedWeather(destinations[index])
        }
    }

    const _cityItem = ({item, index}, type) => {
        return (
            <CityWidget
                key={item.place.formatted_address}
                weatherWidgetContainerStyle={styles.weather}
                weatherWidgetTextStyle={styles.weatherHeader}
                weatherWidgetIconStyle={styles.image}
                weatherIcon={item.weather.current.weather[0].icon}
                weather={item.weather.current.weather[0].main}
                temperature={Math.floor(item.weather.current.temp)}
                cityWidgetImage={item.place.photo}
                cityWidgetImageStyle={styles.cityImage}
                cityWidgetContainerStyle={styles.city}
                cityWidgetTitleStyle={styles.cityHeader}
                cityTitle={item.place.name}
                citySubtitle={item.place.formatted_address}
                mapWidgetStyle={styles.mapImage}
                mapWidgetCenter={item.place.geometry.location.lat+','+item.place.geometry.location.lng}
                mapWidgetContainerStyle={styles.map}
                deleteContainerStyle={styles.delete}
                deleteContainerIconSize={26}
                onDelete={()=>_onDeleteDialog(type, index)}
                onMapPress={()=>console.log('map pressed')}
                onWeatherPress={()=>onWeatherPress(type, index)}
            />
        );
    }

    const _onNext = () => {
        props.navigation.navigate('tourDates', {locations: [...origins, ...destinations]})
    }

    return(
        <Provider>
                <View style={styles.container}>
                    <CustomHeader
                        text='Select Locations'
                        subtext={'Add Locations/cities to visit'}
                        titleStyle={styles.headerText}
                        containerStyle={styles.header}
                        subtitleStyle={styles.sub}
                        onBack={_onBack}
                    />
                    <ScrollView>
                        <View style={styles.body}>
                            <Text style={styles.subHeading}>Origin Location</Text>
                            {origins.length===0?
                                <Text style={styles.text}>Click on the + icon on the bottom right corner of your screen to add an origin location that will be used for as your tour starting position</Text>
                                :null
                            }
                            <Carousel
                                data={origins}
                                renderItem={(item)=>_cityItem(item, 'origin')}
                                sliderWidth={width}
                                itemWidth={width*0.85}
                            />
                            {/*<AddLocationButton*/}
                            {/*    style={styles.addLocationButton}*/}
                            {/*    text='Add Origin Location'*/}
                            {/*    onPress={()=>_onAddLocationHandler('origin')}*/}
                            {/*/>*/}
                            <Text style={{...styles.subHeading, marginTop: height*0.03}}>Destination Locations</Text>
                            {destinations.length === 0 ?
                                <Text style={styles.text}>Click on the + icon on the bottom right corner of your screen
                                    to start adding tour destination to your tour. At least one destination is
                                    required</Text>
                                :null
                            }
                            <Pagination
                                dotsLength={destinations.length}
                                activeDotIndex={destinationIndex}
                                dotStyle={styles.dot}
                                inactiveDotStyle={{
                                    // Define styles for inactive dots here
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                            {destinations.length>0?
                                <Carousel
                                    ref={destinationRef}
                                    data={destinations}
                                    renderItem={(item)=>_cityItem(item, 'destination')}
                                    sliderWidth={width}
                                    itemWidth={width*0.85}
                                    onSnapToItem={(index)=>_onDestinationChange(index)}
                                    extraData={destinationIndex}
                                />
                                :null
                            }
                        </View>
                    </ScrollView>
                    {
                        destinations.length>0 && origins.length>0?
                            <Button
                                style={styles.button}
                                color={Colors.ForestBiome.primary}
                                mode="contained"
                                onPress={_onNext}>
                                Next
                            </Button>:
                            null
                    }
                </View>
                <FAB.Group
                    style={{bottom: 50}}
                    open={open}
                    color={Colors.ForestBiome.background}
                    fabStyle={styles.FAB}
                    icon={open ? 'city' : 'plus'}
                    actions={[
                        {
                            icon: 'home-plus',
                            label: 'Select city of origin',
                            onPress: () => _onOriginPressed('origin'),

                        },
                        {
                            icon: 'map-marker',
                            label: 'Add Destination',
                            onPress: () => _onAddLocationHandler('destination'),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
                <Portal>
                    <Modal visible={visible} onDismiss={_hideModal}>
                        <View style={{height: height}}>
                            <AddCityModal
                                onClose={_hideModal}
                                onSubmit={(data)=>_onAddLocation(data)}
                            />
                        </View>
                    </Modal>
                    <SlidingUpPanel
                        ref={originErrorPanel}
                        height={height*0.42}
                        draggableRange={{bottom: 0, top: 230}}
                        animatedValue={new Animated.Value(0)}
                        snappingPoints={[0, height * 0.42]}
                        backdropOpacity={1.0}
                        minimumVelocityThreshold = {0.9}
                        showBackdrop={false}
                    >
                        <DialogPanel
                            color={Colors.ForestBiome.backgroundVariant}
                            text={'Single Origin City Allowed'}
                            yesText={'Delete current origin and add new'}
                            noText={'keep the current origin'}
                            onNo={()=>_onDialogOriginDismiss()}
                            onYes={()=>_onOriginUpdate()}
                        />
                    </SlidingUpPanel>
                    <SlidingUpPanel
                        ref={errorPanel}
                        animatedValue={new Animated.Value(0)}
                        height={height*0.42}
                        draggableRange={{bottom: 0, top: 230}}
                        snappingPoints={[0, height * 0.42]}
                        backdropOpacity={1.0}
                        minimumVelocityThreshold = {0.9}
                        showBackdrop={false}
                    >
                        <DialogPanel
                            color={Colors.ForestBiome.backgroundVariant}
                            text={'Are you sure you want to delete the '+deleteMessage+'?'}
                            yesText={'Yes do it'}
                            noText={'cancel'}
                            onNo={()=>_onDialogDeleteDismiss()}
                            onYes={()=>_onDelete()}
                        />
                    </SlidingUpPanel>
                    {
                        selectedWeather?
                            <WeatherPanel
                                ref={weatherPanel}
                                currentTab={currentTab}
                                onChange={(val)=>onWeatherTabChange(val)}
                                onClose={onWeatherPanelClose}
                                currentWeather={selectedWeather.weather.current}
                                dailyWeather={selectedWeather.weather.daily}
                                place={selectedWeather.place}
                            />
                            :null
                    }
                </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background,
        paddingBottom: 55,
        paddingTop: 25,
    },
    headerText: {
        color: 'white'
    },
    header: {

    },
    text:{
        color: Colors.ForestBiome.primary,
        width: '70%',
        marginTop: 10,
        textAlign: 'center',

    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    addLocationButton: {
        width: width * 0.8,
        height: height * 0.1,
        marginTop: height * 0.02
    },
    body: {
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 100
    },
    subHeading: {
        color: 'white',
        fontFamily: 'poppins-medium',
        fontSize: 18,
        marginTop: 15
    },
    weather: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        width: width*0.15,
        height: height*0.27,
        borderRadius: 10,
        margin: 5,
        overflow: 'hidden'
    },
    city: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        width: width*0.68,
        height: height*0.27,
        borderRadius: 10,
        margin: 5,
        overflow: 'hidden'
    },
    map: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        width: width*0.68,
        height: height*0.08,
        borderRadius: 10,
        margin: 5,
        marginBottom: 0,
        overflow: 'hidden'
    },
    weatherHeader: {
        color: '#dee3de',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'poppins-medium'
    },
    cityHeader: {
        color: '#dee3de',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'poppins-medium',
        marginLeft: 15,
        marginTop: 8
    },
    image: {
        height: '70%',
        width: '100%',
        resizeMode: 'contain'
    },
    cityImage: {
        borderRadius: 10,
        marginTop: '3%',
        height: '65%',
        width: '100%',
    },
    mapImage: {
        height: '100%',
        width: '100%',
    },
    FAB:{
        backgroundColor: Colors.ForestBiome.primary
    },
    delete: {
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: width*0.15,
        height: height*0.08,
        borderRadius: 10
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2,
        marginHorizontal: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    button: {
        height: 40,
        justifyContent: 'center'
    }
})

AddLocations.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default AddLocations
