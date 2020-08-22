import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Rooms from "../screens/HomeScreen/Rooms/Rooms";


const RoomNavigation = createStackNavigator({

        room: {
            screen: Rooms,
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

export default createAppContainer(RoomNavigation);
