import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "react-native-elements"
import { Button, Screen, Text, TextField } from "../../components"
import { CategoryItem } from "../../components/common/category-item"
import { TextFieldMask } from "../../components/text-field/text-field-mask"
import { WarnText } from "../../components/text/warn-text"
import { useStores } from "../../models"
import { RegisterModel } from "../../models/request-models/RegisterModel"
import { Api } from "../../services/api"
import { requestPopToTop, requestReplace } from "../../services/app-action/app-action"
import { color } from "../../theme"
import metrics from "../../theme/metrics"
import { convertStringToDate, getGenderImage, getGenderName, isValidDate } from "../../utils/functions"

const ROOT: ViewStyle = {
  backgroundColor: color.main,
  flex: 1,
}

export const RegisterStep3Screen = observer(function RegisterStep3Screen() {
  const api = new Api()

  const [password, setPassword] = useState('123456');
  const [warnPassword, setWarnPassword] = useState(undefined);
  const [isShowPassword, setShowPassword] = useState(false);
  const [passwordRetype, setPasswordRetype] = useState('123456');
  const [warnPasswordRetype, setWarnPasswordRetype] = useState(undefined);
  const [isShowPasswordRetype, setShowPasswordRetype] = useState(false);
  const [name, setName] = useState('Ngộ Nghĩnh');
  const [warnName, setWarnName] = useState(undefined);
  const [birthday, setBirthday] = useState('01/01/2000');
  const [warnBirthday, setWarnBirthday] = useState(undefined);
  const [gender, setGender] = useState(0);
  const [hobbies, setHobbies] = useState([]);
  const [warnHobbies, setWarnHobbies] = useState(undefined);

  const { generalStore } = useStores()
  const { categories } = generalStore

  const goToMain = () => { requestPopToTop(); requestReplace("main"); }

  useEffect(() => {
    onRefresh()
  }, [])

  async function onRefresh() {
    await api.getCategories({ showLoading: true })
  }

  const checkValidInput = () => {
    var isValid = true
    setWarnPassword(undefined)
    setWarnPasswordRetype(undefined)
    setWarnName(undefined)
    setWarnBirthday(undefined)
    setWarnHobbies(undefined)
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
    if (!isValidDate(birthday)) {
      setWarnBirthday('Vui lòng ngày sinh hợp lệ')
      isValid = false
    }
    if (hobbies.length == 0) {
      setWarnHobbies('Vui lòng chọn ít nhất một sở thích')
      isValid = false
    }
    return isValid
  }

  const onPressCategory = (item) => {
    if (!hobbies.includes(item.code))
      hobbies.push(item.code)
    else
      hobbies.splice(hobbies.indexOf(item.code), 1)
    console.log('hieunv', 'hobbies', hobbies);
    setHobbies([...hobbies])
  }

  const nextStep = async () => {
    if (checkValidInput()) {
      RegisterModel.password = password;
      RegisterModel.name = name;
      RegisterModel.birthday = convertStringToDate(birthday);
      RegisterModel.gender = gender;
      RegisterModel.hobbies = hobbies;
      let res = await api.register(RegisterModel)
      if (res.kind == 'ok') {
        goToMain()
      }
    }
  }

  const renderGender = ({ isChoose = false, gender = 0, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[{ alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'black', borderStyle: 'dashed' }, isChoose && { borderStyle: 'solid' }]}>
        <Image source={getGenderImage(gender)} style={[{ width: 50, height: 50, opacity: 0.5 }, isChoose && { opacity: 1 }]} />
        <Text preset="default" text={getGenderName(gender)} style={[{ marginTop: 10, opacity: 0.5 }, isChoose && { opacity: 1 }]} />
      </TouchableOpacity>
    )
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
        {/* Giới tính */}
        <Text preset="default" text="Chọn giới tính (*)" style={{ marginTop: 10 }} />
        <View style={{ width: '100%' }}>
          <ScrollView style={{ flexDirection: 'row', marginTop: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderGender({ isChoose: gender == 0, gender: 0, onPress: () => setGender(0) })}
            <View style={{ width: 20 }} />
            {renderGender({ isChoose: gender == 1, gender: 1, onPress: () => setGender(1) })}
            <View style={{ width: 20 }} />
            {renderGender({ isChoose: gender == 2, gender: 2, onPress: () => setGender(2) })}
            <View style={{ width: 20 }} />
            {renderGender({ isChoose: gender == 3, gender: 3, onPress: () => setGender(3) })}
          </ScrollView>
        </View>
        {/* Sở thích */}
        <Text text="Sở thích (*)" style={{ marginTop: 10 }} />
        <View style={{ width: '100%' }}>
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => String(item._id)}
            data={[...categories]}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item, index }) => (
              <CategoryItem onPress={() => onPressCategory(item)} item={item} isSelect={hobbies.includes(item.code)} style={{ minWidth: '30%', marginTop: 10 }} />
            )} />
        </View>
        <WarnText text={warnHobbies} style={{ marginTop: 10 }} />
        <Button onPress={nextStep} text="XÁC NHẬN" style={{ backgroundColor: 'black', height: 40, marginVertical: 20 }} textStyle={{ fontSize: 15 }} />
      </View>
    </Screen>
  )
})
