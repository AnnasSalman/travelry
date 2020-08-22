import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import HomeScreen from '../screens/HomeScreen'
import RoomNavigation from "./RoomNavigation";

import Colors from '../constants/Colors'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Room: {
        screen: RoomNavigation
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