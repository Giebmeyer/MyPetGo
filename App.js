import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Stack/MainStack';
import 'react-native-gesture-handler';


export default () => {
  return (
    <NavigationContainer>
      <MainStack></MainStack>
    </NavigationContainer>
  )
}