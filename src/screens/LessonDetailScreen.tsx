import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLesson } from '../data/lessons';
import { saveProgress } from '../services/progress';
import type { ChildProfile } from '../types/models';

type Props = { lessonId: string; child?: ChildProfile | null; onBack: () => void; onStartQuiz: () => void };

export default function LessonDetailScreen({ lessonId, child, onBack, onStartQuiz }: Props) {
  const lesson = getLesson(lessonId);
  const [step, setStep] = useState(0);
  const current = lesson.steps[step];
  const progressChildId = child?.id ?? 'local-child';

  const markStarted = async () => {
    await saveProgress({ childId: progressChildId, lessonId: lesson.id, progress: Math.max(10, Math.round(((step + 1) / lesson.steps.length) * 70)), completed: false, updatedAt: new Date().toISOString() });
  };

  const next = async () => {
    await markStarted();
    if (step < lesson.steps.length - 1) setStep((value) => value + 1);
    else onStartQuiz();
  };

  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <View style={styles.headerCard}><View style={styles.iconCircle}><Ionicons name={lesson.icon} size={30} color="#FFF" /></View><View style={styles.headerCopy}><Text style={styles.subject}>{lesson.subject} · {lesson.duration}</Text><Text style={styles.title}>{lesson.title}</Text><Text style={styles.summary}>{lesson.summary}</Text></View></View>
      <View style={styles.progressRow}><Text style={styles.counter}>Igice {step + 1} / {lesson.steps.length}</Text><Text style={styles.percent}>{Math.round(((step + 1) / lesson.steps.length) * 100)}%</Text></View>
      <View style={styles.track}><View style={[styles.fill, { width: `${((step + 1) / lesson.steps.length) * 100}%` }]} /></View>
      <View style={styles.lessonCard}><View style={styles.stepIcon}><Ionicons name={current.icon} size={24} color="#2563EB" /></View><Text style={styles.stepTitle}>{current.title}</Text><Text style={styles.stepText}>{current.text}</Text></View>
      <TouchableOpacity style={styles.primary} onPress={() => void next()} activeOpacity={0.85}><Text style={styles.primaryText}>{step < lesson.steps.length - 1 ? 'Komeza' : 'Kora Quiz'}</Text><Ionicons name="arrow-forward" size={20} color="#FFF" /></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 }, backText: { color: '#2563EB', fontWeight: '700' }, headerCard: { backgroundColor: '#2563EB', borderRadius: 24, padding: 18, flexDirection: 'row', gap: 14 }, iconCircle: { width: 58, height: 58, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' }, headerCopy: { flex: 1 }, subject: { color: '#DBEAFE', fontSize: 12, fontWeight: '700' }, title: { color: '#FFF', fontSize: 23, fontWeight: '900', marginTop: 4 }, summary: { color: '#EFF6FF', fontSize: 12, lineHeight: 18, marginTop: 6 }, progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }, counter: { color: '#475569', fontWeight: '700', fontSize: 12 }, percent: { color: '#2563EB', fontWeight: '800', fontSize: 12 }, track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 7, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 4 }, lessonCard: { backgroundColor: '#FFF', borderRadius: 22, padding: 20, marginTop: 16, borderWidth: 1, borderColor: '#E2E8F0', minHeight: 210 }, stepIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }, stepTitle: { fontSize: 21, fontWeight: '900', color: '#0F172A', marginTop: 18 }, stepText: { color: '#475569', fontSize: 15, lineHeight: 23, marginTop: 8 }, primary: { height: 54, borderRadius: 17, backgroundColor: '#0F172A', marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }, primaryText: { color: '#FFF', fontWeight: '900', fontSize: 15 } });
