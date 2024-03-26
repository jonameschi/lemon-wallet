import { ComponentProps } from 'react';
import { Spacer } from '@components';
import { render } from '@testing-library/react-native';
import { MockThemeProvider } from '../../../__mocks__/MockThemeProvider';

const renderTree = (props: ComponentProps<typeof Spacer>) =>
  render(
    <MockThemeProvider>
      <Spacer {...props} />
    </MockThemeProvider>,
  );

describe('Spacer component', () => {
  it('should render a snapshot - with horizontal orientation and size 0', () => {
    const { toJSON } = renderTree({
      orientation: 'horizontal',
      size: 0,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - without vertical orientation and size 12', () => {
    const { toJSON } = renderTree({ orientation: 'vertical', size: 12 });
    expect(toJSON()).toMatchSnapshot();
  });
});
