import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { DemoListScreen, DemoScreen, WelcomeScreen } from "../screens"

export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = ["splash"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
