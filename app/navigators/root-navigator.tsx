import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Loading } from '../components'
import { HistoryScreen, HomeScreen, LoginScreen, SplashScreen } from "../screens"
import { MainNavigator } from "./main-navigator"

export type RootParamList = {
  splash: undefined,
  login: undefined,
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
      <Stack.Screen name="main" component={MainTabs} />
      <Stack.Screen name="mainStack" component={MainNavigator} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

const isLoading = false
export const RootNavigator = React.forwardRef<NavigationContainerRef, 
Partial<React.ComponentProps<typeof NavigationContainer>>>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
      {isLoading && <Loading/>}
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
