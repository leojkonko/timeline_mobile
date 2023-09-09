import { StatusBar } from 'expo-status-bar'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import blurBg from "./src/assets/bg-blur.png"
import Stripes from './src/assets/stripes.svg'
import Logo from './src/assets/logo.svg'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes) 
//const StyledButton = styled(Button) 


export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  if(!hasLoadedFonts){
    return null
  }
  return (
    <ImageBackground source={blurBg} style={styles.container} className='relative flex-1 items-center bg-gray-950 px-8 py-10' imageStyle={{ position: 'absolute', left: '-100%' }}> 
    <StyledStripes className='absolute left-2' />
      <View className='flex-1 items-center justify-center gap-6'>
        <Logo />
          <View className='space-y-2'>
            <Text className='font-title text-center text-2xl text-gray-50 leading-tight'>Sua cápsula do tempo</Text>
            <Text className='text-gray-100 text-center font-body text-base leading-relaxed'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
          </View>
          {/*<StyledButton title='Começar a cadastrar' className='bg-green-600 rounded-full px-5 py-3' />*/}
          <TouchableOpacity activeOpacity={0.7} className='bg-green-600 rounded-full px-5 py-3'>
            <Text className='font-alt uppercase text-black text-sm '>Cadastrar lembrança</Text>
          </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#09090A',
  },
})
