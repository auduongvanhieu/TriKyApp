import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { api, resetApi } from "../../services/api"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {

  useEffect(() => {
    resetApi()
    onRefresh()
  }, [])

  const onRefresh = async () => {
    await api.getProfile({})
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="homeScreen" />
    </Screen>
  )
})
