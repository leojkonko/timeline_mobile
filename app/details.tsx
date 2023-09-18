import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Text, Image } from "react-native";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Switch, TextInput } from "react-native-gesture-handler";
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { api } from "../src/lib/api";
import Icon from '@expo/vector-icons/Feather';
import Logo from '../src/assets/logo.svg';

const StyledStripes = styled(Stripes);

interface Memory{
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
  isPublic: boolean
  content: string
}

export default function Details(){
    const { bottom, top } = useSafeAreaInsets()
    const router = useRoute()
    const [ memories, setMemories ] = useState<Memory[]>([])
    const memory_id = router.params['param'];
    const [ isPublic, setIsPublic ] = useState(false)
    //const [memoryData, setMemoryData] = useState(null);

    async function loadMemories(){
      const token = await SecureStore.getItemAsync('token')

      const response = await api.get(`/memories/${memory_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setMemories(response.data)
  }
  useEffect(() => {
    loadMemories()
 }, [] )

    return (
        <View className='relative flex-1 bg-gray-950 '>
            <ImageBackground source={blurBg} className='relative flex-1 bg-gray-950 ' imageStyle={{ position: 'absolute', left: '-100%' }}> 
                <StyledStripes className='absolute left-2' />
                <StatusBar style="light" translucent />
            
                <ScrollView className="flex-1 px-8 mt-4" style={{ paddingBottom: bottom, paddingTop: top }}>
                    <View className="flex flex-row items-center justify-between">
                        <Logo />
                        <Link href={'/memories'} asChild>
                            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                                <Icon name="arrow-left" className="size-16" color="#fff"/>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View className="mt-6 space-y-6">
                        <View className="flex-row items-center gap-2">
                            <Switch value={false} />
                            <Text className="font-body text-base text-gray-200">
                                Pública
                            </Text>
                        </View>
                        <Image source={{ uri: memories.coverUrl }} className="aspect-video w-full rounded-lg" />
                        <Text className="font-body text-base leading-relaxed text-gray-100">{memories.content}</Text>
                        <TouchableOpacity  activeOpacity={0.7} className='bg-green-600 rounded-full px-5 py-2 items-center self-end'>
                            <Text className='font-alt uppercase text-black text-sm '>Editar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

        </ImageBackground>
        </View>
    )
}

function setMemories(data: any) {
  throw new Error("Function not implemented.");
}
