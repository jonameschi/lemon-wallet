import { FC, useCallback, useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import styled from 'styled-components/native';
import { theme } from 'theme/theme';

type SkeletonProps = Pick<ViewProps, 'style'>;

const Spacer = styled.View<{ height?: number }>`
  height: ${({ height }) => height || 10}px;
`;

const Skeleton: FC<SkeletonProps> = ({ style }) => {
  const opacity = useSharedValue(1);

  const activeAnimation = useCallback(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 900,
          easing: Easing.elastic(0.8),
        }),
        withTiming(0.5, {
          duration: 900,
          easing: Easing.elastic(0.8),
        }),
      ),
      -1,
    );
  }, [opacity]);

  useEffect(() => {
    activeAnimation();
  }, [activeAnimation]);

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(opacity.value, { damping: 20 }),
  }));

  return (
    <Animated.View
      style={[
        animatedOpacity,
        {
          backgroundColor: theme.skeletons.background,
        },
        style,
      ]}
    />
  );
};

type MerchantSkeletonProps = {
  multiple?: boolean;
};
const MerchantSkeleton: FC<MerchantSkeletonProps> = ({ multiple }) => (
  <>
    {Array.from({ length: multiple ? 8 : 1 }).map((_, index) => (
      <View
        // eslint-disable-next-line react/no-array-index-key
        key={`${Math.random()}-${index}`}
        style={{
          alignItems: 'center',
          marginRight: 10,
          marginTop: 10,
        }}>
        <Skeleton style={{ height: 115, width: 115, borderRadius: 10 }} />
        <Spacer />
        <Skeleton style={{ height: 10, width: 60, borderRadius: 5 }} />
        <Spacer height={5} />
        <Skeleton style={{ height: 10, width: 100, borderRadius: 5 }} />
      </View>
    ))}
  </>
);

const CategorySkeleton: FC<MerchantSkeletonProps> = ({ multiple }) => (
  <>
    {Array.from({ length: multiple ? 8 : 1 }).map((_, index) => (
      <View
        // eslint-disable-next-line react/no-array-index-key
        key={`${Math.random()}-${index}`}
        style={{
          alignItems: 'center',
          marginRight: 10,
          marginTop: 10,
        }}>
        <Skeleton style={{ height: 65, width: 170, borderRadius: 10 }} />
      </View>
    ))}
  </>
);

const FavouriteSkeleton: FC<MerchantSkeletonProps> = ({ multiple }) => (
  <>
    {Array.from({ length: multiple ? 8 : 1 }).map((_, index) => (
      <View
        // eslint-disable-next-line react/no-array-index-key
        key={`${Math.random()}-${index}`}
        style={{
          alignItems: 'center',
          marginRight: 10,
          marginTop: 10,
        }}>
        <Skeleton style={{ height: 100, width: 260, borderRadius: 10 }} />
      </View>
    ))}
  </>
);

export { Skeleton, MerchantSkeleton, CategorySkeleton, FavouriteSkeleton };
