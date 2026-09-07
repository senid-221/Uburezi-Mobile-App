import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type LearningLevel = 'early' | 'young' | 'kids' | 'teens';

const levels = [
  { id: 'early' as const, title: 'Imyaka 1–3', subtitle: 'Kwiga binyuze mu mukino', icon: 'happy-outline' as const },
  { id: 'young' as const, title: 'Imyaka 4–6', subtitle: 'Ibanze n’ubumenyi', icon: 'school-outline' as const },
  { id: 'kids' as const, title: 'Imyaka 7–10', subtitle: 'Amasomo n’imyitozo', icon: 'book-outline' as const },
  { id: 'teens' as const, title: 'Imyaka 11–15', subtitle: 'Ubumenyi bwimbitse', icon: 'bulb-outline' as const },
];

export default function AgeSelectionScreen({ selected, onSelect, onContinue }: { selected: LearningLevel; onSelect: (level: LearningLevel) => void; onContinue: () => void }) {
  return (
    <View>
      <Text style={styles.title}>Hitamo urwego</Text>
      <Text style={styles.subtitle}>Porogaramu izaguha amasomo ajyanye n’imyaka.</Text>
      <View style={styles.grid}>
        {levels.map((level) => {
          const active = selected === level.id;
          return (
            <TouchableOpacity key={level.id} onPress={() => onSelect(level.id)} style={[styles.card, active && styles.active]} activeOpacity={0.85}>
              <View style={[styles.icon, active && styles.activeIcon]}><Ionicons name={level.icon} size={25} color={active ? '#FFF' : '#2563EB'} /></View>
              <Text style={styles.cardTitle}>{level.title}</Text>
              <Text style={styles.cardText}>{level.subtitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={onContinue} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Komeza</Text><Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 25, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  subtitle: { color: '#64748B', fontSize: 14, lineHeight: 21, marginBottom: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', minHeight: 135, backgroundColor: '#FFF', borderRadius: 18, padding: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  active: { backgroundColor: '#EFF6FF', borderColor: '#60A5FA' },
  icon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  activeIcon: { backgroundColor: '#2563EB' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  cardText: { fontSize: 12, lineHeight: 17, color: '#64748B', marginTop: 4 },
  button: { height: 54, borderRadius: 17, backgroundColor: '#0F172A', marginTop: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
