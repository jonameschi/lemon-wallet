import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Pressable } from 'react-native';

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import styled from 'styled-components/native';
import { theme } from 'theme/theme';

const ANIMATION_CONFIG = {
  duration: 150,
  easing: Easing.linear,
};

const THRESHOLD_GESTURE = 10;

type ToggleProps = {
  onChange: (value: boolean) => void;
  disabled?: boolean;
  value?: boolean;
} & Pick<ViewProps, 'testID'>;

const Pill = styled(Animated.View)`
  border-radius: 16px;
  height: 24px;
  width: 24px;
`;

const Container = styled(Animated.View)`
  height: 32px;
  border-radius: 24px;
`;

const Wrapper = styled(GestureHandlerRootView)`
  width: 56px;
`;

const Toggle = ({
  disabled = false,
  onChange,
  testID,
  value = false,
}: ToggleProps) => {
  const isActive = useMemo(() => value && !disabled, [value, disabled]);

  const position = useSharedValue(isActive ? 1 : 0);
  const gestureActive = useRef(false);

  useEffect(() => {
    position.value = withTiming(isActive ? 1 : 0, ANIMATION_CONFIG);
  }, [isActive, position]);

  const pillAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: disabled
        ? theme.background.tertiary
        : interpolateColor(
            position.value,
            [0, 1],
            [theme.background.primary, theme.background.tertiary],
          ),
      transform: [
        {
          translateX: 4 + position.value * 24,
        },
        {
          translateY: 4,
        },
      ],
    }),
    [position, disabled],
  );

  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: disabled
        ? theme.background.primary
        : interpolateColor(
            position.value,
            [0, 1],
            [theme.background.inversed, theme.text.warning],
          ),
    }),
    [position, disabled],
  );

  const handleSwitch = useCallback(
    (v: boolean) => {
      onChange(v);
    },
    [onChange],
  );

  const toggle = useCallback(
    async (v: boolean) => {
      gestureActive.current = false;

      position.value = withTiming(v ? 1 : 0, ANIMATION_CONFIG, isFinished => {
        if (isFinished) {
          runOnJS(handleSwitch)(v);
        }
      });
    },

    [position, handleSwitch],
  );

  const setGestureActive = useCallback(
    (active: boolean) => {
      if (disabled) return;
      gestureActive.current = active;
    },
    [disabled],
  );

  const handleGestureUpdate = useCallback(
    (translationX: number) => {
      if (disabled || !gestureActive.current) return;

      if (translationX > THRESHOLD_GESTURE) {
        toggle(true);
      } else if (translationX < -THRESHOLD_GESTURE) {
        toggle(false);
      }
    },
    [toggle, disabled],
  );

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: () => runOnJS(setGestureActive)(true),
      onActive: e => runOnJS(handleGestureUpdate)(e.translationX),
      onEnd: () => runOnJS(setGestureActive)(false),
      onCancel: () => runOnJS(setGestureActive)(false),
    },
    [],
  );

  return (
    <Wrapper>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Container style={containerAnimatedStyle}>
          <Pressable
            disabled={disabled}
            testID={testID}
            onPressOut={() => {
              toggle(!value);
            }}>
            <Pill style={pillAnimatedStyle} />
          </Pressable>
        </Container>
      </PanGestureHandler>
    </Wrapper>
  );
};

export { Toggle };
