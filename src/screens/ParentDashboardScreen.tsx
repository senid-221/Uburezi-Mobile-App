import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const items = [
  { icon: 'book-outline' as const, title: 'Imyigire', text: 'Reba amasomo n’aho umwana ageze.' },
  { icon: 'time-outline' as const, title: 'Igihe', text: 'Genzura igihe porogaramu ikoreshwa.' },
  { icon: 'shield-checkmark-outline' as const, title: 'Umutekano', text: 'Genzura ibyo umwana yemerewe kubona.' },
];

export default function ParentDashboardScreen({ onBack }: { onBack: () => void }) {
  return (
    <View>
      <TouchableOpacity onPress={onBack} style={styles.back}><Ionicons name="arrow-back" size={20} color="#2563EB" /><Text style={styles.backText}>Subira</Text></TouchableOpacity>
      <Text style={styles.title}>Dashboard y’umubyeyi</Text>
      <Text style={styles.subtitle}>Cunga imyigire n’umutekano w’umwana ahantu hamwe.</Text>
      <View style={styles.notice}><Ionicons name="information-circle-outline" size={23} color="#2563EB" /><Text style={styles.noticeText}>Konti y’umwana ikorwa kandi igacungwa n’umubyeyi.</Text></View>
      {items.map((item) => (
        <TouchableOpacity key={item.title} style={styles.card} activeOpacity={0.85}>
          <View style={styles.icon}><Ionicons name={item.icon} size={23} color="#2563EB" /></View>
          <View style={styles.copy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardText}>{item.text}</Text></View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 },
  backText: { color: '#2563EB', fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '800', color: '#0F172A' },
  subtitle: { color: '#64748B', fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 18 },
  notice: { flexDirection: 'row', gap: 10, backgroundColor: '#EFF6FF', borderRadius: 16, padding: 14, marginBottom: 16 },
  noticeText: { flex: 1, color: '#1E40AF', lineHeight: 20, fontSize: 13 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 18, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  icon: { width: 45, height: 45, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, marginLeft: 12 },
  cardTitle: { fontWeight: '800', fontSize: 15, color: '#0F172A' },
  cardText: { color: '#64748B', fontSize: 12, lineHeight: 18, marginTop: 3 },
});
