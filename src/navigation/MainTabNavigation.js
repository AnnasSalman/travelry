import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Platform } from 'react-native'

//Screens
import AppNavigation from "./AppNavigation";
import BookingScreen from '../screens/BookingsScreen'
import MyToursScreen from '../screens/MyToursScreen'
import Inbox from '../screens/BookingsScreen'

//assets
import { Ionicons } from 'react-native-vector-icons'
import Colors from '../constants/Colors'

const tabScreenConfig = {
    Home: {
        screen: AppNavigation,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.DarkTheme.surface,
        }
    },
    Tours: {
        screen: MyToursScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="md-map" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.DefaultTheme.primary,

        }
    },
     Bookings: {
        screen: BookingScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-calendar" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.DefaultTheme.primary
        }
    },
    Inbox: {
        screen: Inbox,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-chatbubbles" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.DefaultTheme.primary
        }
    }
};



const MainTabNavigation =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeTintColor: 'white',
            shifting: true,
            barStyle: {
                backgroundColor: Colors.DarkTheme.surface
            },
        })
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Colors.DefaultTheme.secondary,
                inactiveBackgroundColor: Colors.DarkTheme.surface,
                style: {
                    backgroundColor: 'black',
                    opacity: 0.7
                }
            }
        });

export default createAppContainer(MainTabNavigation);
