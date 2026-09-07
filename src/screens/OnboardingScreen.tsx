import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../components/AppIcon';
import { colors, radius, spacing } from '../theme';

const pages = [
  { title: 'Kwiga bigomba kuba ibishimisha', text: 'UBUREZI igufasha kwiga buhoro buhoro, ukoresheje amasomo, imyitozo na quiz.', icon: 'graduation' as const },
  { title: 'Hitamo urwego rwawe', text: 'Amasomo agenewe ibyiciro by’imyaka 1–3, 4–6, 7–10 na 11–15.', icon: 'sparkles' as const },
  { title: 'Ababyeyi bafite igenzura', text: 'Parent Dashboard ifasha gucunga profile, screen-time n’umutekano w’ibirimo.', icon: 'shield' as const },
];

export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const page = pages[index];
  const last = index === pages.length - 1;
  const next = () => { if (last) onDone(); else setIndex((value) => value + 1); };

  return (
    <View style={styles.screen}>
      <View style={styles.brand}><View style={styles.brandMark}><AppIcon name="book" size={26} color={colors.surface} /></View><Text style={styles.brandText}>UBUREZI</Text></View>
      <View style={styles.art}><View style={styles.sun}><AppIcon name={page.icon} size={58} color={colors.primary} /></View><View style={styles.orbit} /><View style={styles.dotOne} /><View style={styles.dotTwo} /></View>
      <View style={styles.copy}><Text style={styles.kicker}>IKIGANIRO {index + 1} / {pages.length}</Text><Text style={styles.title}>{page.title}</Text><Text style={styles.text}>{page.text}</Text></View>
      <View style={styles.dots}>{pages.map((_, i) => <View key={i} style={[styles.dot, i === index && styles.dotSelected]} />)}</View>
      <TouchableOpacity onPress={next} style={styles.primary} activeOpacity={0.85}><Text style={styles.primaryText}>{last ? 'Tangira' : 'Komeza'}</Text><AppIcon name="arrowRight" size={21} color={colors.surface} /></TouchableOpacity>
      {!last && <TouchableOpacity onPress={onDone} style={styles.skip} activeOpacity={0.8}><Text style={styles.skipText}>Simbuka</Text></TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas, padding: spacing.xl, paddingTop: spacing.xxl },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  brandMark: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  brandText: { color: colors.ink, fontSize: 18, fontWeight: '900', letterSpacing: 1.4 },
  art: { flex: 1, minHeight: 280, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  sun: { width: 170, height: 170, borderRadius: 85, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CFE4FF' },
  orbit: { position: 'absolute', width: 230, height: 230, borderRadius: 115, borderWidth: 1, borderColor: '#D8E8FA' },
  dotOne: { position: 'absolute', width: 13, height: 13, borderRadius: 7, backgroundColor: colors.warning, top: 55, right: '22%' },
  dotTwo: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: colors.success, bottom: 58, left: '23%' },
  copy: { alignItems: 'center' },
  kicker: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.ink, fontSize: 29, lineHeight: 35, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  text: { color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 10, maxWidth: 330 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginVertical: spacing.xl },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#C7D5E5' },
  dotSelected: { width: 24, backgroundColor: colors.primary },
  primary: { height: 56, borderRadius: radius.lg, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  primaryText: { color: colors.surface, fontWeight: '900', fontSize: 16 },
  skip: { alignItems: 'center', paddingVertical: 14 },
  skipText: { color: colors.muted, fontWeight: '700' },
});
