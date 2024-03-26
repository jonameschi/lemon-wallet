import { Cryptocurrency } from '@api';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type CustomStackParamList = {
  Detail: { currency: Cryptocurrency };
  Home: undefined;
  Login: undefined;
};

type ScreenComponent<T extends keyof CustomStackParamList> = React.FC<
  NativeStackScreenProps<CustomStackParamList, T>
>;

type CustomNavigation = NavigationProp<CustomStackParamList>;

type CustomScreenRouteProps<T extends keyof CustomStackParamList> = RouteProp<
  CustomStackParamList,
  T
>;

export type {
  ScreenComponent as SC,
  CustomStackParamList,
  CustomNavigation,
  CustomScreenRouteProps,
};
