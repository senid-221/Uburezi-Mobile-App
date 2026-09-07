import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { completeLesson, saveQuizAttempt } from '../services/progress';
import { getLesson } from '../data/lessons';
import type { ChildProfile } from '../types/models';

const questions = [
  { q: 'Ni iki 2 + 3 bingana?', answers: ['4', '5', '6'], correct: 1 },
  { q: 'Igikoresho gikoreshwa mu kwandika kuri mudasobwa ni iki?', answers: ['Keyboard', 'Speaker', 'Monitor'], correct: 0 },
  { q: 'Amazi ashobora guhinduka umwuka iyo ashyushye. Ibi byitwa iki?', answers: ['Gukonja', 'Guhumeka', 'Guhinduka umwuka'], correct: 2 },
];

type Props = {
  onBack: () => void;
  lessonId?: string;
  child?: ChildProfile | null;
  onComplete?: (score: number) => void;
};

export default function QuizScreen({ onBack, lessonId = 'math-counting-1', child, onComplete }: Props) {
  const lesson = getLesson(lessonId);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const finished = index >= questions.length;
  const question = questions[index];
  const percent = useMemo(() => Math.round((index / questions.length) * 100), [index]);

  const finish = async (finalScore: number) => {
    if (child) {
      await completeLesson(child.id, lesson.id);
      await saveQuizAttempt({
        id: `${Date.now()}-${lesson.id}`,
        childId: child.id,
        lessonId: lesson.id,
        score: finalScore,
        total: questions.length,
        completedAt: new Date().toISOString(),
      });
    }
    onComplete?.(finalScore);
  };

  if (finished) {
    return (
      <View>
        <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text>
        </TouchableOpacity>
        <View style={styles.result}>
          <Ionicons name="trophy" size={52} color="#F59E0B" />
          <Text style={styles.resultTitle}>Warakoze!</Text>
          <Text style={styles.lessonName}>{lesson.title}</Text>
          <Text style={styles.resultScore}>{score}/{questions.length}</Text>
          <Text style={styles.resultText}>Warangije quiz kandi amanota yawe yabitswe ku iterambere ryawe.</Text>
          <TouchableOpacity style={styles.primary} onPress={onBack} activeOpacity={0.85}><Text style={styles.primaryText}>Komeza kwiga</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  const choose = (answer: number) => {
    if (picked !== null) return;
    const nextScore = answer === question.correct ? score + 1 : score;
    setPicked(answer);
    if (answer === question.correct) setScore(nextScore);
    setTimeout(() => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setPicked(null);
      if (nextIndex >= questions.length) void finish(nextScore);
    }, 500);
  };

  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.subtitle}>{lesson.title}</Text>
      <View style={styles.track}><View style={[styles.fill, { width: `${Math.max(percent, 8)}%` }]} /></View>
      <Text style={styles.counter}>Ikibazo {index + 1} / {questions.length}</Text>
      <View style={styles.question}>
        <Text style={styles.q}>{question.q}</Text>
        {question.answers.map((answer, i) => {
          const selectedCorrect = picked === i && i === question.correct;
          const selectedWrong = picked === i && i !== question.correct;
          return (
            <TouchableOpacity key={answer} disabled={picked !== null} onPress={() => choose(i)} style={[styles.answer, selectedCorrect && styles.correct, selectedWrong && styles.wrong]} activeOpacity={0.85}>
              <Text style={[styles.answerText, (selectedCorrect || selectedWrong) && styles.answerTextSelected]}>{answer}</Text>
              <Ionicons name={picked === i ? (i === question.correct ? 'checkmark-circle' : 'close-circle') : 'ellipse-outline'} size={22} color={(selectedCorrect || selectedWrong) ? '#FFF' : '#94A3B8'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 },
  backText: { color: '#2563EB', fontWeight: '700' },
  title: { fontSize: 27, fontWeight: '800', color: '#0F172A' },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 6 },
  track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 18, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#22C55E' },
  counter: { fontSize: 12, fontWeight: '700', color: '#64748B', marginTop: 9 },
  question: { backgroundColor: '#FFF', borderRadius: 22, padding: 18, marginTop: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  q: { fontSize: 20, fontWeight: '800', color: '#0F172A', lineHeight: 28, marginBottom: 16 },
  answer: { minHeight: 52, borderRadius: 15, borderWidth: 1, borderColor: '#CBD5E1', paddingHorizontal: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  answerText: { fontWeight: '700', color: '#334155' },
  answerTextSelected: { color: '#FFF' },
  correct: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  wrong: { backgroundColor: '#DC2626', borderColor: '#DC2626' },
  result: { backgroundColor: '#FFF', borderRadius: 24, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  resultTitle: { fontSize: 25, fontWeight: '800', color: '#0F172A', marginTop: 12 },
  lessonName: { color: '#64748B', marginTop: 4 },
  resultScore: { fontSize: 44, fontWeight: '900', color: '#2563EB', marginTop: 8 },
  resultText: { color: '#64748B', textAlign: 'center', marginTop: 5, lineHeight: 19 },
  primary: { height: 52, borderRadius: 16, backgroundColor: '#0F172A', paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  primaryText: { color: '#FFF', fontWeight: '800' },
});
