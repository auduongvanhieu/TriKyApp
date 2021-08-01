import * as React from "react"
import { Text, TouchableOpacity } from "react-native"
import { color } from "../../theme"

export function CategoryItem({ style, item, onPress, isSelect = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: item?.bgColor, borderRadius: 20, padding: 5, alignItems: 'center' }, isSelect && { borderColor: color.black, borderWidth: 1 }, style]}>
      <Text style={{ color: item?.textColor }}>{item?.name}</Text>
    </TouchableOpacity>
  )
}
