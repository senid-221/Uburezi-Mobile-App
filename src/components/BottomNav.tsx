import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIcon, { type AppIconName } from './AppIcon';
import { colors, radius, spacing } from '../theme';

type Tab = { key: string; label: string; icon: AppIconName };
const tabs: Tab[] = [
  { key: 'home', label: 'Ahabanza', icon: 'home' },
  { key: 'lessons', label: 'Amasomo', icon: 'book' },
  { key: 'progress', label: 'Iterambere', icon: 'chart' },
  { key: 'parent', label: 'Ababyeyi', icon: 'users' },
];

export default function BottomNav({ active, onChange }: { active: string; onChange: (key: string) => void }) {
  return (
    <View style={styles.wrap}>
      {tabs.map((tab) => {
        const selected = active === tab.key;
        return (
          <TouchableOpacity key={tab.key} onPress={() => onChange(tab.key)} style={styles.tab} activeOpacity={0.78} accessibilityRole="button" accessibilityLabel={tab.label}>
            <View style={[styles.icon, selected && styles.iconActive]}><AppIcon name={tab.icon} size={20} color={selected ? colors.primary : colors.muted} /></View>
            <Text style={[styles.label, selected && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingHorizontal: spacing.sm, paddingTop: spacing.sm, paddingBottom: spacing.sm + 2 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  icon: { width: 38, height: 30, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  iconActive: { backgroundColor: colors.primarySoft },
  label: { fontSize: 9.5, fontWeight: '700', color: colors.muted },
  labelActive: { color: colors.primary },
});
