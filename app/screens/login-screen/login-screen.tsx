import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {

  

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG NHẬP" />
      </View>
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        <Text preset="default" text="Số điện thoại" />
        <TextField placeholder='Nhập số điện thoại' />
        <Text preset="default" text="Mật khẩu" style={{ marginTop: 10 }} />
        <TextField placeholder='Nhập mật khẩu' />
        <View style={{marginTop: 15}}>
          <Button text="ĐĂNG NHẬP" style={{ backgroundColor: 'black', height: 40 }} textStyle={{ fontSize: 15 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', paddingVertical: 5}}>
            <Text preset="bold" text="TẠO TÀI KHOẢN" />
          </TouchableOpacity>
          <Text preset="bold" text="|" />
          <TouchableOpacity style={{flex: 1, alignItems: 'center', paddingVertical: 5}}>
            <Text preset="bold" text="QUÊN MẬT KHẨU" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
      </View>
    </Screen>
  )
})
