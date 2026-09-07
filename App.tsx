import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import LessonsScreen from './src/screens/LessonsScreen';
import LessonDetailScreen from './src/screens/LessonDetailScreen';
import ParentDashboardScreen from './src/screens/ParentDashboardScreen';
import AgeSelectionScreen, { LearningLevel } from './src/screens/AgeSelectionScreen';
import ParentAuthScreen from './src/screens/ParentAuthScreen';
import ChildProfileScreen from './src/screens/ChildProfileScreen';
import QuizScreen from './src/screens/QuizScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ScreenTimeScreen from './src/screens/ScreenTimeScreen';
import ContentSafetyScreen from './src/screens/ContentSafetyScreen';
import AdultEducationScreen from './src/screens/AdultEducationScreen';
import type { ChildProfile, ParentAccount } from './src/types/models';

const levels = [
  { id: 'early' as const, title: 'Imyaka 1–3', subtitle: 'Kwiga binyuze mu mukino', icon: 'happy-outline' as const },
  { id: 'young' as const, title: 'Imyaka 4–6', subtitle: 'Ibanze n’ubumenyi', icon: 'school-outline' as const },
  { id: 'kids' as const, title: 'Imyaka 7–10', subtitle: 'Amasomo n’imyitozo', icon: 'book-outline' as const },
  { id: 'teens' as const, title: 'Imyaka 11–15', subtitle: 'Ubumenyi bwimbitse', icon: 'bulb-outline' as const },
];

type Screen = 'home' | 'lessons' | 'detail' | 'quiz' | 'progress' | 'parent' | 'age' | 'auth' | 'children' | 'time' | 'safety' | 'adult';

