import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSafetySettings, saveSafetySettings, type SafetySettings } from '../services/storage';

const controls = [
  ['safe-outline', 'Filter y’ibirimo', 'Genzura ibirimo bitajyanye n’imyaka.', 'contentFilter'],
  ['chatbubble-ellipses-outline', 'Kuganira n’abandi', 'Public chat hagati y’abana irafunze.', 'publicChat'],
  ['notifications-outline', 'Notifications', 'Gabanya notifications kugira ngo kwiga bidahungabana.', 'notifications'],
] as const;

export default function ContentSafetyScreen({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState<SafetySettings>({ contentFilter: true, publicChat: false, notifications: true });

  useEffect(() => { void getSafetySettings().then(setSettings); }, []);

  const toggle = async (key: keyof SafetySettings, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    await saveSafetySettings(next);
  };

  return <View>
    <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
    <Text style={styles.title}>Umutekano w’ibirimo</Text>
    <Text style={styles.subtitle}>Igenamiterere rifasha ababyeyi kurinda abana mu myigire.</Text>
    <View style={styles.notice}><Ionicons name="shield-checkmark" size={25} color="#2563EB" /><Text style={styles.noticeText}>UBUREZI itandukanya ibirimo by’abana n’iby’abantu bakuru, kandi nta public messaging hagati y’abana.</Text></View>
    {controls.map(([icon, title, text, key]) => <View key={key} style={styles.card}><View style={styles.icon}><Ionicons name={icon} size={22} color="#2563EB" /></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardText}>{text}</Text></View><Switch value={settings[key]} onValueChange={(value) => void toggle(key, value)} /></View>)}
    <View style={styles.footer}><Ionicons name="lock-closed-outline" size={18} color="#64748B" /><Text style={styles.footerText}>Igenamiterere ribikwa kuri telefoni. Ababyeyi ni bo bagenzura umutekano w’umwana.</Text></View>
  </View>;
}

const styles = StyleSheet.create({ back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 }, backText: { color: '#2563EB', fontWeight: '700' }, title: { fontSize: 27, fontWeight: '800', color: '#0F172A' }, subtitle: { color: '#64748B', marginTop: 6, lineHeight: 20 }, notice: { backgroundColor: '#EFF6FF', borderRadius: 18, padding: 15, marginTop: 17, flexDirection: 'row', gap: 10 }, noticeText: { flex: 1, color: '#1E40AF', fontSize: 12, lineHeight: 18 }, card: { backgroundColor: '#FFF', borderRadius: 18, padding: 15, marginTop: 11, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', alignItems: 'center', gap: 11 }, icon: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }, cardTitle: { fontWeight: '800', color: '#0F172A' }, cardText: { fontSize: 11, color: '#64748B', lineHeight: 17, marginTop: 3 }, footer: { marginTop: 16, flexDirection: 'row', gap: 8, alignItems: 'center' }, footerText: { flex: 1, fontSize: 11, color: '#64748B', lineHeight: 17 } });
