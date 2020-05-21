import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainTabNavigation from './src/navigation/MainTabNavigation';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = async() => {

  await Font.loadAsync(
      {
         'the-bold-font': require('./assets/fonts/theboldfont.ttf'),
         'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
         'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          'poppins-medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf')
      }
  )
}

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return <AppLoading
        startAsync={fetchFonts}
        onFinish={()=> {
            setDataLoaded(true)
            console.log('loadeddd')
        }}
        onError={(err)=>console.log(err)}/>
  }

  fetchFonts()
  return <MainTabNavigation/>
}

