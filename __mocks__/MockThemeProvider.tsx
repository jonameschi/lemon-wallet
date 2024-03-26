import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'theme/theme';

export const MockThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
