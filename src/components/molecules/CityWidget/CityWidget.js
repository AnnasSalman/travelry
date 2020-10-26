import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {IconButton} from 'react-native-paper'
import Colors from "../../../constants/Colors";
import WeatherWidget from "../../atoms/WeatherWidget/WeatherWidget";
import CityImageWidget from "../../atoms/CityImageWidget/CityImageWidget";
import StaticMapWidget from "../../atoms/StaticMapWidget/StaticMapWidget";

const CityWidget = props => {
    return(
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.column}>
                <CityImageWidget
                    containerStyle={props.cityWidgetContainerStyle}
                    titleStyle={props.cityWidgetTitleStyle}
                    image={props.cityWidgetImage}
                    imageStyle={props.cityWidgetImageStyle}
                    title={props.cityTitle}
                    subtitle={props.citySubtitle}
                    mapWidgetCenter={props.mapWidgetCenter}
                />
                <WeatherWidget
                    containerStyle={props.weatherWidgetContainerStyle}
                    textStyle={props.weatherWidgetTextStyle}
                    iconStyle={props.weatherWidgetIconStyle}
                    weatherIcon={props.weatherIcon}
                    weather={props.weather}
                    temperature={props.temperature}
                />
            </View>
            <View style={styles.column}>
                <StaticMapWidget
                    mapWidgetStyle={props.mapWidgetStyle}
                    mapWidgetCenter={props.mapWidgetCenter}
                    containerStyle={props.mapWidgetContainerStyle}
                    onPress={props.onMapPress}
                />
                <TouchableOpacity style={props.deleteContainerStyle} onPress={props.onDelete}>
                    <IconButton
                        color={Colors.ForestBiome.primary}
                        size={props.deleteContainerIconSize}
                        icon='delete'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // color: Colors.ForestBiome.backgroundVariant
    },
    column: {
        flexDirection: 'row'
    }
})

export default CityWidget
