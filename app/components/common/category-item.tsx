import * as React from "react"
import { Text, TouchableOpacity, ViewStyle } from "react-native"

export function CategoryItem({ style, item }) {
  return (
    <TouchableOpacity style={[{ backgroundColor: item?.bgColor, borderRadius: 20, padding: 5, alignItems: 'center' }, style]}>
      <Text style={{ color: item?.textColor }}>{item?.name}</Text>
    </TouchableOpacity>
  )
}
