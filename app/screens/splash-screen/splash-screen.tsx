import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { requestReplace } from "../../services/app-action/app-action"
import { color } from "../../theme"
import { images } from "../../theme/images"

const ROOT: ViewStyle = { backgroundColor: color.white, flex: 1, alignItems: 'center', justifyContent: 'center' }
const LOGO: ImageStyle = { width: 200, height: 200, }
const TEXT: TextStyle = { color: color.black, fontSize: 30 }
const TEXT_SLOGAN: TextStyle = { color: color.black, fontSize: 20, fontStyle: 'italic' }

export const SplashScreen = observer(function SplashScreen() {
  const nextScreen = () => { requestReplace("login") }

  useEffect(() => {
    let timer1 = setTimeout(() => { nextScreen() }, 2000)
    return () => { clearTimeout(timer1); };
  })

  return (
    <Screen style={ROOT} preset="scroll">
      <Image source={images.img_logo_transparent} style={LOGO} />
      <Text style={TEXT} preset="bold" tx={'app.appName'} />
      <Text style={TEXT_SLOGAN} text="Kết nối đam mê" />
    </Screen>
  )
})
