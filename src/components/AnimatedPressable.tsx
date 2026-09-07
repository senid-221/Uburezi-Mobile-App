import React, { useRef } from 'react';
import { Animated, Pressable, type PressableProps, StyleSheet } from 'react-native';

type Props = PressableProps & { children: React.ReactNode; scaleTo?: number };

export default function AnimatedPressable({ children, scaleTo = 0.98, style, onPressIn, onPressOut, ...props }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (toValue: number) => Animated.spring(scale, { toValue, useNativeDriver: true, speed: 28, bounciness: 5 }).start();
  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }, style as never]}>
      <Pressable
        {...props}
        onPressIn={(event) => { animate(scaleTo); onPressIn?.(event); }}
        onPressOut={(event) => { animate(1); onPressOut?.(event); }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({ wrap: { width: '100%' } });
