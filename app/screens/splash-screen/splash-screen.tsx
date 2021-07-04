import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { images } from "../../theme/images"

const ROOT: ViewStyle = { backgroundColor: color.palette.white, flex: 1, alignItems: 'center', justifyContent: 'center' }
const LOGO: ImageStyle = { width: 200, height: 200, }
const TEXT: TextStyle = { color: color.palette.black, fontSize: 30 }
const TEXT_SLOGAN: TextStyle = { color: color.palette.black, fontSize: 20, fontStyle: 'italic' }

export const SplashScreen = observer(function SplashScreen() {
  const navigation = useNavigation()
  const nextScreen = () => { navigation.reset({ index: 0, routes: [{ name: 'login' }] }); }

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
