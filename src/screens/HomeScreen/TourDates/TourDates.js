import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from 'react-native'
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import {Calendar} from "react-native-calendars";
import moment from "moment";
import {Button} from "react-native-paper";

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

const TourDates = props => {

    const [state, setstate] = useState({})
    const [startdate, setStartDate ] = useState()
    const [enddate, setenddate ] = useState()

    useEffect(()=>{
        const tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        const dates = getDates(new Date(), tomorrow)
        setStartDate(dates[0])
        setenddate(dates[dates.length-1])
        setstate({
            markedDates: {
                [dates[0]]: { startingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF'},
                [dates[1]]: { endingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF'}
                },
            isStartDatePicked: false,
            isEndDatePicked: true,
        })
    },[])

    const _onBack = () => {
        props.navigation.goBack()
    }

    const _onNext = () => {
        props.navigation.navigate('hobbies', {...props.navigation.state.params, dates: Object.keys(state.markedDates)})
    }

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
            <CustomHeader
                text='Select Tour Dates'
                subtext={'Select the time period for you tour'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
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
            </View>
            {
                state.isEndDatePicked?
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
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ForestBiome.background,
        paddingBottom: 55,
        paddingTop: 25,
    },
    headerText: {
        color: 'white'
    },
    body: {
        flex: 1
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
    calendar: {
        marginTop: 25
    },
    dates:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
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
    value: {
        color: 'white',
        fontSize: 14
    },
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

TourDates.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default TourDates
