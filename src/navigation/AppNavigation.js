import { createAppContainer } from 'react-navigation'
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack'

import HomeScreen from '../screens/HomeScreen'
import RoomNavigation from "./RoomNavigation";
import TourNavigation from "./TourNavigation";
import AddLocationModal from "../components/molecules/AddLocationModal/AddLocationModal";
import PlacesNavigation from "./PlacesNavigation";

import Colors from '../constants/Colors'
import HotelNavigation from "./HotelNavigation";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Room: {
        screen: RoomNavigation
    },
    Tour: {
        screen: TourNavigation
    },
    Place:{
        screen: PlacesNavigation
    },
    Hotel:{
        screen: HotelNavigation
    },
    AddLocation: {
        screen: AddLocationModal,
        navigationOptions: {
            ...TransitionPresets.ModalTransition
        }
    }

},
{
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
        headerShown: false,
        // headerStyle: {
        //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        // },
        // headerTintColor:
        //     Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        //         headerTitle: 'A Screen'
    }

})

export default AppNavigator;
