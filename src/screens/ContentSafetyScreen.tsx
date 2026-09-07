import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSafety, saveSafety, type SafetySettings } from '../services/storage';

const controls = [
  ['shield-checkmark-outline', 'Akayunguruzo k’ibirimo', 'Genzura ibirimo bitajyanye n’imyaka.'],
  ['chatbubble-ellipses-outline', 'Ubutumwa hagati y’abana', 'Ubutumwa rusange hagati y’abana burahagaritswe.'],
  ['notifications-outline', 'Notifications', 'Gabanya notifications kugira ngo kwiga bidahungabana.'],
] as const;

export default function ContentSafetyScreen({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState<SafetySettings>({ contentFilter: true, childMessaging: false, notifications: true });

  useEffect(() => { getSafety().then(setSettings); }, []);

  const toggle = async (key: keyof SafetySettings) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    await saveSafety(next);
  };

  const values: boolean[] = [settings.contentFilter, settings.childMessaging, settings.notifications];
  const keys: (keyof SafetySettings)[] = ['contentFilter', 'childMessaging', 'notifications'];

  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <Text style={styles.title}>Umutekano w’ibirimo</Text>
      <Text style={styles.subtitle}>Igenamiterere rifasha ababyeyi kurinda abana mu myigire.</Text>
      <View style={styles.notice}><Ionicons name="shield-checkmark" size={25} color="#2563EB" /><Text style={styles.noticeText}>UBUREZI itandukanya ibirimo by’abana n’iby’abantu bakuru kandi ntishyiraho public messaging hagati y’abana.</Text></View>
      {controls.map((control, index) => <View key={control[1]} style={styles.card}><View style={styles.icon}><Ionicons name={control[0]} size={22} color="#2563EB" /></View><View style={{ flex: 1 }}><Text style={styles.cardTitle}>{control[1]}</Text><Text style={styles.cardText}>{control[2]}</Text></View><Switch value={values[index]} onValueChange={() => void toggle(keys[index])} /></View>)}
      <View style={styles.footer}><Ionicons name="lock-closed-outline" size={18} color="#64748B" /><Text style={styles.footerText}>Konti z’abana zicungwa n’umubyeyi kandi amakuru akusanywa agomba kuba make.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({ back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 }, backText: { color: '#2563EB', fontWeight: '700' }, title: { fontSize: 27, fontWeight: '800', color: '#0F172A' }, subtitle: { color: '#64748B', marginTop: 6, lineHeight: 20 }, notice: { backgroundColor: '#EFF6FF', borderRadius: 18, padding: 15, marginTop: 17, flexDirection: 'row', gap: 10 }, noticeText: { flex: 1, color: '#1E40AF', fontSize: 12, lineHeight: 18 }, card: { backgroundColor: '#FFF', borderRadius: 18, padding: 15, marginTop: 11, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', alignItems: 'center', gap: 11 }, icon: { width: 44, height: 44, borderRadius: 13, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }, cardTitle: { fontWeight: '800', color: '#0F172A' }, cardText: { fontSize: 11, color: '#64748B', lineHeight: 17, marginTop: 3 }, footer: { marginTop: 16, flexDirection: 'row', gap: 8, alignItems: 'center' }, footerText: { flex: 1, fontSize: 11, color: '#64748B', lineHeight: 17 } });
