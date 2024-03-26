import { theme } from 'theme/theme';

describe('Theme data', () => {
  it('should render a snapshot of Theme data', () => {
    expect(theme).toMatchSnapshot();
  });
});
