import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements/dist/icons/Icon"
import { requestGoBack } from "../../services/app-action/app-action"
import { ButtonProps } from "./button.props"

export function ButtonClose(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={() => requestGoBack()} style={{ padding: 20, position: 'absolute', right: 0, zIndex: 1 }}>
      <Icon type="material-community" name="window-close" size={40} color='red' />
    </TouchableOpacity>
  )
}
