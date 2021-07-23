import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import { Button, Screen, Text, TextField } from "../../components"
import { WarnText } from "../../components/text/warn-text"
import { useStores } from "../../models"
import { color } from "../../theme"
import metrics from "../../theme/metrics"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const RegisterStep3Screen = observer(function RegisterStep3Screen() {
  const [password, setPassword] = useState('12345');
  const [warnPassword, setWarnPassword] = useState(undefined);
  const [isShowPassword, setShowPassword] = useState(false);
  const [passwordRetype, setPasswordRetype] = useState('12345');
  const [warnPasswordRetype, setWarnPasswordRetype] = useState(undefined);
  const [isShowPasswordRetype, setShowPasswordRetype] = useState(false);
  const [name, setName] = useState('Ngộ Nghĩnh');
  const [warnName, setWarnName] = useState(undefined);
  const [hobbies, setHobbies] = useState([]);
  const [warnHobbies, setWarnHobbies] = useState(undefined);

  const { generalStore } = useStores()
  const { categories } = generalStore

  useEffect(() => {
    async function getCategories() {
      await generalStore.getCategories({showLoading: true})
    }
    getCategories()
  })

  const checkValidInput = () => {
    var isValid = true
    setWarnPassword(undefined)
    if (password.length < 6) {
      setWarnPassword('Vui lòng nhập password có ít nhất 6 ký tự')
      isValid = false
    }
    if (password != passwordRetype) {
      setWarnPasswordRetype('Mật khẩu nhập lại không chính xác')
      isValid = false
    }
    if (name == '') {
      setWarnName('Vui lòng nhập họ tên')
      isValid = false
    }
    if (hobbies.length == 0) {
      setWarnHobbies('Vui lòng chọn ít nhất một sở thích')
      isValid = false
    }
    return isValid
  }

  const nextStep = async () => {
    if (checkValidInput()) {

    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG KÝ" />
      </View>
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        {/* Mật khẩu */}
        <Text preset="default" text="Mật khẩu" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='font-awesome-5' name='lock' containerStyle={{ marginStart: 5 }} size={16} />}
          componentRight={<Icon onPress={() => setShowPassword(!isShowPassword)} type='entypo' name={isShowPassword ? 'eye' : 'eye-with-line'} containerStyle={{ marginEnd: 5 }} size={18} />}
          placeholder='Nhập mật khẩu' onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={!isShowPassword} />
        <WarnText preset="default" text={warnPassword} />
        {/* Nhập lại mật khẩu */}
        <Text preset="default" text="Nhập lại mật khẩu" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='font-awesome-5' name='lock' containerStyle={{ marginStart: 5 }} size={16} />}
          componentRight={<Icon onPress={() => setShowPasswordRetype(!isShowPassword)} type='entypo' name={isShowPasswordRetype ? 'eye' : 'eye-with-line'} containerStyle={{ marginEnd: 5 }} size={18} />}
          placeholder='Nhập mật khẩu' onChangeText={password => setPasswordRetype(password)} defaultValue={passwordRetype} secureTextEntry={!isShowPasswordRetype} />
        <WarnText preset="default" text={warnPasswordRetype} />
        {/* Họ và tên */}
        <Text preset="default" text="Nhập họ và tên" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='material-community' name='card-account-details' containerStyle={{ marginStart: 5 }} size={16} />}
          placeholder='Nhập họ và tên' onChangeText={name => setName(name)} defaultValue={name} />
        <WarnText preset="default" text={warnPasswordRetype} />
        {/* Sở thích */}
        <Text preset="default" text="Sở thích" style={{ marginTop: 10 }} />
        <FlatList
          keyExtractor={(item) => String(item._id)}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity style={{}}>
              <Text style={{}}>{item.name}</Text>
            </TouchableOpacity>
          )} />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: metrics.baseMargin }}>
        <Button onPress={nextStep} text="XÁC NHẬN" style={{ backgroundColor: 'black', height: 40, marginBottom: 20 }} textStyle={{ fontSize: 15 }} />
      </View>
    </Screen>
  )
})
