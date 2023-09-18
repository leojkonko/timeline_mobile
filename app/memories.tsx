import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Image } from "react-native";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";
import Logo from '../src/assets/logo.svg';
import Icon from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { api } from "../src/lib/api";
import dayjs from "dayjs";
import { useNavigation } from '@react-navigation/native';

const StyledStripes = styled(Stripes);

interface Memory{
    coverUrl: string
    excerpt: string
    id: string
    createdAt: string
}

export default function NewMemories(){
    const { bottom, top } = useSafeAreaInsets()
    const [ memories, setMemories ] = useState<Memory[]>([])
    const router = useRouter()

   async function signOut(){
       await SecureStore.deleteItemAsync('token')
       //router.push('/index')
    }

    async function loadMemories(){
        const token = await SecureStore.getItemAsync('token')

        const response = await api.get('/memories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setMemories(response.data)
    }

    useEffect(() => {
       loadMemories()
    }, [] )
    
    return (
        <ScrollView className='relative flex-1 bg-gray-950' style={{ paddingBottom: bottom, paddingTop: top }}>
            <ImageBackground source={blurBg} className='relative flex-1 bg-gray-950 ' imageStyle={{ position: 'absolute', left: '-100%' }}> 
                <StyledStripes className='absolute left-2' />
                <StatusBar style="light" translucent />
            
                <View className="flex-1 mt-4">
                    <View className="flex flex-row items-center justify-between px-8">
                        <Logo />
                        <View className="flex-row gap-2">
                                <TouchableOpacity onPress={signOut} className="h-10 w-10 items-center justify-center rounded-full bg-red-500">
                                    <Icon name="log-out" className="size-16" color="#fff"/>
                                </TouchableOpacity>
                            <Link href={'/new'} asChild>
                                <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                                    <Icon name="plus" className="size-16" color="#fff"/>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                

                    {memories.map((memory) => {
                        return(
                            <View key={memory.id} className="mt-6 space-y-10">
                                <View className="space-y-4">
                                    <View className="flex-row items-center gap-2 ">
                                        <View className="h-px w-5 bg-gray-50"></View>
                                        <Text className="font-body text-xs text-gray-100">{dayjs(memory.createdAt).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View className="px-8 space-y-4">
                                        <View className="space-y-4">
                                            <Image className="aspect-video w-full rounded-lg" alt="" source={{ uri: memory.coverUrl }}></Image>
                                        </View>
                                        <Text className="font-body text-base leading-relaxed text-gray-100">{memory.excerpt}</Text>
                                        <Link href={`/details?param=${memory.id}`} asChild>
                                            <TouchableOpacity className="flex-row items-center">
                                                <Text className="font-body text-sm text-gray-200 mr-2">
                                                Ler mais
                                                </Text>
                                                <Icon name="arrow-right" size={16} color='#9e9ea0'/>
                                            </TouchableOpacity>
                                        </Link>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ImageBackground>
        </ScrollView>
    )
}