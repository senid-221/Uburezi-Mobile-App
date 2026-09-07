import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const levels = [
  { id: 'early', title: 'Imyaka 1–3', subtitle: 'Kwiga binyuze mu mukino', icon: 'happy-outline' as const },
  { id: 'young', title: 'Imyaka 4–6', subtitle: 'Ibanze n’ubumenyi', icon: 'school-outline' as const },
  { id: 'kids', title: 'Imyaka 7–10', subtitle: 'Amasomo n’imyitozo', icon: 'book-outline' as const },
  { id: 'teens', title: 'Imyaka 11–15', subtitle: 'Ubumenyi bwimbitse', icon: 'bulb-outline' as const },
];

export default function App() {
  const [selected, setSelected] = useState('kids');
  const current = useMemo(() => levels.find((level) => level.id === selected) ?? levels[2], [selected]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>UBUREZI</Text>
            <Text style={styles.title}>Murakaza neza! 👋</Text>
            <Text style={styles.subtitle}>Kwiga, gukina no gutera imbere.</Text>
          </View>
          <View style={styles.avatar}><Ionicons name="person" size={24} color="#2563EB" /></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name="school" size={30} color="#FFFFFF" /></View>
          <Text style={styles.heroTitle}>Hitamo urwego rw’umunyeshuri</Text>
          <Text style={styles.heroText}>Ibirimo bizahinduka bitewe n’imyaka n’urwego rw’umwana.</Text>
        </View>

        <Text style={styles.sectionTitle}>Urwego rw’imyaka</Text>
        <View style={styles.grid}>
          {levels.map((level) => {
            const active = selected === level.id;
            return (
              <TouchableOpacity key={level.id} onPress={() => setSelected(level.id)} style={[styles.card, active && styles.cardActive]} activeOpacity={0.85}>
                <View style={[styles.cardIcon, active && styles.cardIconActive]}><Ionicons name={level.icon} size={25} color={active ? '#FFFFFF' : '#2563EB'} /></View>
                <Text style={[styles.cardTitle, active && styles.cardTitleActive]}>{level.title}</Text>
                <Text style={[styles.cardText, active && styles.cardTextActive]}>{level.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View><Text style={styles.smallLabel}>URWEGO RWAWE</Text><Text style={styles.progressTitle}>{current.title}</Text></View>
            <Ionicons name="trending-up" size={26} color="#16A34A" />
          </View>
          <Text style={styles.progressText}>Tangira amasomo ajyanye n’uru rwego.</Text>
          <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
          <Text style={styles.primaryText}>Tangira Kwiga</Text>
          <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.footer}>Ababyeyi bashobora gucunga imyigire n’igihe cyo gukoresha porogaramu.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FAFC' },
  container: { padding: 20, paddingBottom: 36 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2, color: '#2563EB' },
  title: { fontSize: 27, fontWeight: '800', color: '#0F172A', marginTop: 5 },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 5 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: '#2563EB', borderRadius: 24, padding: 20, marginBottom: 26 },
  heroIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  heroTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800' },
  heroText: { color: '#DBEAFE', lineHeight: 21, marginTop: 7, fontSize: 14 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#0F172A', marginBottom: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', minHeight: 142, backgroundColor: '#FFFFFF', borderRadius: 19, padding: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  cardActive: { backgroundColor: '#EFF6FF', borderColor: '#60A5FA' },
  cardIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  cardIconActive: { backgroundColor: '#2563EB' },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  cardTitleActive: { color: '#1D4ED8' },
  cardText: { color: '#64748B', fontSize: 12, lineHeight: 17, marginTop: 4 },
  cardTextActive: { color: '#475569' },
  progressCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, marginTop: 22, borderWidth: 1, borderColor: '#E2E8F0' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, color: '#94A3B8' },
  progressTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginTop: 3 },
  progressText: { color: '#64748B', marginTop: 9 },
  progressTrack: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 14, overflow: 'hidden' },
  progressFill: { width: '35%', height: '100%', backgroundColor: '#22C55E', borderRadius: 4 },
  primaryButton: { height: 56, borderRadius: 18, backgroundColor: '#0F172A', marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  footer: { textAlign: 'center', color: '#94A3B8', fontSize: 12, lineHeight: 18, marginTop: 18, paddingHorizontal: 10 },
});
