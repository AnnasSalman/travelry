import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Tours from "../screens/HomeScreen/Tours/Tours";
import TourDemo from "../components/molecules/TourDemo/TourDemo";
import AddLocations from "../screens/HomeScreen/AddLocations/AddLocations";
import AddCityModal from "../components/molecules/AddCityModal/AddCityModal";
import TourDates from "../screens/HomeScreen/TourDates/TourDates";
import Plan from "../screens/HomeScreen/Plan/Plan";
import Hobbies from "../screens/HomeScreen/Hobbies/Hobbies";
import AvailablePlaces from '../screens/HomeScreen/AvailablePlaces/AvailablePlaces'
import BookingPackages from "../screens/HomeScreen/BookingPackages/BookingPackages";
import GeneralTourInfo from "../screens/HomeScreen/GeneralTourInfo/GeneralTourInfo";
import SaveTour from "../screens/HomeScreen/SaveTour/SaveTour";
import TourInitialScreen from "../screens/HomeScreen/TourInitialScreen/TourInitialScreen";
import TourSettings from "../screens/HomeScreen/TourSettings/TourSettings";

const TourNavigation = createStackNavigator({
        toursScreen: {
            screen: Tours
        },
        toursInitialScreen: {
            screen: TourInitialScreen
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
        hobbies: {
            screen: Hobbies
        },
        generalTourInfo: {
            screen: GeneralTourInfo
        },
        plan: {
            screen: Plan
        },
        availablePlaces: {
            screen: AvailablePlaces,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
            }
        },
        bookingPackages: {
            screen: BookingPackages,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
            }
        },
        saveTour: {
            screen: SaveTour,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
            }
        },
        tourSettings: {
            screen: TourSettings,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
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

export default createAppContainer(TourNavigation);
