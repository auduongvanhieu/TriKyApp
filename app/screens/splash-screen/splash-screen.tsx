import React from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { image } from "../../theme/image"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

const LOGO: ImageStyle = {
  width: 100,
  height: 100,
}

const TEXT: TextStyle = {
  color: color.palette.black,
}

export const SplashScreen = observer(function SplashScreen() {

  return (
    <Screen style={ROOT} preset="scroll">
      <Image source={image.img_logo_transparent} style={LOGO} />
      <Text style={TEXT} preset="bold" text="Tri Kỷ" />
    </Screen>
  )
})
