import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="loginScreen" />
    </Screen>
  )
})
