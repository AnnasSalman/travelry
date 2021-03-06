import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Hotels from "../screens/HomeScreen/Hotels/Hotels";
import Room from "../screens/HomeScreen/Room/Room";
import Booking from "../screens/HomeScreen/Booking/Booking";
import NumberOfRooms from "../screens/HomeScreen/NumberOfRooms/NumberOfRooms";

const HotelNavigation = createStackNavigator({
        hotelsScreen: {
            screen: Hotels
        },
        roomScreen: {
            screen: Room,
        },
        booking: {
            screen: Booking,
            navigationOptions: {
                ...TransitionPresets.ModalTransition
            }
        },
        numberOfRooms:{
            screen: NumberOfRooms
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'red'
            },
            headerTintColor: 'white',
            // headerTitle: 'A Screen'
        }

    })

export default createAppContainer(HotelNavigation);
