import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import Tour from "../../../models/Tour";
import {Agenda} from "react-native-calendars";
import PlanDayWidget from "../../../components/molecules/PlanDayWidget/PlanDayWidget";
import PlanStayDayWidget from "../../../components/molecules/PlanStayDayWidget/PlanStayDayWidget";
import TourPlanPlaceWidget from "../../../components/atoms/TourPlanPlaceWidget/TourPlanPlaceWidget";
import tourDemo from "../../../constants/demo";
import { Fold } from 'react-native-animated-spinkit'
import Carousel from 'react-native-snap-carousel';
import { FAB, Portal, Provider } from 'react-native-paper';
import {showLocation} from "react-native-map-link";

const loadingMessages = ['Finding Routes...', 'Calculating Distances...', 'Planning Schedule...', 'Finding the best suited places for you...', 'Generating the best stay packages for you...','Hang on, just a few things left to take care of...']

const {height, width} = Dimensions.get('window')

const getMaxNumber = (availablePlaces) => {
    let highest = 0
    availablePlaces.forEach((place)=>{
        if(place.score>highest){
            highest = place.score
        }
    })
    return Math.floor(highest)
}

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

const directionsHandler = (deslat, deslng, srclat, srclng) => {

    try{
        showLocation({
            latitude: deslat,
            longitude: deslng,
            sourceLatitude: srclat,  // optionally specify starting location for directions
            sourceLongitude: srclng,  // not optional if sourceLatitude is specified
            // title: 'The White House',  // optional
            // googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            // dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            // dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            // cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            // appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // // app: 'uber'  // optionally specify specific app to use
        })
    }
    catch(e){
        console.log('error in maps')
    }
}


