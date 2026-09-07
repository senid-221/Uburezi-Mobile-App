import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getChildren, saveChildren } from '../services/storage';
import type { ChildProfile, LearningLevel } from '../types/models';

const levels: { id: LearningLevel; label: string }[] = [
  { id: 'early', label: '1–3' }, { id: 'young', label: '4–6' }, { id: 'kids', label: '7–10' }, { id: 'teens', label: '11–15' },
];

export default function ChildProfileScreen({ parentId, onBack, onSelect }: { parentId: string; onBack: () => void; onSelect?: (child: ChildProfile) => void }) {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [level, setLevel] = useState<LearningLevel>('kids');

  useEffect(() => { void getChildren().then((all) => setChildren(all.filter((child) => child.parentId === parentId))); }, [parentId]);

  const addChild = async () => {
    const year = Number(birthYear);
    const currentYear = new Date().getFullYear();
    if (!name.trim()) { Alert.alert('Izina rirakenewe', 'Andika izina rikoreshwa muri app.'); return; }
    if (!Number.isInteger(year) || year < currentYear - 16 || year > currentYear) { Alert.alert('Umwaka utari wo', `Shyiramo umwaka w’amavuko uri hagati ya ${currentYear - 16} na ${currentYear}.`); return; }
    const child: ChildProfile = { id: `child_${Date.now()}`, parentId, name: name.trim(), birthYear: year, level, avatar: 'person-circle-outline', createdAt: new Date().toISOString() };
    const all = await getChildren();
    await saveChildren([...all, child]);
    setChildren((current) => [...current, child]);
    setName(''); setBirthYear('');
    Alert.alert('Byakunze', `${child.name} yongewe muri konti y’umubyeyi.`);
  };

  return <View style={styles.wrap}>
    <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={22} color="#0F172A" /><Text>Subira</Text></TouchableOpacity>
    <Text style={styles.title}>Abana banjye</Text><Text style={styles.subtitle}>Kora profile y’umwana utabitse amakuru menshi adakenewe.</Text>
    {children.map((child) => <TouchableOpacity key={child.id} style={styles.child} onPress={() => onSelect?.(child)} activeOpacity={0.85}><View style={styles.avatar}><Ionicons name="person" size={23} color="#2563EB" /></View><View style={{ flex: 1 }}><Text style={styles.childName}>{child.name}</Text><Text style={styles.childMeta}>Urwego: {levels.find((item) => item.id === child.level)?.label} • {child.birthYear}</Text></View><Ionicons name="chevron-forward" size={20} color="#94A3B8" /></TouchableOpacity>)}
    <View style={styles.form}><Text style={styles.formTitle}>Ongeramo umwana</Text><TextInput value={name} onChangeText={setName} placeholder="Izina" autoCapitalize="words" style={styles.input} /><TextInput value={birthYear} onChangeText={setBirthYear} placeholder="Umwaka w’amavuko (urugero: 2015)" keyboardType="number-pad" style={styles.input} /><Text style={styles.label}>Urwego rw’imyaka</Text><View style={styles.levels}>{levels.map((item) => <TouchableOpacity key={item.id} onPress={() => setLevel(item.id)} style={[styles.level, level === item.id && styles.levelActive]} activeOpacity={0.85}><Text style={[styles.levelText, level === item.id && styles.levelTextActive]}>{item.label}</Text></TouchableOpacity>)}</View><TouchableOpacity style={styles.button} onPress={() => void addChild()} activeOpacity={0.85}><Ionicons name="add" size={21} color="#FFF" /><Text style={styles.buttonText}>Ongeramo profile</Text></TouchableOpacity></View>
  </View>;
}

const styles = StyleSheet.create({ wrap: { paddingTop: 12 }, back: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 }, title: { fontSize: 28, fontWeight: '800', color: '#0F172A' }, subtitle: { color: '#64748B', lineHeight: 20, marginTop: 7, marginBottom: 18 }, child: { backgroundColor: '#FFF', borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' }, avatar: { width: 46, height: 46, borderRadius: 15, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }, childName: { fontSize: 16, fontWeight: '800', color: '#0F172A' }, childMeta: { color: '#64748B', marginTop: 4, fontSize: 12 }, form: { backgroundColor: '#FFF', borderRadius: 20, padding: 17, marginTop: 12, borderWidth: 1, borderColor: '#E2E8F0' }, formTitle: { fontSize: 18, fontWeight: '800', marginBottom: 13, color: '#0F172A' }, input: { height: 52, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, paddingHorizontal: 14, marginBottom: 10 }, label: { color: '#475569', fontWeight: '700', marginTop: 2, marginBottom: 9 }, levels: { flexDirection: 'row', gap: 7, marginBottom: 15 }, level: { flex: 1, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' }, levelActive: { backgroundColor: '#2563EB' }, levelText: { fontWeight: '700', color: '#475569' }, levelTextActive: { color: '#FFF' }, button: { height: 52, borderRadius: 15, backgroundColor: '#0F172A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }, buttonText: { color: '#FFF', fontWeight: '800' }
});
