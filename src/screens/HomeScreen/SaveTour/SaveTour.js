import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TextInput, Button} from "react-native-paper";
import CustomHeader from "../../../components/atoms/CustomHeader/CustomHeader";
import Colors from "../../../constants/Colors";
import Tour from '../../../models/Tour'
import UserInfo from "../../../models/UserInfo";
import DropdownAlert from 'react-native-dropdownalert';



const SaveTour = props => {

    const notification = useRef(null)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false)

    const _onBack = () => {
        props.navigation.goBack()
    }
    const _onSave  = async() => {
        if (checkValidity()){
            setLoading(true)
            const tour = new Tour()
            const userInfo = new UserInfo()
            try{
                const user = await userInfo.getUserInfo()
                await tour.saveTour({...props.navigation.state.params, title, description, user})
                setLoading(false)
                _onBack()
            }
            catch(e){
                console.log(e)
                setLoading(false)
            }
        }
        else{
            notification.current.alertWithType('error', 'Invalid Info', '"Tour title" and "Description" are required fields');
        }
    }
    const checkValidity = () => {
        if(title.length === 0 || description.length === 0){
            return false
        }
        else{
            return true
        }
    }

    return(
        <View style={styles.container}>
            <CustomHeader
                text='Tour Details'
                subtext={'Add the title and description for your tour'}
                titleStyle={styles.headerText}
                containerStyle={styles.header}
                subtitleStyle={styles.sub}
                onBack={_onBack}
            />
            <TextInput
                mode='outlined'
                label={'Tour Title (required)'}
                value={title}
                onChangeText={(text)=>setTitle(text)}
                style={styles.textInput}
                theme={inputTheme}
                secureTextEntry={props.secureTextEntry}
            />
            <TextInput
                mode='outlined'
                label={'Description (required)'}
                value={description}
                onChangeText={(text)=>setDescription(text)}
                style={styles.textInput}
                theme={inputTheme}
                secureTextEntry={props.secureTextEntry}
                multiline
            />
            <Button
                icon={props.navigation.state.params.public?"cloud-upload":"content-save-move"}
                mode="contained"
                onPress={_onSave}
                style={styles.button}
                color={Colors.ForestBiome.primary}
                loading={loading}
            >
                {props.navigation.state.params.public?'Publish':'Save'}
            </Button>
            <DropdownAlert
                ref={notification}
                errorColor={Colors.ForestBiome.primary}
            />
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
    sub: {
        color: Colors.ForestBiome.primary,
        fontFamily: 'poppins-regular'
    },
    headerText: {
        color: 'white'
    },
    textInput: {
        backgroundColor: Colors.ForestBiome.background,
        marginHorizontal: 20,
        marginVertical: 15,
    },
    button: {
        marginHorizontal: 20,
        marginVertical: 10,
        width: '30%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginLeft: '60%'
    }
})

const inputTheme = {
    colors:{
        primary: Colors.ForestBiome.primary,
        placeholder: 'white',
        text: 'white'
    }
}

SaveTour.navigationOptions = ({navigation}) => {
    return {
        headerShown: false,
    };
};

export default SaveTour
