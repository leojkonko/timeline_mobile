import { styled } from "nativewind";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold
  } from '@expo-google-fonts/roboto';
  
  import {
    BaiJamjuree_700Bold
  } from '@expo-google-fonts/bai-jamjuree';
import React, { useEffect, useState } from "react";
//import { Slot, Stack } from "expo-router";
import { Stack } from 'expo-router/stack';


const StyledStripes = styled(Stripes);

export default function Layout(){
    
    const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
        setIsUserAuthenticate(!!token)
        console.log(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    //return <SplashScreen />
    return (
        <ImageBackground source={blurBg} style={styles.container} className='relative flex-1 items-center bg-gray-900' imageStyle={{ position: 'absolute', left: '-100%' }}>
            <StyledStripes className='absolute left-2' />
            <StatusBar style="light" translucent />
            <Text>Loading fonts...</Text>
        </ImageBackground>
    );
  }
  
    return(
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        
        <Stack.Screen name="memories" />
        <Stack.Screen name="index" />
        <Stack.Screen name="new" />
      </Stack>  
    )
}

const styles = StyleSheet.create({
  container: {
   //backgroundColor: '#09090A',
  },
});