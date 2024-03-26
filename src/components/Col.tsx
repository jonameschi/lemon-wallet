import { View } from 'react-native';
import styled from 'styled-components/native';

type ColProps = {
  gap?: number;
  justifyContent?: string;
};

const Col = styled(View)<ColProps>`
  flex: 1;
  flex-direction: column;
  gap: ${({ gap }) => gap ?? 0}px;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
`;

export { Col };
