import React, {useState} from "react";
import {View, Text, StyleSheet} from 'react-native'
import {Button, IconButton} from "react-native-paper";
import Plan from "../Plan/Plan";
import Colors from "../../../constants/Colors";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import NumberIncrementer from "../../../components/atoms/NumberIncrementer/NumberIncrementer";
import FuelTypeButton from "../../../components/atoms/FuelTypeButton/FuelTypeButton";

const GeneralTourInfo = props => {

    const [fuelAverage, setFuelAverage] = useState(15)
    const [fuelType, setFuelType] = useState('petrol')
    const [guests, setGuests] = useState(4)
    const [budget, setBudget] = useState(20000)

    const _onNext = () => {
        props.navigation.navigate('plan', {...props.navigation.state.params, fuelType, fuelAverage, guests, budget})
    }

    const onAverageChange = (value) => {
        if(value>0 && value<=50){
            setFuelAverage(value)
        }
    }

    const onGuestsChange = (value) => {
        if(value>0 && value<=12){
            setGuests(value)
        }
    }

    const onBudgetChange = (value) => {
        if(value>4000 && value<=200000){
            setBudget(value)
        }
    }

    const _onBack = () => {
        props.navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='General Information'
                subtext={'Enter General information about your tour'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            <View style={styles.containerContent}>
                <View style={{...styles.row, width: '95%', height: '40%', marginTop: '4%', justifyContent: 'space-between'}}>
                    <View style={styles.guestsContainer}>
                        <View style={styles.row}>
                            <View style={{...styles.row, paddingVertical: 5, paddingHorizontal: 5}}>
                                <IconButton
                                    icon={'hiking'}
                                    size={30}
                                    color={Colors.ForestBiome.primary}
                                />
                                <Text style={styles.title}>Tourists</Text>
                            </View>
                        </View>
                        <NumberIncrementer
                            color={Colors.ForestBiome.primary}
                            onChange={(value)=>onGuestsChange(value)}
                            size={35}
                            step={1}
                        >
                            {guests}
                        </NumberIncrementer>
                    </View>
                    <View style={styles.guestsContainer}>
                        <View style={styles.row}>
                            <View style={{...styles.row, paddingVertical: 5, paddingHorizontal: 5}}>
                                <IconButton
                                    icon={'wallet'}
                                    size={30}
                                    color={Colors.ForestBiome.primary}
                                />
                                <Text style={styles.title}>Budget</Text>
                            </View>
                        </View>
                        <View style={{...styles.row, marginLeft: '10%'}}>
                            <Text style={styles.unit}>Rs.</Text>
                            <NumberIncrementer
                                style={{marginLeft: '10%'}}
                                color={Colors.ForestBiome.primary}
                                onChange={(value)=>onBudgetChange(value)}
                                size={35}
                                step={2000}
                            >
                                {budget}
                            </NumberIncrementer>
                        </View>
                    </View>
                </View>
                <View style={styles.fuelContainer}>
                    <View style={styles.row}>
                        <View style={styles.fuelLeft}>
                            <View style={{...styles.row, paddingVertical: 5, paddingHorizontal: 5}}>
                                <IconButton
                                    icon={'gas-station'}
                                    size={30}
                                    color={Colors.ForestBiome.primary}
                                />
                                <Text style={styles.title}>Fuel Average</Text>
                            </View>
                            <View style={{...styles.row, marginTop: -20}}>
                                <NumberIncrementer
                                    color={Colors.ForestBiome.primary}
                                    onChange={(value)=>onAverageChange(value)}
                                    size={35}
                                    step={1}
                                >
                                    {fuelAverage}
                                </NumberIncrementer>
                                <Text style={styles.unit}>Kilometers/litre</Text>
                            </View>
                        </View>
                        <View style={styles.fuelRight}>
                            <FuelTypeButton
                                style={styles.fuelButton}
                                selectedColor={Colors.ForestBiome.primary}
                                unSelectedColor={Colors.ForestBiome.background}
                                icon={'car-side'}
                                isSelected={fuelType==='petrol'?true:false}
                                onPress={()=>setFuelType('petrol')}
                            >Petrol</FuelTypeButton>
                            <FuelTypeButton
                                style={styles.fuelButton}
                                selectedColor={Colors.ForestBiome.primary}
                                unSelectedColor={Colors.ForestBiome.background}
                                icon={'car-estate'}
                                isSelected={fuelType==='diesel'?true:false}
                                onPress={()=>setFuelType('diesel')}
                            >Diesel</FuelTypeButton>
                        </View>
                    </View>
                </View>
                <Button
                    style={styles.button}
                    color={Colors.ForestBiome.primary}
                    mode="contained"
                    onPress={_onNext}
                >
                    Next
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
    containerContent: {
        alignItems: 'center',
        height: '90%'
    },
    headerText: {
        color: 'white'
    },
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    fuelContainer: {
        width: '95%',
        height: '38%',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        marginTop: '2%',
        borderRadius: 10
    },
    guestsContainer: {
        width: '48%',
        height: '95%',
        backgroundColor: Colors.ForestBiome.backgroundVariant,
        borderRadius: 10
    },
    fuelLeft: {
        width: '50%',
    },
    fuelRight: {
        width: '50%',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unit: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular',
        fontSize: 18
    },
    title: {
        fontFamily: 'poppins-medium',
        color: 'white',
        fontSize: 22,
    },
    fuelButton: {
        width: '50%',
        height: '42%',
        marginVertical: '3%'
    },
    button: {
        height: 40,
        justifyContent: 'center',
        width: '95%',
        marginTop: '5%'
    }
})

GeneralTourInfo.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default GeneralTourInfo
