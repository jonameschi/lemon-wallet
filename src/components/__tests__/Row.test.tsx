import { ComponentProps } from 'react';
import { Row } from '@components';
import { render } from '@testing-library/react-native';
import { MockThemeProvider } from '../../../__mocks__/MockThemeProvider';

const renderTree = (props: ComponentProps<typeof Row>) =>
  render(
    <MockThemeProvider>
      <Row {...props} />
    </MockThemeProvider>,
  );

describe('Row component', () => {
  it('should render a snapshot - center with gap', () => {
    const { toJSON } = renderTree({
      alignItems: 'center',
      gap: 4,
      justifyContent: 'center',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - without props', () => {
    const { toJSON } = renderTree({});
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - with baseline align items and gap 0 ', () => {
    const { toJSON } = renderTree({ alignItems: 'baseline', gap: 0 });
    expect(toJSON()).toMatchSnapshot();
  });
});
