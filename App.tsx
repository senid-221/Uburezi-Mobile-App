import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
import OnboardingScreen from './src/screens/OnboardingScreen';
import BottomNav from './src/components/BottomNav';
import AppIcon from './src/components/AppIcon';
import { colors, radius, shadow, spacing } from './src/theme';
import { getParent, hasSession } from './src/services/storage';
import type { ChildProfile, ParentAccount } from './src/types/models';

const ONBOARDING_KEY = '@uburezi/onboarding-complete';

const levels = [
  { id: 'early' as const, title: 'Imyaka 1–3', subtitle: 'Kwiga binyuze mu mukino', icon: 'sparkles' as const, tint: '#FFF0EC', accent: '#F97360' },
  { id: 'young' as const, title: 'Imyaka 4–6', subtitle: 'Ibanze n’ubumenyi', icon: 'graduation' as const, tint: '#FFF7DF', accent: '#F59E0B' },
  { id: 'kids' as const, title: 'Imyaka 7–10', subtitle: 'Amasomo n’imyitozo', icon: 'book' as const, tint: '#EAF3FF', accent: '#1677F2' },
  { id: 'teens' as const, title: 'Imyaka 11–15', subtitle: 'Ubumenyi bwimbitse', icon: 'brain' as const, tint: '#F3EEFF', accent: '#7C3AED' },
];

type Screen = 'home' | 'lessons' | 'detail' | 'quiz' | 'progress' | 'parent' | 'age' | 'auth' | 'children' | 'time' | 'safety' | 'adult';
type AuthDestination = 'parent' | 'adult';