export default function App() {
  const [selected, setSelected] = useState<LearningLevel>('kids');
  const [screen, setScreen] = useState<Screen>('home');
  const [parent, setParent] = useState<ParentAccount | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [lessonId, setLessonId] = useState('math-counting-1');
  const current = useMemo(() => levels.find((level) => level.id === selected) ?? levels[2], [selected]);
  const goHome = () => setScreen('home');
  const openParent = () => setScreen(parent ? 'parent' : 'auth');

  if (screen === 'lessons') return <Shell><LessonsScreen onBack={goHome} onQuiz={() => { setLessonId('math-counting-1'); setScreen('quiz'); }} onOpenLesson={(id) => { setLessonId(id); setScreen('detail'); }} /></Shell>;
  if (screen === 'detail') return <Shell><LessonDetailScreen lessonId={lessonId} child={selectedChild} onBack={() => setScreen('lessons')} onStartQuiz={() => setScreen('quiz')} /></Shell>;
  if (screen === 'quiz') return <Shell><QuizScreen lessonId={lessonId} child={selectedChild} onBack={() => setScreen('lessons')} /></Shell>;
  if (screen === 'progress') return <Shell><ProgressScreen onBack={goHome} /></Shell>;
  if (screen === 'age') return <Shell><AgeSelectionScreen selected={selected} onSelect={setSelected} onContinue={goHome} /></Shell>;
  if (screen === 'auth') return <Shell><ParentAuthScreen onBack={goHome} onAuthenticated={(account) => { setParent(account); setScreen('parent'); }} /></Shell>;
  if (screen === 'children') return <Shell><ChildProfileScreen parentId={parent?.id ?? ''} onBack={() => setScreen('parent')} onSelect={(child) => { setSelectedChild(child); setScreen('parent'); }} /></Shell>;
  if (screen === 'time') return <Shell><ScreenTimeScreen onBack={() => setScreen('parent')} /></Shell>;
  if (screen === 'safety') return <Shell><ContentSafetyScreen onBack={() => setScreen('parent')} /></Shell>;
  if (screen === 'adult') return <Shell><AdultEducationScreen onBack={goHome} /></Shell>;
  if (screen === 'parent') return <Shell><ParentDashboardScreen onBack={goHome} parent={parent} onLogin={() => setScreen('auth')} onChildren={() => setScreen('children')} onTime={() => setScreen('time')} onSafety={() => setScreen('safety')} onProgress={() => setScreen('progress')} /></Shell>;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><View><Text style={styles.eyebrow}>UBUREZI</Text><Text style={styles.title}>Murakaza neza!</Text><Text style={styles.subtitle}>Kwiga, gukina no gutera imbere.</Text></View><TouchableOpacity onPress={openParent} style={styles.avatar} activeOpacity={0.8}><Ionicons name="person" size={24} color="#2563EB" /></TouchableOpacity></View>
        <View style={styles.hero}><View style={styles.heroIcon}><Ionicons name="school" size={30} color="#FFF" /></View><Text style={styles.heroTitle}>Kwiga neza, buri munsi</Text><Text style={styles.heroText}>Hitamo urwego rw’imyaka kugira ngo ubone amasomo akubereye.</Text></View>
        <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Urwego rw’imyaka</Text><TouchableOpacity onPress={() => setScreen('age')} activeOpacity={0.8}><Text style={styles.link}>Hindura</Text></TouchableOpacity></View>
        <View style={styles.grid}>{levels.map((level) => { const active = selected === level.id; return <TouchableOpacity key={level.id} onPress={() => setSelected(level.id)} style={[styles.card, active && styles.cardActive]} activeOpacity={0.85}><View style={[styles.cardIcon, active && styles.cardIconActive]}><Ionicons name={level.icon} size={25} color={active ? '#FFF' : '#2563EB'} /></View><Text style={[styles.cardTitle, active && styles.cardTitleActive]}>{level.title}</Text><Text style={styles.cardText}>{level.subtitle}</Text></TouchableOpacity>; })}</View>
        <View style={styles.progressCard}><View style={styles.progressHeader}><View><Text style={styles.smallLabel}>URWEGO RWAWE</Text><Text style={styles.progressTitle}>{current.title}</Text></View><Ionicons name="trending-up" size={26} color="#16A34A" /></View><Text style={styles.progressText}>Tangira amasomo ajyanye n’uru rwego.</Text><View style={styles.progressTrack}><View style={styles.progressFill} /></View></View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('lessons')} activeOpacity={0.85}><Text style={styles.primaryText}>Tangira Kwiga</Text><Ionicons name="arrow-forward" size={21} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen('progress')} activeOpacity={0.85}><Ionicons name="stats-chart-outline" size={19} color="#2563EB" /><Text style={styles.secondaryText}>Reba Iterambere</Text></TouchableOpacity>
        <TouchableOpacity style={styles.parentButton} onPress={openParent} activeOpacity={0.85}><Ionicons name="shield-checkmark-outline" size={19} color="#2563EB" /><Text style={styles.parentText}>Ahagana ku babyeyi</Text></TouchableOpacity>
        <TouchableOpacity style={styles.adultButton} onPress={() => setScreen('adult')} activeOpacity={0.85}><Ionicons name="lock-closed-outline" size={18} color="#7C3AED" /><Text style={styles.adultText}>Amasomo y’abakuru 18+</Text></TouchableOpacity>
        <Text style={styles.footer}>Ababyeyi bashobora gucunga imyigire, igihe n’umutekano w’ibirimo.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Shell({ children }: { children: React.ReactNode }) { return <SafeAreaView style={styles.safe}><StatusBar style="dark" /><ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>{children}</ScrollView></SafeAreaView>; }

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#F7FAFC' }, container: { padding: 20, paddingBottom: 36 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }, eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 2, color: '#2563EB' }, title: { fontSize: 27, fontWeight: '800', color: '#0F172A', marginTop: 5 }, subtitle: { color: '#64748B', fontSize: 14, marginTop: 5 }, avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }, hero: { backgroundColor: '#2563EB', borderRadius: 24, padding: 20, marginBottom: 25 }, heroIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }, heroTitle: { color: '#FFF', fontSize: 21, fontWeight: '800' }, heroText: { color: '#DBEAFE', lineHeight: 21, marginTop: 7, fontSize: 14 }, sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, sectionTitle: { fontSize: 19, fontWeight: '800', color: '#0F172A' }, link: { color: '#2563EB', fontWeight: '700' }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, card: { width: '48%', minHeight: 142, backgroundColor: '#FFF', borderRadius: 19, padding: 15, borderWidth: 1, borderColor: '#E2E8F0' }, cardActive: { backgroundColor: '#EFF6FF', borderColor: '#60A5FA' }, cardIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }, cardIconActive: { backgroundColor: '#2563EB' }, cardTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' }, cardTitleActive: { color: '#1D4ED8' }, cardText: { color: '#64748B', fontSize: 12, lineHeight: 17, marginTop: 4 }, progressCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginTop: 22, borderWidth: 1, borderColor: '#E2E8F0' }, progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, smallLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, color: '#94A3B8' }, progressTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginTop: 3 }, progressText: { color: '#64748B', marginTop: 9 }, progressTrack: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 14, overflow: 'hidden' }, progressFill: { width: '35%', height: '100%', backgroundColor: '#22C55E', borderRadius: 4 }, primaryButton: { height: 56, borderRadius: 18, backgroundColor: '#0F172A', marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }, primaryText: { color: '#FFF', fontSize: 16, fontWeight: '800' }, secondaryButton: { height: 50, borderRadius: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#BFDBFE', marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, secondaryText: { color: '#2563EB', fontWeight: '800' }, parentButton: { height: 50, borderRadius: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#BFDBFE', marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, parentText: { color: '#2563EB', fontWeight: '700' }, adultButton: { height: 50, borderRadius: 16, backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, adultText: { color: '#6D28D9', fontWeight: '800' }, footer: { textAlign: 'center', color: '#94A3B8', fontSize: 12, lineHeight: 18, marginTop: 18, paddingHorizontal: 10 } });
