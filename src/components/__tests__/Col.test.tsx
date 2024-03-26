import { ComponentProps } from 'react';
import { Col } from '@components';
import { render } from '@testing-library/react-native';
import { MockThemeProvider } from '../../../__mocks__/MockThemeProvider';

const renderTree = (props: ComponentProps<typeof Col>) =>
  render(
    <MockThemeProvider>
      <Col {...props} />
    </MockThemeProvider>,
  );

describe('Col component', () => {
  it('should render a snapshot - center with gap', () => {
    const { toJSON } = renderTree({
      gap: 4,
      justifyContent: 'center',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - without props', () => {
    const { toJSON } = renderTree({});
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - with baseline justify and gap 0 ', () => {
    const { toJSON } = renderTree({ justifyContent: 'baseline', gap: 0 });
    expect(toJSON()).toMatchSnapshot();
  });
});
