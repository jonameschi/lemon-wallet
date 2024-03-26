import { ComponentProps } from 'react';
import { Text } from 'react-native';
import { Header } from '@components';
import { fireEvent, render } from '@testing-library/react-native';
import {
  MockNavigation,
  mockNavigationProps,
} from '../../../../__mocks__/MockNavigation';

const renderTree = (props: ComponentProps<typeof Header>) =>
  render(
    <MockNavigation>
      <Header {...props} />
    </MockNavigation>,
  );

describe('Header component', () => {
  it('should render a snapshot with text title', () => {
    const { toJSON } = renderTree({
      title: 'Testing Header',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - without title', () => {
    const { toJSON } = renderTree({ title: null });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - with ReactNode title', () => {
    const { toJSON } = renderTree({ title: <Text>Testing Header</Text> });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should go back to Home', () => {
    const { getByTestId } = renderTree({ title: 'Testing Header' });
    const button = getByTestId('header-go-back-btn');

    fireEvent.press(button);

    expect(mockNavigationProps.goBack).toHaveBeenCalledTimes(1);
  });
});
