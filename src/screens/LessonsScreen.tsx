import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import SuperIcon from '../components/SuperIcon';
import AnimatedPressable from '../components/AnimatedPressable';
import StateView from '../components/StateView';
import { lessons } from '../data/lessons';
import { getProgress } from '../services/progress';
import { colors, radius, shadow, spacing } from '../theme';

type Props = { onBack: () => void; onQuiz?: () => void; onOpenLesson?: (lessonId: string) => void };
const filters=['Byose','Imibare','Siyansi','Ikoranabuhanga','Indimi'] as const;

export default function LessonsScreen({ onBack, onQuiz, onOpenLesson }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [activeFilter,setActiveFilter]=useState<(typeof filters)[number]>('Byose');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(() => { let mounted = true; setLoading(true); getProgress().then((items) => { if (mounted) { setProgressMap(Object.fromEntries(items.map((item) => [item.lessonId, item.progress]))); setError(false); } }).catch(()=>{if(mounted)setError(true)}).finally(()=>{if(mounted)setLoading(false)}); return () => { mounted = false; }; }, []);
  const visible=useMemo(()=>activeFilter==='Byose'?lessons:lessons.filter(l=>l.subject===activeFilter),[activeFilter]);
  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><SuperIcon name="arrow-back" size={19} color={colors.primary} /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
    <View style={styles.heading}><View style={{flex:1}}><Text style={styles.kicker}>UBUREZI • AMASOMO</Text><Text style={styles.title}>Amasomo</Text><Text style={styles.subtitle}>Hitamo isomo, wige intambwe ku yindi.</Text></View><View style={styles.headingIcon}><SuperIcon name="book-outline" size={25} color={colors.primary} /></View></View>
    <View style={styles.filters}>{filters.map(filter=><TouchableOpacity key={filter} onPress={()=>setActiveFilter(filter)} style={[styles.filter,activeFilter===filter&&styles.filterActive]} activeOpacity={0.82}><Text style={[styles.filterText,activeFilter===filter&&styles.filterTextActive]}>{filter}</Text></TouchableOpacity>)}</View>
    {loading?<View style={styles.loading}><ActivityIndicator color={colors.primary}/><Text style={styles.loadingText}>Turimo gutegura amasomo...</Text></View>:error?<StateView mode="error" title="Amasomo ntiyabonetse" message="Hari ikibazo cyo kubona progress. Ushobora kongera kugerageza." onRetry={()=>{setError(false);setLoading(true);getProgress().then(items=>setProgressMap(Object.fromEntries(items.map(item=>[item.lessonId,item.progress])))).catch(()=>setError(true)).finally(()=>setLoading(false))}}/>:visible.length===0?<StateView mode="empty" title="Nta somo riri hano" message="Hitamo indi category kugira ngo ubone amasomo."/>:visible.map((lesson) => { const progress = progressMap[lesson.id] ?? 0; return <AnimatedPressable key={lesson.id}><TouchableOpacity style={[styles.card,compact&&styles.cardCompact]} activeOpacity={0.86} onPress={() => onOpenLesson?.(lesson.id)}>
      <View style={styles.icon}><SuperIcon name={lesson.icon} size={24} color={colors.primary} /></View><View style={styles.copy}><View style={styles.row}><Text style={styles.cardTitle}>{lesson.subject}</Text><Text style={styles.percent}>{progress}%</Text></View><Text style={styles.lessonTitle}>{lesson.title}</Text><Text style={styles.cardText}>{lesson.duration} · {lesson.summary}</Text><View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View></View><SuperIcon name="chevron-forward" size={19} color={colors.muted} />
    </TouchableOpacity></AnimatedPressable>; })}
    <AnimatedPressable><TouchableOpacity style={styles.quiz} onPress={onQuiz} activeOpacity={0.86}><View style={styles.quizIcon}><SuperIcon name="help-circle" size={24} color="#FFF" /></View><View style={styles.quizCopy}><Text style={styles.quizTitle}>Kora Quiz</Text><Text style={styles.quizText}>Gerageza ubumenyi bwawe kandi ubone amanota.</Text></View><SuperIcon name="arrow-forward" size={20} color="#FFF" /></TouchableOpacity></AnimatedPressable>
  </View>;
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 }, backText: { color: colors.primary, fontWeight: '800' },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }, kicker: { color: colors.primary, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, title: { fontSize: 29, fontWeight: '900', color: colors.ink, marginTop: 3 }, subtitle: { color: colors.muted, fontSize: 12.5, marginTop: 4 }, headingIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  filters:{flexDirection:'row',gap:7,marginBottom:14,flexWrap:'wrap'},filter:{paddingHorizontal:11,paddingVertical:7,borderRadius:99,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border},filterActive:{backgroundColor:colors.primary,borderColor:colors.primary},filterText:{fontSize:9.5,fontWeight:'800',color:colors.text},filterTextActive:{color:'#FFF'},
  loading:{padding:30,alignItems:'center'},loadingText:{fontSize:11,color:colors.muted,marginTop:8},card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: 14, marginBottom: 11, borderWidth: 1, borderColor: colors.border, ...shadow.card }, cardCompact:{paddingHorizontal:11}, icon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1, marginHorizontal: 12 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, cardTitle: { fontWeight: '900', color: colors.ink, fontSize: 14 }, lessonTitle: { fontWeight: '700', color: colors.text, fontSize: 12.5, marginTop: 2 }, percent: { fontWeight: '900', color: colors.primary, fontSize: 10.5 }, cardText: { color: colors.muted, fontSize: 10.5, marginTop: 4, lineHeight: 15 }, track: { height: 6, backgroundColor: '#E8EFF7', borderRadius: 3, marginTop: 8, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: colors.success, borderRadius: 3 }, quiz: { backgroundColor: colors.purple, borderRadius: radius.xl, padding: 15, marginTop: 2, flexDirection: 'row', alignItems: 'center', gap: 12 }, quizIcon: { width: 45, height: 45, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.17)', alignItems: 'center', justifyContent: 'center' }, quizCopy: { flex: 1 }, quizTitle: { fontWeight: '900', fontSize: 16, color: '#FFF' }, quizText: { fontSize: 10.5, color: '#EDE9FE', lineHeight: 16, marginTop: 3 },
});
