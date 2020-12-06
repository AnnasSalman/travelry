import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {IconButton} from 'react-native-paper'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import Tour from "../../../models/Tour";
import {Agenda} from "react-native-calendars";
import PlanDayWidget from "../../../components/molecules/PlanDayWidget/PlanDayWidget";
import PlanStayDayWidget from "../../../components/molecules/PlanStayDayWidget/PlanStayDayWidget";
import TourPlanPlaceWidget from "../../../components/atoms/TourPlanPlaceWidget/TourPlanPlaceWidget";
import tourDemo from "../../../constants/demo";

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

const Plan = props => {

    const [plan, setPlan] = useState(tourDemo)
    const [planFetched, setPlanFetched] = useState(true)

    // useEffect(()=>{
    //     fetchTourPlan().then().catch()
    // },[])

    const fetchTourPlan = async() => {
        const {locations, dates} = props.navigation.state.params
        const coordinates = locations.map((location)=>{
            const {lat, lng} = location.place.geometry.location
            return lat+","+lng
        })
        const tour = new Tour(coordinates, dates,15000, [])
        try{
            const plan = await tour.fetchTourPlan()
            setPlan(plan)
            setPlanFetched(true)
        }
        catch(e){
            console.log(e)
        }
    }

    const _onBack = () => {
        props.navigation.goBack()
    }

    const _onChangePlace = (item) => {
        props.navigation.navigate('availablePlaces', {item: item, highest: getMaxNumber(item.localAvailableLocations), _onNewPlaceSelected})
    }

    const _onNewPlaceSelected = (place, date) => {
        const statePlaces  = plan.dateSchedule[date][0]
        setPlan({...plan, dateSchedule: {...plan.dateSchedule, [date]: [{...statePlaces, localSelectedLocations: place}]   }})
    }

    return(
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
                        selected={new Date()}
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
                                        destinationLat={item.locationstoVisit[item.locationstoVisit.length-1].geometry.coordinates.lat}
                                        destinationLng={item.locationstoVisit[item.locationstoVisit.length-1].geometry.coordinates.lng}
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
                        // hideExtraDays={false}
                    />
                    :null
            }
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
