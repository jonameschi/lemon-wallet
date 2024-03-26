import 'react-native-gesture-handler/jestSetup';

// animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  Reanimated.useEvent = () => {};
  Reanimated.runOnUI = () => () => {};
  return Reanimated;
});

jest.mock('react-native-mmkv', () => {
  const store: Record<string, string> = {};
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      setString: (key: string, value: string) => {
        store[key] = value;
      },
      getString: (key: string) => store[key] || null,
      delete: (key: string) => {
        delete store[key];
      },
    })),
    useMMKVObject: jest.fn().mockImplementation(key => {
      const setValue = (value?: object) => {
        if (value === undefined) {
          delete store[key];
        } else {
          store[key] = JSON.stringify(value);
        }
      };
      const getValue = () => (store[key] ? JSON.parse(store[key]) : undefined);
      return [getValue(), setValue];
    }),
  };
});

// this is for the next error: TypeError: global.__reanimatedWorkletInit is not a function
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
(global as any).__reanimatedWorkletInit = () => {};
