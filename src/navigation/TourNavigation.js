import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Tours from "../screens/HomeScreen/Tours/Tours";
import TourDemo from "../components/molecules/TourDemo/TourDemo";
import AddLocations from "../screens/HomeScreen/AddLocations/AddLocations";
import AddCityModal from "../components/molecules/AddCityModal/AddCityModal";
import TourDates from "../screens/HomeScreen/TourDates/TourDates";
import Plan from "../screens/HomeScreen/Plan/Plan";

const TourNavigation = createStackNavigator({
        toursScreen: {
            screen: Tours
        },
        tourDemo: {
            screen: TourDemo,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
            }
        },
        addLocations: {
            screen: AddLocations,
        },
        addCityModal: {
            screen: AddCityModal
        },
        tourDates: {
            screen: TourDates
        },
        plan: {
            screen: Plan
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

export default createAppContainer(TourNavigation);
