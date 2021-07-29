import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import { Button, Screen, Text, TextField } from "../../components"
import { CategoryItem } from "../../components/common/category-item"
import { WarnText } from "../../components/text/warn-text"
import { useStores } from "../../models"
import { RegisterModel } from "../../models/request-models/RegisterModel"
import { color } from "../../theme"
import metrics from "../../theme/metrics"
import TextInputMask from 'react-native-text-input-mask';
import { TextFieldMask } from "../../components/text-field/text-field-mask"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const RegisterStep3Screen = observer(function RegisterStep3Screen() {
  const [password, setPassword] = useState('123456');
  const [warnPassword, setWarnPassword] = useState(undefined);
  const [isShowPassword, setShowPassword] = useState(false);
  const [passwordRetype, setPasswordRetype] = useState('123456');
  const [warnPasswordRetype, setWarnPasswordRetype] = useState(undefined);
  const [isShowPasswordRetype, setShowPasswordRetype] = useState(false);
  const [name, setName] = useState('Ngộ Nghĩnh');
  const [warnName, setWarnName] = useState(undefined);
  const [birthday, setBirthday] = useState('');
  const [warnBirthday, setWarnBirthday] = useState(undefined);
  const [hobbies, setHobbies] = useState([]);
  const [warnHobbies, setWarnHobbies] = useState(undefined);

  const { generalStore } = useStores()
  const { categories } = generalStore

  useEffect(() => {
    onRefresh()
  }, [])

  async function onRefresh() {
    await generalStore.getCategories({ showLoading: true })
  }

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

  const onPressCategory = (item) => {
    if(!hobbies.includes(item.code))
      hobbies.push(item.code)
    else
      hobbies.splice(hobbies.indexOf(item.code),1)
    console.log('hieunv', 'hobbies', hobbies);
    setHobbies([...hobbies])
  }

  const nextStep = async () => {
    if (checkValidInput()) {
      RegisterModel.password = password;
      RegisterModel.name = name;
      RegisterModel.hobbies = hobbies;
    }
  }

  return (
    <Screen style={ROOT} onRefresh={onRefresh} preset="scroll">
      <View style={{ flex: 1, marginHorizontal: metrics.baseMargin }}>
        <Text preset="header" text="ĐĂNG KÝ" style={{ marginTop: '20%' }} />
        {/* Mật khẩu */}
        <Text preset="default" text="Mật khẩu (*)" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='font-awesome-5' name='lock' containerStyle={{ marginStart: 5 }} size={16} />}
          componentRight={<Icon onPress={() => setShowPassword(!isShowPassword)} type='entypo' name={isShowPassword ? 'eye' : 'eye-with-line'} containerStyle={{ marginEnd: 5 }} size={18} />}
          placeholder='Nhập mật khẩu' onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={!isShowPassword} />
        <WarnText text={warnPassword} />
        {/* Nhập lại mật khẩu */}
        <Text preset="default" text="Nhập lại mật khẩu (*)" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='font-awesome-5' name='lock' containerStyle={{ marginStart: 5 }} size={16} />}
          componentRight={<Icon onPress={() => setShowPasswordRetype(!isShowPassword)} type='entypo' name={isShowPasswordRetype ? 'eye' : 'eye-with-line'} containerStyle={{ marginEnd: 5 }} size={18} />}
          placeholder='Nhập mật khẩu' onChangeText={password => setPasswordRetype(password)} defaultValue={passwordRetype} secureTextEntry={!isShowPasswordRetype} />
        <WarnText text={warnPasswordRetype} />
        {/* Họ và tên */}
        <Text preset="default" text="Nhập họ và tên (*)" style={{ marginTop: 10 }} />
        <TextField
          style={{ marginTop: 5 }}
          componentLeft={<Icon type='material-community' name='card-account-details' containerStyle={{ marginStart: 5 }} size={16} />}
          placeholder='Nhập họ và tên' onChangeText={name => setName(name)} defaultValue={name} />
        <WarnText text={warnName} />
        {/* Ngày tháng năm sinh */}
        <Text preset="default" text="Nhập ngày tháng năm sinh (*)" style={{ marginTop: 10 }} />
        <TextFieldMask
          style={{ marginTop: 5 }} mask={'[00]/[00]/[0000]'}
          keyboardType='numeric'
          componentLeft={<Icon type='font-awesome' name='birthday-cake' containerStyle={{ marginStart: 5 }} size={16} />}
          placeholder='DD/MM/YYYY' onChangeText={birthday => setBirthday(birthday)} defaultValue={birthday} />
        <WarnText text={warnBirthday} />
        {/* Sở thích */}
        <Text text="Sở thích (*)" style={{ marginTop: 10 }} />
        <View style={{width: '100%'}}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={[...categories]}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => (
              <CategoryItem onPress={()=>onPressCategory(item)} item={item} isSelect={hobbies.includes(item.code)} style={{ minWidth: '30%', marginTop: 10 }} />
            )} />
        </View>
        <WarnText text={warnHobbies} style={{ marginTop: 10 }}/>
        <Button onPress={nextStep} text="XÁC NHẬN" style={{ backgroundColor: 'black', height: 40, marginVertical: 20 }} textStyle={{ fontSize: 15 }} />
      </View>
    </Screen>
  )
})
