import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

type RowProps = {
  alignItems?: ViewStyle['alignItems'];
  gap?: number;
  justifyContent?: ViewStyle['justifyContent'];
};

const Row = styled(View)<RowProps>`
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  gap: ${({ gap }) => gap ?? 0}px;
`;

export { Row };
