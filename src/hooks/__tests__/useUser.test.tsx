import { useUser } from '@hooks'; // Asegúrate de que la ruta de importación sea correcta
import { renderHook, act } from '@testing-library/react-hooks';

describe('useUser hook', () => {
  const props = {
    name: 'Test User1',
    email: 'test@example.com',
    familyName: 'User',
    givenName: 'Test',
    id: '1',
    photo: 'photo',
  };

  it('allows setting and retrieving a user', async () => {
    const { rerender, result } = renderHook(() => useUser());

    act(() => {
      result.current.set(props);
    });
    rerender();
    expect(result.current.user).toEqual(props);
  });

  it('allows clearing the user', () => {
    const { rerender, result } = renderHook(() => useUser());

    act(() => {
      result.current.set(props);
    });
    rerender();

    expect(result.current.user).toEqual(props);

    act(() => {
      result.current.clear();
    });
    rerender();

    expect(result.current.user).toBeUndefined();
  });
});
