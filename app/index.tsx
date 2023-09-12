import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { err } from 'react-native-svg/lib/typescript/xml';
import { styled } from 'nativewind';
import { useEffect } from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree';

import blurBg from "../src/assets/bg-blur.png";
import Stripes from '../src/assets/stripes.svg';
import Logo from '../src/assets/logo.svg';
import { api } from '../src/lib/api';

 

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/e42d480d8f315ce6cf4c',
};

const StyledStripes = styled(Stripes);

export default function App() {

    const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });

  const [request, response, singInWithGithub] = useAuthRequest(
    {
      clientId: 'e42d480d8f315ce6cf4c',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nwlspacetime'
      }),
    },
    discovery
  );

   async function handleGithubOAuthCode(code: string){
    const response = await api.post('/register', {
            code,
          })

          const { token } = response.data
             //console.log(token)
           await SecureStore.setItemAsync('token', token)
          
           router.push('/memories')
    }

  useEffect(() => {
/*testar url correta para fazer a autenticação
    console.log(
      makeRedirectUri({
        scheme: 'nwlspacetime'
      }),
    ) */
    //exp://localhost:8081/--/* inicial
    //exp://192.168.1.104:8081

    if (response?.type === 'success') {
      const { code } = response.params;
      
      handleGithubOAuthCode(code)

    }
  }, [response]);

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground source={blurBg} style={styles.container} className='relative flex-1 items-center bg-gray-950 px-8 py-10' imageStyle={{ position: 'absolute', left: '-100%' }}> 
      <Text className='font-title text-center text-2xl text-red-50 leading-tight'>Sua cápsula do tempo</Text>
      <StyledStripes className='absolute left-2' />
      <View className='flex-1 items-center justify-center gap-6'>
        <Logo />
        <View className='space-y-2'>
          <Text className='font-title text-center text-2xl text-gray-50 leading-tight'>Sua cápsula do tempo</Text>
          <Text className='text-gray-100 text-center font-body text-base leading-relaxed'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} className='bg-green-600 rounded-full px-5 py-3' onPress={() => singInWithGithub()}>
          <Text className='font-alt uppercase text-black text-sm '>Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
    
  );
} 

const styles = StyleSheet.create({
  container: {
   // backgroundColor: '#09090A',
  },
});
