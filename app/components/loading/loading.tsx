import * as React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import Spinner from "react-native-spinkit"

const CONTAINER: ViewStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center'
}

export interface LoadingProps {
  style?: ViewStyle
}

export function Loading(props: LoadingProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Spinner type='Circle' size={50} color='blue'  />
    </View>
  )
}
