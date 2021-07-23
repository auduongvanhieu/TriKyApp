import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
import metrics from "../../theme/metrics"
import { Icon } from "react-native-elements/dist/icons/Icon"
import { useNavigation } from "@react-navigation/native"
import { Api } from "../../services/api"
import { WarnText } from "../../components/text/warn-text"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {

  const [phone, setPhone] = useState('0909000100');
  const [warnPhone, setWarnPhone] = useState(undefined);
  const [password, setPassword] = useState('123456');
  const [warnPassword, setWarnPassword] = useState(undefined);
  const [isShowPassword, setShowPassword] = useState(false);

  const navigation = useNavigation()
  const goToMain = () => { navigation.navigate("main") }
  const goToRegister = () => { navigation.navigate("registerStep1") }

  const checkValidInput = () => {
    var isValid = true
    setWarnPhone(undefined)
    setWarnPassword(undefined)
    if (phone.length < 10) {
      setWarnPhone('Vui lòng nhập đúng số điện thoại')
      isValid = false
    }
    if (password.length < 6) {
      setWarnPassword('Vui lòng nhập password có ít nhất 6 ký tự')
      isValid = false
    }
    return isValid
  }

  const login = async () => {
    if (checkValidInput()) {
      const api = new Api()
      api.setup()
      let res = await api.login({ phone, password })
      if (res.kind == 'ok') {
        goToMain()
      }
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG NHẬP" />
      </View>
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        {/* Số điện thoại */}
        <Text preset="default" text="Số điện thoại" />
        <TextField
          style={{marginTop: 5}}
          componentLeft={<Icon type='font-awesome-5' name='user-tie' containerStyle={{ marginStart: 5 }} size={16} />}
          placeholder='Nhập số điện thoại' onChangeText={phone => setPhone(phone)} defaultValue={phone} keyboardType='number-pad' />
        <WarnText preset="default" text={warnPhone} />
        {/* Mật khẩu */}
        <Text preset="default" text="Mật khẩu" style={{ marginTop: 10 }} />
        <TextField
          style={{marginTop: 5}}
          componentLeft={<Icon type='font-awesome-5' name='lock' containerStyle={{ marginStart: 5 }} size={16} />}
          componentRight={<Icon onPress={() => setShowPassword(!isShowPassword)} type='entypo' name={isShowPassword ? 'eye' : 'eye-with-line'} containerStyle={{ marginEnd: 5 }} size={18} />}
          placeholder='Nhập mật khẩu' onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={!isShowPassword} />
        <WarnText preset="default" text={warnPassword}/>
        <View style={{ marginTop: 15 }}>
          <Button onPress={login} text="ĐĂNG NHẬP" style={{ backgroundColor: 'black', height: 40 }} textStyle={{ fontSize: 15 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={goToRegister} style={{ flex: 1, alignItems: 'center', paddingVertical: 5 }}>
            <Text preset="bold" text="TẠO TÀI KHOẢN" style={{ textDecorationLine: 'underline' }} />
          </TouchableOpacity>
          <Text preset="bold" text="|" />
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', paddingVertical: 5 }}>
            <Text preset="bold" text="QUÊN MẬT KHẨU" style={{ textDecorationLine: 'underline' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="default" text="version: 1.0.0" style={{ fontSize: 12 }} />
      </View>
    </Screen>
  )
})
