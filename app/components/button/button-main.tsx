import * as React from "react"
import { TouchableOpacity } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import { ButtonProps } from "./button.props"

export function ButtonMain(props: ButtonProps) {
  const { onPress, text, style, textStyle, type = 0, ...rest } = props

  const backgroundColor = type==0 ? color.primary : type==1 ? color.main : color.cancel
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: backgroundColor, padding: 10, alignItems: 'center',borderRadius: 8 }, style]} {...rest}>
      <Text preset={"bold"} text={text} style={[{color: 'white'},textStyle]} />
    </TouchableOpacity>
  )
}
