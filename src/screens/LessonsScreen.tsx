import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const lessons = [
  { title: 'Imibare', text: 'Imibare y’ibanze n’imyitozo', icon: 'calculator-outline' as const, progress: '35%' },
  { title: 'Siyansi', text: 'Menya isi, ibinyabuzima n’ibidukikije', icon: 'flask-outline' as const, progress: '20%' },
  { title: 'Ikoranabuhanga', text: 'Ubumenyi bw’ibanze bwa mudasobwa', icon: 'desktop-outline' as const, progress: '10%' },
  { title: 'Indimi', text: 'Soma, andika kandi uvuge neza', icon: 'language-outline' as const, progress: '45%' },
];

export default function LessonsScreen({ onBack }: { onBack: () => void }) {
  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <Text style={styles.title}>Amasomo</Text>
      <Text style={styles.subtitle}>Hitamo isomo ushaka kwiga uyu munsi.</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity key={lesson.title} style={styles.card} activeOpacity={0.85}>
          <View style={styles.icon}><Ionicons name={lesson.icon} size={24} color="#2563EB" /></View>
          <View style={styles.copy}><Text style={styles.cardTitle}>{lesson.title}</Text><Text style={styles.cardText}>{lesson.text}</Text><View style={styles.track}><View style={[styles.fill, { width: lesson.progress }]} /></View></View>
          <Ionicons name="chevron-forward" size={19} color="#94A3B8" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 },
  backText: { color: '#2563EB', fontWeight: '700' },
  title: { fontSize: 27, fontWeight: '800', color: '#0F172A' },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 6, marginBottom: 18 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 18, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  icon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, marginHorizontal: 12 },
  cardTitle: { fontWeight: '800', color: '#0F172A', fontSize: 15 },
  cardText: { color: '#64748B', fontSize: 12, marginTop: 3, lineHeight: 17 },
  track: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },
});
