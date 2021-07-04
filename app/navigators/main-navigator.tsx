import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { DemoListScreen, DemoScreen, HistoryScreen, HomeScreen, LoginScreen, SplashScreen, WelcomeScreen } from "../screens"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export type PrimaryParamList = {
  splash: undefined
  login: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()
const Tab = createMaterialTopTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator tabBarPosition='bottom'>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Lịch sử" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="main" component={MainTabs} />
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="demo" component={DemoScreen} /> */}
      {/* <Stack.Screen name="demoList" component={DemoListScreen} /> */}
    </Stack.Navigator>
  )
}

const exitRoutes = ["splash"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
