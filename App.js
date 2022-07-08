import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/Stacks/MainStack';
import {Text} from 'react-native';

export default () => {
  return(
    <NavigationContainer>
        <MainStack>

        </MainStack>
    </NavigationContainer>
  )
}
