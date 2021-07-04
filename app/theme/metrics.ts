import { Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('screen')

const metrics = {
  statusBarHeight: StatusBar.currentHeight,
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: '7.5%',
  baseWidth:'85%',
  line: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
}

export default metrics