export default function App() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [selected, setSelected] = useState<LearningLevel>('kids');
  const [screen, setScreen] = useState<Screen>('home');
  const [parent, setParent] = useState<ParentAccount | null>(null);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [lessonId, setLessonId] = useState('math-counting-1');
  const [authDestination, setAuthDestination] = useState<AuthDestination>('parent');

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(ONBOARDING_KEY), hasSession(), getParent()]).then(([seen, session, storedParent]) => {
      setOnboarded(seen === 'true');
      if (session && storedParent) setParent(storedParent);
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  const current = useMemo(() => levels.find((level) => level.id === selected) ?? levels[2], [selected]);
  const finishOnboarding = async () => { await AsyncStorage.setItem(ONBOARDING_KEY, 'true'); setOnboarded(true); };
  const goHome = () => setScreen('home');
  const openParent = () => { setAuthDestination('parent'); setScreen(parent ? 'parent' : 'auth'); };
  const openAdult = () => { setAuthDestination('adult'); setScreen(parent ? 'adult' : 'auth'); };
  const goTab = (key: string) => {
    if (key === 'home') setScreen('home');
    else if (key === 'lessons') setScreen('lessons');
    else if (key === 'progress') setScreen('progress');
    else if (key === 'parent') openParent();
  };

  if (!ready) return <SafeAreaView style={styles.loading}><StatusBar style="dark" /><View style={styles.loadingMark}><AppIcon name="book" size={28} color={colors.surface} /></View><Text style={styles.loadingTitle}>UBUREZI</Text><Text style={styles.loadingText}>Tegereza gato...</Text></SafeAreaView>;
  if (!onboarded) return <SafeAreaView style={styles.full}><StatusBar style="dark" /><OnboardingScreen onDone={() => void finishOnboarding()} /></SafeAreaView>;

  if (screen === 'lessons') return <Shell active="lessons" onTab={goTab}><LessonsScreen onBack={goHome} onQuiz={() => { setLessonId('math-counting-1'); setScreen('quiz'); }} onOpenLesson={(id) => { setLessonId(id); setScreen('detail'); }} /></Shell>;
  if (screen === 'detail') return <Shell><LessonDetailScreen lessonId={lessonId} child={selectedChild} onBack={() => setScreen('lessons')} onStartQuiz={() => setScreen('quiz')} /></Shell>;
  if (screen === 'quiz') return <Shell><QuizScreen lessonId={lessonId} child={selectedChild} onBack={() => setScreen('lessons')} /></Shell>;
  if (screen === 'progress') return <Shell active="progress" onTab={goTab}><ProgressScreen onBack={goHome} /></Shell>;
  if (screen === 'age') return <Shell><AgeSelectionScreen selected={selected} onSelect={setSelected} onContinue={goHome} /></Shell>;
  if (screen === 'auth') return <Shell><ParentAuthScreen onBack={goHome} onAuthenticated={(account) => { setParent(account); setScreen(authDestination === 'adult' ? 'adult' : 'parent'); }} /></Shell>;
  if (screen === 'children') return <Shell><ChildProfileScreen parentId={parent?.id ?? ''} onBack={() => setScreen('parent')} onSelect={(child) => { setSelectedChild(child); setScreen('parent'); }} /></Shell>;
  if (screen === 'time') return <Shell><ScreenTimeScreen onBack={() => setScreen('parent')} /></Shell>;
  if (screen === 'safety') return <Shell><ContentSafetyScreen onBack={() => setScreen('parent')} /></Shell>;
  if (screen === 'adult') return parent ? <Shell><AdultEducationScreen onBack={goHome} /></Shell> : <Shell><ParentAuthScreen onBack={goHome} onAuthenticated={(account) => { setParent(account); setScreen('adult'); }} /></Shell>;
  if (screen === 'parent') return <Shell active="parent" onTab={goTab}><ParentDashboardScreen onBack={goHome} parent={parent} onLogin={openParent} onChildren={() => setScreen('children')} onTime={() => setScreen('time')} onSafety={() => setScreen('safety')} onProgress={() => setScreen('progress')} /></Shell>;

  return (
    <SafeAreaView style={styles.full}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.homeContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brandRow}><View style={styles.brandMark}><AppIcon name="book" size={22} color={colors.surface} /></View><View><Text style={styles.brand}>UBUREZI</Text><Text style={styles.brandSub}>Ubumenyi ni ejo hazaza</Text></View></View>
          <TouchableOpacity onPress={openParent} style={styles.profileButton} activeOpacity={0.82}><AppIcon name="user" size={21} color={colors.primary} /></TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <View style={styles.heroCopy}><View style={styles.hello}><Text style={styles.helloText}>Muraho! 👋</Text></View><Text style={styles.heroTitle}>Tegura ejo hawe</Text><Text style={styles.heroText}>Kwiga buri munsi, ukagenda utera imbere intambwe ku yindi.</Text><TouchableOpacity style={styles.heroButton} onPress={() => setScreen('lessons')} activeOpacity={0.86}><Text style={styles.heroButtonText}>Tangira kwiga</Text><AppIcon name="arrowRight" size={18} color={colors.primary} /></TouchableOpacity></View>
          <View style={styles.heroBadge}><AppIcon name="graduation" size={48} color={colors.surface} /></View>
        </View>

        <View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Urwego rw’imyaka</Text><Text style={styles.sectionSub}>Hitamo amasomo akubereye</Text></View><TouchableOpacity onPress={() => setScreen('age')}><Text style={styles.link}>Hindura</Text></TouchableOpacity></View>
        <View style={styles.levelGrid}>{levels.map((level) => { const active = selected === level.id; return <TouchableOpacity key={level.id} onPress={() => setSelected(level.id)} style={[styles.levelCard, active && { borderColor: level.accent, backgroundColor: level.tint }]} activeOpacity={0.84}><View style={[styles.levelIcon, { backgroundColor: active ? level.accent : level.tint }]}><AppIcon name={level.icon} size={22} color={active ? colors.surface : level.accent} /></View><Text style={styles.levelTitle}>{level.title}</Text><Text style={styles.levelSub}>{level.subtitle}</Text>{active && <View style={[styles.activeDot, { backgroundColor: level.accent }]} />}</TouchableOpacity>; })}</View>

        <View style={styles.progressCard}><View style={styles.progressTop}><View><Text style={styles.overline}>URWEGO RWAWE</Text><Text style={styles.progressTitle}>{current.title}</Text></View><View style={styles.streak}><AppIcon name="sparkles" size={15} color={colors.warning} /><Text style={styles.streakText}>Kwiga buri munsi</Text></View></View><Text style={styles.progressText}>Komeza n’isomo ryawe rikurikira kugira ngo wiyongere ubumenyi.</Text><View style={styles.progressTrack}><View style={styles.progressFill} /></View><View style={styles.progressBottom}><Text style={styles.progressPercent}>35%</Text><Text style={styles.progressHint}>Intambwe y’ubu</Text></View></View>

        <TouchableOpacity style={styles.quickCard} onPress={() => setScreen('lessons')} activeOpacity={0.84}><View style={styles.quickIcon}><AppIcon name="book" size={22} color={colors.primary} /></View><View style={styles.quickCopy}><Text style={styles.quickTitle}>Komeza isomo</Text><Text style={styles.quickText}>Kwitoza kubara · 15 min</Text></View><View style={styles.play}><AppIcon name="play" size={18} color={colors.surface} /></View></TouchableOpacity>
        <TouchableOpacity style={styles.secondary} onPress={() => setScreen('progress')} activeOpacity={0.84}><AppIcon name="chart" size={19} color={colors.primary} /><Text style={styles.secondaryText}>Reba iterambere ryawe</Text><AppIcon name="chevron" size={18} color={colors.muted} /></TouchableOpacity>
        <TouchableOpacity style={styles.parentCard} onPress={openParent} activeOpacity={0.84}><View style={styles.parentIcon}><AppIcon name="shield" size={19} color={colors.primary} /></View><View style={styles.quickCopy}><Text style={styles.quickTitle}>Agace k’ababyeyi</Text><Text style={styles.quickText}>Profile · Screen-time · Umutekano</Text></View><AppIcon name="chevron" size={18} color={colors.muted} /></TouchableOpacity>
        <TouchableOpacity style={styles.adultCard} onPress={openAdult} activeOpacity={0.84}><View style={styles.adultIcon}><AppIcon name="lock" size={18} color={colors.purple} /></View><View style={styles.quickCopy}><Text style={styles.quickTitle}>Uburezi ku bantu bakuru 18+</Text><Text style={styles.quickText}>Ubuzima n’imibanire mu buryo bw’uburezi</Text></View><AppIcon name="chevron" size={18} color={colors.muted} /></TouchableOpacity>
        <View style={styles.trust}><AppIcon name="shield" size={15} color={colors.success} /><Text style={styles.trustText}>Umutekano w’abana n’ibanga byabo ni ingenzi kuri UBUREZI.</Text></View>
      </ScrollView>
      <BottomNav active="home" onChange={goTab} />
    </SafeAreaView>
  );
}

