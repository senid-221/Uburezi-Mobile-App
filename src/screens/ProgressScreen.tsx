import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProgress, getQuizAttempts } from '../services/progress';
import { lessons } from '../data/lessons';

export default function ProgressScreen({ onBack }: { onBack: () => void }) {
  const [progress, setProgress] = useState(awaitableProgress());
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    let mounted = true;
    Promise.all([getProgress(), getQuizAttempts()]).then(([items, quizItems]) => {
      if (!mounted) return;
      setProgress(items);
      setAttempts(quizItems.length);
    });
    return () => { mounted = false; };
  }, []);

  const progressFor = (lessonId: string) => progress.find((item) => item.lessonId === lessonId)?.progress ?? 0;
  const completed = progress.filter((item) => item.completed).length;
  const average = lessons.length ? Math.round(lessons.reduce((sum, lesson) => sum + progressFor(lesson.id), 0) / lessons.length) : 0;

  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <Text style={styles.title}>Iterambere ryanjye</Text>
      <Text style={styles.subtitle}>Reba uko uri gutera imbere mu myigire.</Text>

      <View style={styles.stats}>
        <View style={styles.stat}><Ionicons name="book-outline" size={22} color="#2563EB" /><Text style={styles.statValue}>{completed}</Text><Text style={styles.statLabel}>Amasomo yarangiye</Text></View>
        <View style={styles.stat}><Ionicons name="help-circle-outline" size={22} color="#2563EB" /><Text style={styles.statValue}>{attempts}</Text><Text style={styles.statLabel}>Quiz zakozwe</Text></View>
        <View style={styles.stat}><Ionicons name="trending-up-outline" size={22} color="#16A34A" /><Text style={styles.statValue}>{average}%</Text><Text style={styles.statLabel}>Impuzandengo</Text></View>
      </View>

      <View style={styles.card}><Text style={styles.cardTitle}>Amasomo yawe</Text>{lessons.map((lesson) => { const value = progressFor(lesson.id); return <View key={lesson.id} style={styles.subject}><View style={styles.row}><Text style={styles.name}>{lesson.subject}</Text><Text style={styles.percent}>{value}%</Text></View><Text style={styles.lesson}>{lesson.title}</Text><View style={styles.track}><View style={[styles.fill, { width: `${value}%` }]} /></View></View>; })}</View>
      <View style={styles.goal}><Ionicons name="star" size={26} color="#F59E0B" /><View style={{ flex: 1 }}><Text style={styles.goalTitle}>Intego y’uyu munsi</Text><Text style={styles.goalText}>Kora isomo rimwe na quiz imwe.</Text></View></View>
    </View>
  );
}

function awaitableProgress() { return [] as Awaited<ReturnType<typeof getProgress>>; }

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 }, backText: { color: '#2563EB', fontWeight: '700' }, title: { fontSize: 27, fontWeight: '800', color: '#0F172A' }, subtitle: { color: '#64748B', fontSize: 14, marginTop: 6 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 18 }, stat: { flex: 1, backgroundColor: '#FFF', borderRadius: 17, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' }, statValue: { fontSize: 21, fontWeight: '900', color: '#0F172A', marginTop: 7 }, statLabel: { fontSize: 10, color: '#64748B', marginTop: 2, lineHeight: 14 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginTop: 14, borderWidth: 1, borderColor: '#E2E8F0' }, cardTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 16 }, subject: { marginBottom: 15 }, row: { flexDirection: 'row', justifyContent: 'space-between' }, name: { fontWeight: '700', color: '#334155' }, percent: { fontWeight: '800', color: '#2563EB' }, lesson: { fontSize: 11, color: '#64748B', marginTop: 3 }, track: { height: 7, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 7, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 4 }, goal: { backgroundColor: '#FFFBEB', borderRadius: 18, padding: 16, marginTop: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }, goalTitle: { fontWeight: '800', color: '#92400E' }, goalText: { fontSize: 12, color: '#A16207', marginTop: 3 },
});
