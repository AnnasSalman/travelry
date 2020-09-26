import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Places from "../screens/HomeScreen/Places/Places";
import MapPlaces from "../screens/HomeScreen/MapPlaces/MapPlaces";

const PlacesNavigation = createStackNavigator({
        placesScreen: {
            screen: Places,
        },
        mapScreen: {
            screen: MapPlaces
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

export default createAppContainer(PlacesNavigation);
