import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import MyToursScreen from "../screens/MyToursScreen";
import TourInitialScreen from "../screens/HomeScreen/TourInitialScreen/TourInitialScreen";
import Plan from "../screens/HomeScreen/Plan/Plan";


const SavesNavigation = createStackNavigator({
        myToursScreen: {
            screen: MyToursScreen,
        },
        toursInitialScreen: {
            screen: TourInitialScreen
        },
        plan: {
            screen: Plan
        },
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

export default createAppContainer(SavesNavigation);
