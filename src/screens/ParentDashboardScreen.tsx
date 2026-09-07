import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SuperIcon from '../components/SuperIcon';
import StateView from '../components/StateView';
import AnimatedPressable from '../components/AnimatedPressable';
import type { ParentAccount } from '../types/models';
import { signOutParent } from '../services/auth';
import { getParentOverview, type ChildLearningSummary } from '../services/parentOverview';
import { isSupabaseConfigured } from '../services/supabase';
import { colors, radius, shadow } from '../theme';

const items=[
  {icon:'people-outline',title:'Abana banjye',text:'Kora no gucunga child profiles.',action:'children'},
  {icon:'stats-chart-outline',title:'Imyigire',text:'Reba amasomo n’aho umwana ageze.',action:'progress'},
  {icon:'time-outline',title:'Igihe',text:'Genzura igihe porogaramu ikoreshwa.',action:'time'},
  {icon:'shield-checkmark-outline',title:'Umutekano',text:'Genzura ibyo umwana yemerewe kubona.',action:'safety'}
] as const;

type Props={onBack:()=>void;parent:ParentAccount|null;onLogin:()=>void;onChildren:()=>void;onTime:()=>void;onSafety:()=>void;onProgress:()=>void};

export default function ParentDashboardScreen({onBack,parent,onLogin,onChildren,onTime,onSafety,onProgress}:Props){
  const [summaries,setSummaries]=useState<ChildLearningSummary[]>([]);
  const [loading,setLoading]=useState(Boolean(parent));
  const [refreshing,setRefreshing]=useState(false);
  const [error,setError]=useState<string|null>(null);

  const load=useCallback(async(refresh=false)=>{
    if(!parent){setSummaries([]);setLoading(false);return;}
    if(refresh)setRefreshing(true);else setLoading(true);
    setError(null);
    try{setSummaries(await getParentOverview(parent.id));}
    catch{setError('Ntabwo dushoboye kubona amakuru y’imyigire ubu.');}
    finally{setLoading(false);setRefreshing(false);}
  },[parent]);

  useEffect(()=>{void load();},[load]);
  const logout=async()=>{await signOutParent();onBack()};
  const open=(a:string)=>a==='children'?onChildren:a==='time'?onTime:a==='safety'?onSafety:onProgress;
  const totalCompleted=summaries.reduce((sum,item)=>sum+item.completedLessons,0);
  const avg=summaries.length?Math.round(summaries.reduce((sum,item)=>sum+item.averageScore,0)/summaries.length):0;

  return <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>void load(true)} tintColor={colors.primary} />}>
    <TouchableOpacity onPress={onBack} style={styles.back} activeOpacity={0.8}><SuperIcon name="arrow-back" size={19} color={colors.primary}/><Text style={styles.backText}>Subira</Text></TouchableOpacity>
    <View style={styles.header}><View style={{flex:1}}><Text style={styles.kicker}>UBUREZI • PARENT</Text><Text style={styles.title}>Dashboard y’umubyeyi</Text><Text style={styles.subtitle}>Cunga imyigire n’umutekano ahantu hamwe.</Text></View><View style={styles.headerIcon}><SuperIcon name="shield-checkmark-outline" size={25} color={colors.primary}/></View></View>
    {!parent?<AnimatedPressable><TouchableOpacity style={styles.login} onPress={onLogin} activeOpacity={0.9}><SuperIcon name="log-in-outline" size={20} color="#FFF"/><Text style={styles.loginText}>Injira nka Parent</Text><SuperIcon name="arrow-forward" size={18} color="#FFF"/></TouchableOpacity></AnimatedPressable>:<>
      <View style={styles.account}><View style={styles.accountIcon}><SuperIcon name="person" size={21} color={colors.primary}/></View><View style={{flex:1}}><Text style={styles.accountName}>{parent.name}</Text><Text style={styles.accountEmail}>{parent.email}</Text></View><TouchableOpacity onPress={()=>void logout()}><Text style={styles.logout}>Sohoka</Text></TouchableOpacity></View>
      <View style={styles.sync}><View style={styles.syncIcon}>{loading?<ActivityIndicator size="small" color={colors.primary}/>:<SuperIcon name={isSupabaseConfigured?'checkmark-circle':'sparkles'} size={16} color={isSupabaseConfigured?colors.success:colors.primary}/>}</View><View style={{flex:1}}><Text style={styles.syncTitle}>{isSupabaseConfigured?'Supabase sync':'Demo mode'}</Text><Text style={styles.syncText}>{loading?'Birimo kuvugururwa...':`${summaries.length} ${summaries.length===1?'mwana':'bana'} kuri iyi konti`}</Text></View><TouchableOpacity onPress={()=>void load(true)}><SuperIcon name="refresh" size={18} color={colors.primary}/></TouchableOpacity></View>
      {!loading&&!error&&summaries.length>0&&<View style={styles.stats}><View style={styles.stat}><Text style={styles.statNumber}>{summaries.length}</Text><Text style={styles.statLabel}>Abana</Text></View><View style={styles.stat}><Text style={styles.statNumber}>{totalCompleted}</Text><Text style={styles.statLabel}>Amasomo yarangiye</Text></View><View style={styles.stat}><Text style={styles.statNumber}>{avg}%</Text><Text style={styles.statLabel}>Quiz average</Text></View></View>}
      {error?<View style={{marginTop:12}}><StateView mode="error" title="Hari ikibazo" message={error} onRetry={()=>void load(true)}/></View>:loading?<View style={styles.loading}><ActivityIndicator color={colors.primary}/><Text style={styles.loadingText}>Turimo gutegura dashboard...</Text></View>:summaries.length===0?<View style={{marginTop:12}}><StateView mode="empty" title="Nta mwana urongerwaho" message="Ongeraho child profile kugira ngo utangire gukurikirana imyigire."/></View>:<View style={styles.childList}><Text style={styles.childListTitle}>Abana n’imyigire yabo</Text>{summaries.map(({child,completedLessons,averageScore})=><View key={child.id} style={styles.childRow}><View style={styles.avatar}><SuperIcon name={child.avatar||'person'} size={21} color={colors.primary}/></View><View style={{flex:1}}><Text style={styles.childName}>{child.name}</Text><Text style={styles.childMeta}>{child.level} · {completedLessons} amasomo · Quiz {averageScore}%</Text><View style={styles.miniTrack}><View style={[styles.miniFill,{width:`${Math.min(100,averageScore)}%`}]} /></View></View></View>)}</View>}
    </>}
    <View style={styles.notice}><SuperIcon name="shield-checkmark-outline" size={21} color={colors.primary}/><Text style={styles.noticeText}>Konti y’umwana icungwa n’umubyeyi. Public chat y’abana ntabwo iboneka.</Text></View>
    {items.map(item=><AnimatedPressable key={item.title}><TouchableOpacity style={styles.card} activeOpacity={0.86} onPress={()=>open(item.action)}><View style={styles.icon}><SuperIcon name={item.icon} size={22} color={colors.primary}/></View><View style={styles.copy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardText}>{item.text}</Text></View><SuperIcon name="chevron-forward" size={19} color={colors.muted}/></TouchableOpacity></AnimatedPressable>)}
    <View style={styles.privacy}><SuperIcon name="lock-closed-outline" size={16} color={colors.success}/><Text style={styles.privacyText}>Data y’umwana igomba kuba nke kandi ikagengwa n’umubyeyi.</Text></View>
  </ScrollView>
}

