import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Text, Image } from "react-native";
import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import { StatusBar } from 'expo-status-bar';
import { styled } from "nativewind";
import Logo from '../src/assets/logo.svg';
import Icon from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Switch, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { api } from "../src/lib/api";

const StyledStripes = styled(Stripes);

export default function NewMemories(){
    const { bottom, top } = useSafeAreaInsets()
    const [ preview, setPreview ] = useState<string | null>(null)
    const [ isPublic, setIsPublic ] = useState(false)
    const [ content, setContent ] = useState('')
    const router = useRouter()

   async function openImagePicker(){
       try{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
       
          if (result.assets[0]){
            setPreview(result.assets[0].uri)
          }
        } catch(err){
            //erro não tratado
        }
        
    }

   async function handleCreateMemory(){

    //await SecureStore.deleteItemAsync('token')
    //return
       const token = await SecureStore.getItemAsync('token')
 
        let coverUrl = ''

        if(preview){
            const uploadFormData = new FormData()

            uploadFormData.append('file', {
                name: 'image.jpg',
                type: 'image/jpeg',
                uri: preview,
            }as any)

            const uploadResponse = await api.post('/upload', uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            coverUrl = uploadResponse.data.fileUrl
        }

            await api.post(
                '/memories',
                {
                  content,
                  isPublic,
                  coverUrl,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
          
              router.push('/memories')
    }
    return (
        <ScrollView className='relative flex-1 bg-gray-950 '>
            <ImageBackground source={blurBg} className='relative flex-1 bg-gray-950 ' imageStyle={{ position: 'absolute', left: '-100%' }}> 
                <StyledStripes className='absolute left-2' />
                <StatusBar style="light" translucent />
            
                <View className="flex-1 px-8 mt-4" style={{ paddingBottom: bottom, paddingTop: top }}>
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
                            <Switch value={isPublic} onValueChange={setIsPublic} thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'} trackColor={{ false: '#767577', true: '#372560' }} />
                            <Text className="font-body text-base text-gray-200">
                                Tornar memória pública
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} className="h-32 justify-center rounded-lg border border-dashed border-gray-500 bg-black/20" onPress={openImagePicker}>
                            {preview ? (
                                <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
                            ) : (
                                <View className="flex-row items-center justify-center gap-2">
                                <Icon color='#fff' name="image" />
                                <Text className="font-body text-sm text-gray-200">
                                    Adicionar foto ou vídeo de capa
                                </Text>
                            </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TextInput multiline className="p-0 font-body text-lg text-gray-50"
                            value={content}
                            onChangeText={setContent}
                            placeholderTextColor="#56565a"
                            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre." />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCreateMemory} activeOpacity={0.7} className='bg-green-600 rounded-full px-5 py-2 items-center self-end'>
                            <Text className='font-alt uppercase text-black text-sm '>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
        </ScrollView>
    )
}