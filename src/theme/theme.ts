type Theme = {
  background: {
    inversed: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
  line: {
    primary: string;
  };
  skeletons: {
    background: string;
  };
  text: {
    inversed: string;
    negative: string;
    positive: string;
    primary: string;
    secondary: string;
    tertiary: string;
    warning: string;
  };
};

const theme: Theme = {
  background: {
    primary: '#F8F9FA',
    secondary: '#2647e4',
    tertiary: '#fff',
    inversed: '#D3D3D3',
  },
  line: {
    primary: '#DFE2E4',
  },
  text: {
    primary: '#212529',
    secondary: '#343A40',
    inversed: '#FFFFFF',
    tertiary: '#6C757D',
    negative: '#D90429',
    positive: '#21BF73',
    warning: '#f8b84e',
  },
  skeletons: {
    background: '#D3D3D3',
  },
};

type BackgroundColorKeys = keyof Theme['background'];
type TextColorKeys = keyof Theme['text'];

export { theme, Theme, BackgroundColorKeys, TextColorKeys };
