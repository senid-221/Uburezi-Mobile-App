import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  { q: 'Ni iki 2 + 3 bingana?', answers: ['4', '5', '6'], correct: 1 },
  { q: 'Igikoresho gikoreshwa mu kwandika kuri mudasobwa ni iki?', answers: ['Keyboard', 'Speaker', 'Monitor'], correct: 0 },
  { q: 'Amazi ashobora guhinduka umwuka iyo ashyushye. Ibi byitwa iki?', answers: ['Gukonja', 'Guhumeka', 'Guhinduka umwuka'], correct: 2 },
];

export default function QuizScreen({ onBack, onComplete }: { onBack: () => void; onComplete?: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const finished = index >= questions.length;
  const question = questions[index];
  const percent = useMemo(() => Math.round((index / questions.length) * 100), [index]);

  if (finished) return <View><TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity><View style={styles.result}><Ionicons name="trophy" size={52} color="#F59E0B" /><Text style={styles.resultTitle}>Warakoze! 🎉</Text><Text style={styles.resultScore}>{score}/{questions.length}</Text><Text style={styles.resultText}>Warangije ikizamini cy’uyu munsi.</Text><TouchableOpacity style={styles.primary} onPress={onBack}><Text style={styles.primaryText}>Komeza kwiga</Text></TouchableOpacity></View></View>;

  const choose = (answer: number) => {
    if (picked !== null) return;
    setPicked(answer);
    if (answer === question.correct) setScore((s) => s + 1);
    setTimeout(() => { setIndex((i) => i + 1); setPicked(null); }, 650);
  };

  return <View><TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity><Text style={styles.title}>Quiz y’imyitozo</Text><Text style={styles.subtitle}>Subiza ikibazo maze ukomeze ku gikurikira.</Text><View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View><Text style={styles.counter}>Ikibazo {index + 1} / {questions.length}</Text><View style={styles.question}><Text style={styles.q}>{question.q}</Text>{question.answers.map((answer, i) => <TouchableOpacity key={answer} disabled={picked !== null} onPress={() => choose(i)} style={[styles.answer, picked === i && (i === question.correct ? styles.correct : styles.wrong)]}><Text style={styles.answerText}>{answer}</Text><Ionicons name={picked === i ? (i === question.correct ? 'checkmark-circle' : 'close-circle') : 'ellipse-outline'} size={22} color={picked === i ? '#FFF' : '#94A3B8'} /></TouchableOpacity>)}</View></View>;
}

const styles = StyleSheet.create({ back:{flexDirection:'row',alignItems:'center',gap:6,marginBottom:18},backText:{color:'#2563EB',fontWeight:'700'},title:{fontSize:27,fontWeight:'800',color:'#0F172A'},subtitle:{color:'#64748B',fontSize:14,marginTop:6},track:{height:8,backgroundColor:'#E2E8F0',borderRadius:4,marginTop:18,overflow:'hidden'},fill:{height:'100%',backgroundColor:'#22C55E'},counter:{fontSize:12,fontWeight:'700',color:'#64748B',marginTop:9},question:{backgroundColor:'#FFF',borderRadius:22,padding:18,marginTop:16,borderWidth:1,borderColor:'#E2E8F0'},q:{fontSize:20,fontWeight:'800',color:'#0F172A',lineHeight:28,marginBottom:16},answer:{minHeight:52,borderRadius:15,borderWidth:1,borderColor:'#CBD5E1',paddingHorizontal:15,marginBottom:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},answerText:{fontWeight:'700',color:'#334155'},correct:{backgroundColor:'#16A34A',borderColor:'#16A34A'},wrong:{backgroundColor:'#DC2626',borderColor:'#DC2626'},result:{backgroundColor:'#FFF',borderRadius:24,padding:28,alignItems:'center',borderWidth:1,borderColor:'#E2E8F0'},resultTitle:{fontSize:25,fontWeight:'800',color:'#0F172A',marginTop:12},resultScore:{fontSize:44,fontWeight:'900',color:'#2563EB',marginTop:8},resultText:{color:'#64748B',textAlign:'center',marginTop:5},primary:{height:52,borderRadius:16,backgroundColor:'#0F172A',paddingHorizontal:28,alignItems:'center',justifyContent:'center',marginTop:20},primaryText:{color:'#FFF',fontWeight:'800'}});