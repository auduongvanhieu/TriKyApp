import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function WarnText(props: TextProps) {
  // grab the props
  const { preset = "default", tx, txOptions, text, children, style: styleOverride, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]

  return (
    <>
      {content && <ReactNativeText {...rest} style={{...styles, color: 'red', fontStyle: 'italic', fontSize: 12}}>
        {content}
      </ReactNativeText>}
    </>
  )
}
