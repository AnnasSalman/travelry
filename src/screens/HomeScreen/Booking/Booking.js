import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {Button, IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import {Calendar} from "react-native-calendars";
import moment from "moment";
import DropdownAlert from "react-native-dropdownalert";

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

const {height, width} = Dimensions.get('window')

const Booking = props => {

    const alert = useRef(null)

    const [startdate, setStartDate ] = useState('')
    const [enddate, setenddate ] = useState('')
    const [state, setstate] = useState({})

    const onSubmit = () => {
        if(!state.isEndDatePicked){
            alert.current.alertWithType('custom','Incomplete Dates', 'Add An End Date To Continue')
        }
        else{
            props.navigation.navigate('numberOfRooms', {...props.navigation.state.params, startDate: startdate, endDate: enddate})
        }
    }

    useEffect(()=>{
        let marked = {}
        const dates = (getDates(props.navigation.state.params.filters.startDate, props.navigation.state.params.filters.endDate))
        dates.forEach((date,index)=>{
            if(index===0){
                marked={...marked, [date]: { startingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF'}}
            }
            else if(index === dates.length-1){
                marked={...marked, [date]: { endingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF'}}
            }
            else{
                marked={...marked, [date]: {color: Colors.ForestBiome.primary, textColor: '#FFFFFF'}}
            }
        })
        setStartDate(dates[0])
        setenddate(dates[dates.length-1])
        setstate({
            markedDates: marked,
            isStartDatePicked: false,
            isEndDatePicked: true,
        })
    },[])

    const onDayPress = (day) => {
        if (state.isStartDatePicked == false) {
            let markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' };
            setStartDate(day.dateString)
            setenddate('')
            setstate({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
            });
        } else {
            let markedDates = state.markedDates
            let startDate = moment(state.startDate);
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days')
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD')
                    if (i < range) {
                        markedDates[tempDate] = { color: Colors.ForestBiome.primary, textColor: '#FFFFFF' };
                    } else {
                        setenddate(tempDate)
                        markedDates[tempDate] = { endingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' };
                    }
                }
                setstate({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    startDate: '',
                    endDate: ''
                });
            } else {
                alert('Select an upcomming date!');
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Booking Details</Text>
                <IconButton
                    icon='close-circle'
                    color={Colors.ForestBiome.primary}
                    size={30}
                    onPress={()=>props.navigation.goBack()}
                />
            </View>
            <Text style={styles.subHeading}>Step 1/2 - Pick Dates</Text>
            <View style={styles.body}>
                <View style={styles.dates}>
                    <View style={styles.date}>
                        <Text style={{...styles.value, color:Colors.ForestBiome.primary, fontSize: 14, marginBottom: 5}}>From</Text>
                        <Text style={styles.value}>{moment(startdate).format('dddd')}</Text>
                        <Text style={styles.value}>{moment(startdate).format('LL')}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={{...styles.value, color:Colors.ForestBiome.primary, fontSize: 14, marginBottom: 5}}>To</Text>
                        <Text style={styles.value}>{enddate?moment(enddate).format('dddd'):'-'}</Text>
                        <Text style={styles.value}>{enddate?moment(enddate).format('LL'):'-'}</Text>
                    </View>
                </View>
                <Calendar
                    minDate={Date()}
                    monthFormat={"MMMM yyyy"}
                    markedDates={state.markedDates}
                    dark
                    theme={theme}
                    markingType="period"
                    hideExtraDays={true}
                    hideDayNames={false}
                    onDayPress={(day)=>onDayPress(day)}
                    style={styles.calendar}
                    contentStyle={{height: 50,}}
                />
                <Button
                    mode="contained"
                    style={styles.button}
                    color={Colors.ForestBiome.primary}
                    onPress={()=>onSubmit()}

                >
                    Next Step
                </Button>
            </View>
            <DropdownAlert ref={alert} containerStyle={styles.alert} titleStyle={{color: Colors.ForestBiome.secondary, fontSize: 18}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background
    },
    header: {
        padding: 40,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body:{
        padding: 5,
        alignItems: 'center'
    },
    dates:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date:{
        borderWidth: 1,
        borderColor: Colors.ForestBiome.primary,
        padding: 15,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 20,
        margin: 2
    },
    calendar: {
        width: width-40,
    },
    heading: {
        fontFamily: 'poppins-medium',
        color: Colors.ForestBiome.primary,
        fontSize: 26,
    },
    value: {
        color: 'white',
        fontSize: 18
    },
    subHeading: {
        color: Colors.ForestBiome.primary,
        paddingHorizontal: 40,
        paddingBottom: 10,
        fontSize: 15,
    },
    button:{
        height: height*0.07,
        width: width*0.8,
        justifyContent: 'center',
        borderRadius: 15,
    },
    alert: {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: Colors.ForestBiome.primary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    }
})

const theme = {
    backgroundColor: Colors.ForestBiome.background,
    calendarBackground: Colors.ForestBiome.background,
    textSectionTitleColor: 'white',
    textSectionTitleDisabledColor: 'grey',
    selectedDayBackgroundColor: Colors.DefaultTheme.primary,
    selectedDayTextColor: Colors.DarkTheme.background,
    todayTextColor: 'yellow',
    dayTextColor: Colors.DefaultTheme.background,
    textDisabledColor: 'grey',
    dotColor: 'red',
    selectedDotColor: Colors.DarkTheme.background,
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: Colors.DefaultTheme.surface,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
}

Booking.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default Booking
