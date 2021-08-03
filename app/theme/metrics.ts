import { Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('screen')

const metrics = {
  statusBarHeight: StatusBar.currentHeight,
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: width*0.05,
  baseWidth: width*0.90,
  line: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  baseRadius: 4,
}

export default metrics
