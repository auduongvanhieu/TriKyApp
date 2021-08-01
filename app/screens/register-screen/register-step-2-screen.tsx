import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import OtpInputs from "react-native-otp-inputs"
import { Button, Screen, Text } from "../../components"
import { WarnText } from "../../components/text/warn-text"
import { color } from "../../theme"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

const OTP_INPUT: TextStyle = {
  backgroundColor: '#F0F4F8',
  borderRadius: 5,
  textAlign: 'center',
  height: 40,
  width: 30,
  color: 'black',
  borderColor: color.black,
  borderWidth: 1,
  padding: 0
}

export const RegisterStep2Screen = observer(function RegisterStep2Screen() {

  const navigation = useNavigation()
  const goToRegisterStep3 = () => { navigation.navigate("registerStep3") }

  const [otp, setOtp] = useState('000000');
  const [warnOtp, setWarnOtp] = useState(undefined);

  const checkValidInput = () => {
    var isValid = true
    setWarnOtp(undefined)
    if (otp.length < 6) {
      setWarnOtp('Vui lòng đủ 6 ký tự')
      isValid = false
    }
    return isValid
  }

  const nextStep = async () => {
    if (checkValidInput()) {
      goToRegisterStep3()
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG KÝ" />
      </View>
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        <Text preset="default" text="Nhập mã OTP" />
        <OtpInputs
          handleChange={(code) => setOtp(code)}
          autofillFromClipboard={false}
          numberOfInputs={6}
          inputContainerStyles={{ alignSelf: 'center'}}
          inputStyles={OTP_INPUT}
          style={{flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}
        />
        <WarnText preset="default" text={warnOtp} />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: metrics.baseMargin }}>
        <Button onPress={nextStep} text="BƯỚC TIẾP THEO" style={{ backgroundColor: 'black', height: 40, marginBottom: 20 }} textStyle={{ fontSize: 15 }} />
      </View>
    </Screen>
  )
})
