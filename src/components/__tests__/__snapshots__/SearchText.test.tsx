import { ComponentProps } from 'react';
import { SearchText } from '@components';
import { fireEvent, render } from '@testing-library/react-native';
import { MockThemeProvider } from '../../../../__mocks__/MockThemeProvider';

const renderTree = (props: ComponentProps<typeof SearchText>) =>
  render(
    <MockThemeProvider>
      <SearchText {...props} />
    </MockThemeProvider>,
  );

describe('SearchText component', () => {
  const handleChange = jest.fn();

  it('should render a snapshot - default', () => {
    const { toJSON } = renderTree({
      onChangeText: handleChange,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render a snapshot - with initial value and placeholder', () => {
    const { toJSON } = renderTree({
      onChangeText: handleChange,
      initialValue: 'Initial Value',
      placeholder: 'Placeholder',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call to onChangeText when enter a text', () => {
    const { getByTestId } = renderTree({
      onChangeText: handleChange,
      initialValue: 'Initial Value',
      placeholder: 'Placeholder',
      testID: 'search-text-test',
    });

    fireEvent.press(getByTestId('search-text-test-clear-btn'));
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
