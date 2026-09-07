import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lessons } from '../data/lessons';
import { getProgress } from '../services/progress';

type Props = { onBack: () => void; onQuiz?: () => void; onOpenLesson?: (lessonId: string) => void };

export default function LessonsScreen({ onBack, onQuiz, onOpenLesson }: Props) {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;
    getProgress().then((items) => {
      if (!mounted) return;
      setProgressMap(Object.fromEntries(items.map((item) => [item.lessonId, item.progress])));
    });
    return () => { mounted = false; };
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={20} color="#2563EB" />
        <Text style={styles.backText}>Subira</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Amasomo</Text>
      <Text style={styles.subtitle}>Hitamo isomo ushaka kwiga uyu munsi.</Text>

      {lessons.map((lesson) => {
        const progress = progressMap[lesson.id] ?? 0;
        return (
          <TouchableOpacity key={lesson.id} style={styles.card} activeOpacity={0.85} onPress={() => onOpenLesson?.(lesson.id)}>
            <View style={styles.icon}><Ionicons name={lesson.icon} size={24} color="#2563EB" /></View>
            <View style={styles.copy}>
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{lesson.subject}</Text>
                <Text style={styles.percent}>{progress}%</Text>
              </View>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.cardText}>{lesson.duration} · {lesson.summary}</Text>
              <View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View>
            </View>
            <Ionicons name="chevron-forward" size={19} color="#94A3B8" />
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.quiz} onPress={onQuiz} activeOpacity={0.85}>
        <View style={styles.quizIcon}><Ionicons name="help-circle" size={24} color="#FFF" /></View>
        <View style={styles.quizCopy}><Text style={styles.quizTitle}>Kora Quiz</Text><Text style={styles.quizText}>Gerageza ubumenyi bwawe kandi ubone amanota.</Text></View>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontWeight: '800', color: '#0F172A', fontSize: 15 },
  lessonTitle: { fontWeight: '700', color: '#334155', fontSize: 13, marginTop: 2 },
  percent: { fontWeight: '800', color: '#2563EB', fontSize: 11 },
  cardText: { color: '#64748B', fontSize: 11, marginTop: 4, lineHeight: 16 },
  track: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginTop: 9, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },
  quiz: { backgroundColor: '#7C3AED', borderRadius: 20, padding: 15, marginTop: 4, flexDirection: 'row', alignItems: 'center', gap: 12 },
  quizIcon: { width: 45, height: 45, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  quizCopy: { flex: 1 },
  quizTitle: { fontWeight: '900', fontSize: 16, color: '#FFF' },
  quizText: { fontSize: 11, color: '#EDE9FE', lineHeight: 17, marginTop: 3 },
});
