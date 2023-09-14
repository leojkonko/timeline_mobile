import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ImageBackground, View } from "react-native";
import { Text } from "react-native";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";

const StyledStripes = styled(Stripes);

export default function Memories(){
    const router = useRouter();
    const params = useLocalSearchParams();
    return (
        <ImageBackground source={blurBg} className='relative flex-1 items-center bg-gray-950 ' imageStyle={{ position: 'absolute', left: '-100%' }}> 
            <StyledStripes className='absolute left-2' />
            <StatusBar style="light" translucent />
        
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-100">Memories</Text>
            </View>
      
      </ImageBackground>
    )
}