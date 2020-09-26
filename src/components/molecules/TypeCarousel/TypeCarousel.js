import React from 'react'
import {View, Text, Dimensions, StyleSheet} from 'react-native'
import TypeButton from "../../atoms/TypeButton/TypeButton";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import Location from "../../../models/Location";

const {height, width} = Dimensions.get('window')

const TypeCarousel = props => {

    const slide = ({item, index}) => {
        if(item.length===3){
            const rnum = props.three
            if(rnum<=1){
                return (
                    <View style={styles.slide}>
                        <View style={styles.row}>
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[0].name}
                                image={item[0].image}
                                onPress={()=>props.onTypeSelect(item[0])}
                            />
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[1].name}
                                image={item[1].image}
                                onPress={()=>props.onTypeSelect(item[1])}
                            />
                        </View>
                        <View style={styles.row}>
                            <TypeButton
                                type='horizontal'
                                style={styles.button}
                                text={item[2].name}
                                image={item[2].image}
                                onPress={()=>props.onTypeSelect(item[2])}
                            />
                        </View>
                    </View>
                );
            }
            else if(rnum===2){
                return (
                    <View style={styles.slide}>
                        <View style={styles.row}>
                            <TypeButton
                                type='horizontal'
                                style={styles.button}
                                text={item[0].name}
                                image={item[0].image}
                                onPress={()=>props.onTypeSelect(item[0])}
                            />
                        </View>
                        <View style={styles.row}>
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[1].name}
                                image={item[1].image}
                                onPress={()=>props.onTypeSelect(item[1])}
                            />
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[2].name}
                                image={item[2].image}
                                onPress={()=>props.onTypeSelect(item[2])}
                            />
                        </View>
                    </View>
                );
            }
            else if(rnum===3){
                return (
                    <View style={{...styles.slide, ...styles.row}}>
                        <View style={styles.column}>
                            <TypeButton
                                type='vertical'
                                style={styles.button}
                                text={item[0].name}
                                image={item[0].image}
                                onPress={()=>props.onTypeSelect(item[0])}
                            />
                        </View>
                        <View style={styles.column}>
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[1].name}
                                image={item[1].image}
                                onPress={()=>props.onTypeSelect(item[1])}
                            />
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[2].name}
                                image={item[2].image}
                                onPress={()=>props.onTypeSelect(item[2])}
                            />
                        </View>
                    </View>
                );
            }
            else{
                return (
                    <View style={{...styles.slide, ...styles.row}}>
                        <View style={styles.column}>
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[0].name}
                                image={item[0].image}
                                onPress={()=>props.onTypeSelect(item[0])}
                            />
                            <TypeButton
                                type='normal'
                                style={styles.button}
                                text={item[1].name}
                                image={item[1].image}
                                onPress={()=>props.onTypeSelect(item[1])}
                            />
                        </View>
                        <View style={styles.column}>
                            <TypeButton
                                type='vertical'
                                style={styles.button}
                                text={item[2].name}
                                image={item[2].image}
                                onPress={()=>props.onTypeSelect(item[2])}
                            />
                        </View>
                    </View>
                );
            }
        }
        else if (item.length===2){
            const rnum = props.two
            if(rnum<=1){
                return(
                    <View style={styles.slide}>
                        <TypeButton
                            type='horizontal'
                            style={styles.button}
                            text={item[0].name}
                            image={item[0].image}
                            onPress={()=>props.onTypeSelect(item[0])}
                        />
                        <TypeButton
                            type='horizontal'
                            style={styles.button}
                            text={item[1].name}
                            image={item[1].image}
                            onPress={()=>props.onTypeSelect(item[1])}
                        />
                    </View>
                )
            }
            else{
                return(
                    <View style={{...styles.slide, ...styles.row}}>
                        <TypeButton
                            type='vertical'
                            style={styles.button}
                            text={item[0].name}
                            image={item[0].image}
                            onPress={()=>props.onTypeSelect(item[0])}
                        />
                        <TypeButton
                            type='vertical'
                            style={styles.button}
                            text={item[1].name}
                            image={item[1].image}
                            onPress={()=>props.onTypeSelect(item[1])}
                        />
                    </View>
                )
            }
        }
        else if(item.length===4){
            return(
                <View style={styles.slide}>
                    <View style={styles.row}>
                        <TypeButton
                            type='normal'
                            style={styles.button}
                            text={item[0].name}
                            image={item[0].image}
                            onPress={()=>props.onTypeSelect(item[0])}
                        />
                        <TypeButton
                            type='normal'
                            style={styles.button}
                            text={item[1].name}
                            image={item[1].image}
                            onPress={()=>props.onTypeSelect(item[1])}
                        />
                    </View>
                    <View style={styles.row}>
                        <TypeButton
                            type='normal'
                            style={styles.button}
                            text={item[2].name}
                            image={item[2].image}
                            onPress={()=>props.onTypeSelect(item[2])}
                        />
                        <TypeButton
                            type='normal'
                            style={styles.button}
                            text={item[3].name}
                            image={item[3].image}
                            onPress={()=>props.onTypeSelect(item[3])}
                        />
                    </View>
                </View>
            )
        }
        else if(item.length===1){
            return (
                <View style={styles.slide}>
                    <TypeButton
                        type='large'
                        style={styles.button}
                        text={item[0].name}
                        image={item[0].image}
                        onPress={()=>props.onTypeSelect(item[0])}
                    />
                </View>
            )
        }
    }

    return(
        <View style={styles.container}>
            <Carousel
                data={props.data}
                renderItem={slide}
                sliderWidth={props.style.width+50}
                itemWidth={props.style.width-70}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    slide: {
    },
    button: {
        margin: 4
    }
})

export default TypeCarousel
