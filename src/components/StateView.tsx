import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SuperIcon from './SuperIcon';
import { colors, radius } from '../theme';

type Props = { mode: 'loading' | 'empty' | 'error'; title: string; message?: string; onRetry?: () => void };

export default function StateView({ mode, title, message, onRetry }: Props) {
  const icon = mode === 'loading' ? 'loader' : mode === 'error' ? 'alert-circle' : 'book-open';
  return (
    <View style={styles.wrap}>
      <View style={[styles.icon, mode === 'error' && styles.errorIcon]}>
        {mode === 'loading' ? <ActivityIndicator color={colors.primary} /> : <SuperIcon name={icon} size={25} color={mode === 'error' ? colors.coral : colors.primary} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {!!onRetry && mode === 'error' && <TouchableOpacity onPress={onRetry} style={styles.retry} activeOpacity={0.85}><Text style={styles.retryText}>Ongera ugerageze</Text></TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  icon: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  errorIcon: { backgroundColor: colors.coralSoft }, title: { marginTop: 12, fontSize: 16, fontWeight: '900', color: colors.ink, textAlign: 'center' },
  message: { marginTop: 5, fontSize: 11.5, lineHeight: 18, color: colors.muted, textAlign: 'center', maxWidth: 290 },
  retry: { marginTop: 14, backgroundColor: colors.ink, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }, retryText: { color: colors.surface, fontWeight: '900', fontSize: 11 },
});
