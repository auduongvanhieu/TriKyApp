import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
import { Icon } from "react-native-elements"
import metrics from "../../theme/metrics"
import { WarnText } from "../../components/text/warn-text"
import { useNavigation } from "@react-navigation/native"
import { RegisterModel } from "../../models/request-models/RegisterModel"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const RegisterStep1Screen = observer(function RegisterStep1Screen() {

  const navigation = useNavigation()
  const goToRegisterStep2 = () => { navigation.navigate("registerStep2") }

  const [phone, setPhone] = useState('0909000101');
  const [warnPhone, setWarnPhone] = useState(undefined);

  const checkValidInput = () => {
    var isValid = true
    setWarnPhone(undefined)
    if (phone.length < 10) {
      setWarnPhone('Vui lòng nhập đúng số điện thoại')
      isValid = false
    }
    return isValid
  }

  const getOtpRequest = async () => {
    if (checkValidInput()) {
      RegisterModel.phone = phone
      goToRegisterStep2()
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG KÝ" />
      </View>
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        <Text preset="default" text="Số điện thoại" />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='font-awesome-5' name='user-tie' containerStyle={{ marginStart: 5 }} size={16} />}
          placeholder='Nhập số điện thoại' onChangeText={phone => setPhone(phone)} defaultValue={phone} keyboardType='number-pad' />
        <WarnText preset="default" text={warnPhone} />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: metrics.baseMargin }}>
        <Button onPress={getOtpRequest} text="BƯỚC TIẾP THEO" style={{ backgroundColor: 'black', height: 40, marginBottom: 20 }} textStyle={{ fontSize: 15 }} />
      </View>
    </Screen>
  )
})
