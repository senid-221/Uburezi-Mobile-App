import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInParent, signUpParent } from '../services/auth';
import { isSupabaseConfigured } from '../services/supabase';
import type { ParentAccount } from '../types/models';

export default function ParentAuthScreen({ onBack, onAuthenticated }: { onBack: () => void; onAuthenticated: (parent: ParentAccount) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const parent = mode === 'signup'
        ? await signUpParent(name, email, password)
        : await signInParent(email, password);
      if (!parent) {
        Alert.alert('Konti ntibonetse', 'Nta parent account ibonetse kuri iyi email.');
        return;
      }
      onAuthenticated(parent);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Habaye ikibazo. Ongera ugerageze.';
      Alert.alert('Ntibyashobotse', message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={22} color="#0F172A" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <View style={styles.icon}><Ionicons name="shield-checkmark" size={34} color="#2563EB" /></View>
      <Text style={styles.title}>{mode === 'signup' ? 'Kora konti y’umubyeyi' : 'Injira nka parent'}</Text>
      <Text style={styles.subtitle}>Konti y’umubyeyi ni yo icunga imyigire, igihe n’umutekano w’abana.</Text>
      {mode === 'signup' && <TextInput value={name} onChangeText={setName} placeholder="Izina ry’umubyeyi" autoCapitalize="words" style={styles.input} />}
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={styles.input} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Ijambo ry’ibanga (nibura 8)" secureTextEntry style={styles.input} />
      <TouchableOpacity style={[styles.button, busy && styles.buttonDisabled]} onPress={() => void submit()} disabled={busy} activeOpacity={0.85}><Text style={styles.buttonText}>{busy ? 'Tegereza...' : mode === 'signup' ? 'Kora konti' : 'Injira'}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')} disabled={busy} activeOpacity={0.8}><Text style={styles.switch}>{mode === 'signup' ? 'Mfite konti — Injira' : 'Nta konti mfite — Iyandikishe'}</Text></TouchableOpacity>
      <View style={styles.info}><Ionicons name={isSupabaseConfigured ? 'cloud-done-outline' : 'information-circle-outline'} size={18} color="#2563EB" /><Text style={styles.note}>{isSupabaseConfigured ? 'Supabase irakora. Password ntibikwa muri app.' : 'Supabase ntirashyirwaho. Iyi app iri muri demo mode kandi ntibika password.'}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({ wrap: { paddingTop: 12 }, back: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 30 }, backText: { color: '#334155', fontWeight: '700' }, icon: { width: 70, height: 70, borderRadius: 22, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginTop: 18 }, subtitle: { color: '#64748B', lineHeight: 21, marginTop: 8, marginBottom: 22 }, input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 15, paddingHorizontal: 16, height: 54, marginBottom: 12, fontSize: 15 }, button: { height: 54, borderRadius: 16, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginTop: 6 }, buttonDisabled: { opacity: 0.6 }, buttonText: { color: '#FFF', fontSize: 16, fontWeight: '800' }, switch: { textAlign: 'center', color: '#2563EB', fontWeight: '700', marginTop: 18 }, info: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 28, backgroundColor: '#EFF6FF', borderRadius: 14, padding: 12 }, note: { flex: 1, color: '#475569', fontSize: 11, lineHeight: 17 } });
