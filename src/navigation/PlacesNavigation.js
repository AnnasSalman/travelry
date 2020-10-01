import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Places from "../screens/HomeScreen/Places/Places";
import MapPlaces from "../screens/HomeScreen/MapPlaces/MapPlaces";
import Place from "../screens/HomeScreen/Place/Place";

const PlacesNavigation = createStackNavigator({
        placesScreen: {
            screen: Places,
        },
        mapScreen: {
            screen: MapPlaces
        },
        placeScreen: {
            screen: Place,
            navigationOptions: {
                ...TransitionPresets.ModalTransition
            }
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

export default createAppContainer(PlacesNavigation);
