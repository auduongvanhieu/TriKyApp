import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import Modal from 'react-native-modal'
import { Text } from "../"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 10,
}

export interface PopupProps {
  children?: any, isVisible: boolean, onClosePress: any, title: string
}

export function Popup(props: PopupProps) {
  const { children, isVisible = false, onClosePress, title = 'Thông báo' } = props

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClosePress} animationInTiming={1} animationOutTiming={1}>
      <View style={CONTAINER}>
        {/* Header */}
        <View style={{ flexDirection: 'row', backgroundColor: color.primary, height: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingHorizontal: 8 }}>
          <View style={{ width: 30 }} />
          <Text style={{ color: 'white', fontSize: 18, flex: 1, textAlign: "center" }}>{title}</Text>
          <Icon type="font-awesome" name="close" color="red" size={30} onPress={onClosePress} />
        </View>
        {/* Children */}
        <View style={{width: '100%', minHeight: 50}}>
          {children}
        </View>
      </View>
    </Modal>
  )
}