const Plan = props => {

    const [plan, setPlan] = useState(null)
    const [planFetched, setPlanFetched] = useState(false)
    const [menuOpen, setMenuOpened] = useState(false);
    const [cities, setCities] = useState(null)
    const [distance, setDistance] = useState()
    const [totalFuel, setTotalFuel] = useState(0)
    const [totalStays, setTotalStays] = useState(0)

    useEffect(()=>{
        if(plan){
            const planDatesArray = Object.keys(plan.dateSchedule)
            let totalFuelTemp = 0
            let totalStaysTemp = 0
            planDatesArray.forEach((planDate)=>{
                if(plan.dateSchedule[planDate][0].bookings){
                    totalStaysTemp+=plan.dateSchedule[planDate][0].bookings[0].total
                }
                if(plan.dateSchedule[planDate][0].localSelectedLocations){
                    totalFuelTemp+=((((plan.dateSchedule[planDate][0].localSelectedLocations.distanceCovered)/1000)/plan.fuelAverage)*plan.fuelPrice)
                }
                totalFuelTemp+=((((plan.dateSchedule[planDate][0].distanceCovered*2)/1000)/plan.fuelAverage)*plan.fuelPrice)

            })
            setTotalFuel(Math. round(totalFuelTemp / 1000) * 1000)
            setTotalStays(totalStaysTemp)
        }
    },[plan])

    useEffect(()=>{
        if(props.navigation.state.params.tourId){
            fetchSavedTour().then().catch()
        }
        else{
            fetchTourPlan().then().catch()
        }
    },[])

    const fetchSavedTour = async() => {
        try{
            const tour = new Tour()
            const plan = await tour.getTourById(props.navigation.state.params.tourId)
            setPlan(plan)
            setPlanFetched(true)
        }
        catch(e){
            console.log(e)
        }

    }

    const fetchTourPlan = async() => {
        const {locations, dates, fuelType, fuelAverage, guests, budget, hobbies} = props.navigation.state.params
        const coordinates = locations.map((location)=>{
            const {lat, lng} = location.place.geometry.location
            return lat+","+lng
        })
        const tour = new Tour(coordinates, dates, budget, hobbies, fuelType, fuelAverage, guests)
        try{
            const plan = await tour.fetchTourPlan()
            setPlan(plan)
            setPlanFetched(true)
            setCities(locations)
        }
        catch(e){
            console.log(e)
        }
    }

    const _onSaveTour = (type) => {
        const {locations, dates, fuelType, fuelAverage, guests, budget, hobbies} = props.navigation.state.params
        props.navigation.navigate('saveTour', {...plan, public: type==='publish'?true:false, cities, totalBudget: totalFuel+totalStays, fuelAverage: plan.fuelAverage, guests, hobbies, fuelPrice: plan.fuelPrice})
    }

    const onMenuChange = ({open}) => setMenuOpened(open);

    const _onBack = () => {
        props.navigation.goBack()
    }

    const _onChangePlace = (item) => {
        props.navigation.navigate('availablePlaces', {item: item, highest: getMaxNumber(item.localAvailableLocations), _onNewPlaceSelected})
    }

    const _onBookingPackagePressed = (item) => {
        props.navigation.navigate('bookingPackages', {item, _onNewPackageSelected})
    }

    const _onNewPlaceSelected = (place, date) => {
        const statePlaces  = plan.dateSchedule[date][0]
        setPlan({...plan, dateSchedule: {...plan.dateSchedule, [date]: [{...statePlaces, localSelectedLocations: {...place, distanceCovered: 0}}]}})
    }

    const _onNewPackageSelected = (date, index) => {
        const roomArray = plan.dateSchedule[date][0].bookings
        console.log(roomArray.length)
        const temp = plan.dateSchedule[date][0].bookings[index]
        roomArray.splice(index, 1)
        roomArray.unshift(temp)
        setPlan({...plan, dateSchedule: {...plan.dateSchedule, [date]: [{...plan.dateSchedule[date][0], bookings: roomArray}]}})
    }

    const _onDistanceChange = (date, distance) => {
        setPlan({...plan, dateSchedule: {...plan.dateSchedule, [date]: [{...plan.dateSchedule[date][0], localSelectedLocations: {...plan.dateSchedule[date][0].localSelectedLocations, distance: Math.floor(distance)}}]}})
    }

    const _onSettingsPressed = () => {
        props.navigation.navigate('tourSettings', {fuelPrice: plan.fuelPrice, fuelAverage: plan.fuelAverage, _onSettingsChanged})
    }

    const _onSettingsChanged = (settings) => {
        setPlan({...plan, fuelAverage: settings.fuelAverage, fuelPrice: settings.fuelPrice})
    }

    const _renderLoadingItem = ({item, index}) => {
        return (
            <View style={{
                alignItems: 'center'}}>
                <Text style={styles.loadingText}>{ item }</Text>
            </View>
        );
    }

    return(
    <Provider>
        <Portal>
        <View style={styles.container}>
            <CustomHeader
                text='Tour Plan'
                subtext={'View, Edit or Save your tour plan'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            {
                planFetched?
                    <Agenda
                        items={plan.dateSchedule}
                        loadItemsForMonth={()=>{}}
                        selected={Object.keys(plan.dateSchedule)[0]}
                        renderItem={(item)=>{
                            if(item.locationstoVisit.length>1){
                                let originName = item.locationstoVisit[0].name.split(', ')
                                let destinationName = item.locationstoVisit[item.locationstoVisit.length-1].name.split(', ')
                                let waypoints = []
                                let waypointnames = []
                                for(let i=1; i<item.locationstoVisit.length-1; i++){
                                    waypoints.push({latitude: parseFloat(item.locationstoVisit[i].geometry.coordinates.lat), longitude: parseFloat(item.locationstoVisit[i].geometry.coordinates.lng)})
                                    const nameArr = item.locationstoVisit[i].name.split(', ')
                                    waypointnames.push(nameArr[0]+', '+nameArr[1])
                                }
                                return(
                                    <PlanDayWidget
                                        day={item.index}
                                        waypointNames={waypointnames}
                                        waypoints={waypoints}
                                        originName={originName[0]+', '+originName[1]}
                                        destinationName={destinationName[0]+', '+destinationName[1]}
                                        originLat={item.locationstoVisit[0].geometry.coordinates.lat}
                                        originLng={item.locationstoVisit[0].geometry.coordinates.lng}
                                        // destinationLat={item.locationstoVisit[item.locationstoVisit.length-1].geometry.coordinates.lat}
                                        // destinationLng={item.locationstoVisit[item.locationstoVisit.length-1].geometry.coordinates.lng}
                                        destinationLat={item.bookings[0].hotel.geometry.coordinates[1]}
                                        destinationLng={item.bookings[0].hotel.geometry.coordinates[0]}
                                        bookings={item.bookings?item.bookings:null}
                                        onBookingPackagesPressed={()=>_onBookingPackagePressed(item)}
                                        selectedPackageIndex={0}
                                        onDirections={()=>directionsHandler(
                                            item.bookings[0].hotel.geometry.coordinates[1],
                                            item.bookings[0].hotel.geometry.coordinates[0],
                                            item.locationstoVisit[0].geometry.coordinates.lat,
                                            item.locationstoVisit[0].geometry.coordinates.lng

                                        )}
                                    />
                                )
                            }
                            else if(item.localSelectedLocations){
                                let originName = item.locationstoVisit[0].name.split(', ')
                                let destinationName = item.localSelectedLocations.name
                                return(
                                    <PlanStayDayWidget
                                        day={item.index}
                                        waypointNames={[]}
                                        waypoints={[]}
                                        originName={originName[0]+', '+originName[1]}
                                        destinationName={destinationName}
                                        originLat={item.locationstoVisit[0].geometry.coordinates.lat}
                                        originLng={item.locationstoVisit[0].geometry.coordinates.lng}
                                        destinationLat={item.localSelectedLocations.geometry.location.lat}
                                        destinationLng={item.localSelectedLocations.geometry.location.lng}
                                        onChangePlace={()=>_onChangePlace(item)}
                                        onDistanceChange={(distance)=>_onDistanceChange(item.date, distance)}
                                    >
                                        <TourPlanPlaceWidget
                                            style={styles.planPlaceWidget}
                                            imageReference={item.localSelectedLocations.photos[0].photo_reference}
                                        />
                                    </PlanStayDayWidget>
                                )
                            }
                            else{
                                return(
                                    <View style={styles.rest}>
                                        <IconButton
                                            icon='coffee-outline'
                                            color={Colors.ForestBiome.primary}
                                            size={35}
                                        />
                                        <View>
                                            <Text style={styles.textTitle}>Rest Day</Text>
                                            <Text style={styles.text}>No tasks for today.</Text>
                                        </View>
                                    </View>
                                )
                            }
                        }
                        }
                        renderEmptyDate={()=>
                            <View style={styles.rest}>
                                <Text>Rest Day</Text>
                                <Text>No tasks for today.</Text>
                            </View>}
                        theme={theme}
                        //rowHasChanged={this.rowHasChanged.bind(this)}
                        // markingType={'period'}
                        // markedDates={{
                        //    '2017-05-08': {textColor: '#43515c'},
                        //    '2017-05-09': {textColor: '#43515c'},
                        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                        //    '2017-05-21': {startingDay: true, color: 'blue'},
                        //    '2017-05-22': {endingDay: true, color: 'gray'},
                        //    '2017-05-24': {startingDay: true, color: 'gray'},
                        //    '2017-05-25': {color: 'gray'},
                        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                        // monthFormat={'yyyy'}
                        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                        hideExtraDays={true}
                    />
                    :
                    <View style={styles.loadingView}>
                        <Fold color={Colors.ForestBiome.primary} size={70}/>
                        <View style={styles.carouselContainer}>
                            <Carousel
                                contentContainerCustomStyle={{justifyContent: 'center', alignItems: 'center'}}
                                data={loadingMessages}
                                renderItem={_renderLoadingItem}
                                sliderWidth={300}
                                itemWidth={300}
                                autoplay={true}
                                autoplayInterval={2000}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
            }
            <TouchableOpacity
                style={[styles.budgetBar, styles.row]}
                onPress={_onSettingsPressed}
            >
                <IconButton
                    icon={'settings-outline'}
                    color={Colors.ForestBiome.backgroundVariant}
                    size={22}
                    style={{marginLeft: -4}}
                />
                <View style={{marginLeft: -2}}>
                    <Text style={styles.price}>Fuel: {numFormatter(totalFuel)}</Text>
                    <Text style={styles.price}>Stays: {numFormatter(totalStays)}</Text>
                    <Text style={styles.total}>Total: {numFormatter(totalStays+totalFuel)}</Text>
                </View>
            </TouchableOpacity>
            </View>
            {
                planFetched && !props.navigation.state.params.tourId?
                <FAB.Group
                style={styles.fab}
                fabStyle={styles.fabButton}
                open={menuOpen}
                icon={menuOpen ? 'content-save-settings' : 'dots-vertical'}
                actions={
                    [
                        {
                            icon: 'cloud-upload',
                            label: 'Publish Tour',
                            onPress: () => _onSaveTour('publish'),
                        },
                        {
                            icon: 'content-save-move',
                            label: 'Save Tour',
                            onPress: () => _onSaveTour('save'),
                        },
                    ]
                }
                onStateChange={onMenuChange}
                onPress={() => {
                    if (menuOpen) {
                        // do something if the speed dial is open
                    }
                }}
            />:null
            }
        </Portal>
    </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ForestBiome.background,
        flex: 1,
        paddingBottom: 50,
        paddingTop: 25,
    },
    loadingView: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    carouselContainer: {
        height: 80,
    },
    headerText: {
        color: 'white'
    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    knob: {
        backgroundColor: Colors.ForestBiome.primary,
        height: 10,
        width: 100,
        marginTop: 10,
        borderRadius: 10
    },
    rest: {
        width: '90%',
        height: height*0.1,
        margin: 15,
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textTitle: {
        color: 'white',
        fontFamily: 'poppins-medium',
        fontSize: 16
    },
    text: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular',
        fontSize: 12
    },
    planPlaceWidget: {
        height: 100,
        width: '85%',
        marginLeft: 25,
        marginVertical: '4%'
    },
    loadingText: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-medium',
        fontSize: 16,
        textAlign: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 50,
    },
    fabButton: {
        backgroundColor: Colors.ForestBiome.primary
    },
    budgetBar: {
        position: 'absolute',
        top: '3.5%',
        right: 0,
        backgroundColor: Colors.ForestBiome.primary,
        width: '33%',
        height: '9.5%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    total: {
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.background,
        fontSize: 15
    },
    price: {
        fontSize: 10,
        color: Colors.ForestBiome.background
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const theme = {
    backgroundColor: Colors.ForestBiome.background,
    calendarBackground: Colors.ForestBiome.background,
    textSectionTitleColor: 'white',
    textSectionTitleDisabledColor: 'grey',
    selectedDayBackgroundColor: Colors.ForestBiome.backgroundVariant,
    selectedDayTextColor: 'white',
    todayTextColor: 'yellow',
    dayTextColor: Colors.DefaultTheme.background,
    textDisabledColor: 'grey',
    dotColor: Colors.ForestBiome.primary,
    selectedDotColor: Colors.DarkTheme.background,
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'white',
    indicatorColor: Colors.DefaultTheme.primary,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
    agendaDayTextColor: Colors.ForestBiome.primary,
    agendaDayNumColor: 'grey',
    agendaTodayColor: 'white',
    agendaKnobColor: Colors.ForestBiome.primary
}

Plan.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Plan
