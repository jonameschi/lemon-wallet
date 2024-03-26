import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * This component provides a ScrollView taking whole viewable
 * height by placing a dumb view element below the keyboard
 * when visible.
 *
 * Note: React Native has a KeyboardAvoindingView already that
 * does a similar job, but its implementation does not suits our needs.
 */

type KeyboardAwareScrollViewProps = {
  children: React.ReactNode;
  bottomContent?: React.ReactNode;
  hideWhenScrollContent?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  onChange?: (offset: number) => void;
  removeHideAnimation?: boolean;
};

const KeyboardAwareScrollView = forwardRef(
  (
    {
      bottomContent,
      children,
      hideWhenScrollContent,
      keyboardShouldPersistTaps = 'handled',
      onChange,
      removeHideAnimation,
    }: KeyboardAwareScrollViewProps,
    ref: ForwardedRef<ScrollView>,
  ) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const { bottom } = useSafeAreaInsets();

    const animation = useRef(new Animated.Value(0)).current;

    const styles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            flex: 1,
          },
          content: {
            flexGrow: 1,
          },
        }),
      [],
    );

    /*
     * Subscribe to Keyboard show/hide events
     * to update `keyboardHeight` value
     */
    useEffect(() => {
      const subscriptions: EmitterSubscription[] = [];
      const keyboardDidShow = (event: KeyboardEvent) => {
        try {
          const { endCoordinates } = event;
          const { height } = endCoordinates;
          setKeyboardHeight(height);
          onChange?.(height);

          // https://twitter.com/gorhom/status/1368818170979643396
          // In June 2022 this seems to fit the ios animation perfectly
          // It seems extremely difficult to replicate all Android keyboard animations
          // so using the same animation for now
          Animated.spring(animation, {
            toValue: 1,
            damping: 500,
            stiffness: 1000,
            mass: 3,
            useNativeDriver: false,
          }).start();
        } catch (e) {
          setKeyboardHeight(0);
        }
      };

      const keyboardDidHide = () => {
        setKeyboardHeight(0);
        onChange?.(0);
        Animated.spring(animation, {
          toValue: 0,
          damping: 500,
          stiffness: 1000,
          mass: 3,
          useNativeDriver: false,
        }).start();
      };
      if (!removeHideAnimation)
        subscriptions.push(
          Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            keyboardDidHide,
          ),
        );
      subscriptions.push(
        Keyboard.addListener(
          Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
          keyboardDidShow,
        ),
      );

      return () => {
        // clear subscriptions on teardown
        subscriptions.forEach(subscription => {
          subscription.remove();
        });
      };
    }, [animation, removeHideAnimation, onChange]);

    /*
     * Re-compute styles when `keyboardHeight` changes
     */
    const animatedHeight = useMemo(
      () =>
        animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, keyboardHeight - bottom],
        }),
      [keyboardHeight, animation, bottom],
    );

    return (
      <>
        <ScrollView
          ref={ref}
          bounces={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          onScroll={() => {
            if (hideWhenScrollContent) Keyboard.dismiss();
          }}>
          {children}
        </ScrollView>
        {bottomContent}
        {Platform.OS === 'ios' && (
          <Animated.View style={{ height: animatedHeight }} />
        )}
      </>
    );
  },
);

export { KeyboardAwareScrollView };
