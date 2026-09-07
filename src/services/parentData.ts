import { getChildren, saveChildren } from './storage';
import { isSupabaseConfigured, supabase } from './supabase';
import type { ChildProfile } from '../types/models';

export async function getParentChildren(parentId: string): Promise<ChildProfile[]> {
  const local = (await getChildren()).filter(child => child.parentId === parentId);
  if (!isSupabaseConfigured || !supabase || parentId.startsWith('parent_')) return local;
  const { data, error } = await supabase.from('children').select('id,parent_id,display_name,birth_year,learning_level,avatar,created_at').eq('parent_id', parentId).order('created_at', { ascending: true });
  if (error || !data) return local;
  const remote = data.map(child => ({ id: child.id, parentId: child.parent_id, name: child.display_name, birthYear: child.birth_year, level: child.learning_level as ChildProfile['level'], avatar: child.avatar ?? 'user', createdAt: child.created_at }));
  const otherLocal = (await getChildren()).filter(child => child.parentId !== parentId);
  await saveChildren([...otherLocal, ...remote]);
  return remote;
}

export async function createParentChild(child: ChildProfile): Promise<ChildProfile> {
  if (!isSupabaseConfigured || !supabase || child.parentId.startsWith('parent_')) return child;
  const { data, error } = await supabase.from('children').insert({ parent_id: child.parentId, display_name: child.name, birth_year: child.birthYear, learning_level: child.level, avatar: child.avatar }).select('id,parent_id,display_name,birth_year,learning_level,avatar,created_at').single();
  if (error || !data) throw error ?? new Error('Umwana ntiyashoboye kubikwa kuri Supabase.');
  return { id: data.id, parentId: data.parent_id, name: data.display_name, birthYear: data.birth_year, level: data.learning_level as ChildProfile['level'], avatar: data.avatar ?? 'user', createdAt: data.created_at };
}
