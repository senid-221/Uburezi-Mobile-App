import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInParent, signUpParent } from '../services/auth';
import type { ParentAccount } from '../types/models';

export default function ParentAuthScreen({ onBack, onAuthenticated }: { onBack: () => void; onAuthenticated: (parent: ParentAccount) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = async () => {
    if (!email.includes('@')) return Alert.alert('Reba email', 'Andika email ikwiye.');
    if (mode === 'signup' && !name.trim()) return Alert.alert('Izina rirakenewe', 'Andika izina ry’umubyeyi.');
    const parent = mode === 'signup' ? await signUpParent(name, email) : await signInParent(email);
    if (!parent) return Alert.alert('Konti ntibonetse', 'Nta parent account ibonetse kuri iyi email.');
    onAuthenticated(parent);
  };

  return <View style={styles.wrap}>
    <TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={22} color="#0F172A" /><Text>Subira</Text></TouchableOpacity>
    <View style={styles.icon}><Ionicons name="shield-checkmark" size={34} color="#2563EB" /></View>
    <Text style={styles.title}>{mode === 'signup' ? 'Kora Parent Account' : 'Injira nka Parent'}</Text>
    <Text style={styles.subtitle}>Konti y’umubyeyi ni yo icunga imyigire y’abana.</Text>
    {mode === 'signup' && <TextInput value={name} onChangeText={setName} placeholder="Izina ry’umubyeyi" style={styles.input} />}
    <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
    <TouchableOpacity style={styles.button} onPress={submit}><Text style={styles.buttonText}>{mode === 'signup' ? 'Kora konti' : 'Injira'}</Text></TouchableOpacity>
    <TouchableOpacity onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')}><Text style={styles.switch}>{mode === 'signup' ? 'Mfite konti — Injira' : 'Nta konti mfite — Iyandikishe'}</Text></TouchableOpacity>
    <Text style={styles.note}>Demo mode: password authentication izongerwamo iyo Supabase backend imaze gushyirwaho. Ntukoreshe iyi demo auth mu production.</Text>
  </View>;
}

const styles = StyleSheet.create({ wrap: { paddingTop: 12 }, back: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 30 }, icon: { width: 70, height: 70, borderRadius: 22, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginTop: 18 }, subtitle: { color: '#64748B', lineHeight: 21, marginTop: 8, marginBottom: 22 }, input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 15, paddingHorizontal: 16, height: 54, marginBottom: 12, fontSize: 15 }, button: { height: 54, borderRadius: 16, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginTop: 6 }, buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800' }, switch: { textAlign: 'center', color: '#2563EB', fontWeight: '700', marginTop: 18 }, note: { color: '#94A3B8', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 28 }
});
