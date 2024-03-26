import { View } from 'react-native';
import styled from 'styled-components/native';

type SpacerProps = {
  orientation: 'horizontal' | 'vertical';
  size: number;
};

const Spacer = styled(View)<SpacerProps>`
  ${({ orientation, size }) =>
    orientation === 'horizontal' ? `width: ${size}px;` : `height: ${size}px;`}
`;

export { Spacer };
