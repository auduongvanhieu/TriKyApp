import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { BackHandler, Platform, ToastAndroid } from 'react-native'
import { HistoryScreen, HomeScreen, LoginScreen, RegisterStep1Screen, RegisterStep2Screen, RegisterStep3Screen, SplashScreen } from "../screens"
import { AppAction } from '../services/app-action/app-action'
import { MainNavigator } from "./main-navigator"

export type RootParamList = {
  splash: undefined,
  login: undefined,
  registerStep1: undefined,
  registerStep2: undefined,
  registerStep3: undefined,
  main: undefined,
  mainStack: undefined,
}

const Stack = createStackNavigator<RootParamList>()
const Tab = createMaterialTopTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator tabBarPosition='bottom'>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Lịch sử" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="registerStep1" component={RegisterStep1Screen} />
      <Stack.Screen name="registerStep2" component={RegisterStep2Screen} />
      <Stack.Screen name="registerStep3" component={RegisterStep3Screen} />
      <Stack.Screen name="main" component={MainTabs} />
      <Stack.Screen name="mainStack" component={MainNavigator} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>>((props, ref: any) => {

    var currentRouteName = '';
    var isBack = false;

    useEffect(()=>{
      function checkBackPress(){
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', () => {            
            if(["login"].includes(currentRouteName)){
              if (isBack === true) BackHandler.exitApp();
              else ToastAndroid.show("Nhấn nút back 2 lần để thoát ứng dụng", ToastAndroid.SHORT);
              isBack = true;
              setTimeout(() => { isBack = false }, 2000);
              return true
            } else {
              return false
            }
          })
        }
      }
      checkBackPress()
    },[])

    return (
      <NavigationContainer  {...props} ref={ref}
        onStateChange={async () => {
          console.log('hieunv', 'currentRouteName', ref.current.getCurrentRoute().name);
          currentRouteName = ref.current.getCurrentRoute().name
        }}>
        <RootStack />
        <AppAction />
      </NavigationContainer>
    )
  })

RootNavigator.displayName = "RootNavigator"
