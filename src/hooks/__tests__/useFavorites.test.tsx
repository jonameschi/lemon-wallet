import { useFavorites } from '@hooks';
import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';

describe('useFavorites hook', () => {
  let hook: RenderHookResult<unknown, ReturnType<typeof useFavorites>>;

  beforeEach(() => {
    hook = renderHook(() => useFavorites());
  });

  it('allows adding a favorite and checking if it is favorite', () => {
    const { rerender, result } = hook;
    act(() => {
      result.current.add('BTC');
    });

    rerender();

    expect(result.current.isFavorite('BTC')).toBe(true);
  });

  it('allows removing a favorite', () => {
    const { rerender, result } = hook;

    act(() => {
      result.current.add('BTC');
    });

    rerender();

    act(() => {
      result.current.remove('BTC');
    });

    rerender();

    expect(result.current.isFavorite('BTC')).toBe(false);
  });

  it('correctly handles multiple favorites', () => {
    const { rerender, result } = hook;

    act(() => {
      result.current.add('BTC');
    });
    rerender();
    act(() => {
      result.current.add('ETH');
    });
    rerender();

    expect(result.current.favorites).toContain('BTC');
    expect(result.current.favorites).toContain('ETH');
    expect(result.current.favorites.length).toBe(2);

    act(() => {
      result.current.remove('BTC');
    });

    rerender();

    expect(result.current.favorites).toContain('ETH');
    expect(result.current.favorites.length).toBe(1);
  });
});
