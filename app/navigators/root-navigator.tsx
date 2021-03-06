import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { BackHandler, Image, Platform, ToastAndroid } from 'react-native'
import {
  AppointmentScreen, ChatScreen, HomeScreen, LoginScreen, ProfileScreen, RegisterStep1Screen, RegisterStep2Screen, RegisterStep3Screen, SettingScreen, SplashScreen
} from "../screens"
import { ProfileUpdateScreen } from '../screens/profile-screen/profile-update-screen'
import { AppAction } from '../services/app-action/app-action'
import { color } from '../theme/color'
import { images } from '../theme/images'
export type RootParamList = {
  splash: undefined,
  login: undefined,
  registerStep1: undefined,
  registerStep2: undefined,
  registerStep3: undefined,
  main: undefined,
  mainStack: undefined,
  demo: undefined,
  demoList: undefined,
  profile: undefined,
  profileUpdate: undefined,
}

const Stack = createStackNavigator<RootParamList>()
const Tab = createMaterialTopTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size = 22 }) => {
    let iconName = images.ic_menu_home_1;
    if (route.name === 'home') {
      iconName = focused ? images.ic_menu_home_2 : images.ic_menu_home_1;
    } else if (route.name === 'appointment') {
      iconName = focused ? images.ic_menu_appointment_2 : images.ic_menu_appointment_1;
      size = 25
    } else if (route.name === 'chat') {
      iconName = focused ? images.ic_menu_chat_2 : images.ic_menu_chat_1;
    } else if (route.name === 'setting') {
      iconName = focused ? images.ic_menu_setting_2 : images.ic_menu_setting_1;
    }
    return <Image source={iconName} style={{ width: size, height: size, alignSelf: 'center' }} />;
  }
})

function MainTabs() {
  return (
    <Tab.Navigator
      tabBarPosition='bottom' screenOptions={screenOptions}
      tabBarOptions={{ activeTintColor: color.active, inactiveTintColor: color.inactive, indicatorStyle: { backgroundColor: color.active }, tabStyle: { paddingVertical: 2 }, style: { borderTopWidth: 0, marginTop: 1 }, labelStyle: { fontSize: 12, textTransform: null, marginTop: 0 }, showIcon: true }}>
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: "Trang ch???" }} />
      <Tab.Screen name="appointment" component={AppointmentScreen} options={{ tabBarLabel: "Cu???c h???n" }} />
      <Tab.Screen name="chat" component={ChatScreen} options={{ tabBarLabel: "Chat" }} />
      <Tab.Screen name="setting" component={SettingScreen} options={{ tabBarLabel: "C??i ?????t" }} />
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
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profileUpdate" component={ProfileUpdateScreen} />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>>((props, ref: any) => {

    var currentRouteName = '';
    var isBack = false;

    useEffect(() => {
      function checkBackPress() {
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', () => {
            if (["login", "home"].includes(currentRouteName)) {
              if (isBack === true) BackHandler.exitApp();
              else ToastAndroid.show("Nh???n n??t back 2 l???n ????? tho??t ???ng d???ng", ToastAndroid.SHORT);
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
    }, [])

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