function Shell({ children, active, onTab }: { children: React.ReactNode; active?: string; onTab?: (key: string) => void }) {
  const withNav = Boolean(active && onTab);
  return <SafeAreaView style={styles.full}><StatusBar style="dark" /><ScrollView contentContainerStyle={styles.shellContainer} showsVerticalScrollIndicator={false}>{children}</ScrollView>{withNav && <BottomNav active={active!} onChange={onTab!} />}</SafeAreaView>;
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: colors.canvas }, loading: { flex: 1, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center' }, loadingMark: { width: 64, height: 64, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, loadingTitle: { marginTop: 14, color: colors.ink, fontSize: 22, fontWeight: '900', letterSpacing: 1.5 }, loadingText: { marginTop: 5, color: colors.muted, fontSize: 12 },
  homeContainer: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 24 }, shellContainer: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, brandMark: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, brand: { color: colors.ink, fontSize: 16, fontWeight: '900', letterSpacing: 1.1 }, brandSub: { color: colors.muted, fontSize: 10, marginTop: 2 }, profileButton: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', ...shadow.card },
  hero: { minHeight: 214, borderRadius: radius.xl, backgroundColor: colors.primary, padding: 20, overflow: 'hidden', flexDirection: 'row', marginBottom: 28 }, heroGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.09)', right: -55, top: -70 }, heroCopy: { flex: 1, zIndex: 2 }, hello: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6 }, helloText: { color: colors.surface, fontSize: 11, fontWeight: '800' }, heroTitle: { color: colors.surface, fontSize: 26, lineHeight: 31, fontWeight: '900', marginTop: 13, maxWidth: 210 }, heroText: { color: '#DCEBFF', fontSize: 12.5, lineHeight: 19, marginTop: 7, maxWidth: 220 }, heroButton: { alignSelf: 'flex-start', marginTop: 17, height: 42, paddingHorizontal: 15, borderRadius: 13, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: 8 }, heroButtonText: { color: colors.primary, fontWeight: '900', fontSize: 12 }, heroBadge: { width: 82, height: 82, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 8 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' }, sectionSub: { color: colors.muted, fontSize: 11, marginTop: 3 }, link: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  levelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, levelCard: { width: '48.4%', minHeight: 132, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 14, ...shadow.card }, levelIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }, levelTitle: { color: colors.ink, fontSize: 14, fontWeight: '900' }, levelSub: { color: colors.muted, fontSize: 10.5, lineHeight: 15, marginTop: 4, paddingRight: 5 }, activeDot: { position: 'absolute', width: 6, height: 6, borderRadius: 3, right: 13, top: 14 },
  progressCard: { marginTop: 20, backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: 17, ...shadow.card }, progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, overline: { color: '#9AAAC0', fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, progressTitle: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 3 }, streak: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.warningSoft, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 6 }, streakText: { color: '#9A6700', fontSize: 9, fontWeight: '800' }, progressText: { color: colors.muted, fontSize: 11.5, lineHeight: 17, marginTop: 9 }, progressTrack: { height: 8, backgroundColor: '#E7EEF7', borderRadius: 4, marginTop: 13, overflow: 'hidden' }, progressFill: { width: '35%', height: '100%', backgroundColor: colors.success, borderRadius: 4 }, progressBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }, progressPercent: { color: colors.success, fontSize: 11, fontWeight: '900' }, progressHint: { color: '#9AAAC0', fontSize: 10 },
  quickCard: { marginTop: 12, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 13, flexDirection: 'row', alignItems: 'center', ...shadow.card }, quickIcon: { width: 45, height: 45, borderRadius: 14, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, quickCopy: { flex: 1, marginLeft: 12 }, quickTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' }, quickText: { color: colors.muted, fontSize: 10.5, marginTop: 3 }, play: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, secondary: { minHeight: 51, marginTop: 10, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 9 }, secondaryText: { flex: 1, color: colors.text, fontSize: 12, fontWeight: '800' }, parentCard: { minHeight: 66, marginTop: 10, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 11, flexDirection: 'row', alignItems: 'center' }, parentIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, adultCard: { minHeight: 66, marginTop: 10, backgroundColor: colors.purpleSoft, borderRadius: radius.lg, borderWidth: 1, borderColor: '#DED4FF', padding: 11, flexDirection: 'row', alignItems: 'center' }, adultIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, trust: { marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 10 }, trustText: { color: colors.muted, fontSize: 9.5, lineHeight: 14, textAlign: 'center' },
});
