import React from "react"
import { StyleProp, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { translate, TxKeyPath } from "../../i18n"
import { color, typography } from "../../theme"
import TextInputMask from 'react-native-text-input-mask';

// the base styling for the container
const CONTAINER: ViewStyle = {
  borderColor: color.black,
  borderWidth: 1,
  borderRadius: 4,
  flexDirection: 'row',
  alignItems: 'center'
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 40,
  fontSize: 15,
  paddingHorizontal: 5,
  paddingVertical: 5,
  flexGrow: 1,
  flexShrink: 1
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
  componentLeft?: any
  componentRight?: any
  mask?: any
}


/**
 * A component which has a label and an input together.
 */
export function TextFieldMask(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    componentLeft,
    componentRight,
    mask,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      {componentLeft}
      <TextInputMask
        placeholder={actualPlaceholder}
        placeholderTextColor={color.textHolder}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
        mask={mask}
      />
      {componentRight}
    </View>
  )
}
