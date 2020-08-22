import React, {useRef, useState} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, ScrollView} from 'react-native'
import Colors from "../../../constants/Colors";
import {IconButton, Provider, Portal, Modal, Button} from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {LocaleConfig, Calendar} from 'react-native-calendars';
import moment from 'moment';
import SlidingUpPanel from "rn-sliding-up-panel";

const {width, height} = Dimensions.get('window')

const sliderValues = [0, 20000]
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const FilterPanel = props => {

    const [visible, setVisible] = React.useState(false);
    const calendarPanel = useRef(null)
    const [guests, setguests] = useState(1)
    const [from, setfrom] = useState(0)
    const [to, setto] = useState(30000)
    const [loading, setloading] = useState(false)


    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)

    const [state, setstate] = useState({
        markedDates: {
            [today.toISOString().substring(0,10)]: {startingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' },
            [tomorrow.toISOString().substring(0,10)]: {endingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' },
        },
        isStartDatePicked: false,
        isEndDatePicked: true,
        startDate: today.toISOString().substr(0,10)
    })

    const onDayPress = (day) => {
        if (state.isStartDatePicked == false) {
            let markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' };
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
                        markedDates[tempDate] = { endingDay: true, color: Colors.ForestBiome.primary, textColor: '#FFFFFF' };
                    }
                }
                setstate({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    startDate: ''
                });
            } else {
                alert('Select an upcomming date!');
            }
        }
    }

    return(
        <Provider>
            <Portal>
        <View style={styles.container}>
            <View style={styles.top}>
                <IconButton
                    icon='close-circle'
                    color={Colors.ForestBiome.secondary}
                    size={30}
                    onPress={props.onClose}
                />
            </View>
            <ScrollView>
                <View style={styles.mid}>
                    <Text style={styles.text}>Choose your room</Text>
                    <Text style={{...styles.text, color: Colors.ForestBiome.secondary}}>Preferences</Text>
                    <View style={styles.guests}>
                        <Text style={{...styles.text, color: Colors.ForestBiome.secondary}}>Number Of Guests</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <IconButton
                            icon='minus'
                            color={Colors.ForestBiome.primary}
                            size={30}
                            onPress={()=>{if(guests>1){setguests(guests-1)}}}
                        />
                        <Text style={styles.text}>{guests}</Text>
                        <IconButton
                            icon='plus'
                            color={Colors.ForestBiome.primary}
                            size={30}
                            onPress={()=>setguests(guests+1)}
                        />
                    </View>
                    <View style={styles.range}>
                        <Text style={{...styles.text, color: Colors.ForestBiome.secondary}}>Budget Range</Text>
                        <MultiSlider
                            values={sliderValues}
                            min={0}
                            max={30000}
                            step={1000}
                            onValuesChange={(value)=>{setfrom(value[0])
                                setto(value[1])}}
                            markerStyle={styles.marker}
                            snapped
                            selectedStyle={{backgroundColor: Colors.ForestBiome.primary}}
                        />
                        <Text style={styles.textSmall}>From Rupees
                            <Text style={{...styles.textSmall, color: Colors.ForestBiome.primary}}> {from}</Text> To Rupees
                            <Text style={{...styles.textSmall, color: Colors.ForestBiome.primary}}> {to}</Text>
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>setVisible(true)}>
                    <View style={styles.calContainer}>
                        <Text style={{...styles.text, color: Colors.ForestBiome.secondary}}>Stay Duration</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15}}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.textSmall}>From</Text>
                                <Text style={{...styles.textSmall, color: Colors.ForestBiome.primary}}>
                                    {getDayOfWeek(Object.keys(state.markedDates)[0])}
                                </Text>
                                <Text style={{...styles.text, color: Colors.ForestBiome.primary}}>
                                    {Object.keys(state.markedDates)[0]}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.textSmall}>To</Text>
                                <Text style={{...styles.textSmall, color: Colors.ForestBiome.primary}}>
                                    {getDayOfWeek(Object.keys(state.markedDates)[Object.keys(state.markedDates).length-1])}
                                </Text>
                                <Text style={{...styles.text, color: Colors.ForestBiome.primary}}>
                                    {Object.keys(state.markedDates)[Object.keys(state.markedDates).length-1]}
                                </Text>
                            </View>
                        </View>
                        <IconButton
                            icon='pencil'
                            color={Colors.ForestBiome.primary}
                            size={30}
                            onPress={()=>setVisible(true)}
                        />
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{alignItems:'center'}}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        color={Colors.ForestBiome.primary}
                        loading={props.loading}
                        onPress={() => props.onSubmit(
                            {
                                guests,
                                from,
                                to,
                                startDate: Object.keys(state.markedDates)[0],
                                endDate: Object.keys(state.markedDates)[Object.keys(state.markedDates).length-1]
                            }
                        )}>
                        Apply Filters
                    </Button>
                </View>
            </ScrollView>
            <Modal visible={visible} onDismiss={()=>setVisible(false)}>
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
                <View style={styles.top}>
                    <IconButton
                        icon='check-bold'
                        color={Colors.ForestBiome.secondary}
                        size={30}
                        onPress={()=>setVisible(false)}
                    />
                </View>
            </Modal>
        </View>
</Portal>
</Provider>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.ForestBiome.background,
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    top:{
        margin: 8,
        marginBottom: 0,
        alignItems: 'flex-end'
    },
    mid: {
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    calendar: {
        justifyContent: 'center',
        height: 400,
        width: width,
    },
    text: {
        fontFamily: 'poppins-regular',
        fontSize: 20,
        color: 'white',
    },
    textSmall: {
        fontFamily: 'poppins-regular',
        fontSize: 16,
        color: 'white',
    },
    guests: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    range: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker: {
        height:20,
        width: 20,
        borderRadius: 15,
        backgroundColor: Colors.ForestBiome.primary,
        borderWidth: 0,
    },
    track: {
        backgroundColor: 'yellow'
    },
    calContainer: {
        alignItems: 'center',
        marginTop: 40,
        width: '70%'
    },
    button:{
        width: '80%',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        fontSize: 12,
        marginTop: 15
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

export default FilterPanel
