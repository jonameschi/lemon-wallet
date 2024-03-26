import { MainHeader } from '@components';
import { render } from '@testing-library/react-native';
import { MockNavigation } from '../../../../__mocks__/MockNavigation';

const renderTree = () =>
  render(
    <MockNavigation>
      <MainHeader />
    </MockNavigation>,
  );

describe('MainHeader component', () => {
  it('should render a snapshot - default', () => {
    const { toJSON } = renderTree();
    expect(toJSON()).toMatchSnapshot();
  });
});
