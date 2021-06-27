import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { DemoListScreen, DemoScreen, LoginScreen, SplashScreen, WelcomeScreen } from "../screens"

export type PrimaryParamList = {
  splash: undefined
  login: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="splash" component={SplashScreen} />
      {/* <Stack.Screen name="login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="demo" component={DemoScreen} /> */}
      {/* <Stack.Screen name="demoList" component={DemoListScreen} /> */}
    </Stack.Navigator>
  )
}

const exitRoutes = ["splash"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
