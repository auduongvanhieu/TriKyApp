import * as React from "react"
import { RefreshControl, ScrollView, StatusBar, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { color } from "../../theme"
import { presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.safe ? insets.top : 0 }
  const { onRefresh } = props
  return (
    <KeyboardAwareScrollView style={[preset.outer, backgroundStyle]} >
      <StatusBar translucent backgroundColor={color.transparent} barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          refreshControl={onRefresh && <RefreshControl onRefresh={onRefresh} refreshing={false} />}
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function ScreenAware(props: ScreenProps) {
  return <ScreenWithScrolling {...props} />
}
