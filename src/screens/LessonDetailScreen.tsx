import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SuperIcon from '../components/SuperIcon';
import { getLesson } from '../data/lessons';
import { saveProgress } from '../services/progress';
import type { ChildProfile } from '../types/models';
import { colors, radius, shadow } from '../theme';

type Props = { lessonId: string; child?: ChildProfile | null; onBack: () => void; onStartQuiz: () => void };

export default function LessonDetailScreen({ lessonId, child, onBack, onStartQuiz }: Props) {
  const lesson = getLesson(lessonId);
  const [step, setStep] = useState(0);
  const current = lesson.steps[step];
  const progressChildId = child?.id ?? 'local-child';
  const percent = Math.round(((step + 1) / lesson.steps.length) * 100);
  const next = async () => { await saveProgress({ childId: progressChildId, lessonId: lesson.id, progress: Math.max(10, Math.round(((step + 1) / lesson.steps.length) * 70)), completed: false, updatedAt: new Date().toISOString() }); if (step < lesson.steps.length - 1) setStep((value) => value + 1); else onStartQuiz(); };
  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><SuperIcon name="arrow-back" size={19} color={colors.primary} /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
    <View style={styles.headerCard}><View style={styles.iconCircle}><SuperIcon name={lesson.icon} size={28} color="#FFF" /></View><View style={styles.headerCopy}><Text style={styles.subject}>{lesson.subject} · {lesson.duration}</Text><Text style={styles.title}>{lesson.title}</Text><Text style={styles.summary}>{lesson.summary}</Text></View></View>
    <View style={styles.progressRow}><Text style={styles.counter}>Igice {step + 1} / {lesson.steps.length}</Text><Text style={styles.percent}>{percent}%</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View>
    <View style={styles.lessonCard}><View style={styles.stepIcon}><SuperIcon name={current.icon} size={25} color={colors.primary} /></View><Text style={styles.stepTitle}>{current.title}</Text><Text style={styles.stepText}>{current.text}</Text><View style={styles.tip}><SuperIcon name="bulb-outline" size={17} color="#9A6700" /><Text style={styles.tipText}>Soma neza, hanyuma gerageza kubivuga mu magambo yawe.</Text></View></View>
    <TouchableOpacity style={styles.primary} onPress={() => void next()} activeOpacity={0.86}><Text style={styles.primaryText}>{step < lesson.steps.length - 1 ? 'Komeza' : 'Kora Quiz'}</Text><SuperIcon name="arrow-forward" size={19} color="#FFF" /></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({ back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 }, backText: { color: colors.primary, fontWeight: '800' }, headerCard: { backgroundColor: colors.primary, borderRadius: radius.xl, padding: 19, flexDirection: 'row', gap: 13, ...shadow.card }, iconCircle: { width: 58, height: 58, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' }, headerCopy: { flex: 1 }, subject: { color: '#DCEBFF', fontSize: 10.5, fontWeight: '800' }, title: { color: '#FFF', fontSize: 22, fontWeight: '900', marginTop: 4 }, summary: { color: '#EAF3FF', fontSize: 11.5, lineHeight: 18, marginTop: 5 }, progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }, counter: { color: colors.text, fontWeight: '800', fontSize: 11 }, percent: { color: colors.primary, fontWeight: '900', fontSize: 11 }, track: { height: 7, backgroundColor: '#E6EEF7', borderRadius: 4, marginTop: 7, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: colors.success, borderRadius: 4 }, lessonCard: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: 20, marginTop: 16, borderWidth: 1, borderColor: colors.border, minHeight: 275, ...shadow.card }, stepIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, stepTitle: { fontSize: 21, fontWeight: '900', color: colors.ink, marginTop: 17 }, stepText: { color: '#52657F', fontSize: 14, lineHeight: 22, marginTop: 8 }, tip: { marginTop: 20, padding: 12, borderRadius: 14, backgroundColor: '#FFF7DF', flexDirection: 'row', gap: 8, alignItems: 'center' }, tipText: { flex: 1, color: '#8B6500', fontSize: 10.5, lineHeight: 16, fontWeight: '700' }, primary: { height: 55, borderRadius: 17, backgroundColor: colors.ink, marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }, primaryText: { color: '#FFF', fontWeight: '900', fontSize: 15 }, });
