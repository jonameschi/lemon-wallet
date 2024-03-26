import { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail, Home, Login } from '@screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from 'styled-components/native';
import { theme } from 'theme/theme';
import { CustomStackParamList } from './src/navigation/types';
import './i18n';

const Stack = createNativeStackNavigator<CustomStackParamList>();
const queryClient = new QueryClient();

const App: FC = () => (
  <SafeAreaProvider>
    {/* <StatusBar translucent backgroundColor="transparent" /> */}
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Home} name="Home" />
            <Stack.Screen component={Detail} name="Detail" />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
