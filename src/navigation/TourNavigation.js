import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Tours from "../screens/HomeScreen/Tours/Tours";

const TourNavigation = createStackNavigator({
        toursScreen: {
            screen: Tours,
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

export default createAppContainer(TourNavigation);
