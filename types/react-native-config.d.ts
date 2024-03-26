declare module 'react-native-config' {
  export interface NativeConfig {
    COIN_MARKET_API_KEY: string;
    GOOGLE_SIGN_IN_CLIENT_ID_IOS: string;
    GOOGLE_SIGN_IN_CLIENT_ID_WEB: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