const styles=StyleSheet.create({
back:{flexDirection:'row',alignItems:'center',gap:6,marginBottom:19},backText:{color:colors.primary,fontWeight:'800'},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},kicker:{fontSize:9,color:colors.primary,fontWeight:'900',letterSpacing:1.2},title:{fontSize:25,fontWeight:'900',color:colors.ink,marginTop:3},subtitle:{color:colors.muted,fontSize:11.5,lineHeight:18,marginTop:4,maxWidth:290},headerIcon:{width:52,height:52,borderRadius:17,backgroundColor:colors.primarySoft,alignItems:'center',justifyContent:'center'},login:{height:54,borderRadius:17,backgroundColor:colors.primary,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:9,marginTop:18},loginText:{color:'#FFF',fontWeight:'900',flex:1},account:{backgroundColor:colors.surface,borderRadius:18,padding:13,flexDirection:'row',alignItems:'center',gap:10,marginTop:18,borderWidth:1,borderColor:colors.border,...shadow.card},accountIcon:{width:45,height:45,borderRadius:14,backgroundColor:colors.primarySoft,alignItems:'center',justifyContent:'center'},accountName:{fontWeight:'900',color:colors.ink},accountEmail:{fontSize:10.5,color:colors.muted,marginTop:3},logout:{color:'#DC2626',fontWeight:'900',fontSize:11},sync:{marginTop:10,borderRadius:16,backgroundColor:colors.successSoft,padding:11,flexDirection:'row',alignItems:'center',gap:9},syncIcon:{width:35,height:35,borderRadius:12,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center'},syncTitle:{color:'#166534',fontSize:11,fontWeight:'900'},syncText:{color:'#267343',fontSize:10,marginTop:2},stats:{flexDirection:'row',gap:8,marginTop:10},stat:{flex:1,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,borderRadius:15,padding:11},statNumber:{fontSize:18,fontWeight:'900',color:colors.ink},statLabel:{fontSize:8.5,color:colors.muted,marginTop:3,lineHeight:12},loading:{padding:24,alignItems:'center'},loadingText:{marginTop:8,color:colors.muted,fontSize:11},childList:{marginTop:12,backgroundColor:colors.surface,borderRadius:18,padding:14,borderWidth:1,borderColor:colors.border,...shadow.card},childListTitle:{fontSize:13,fontWeight:'900',color:colors.ink,marginBottom:10},childRow:{flexDirection:'row',alignItems:'center',gap:10,paddingVertical:9,borderTopWidth:1,borderTopColor:'#EEF3F8'},avatar:{width:42,height:42,borderRadius:14,backgroundColor:colors.primarySoft,alignItems:'center',justifyContent:'center'},childName:{fontWeight:'900',fontSize:12.5,color:colors.ink},childMeta:{fontSize:9.5,color:colors.muted,marginTop:3},miniTrack:{height:5,backgroundColor:'#E8EFF7',borderRadius:3,overflow:'hidden',marginTop:6},miniFill:{height:'100%',backgroundColor:colors.success,borderRadius:3},notice:{flexDirection:'row',gap:9,backgroundColor:colors.primarySoft,borderRadius:16,padding:13,marginTop:13,marginBottom:15},noticeText:{flex:1,color:'#1E40AF',lineHeight:18,fontSize:11.5},card:{flexDirection:'row',alignItems:'center',backgroundColor:colors.surface,borderRadius:18,padding:14,marginBottom:10,borderWidth:1,borderColor:colors.border,...shadow.card},icon:{width:45,height:45,borderRadius:14,backgroundColor:colors.primarySoft,alignItems:'center',justifyContent:'center'},copy:{flex:1,marginLeft:11},cardTitle:{fontWeight:'900',fontSize:14,color:colors.ink},cardText:{color:colors.muted,fontSize:10.5,lineHeight:16,marginTop:3},privacy:{marginTop:5,backgroundColor:colors.successSoft,borderRadius:15,padding:11,flexDirection:'row',gap:7,alignItems:'center'},privacyText:{flex:1,color:'#267343',fontSize:9.5,lineHeight:14}
});
