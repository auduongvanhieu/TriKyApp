import { observer } from "mobx-react-lite"
import React from "react"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.white,
  flex: 1,
}

export const ChatScreen = observer(function ChatScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
    </Screen>
  )
})
