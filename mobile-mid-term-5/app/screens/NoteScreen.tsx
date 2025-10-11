import { Link } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNote, deleteNote, getNotes, updateNote } from '../api';
import NoteItem from '../components/NoteItem';
import type { Note } from '../types';

export default function NoteScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const fetchNotes = useCallback(async () => { try { setNotes(await getNotes()); } 
  finally { setLoading(false); setRefreshing(false); } }, []);
  
  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleAdd = useCallback(async () => {
    if (!input.trim()) return;
    try { const newNote = await createNote(input, ''); setNotes(p => [newNote, ...p]); 
        setInput(''); inputRef.current?.clear(); } catch (e) { console.error(e); }
  }, [input]);

  const handleUpdate = useCallback(async (id: string, data: Partial<Note>) => {
    try { await updateNote(id, data); setNotes(p => p.map(n => n.id === id ? { ...n, ...data } : n)); } 
    catch (e) { console.error(e); }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try { await deleteNote(id); setNotes(p => p.filter(n => n.id !== id)); } 
    catch (e) { console.error(e); }
  }, []);

  const filtered = useMemo(() => search.trim() ? notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase())) : notes, [notes, search]);

  const stats = useMemo(() => { const done = notes.filter(n => n.status).length; 
    return { total: notes.length, done, pending: notes.length - done }; }, [notes]);

  if (loading) return <SafeAreaView style={s.c}><ActivityIndicator size="large" style={s.load} /></SafeAreaView>;

  return (
    <SafeAreaView style={s.c}>
      <View style={s.h}><Text style={s.t}>Note Taking App</Text><Link href="/screens/ProfileScreen" asChild>
      <TouchableOpacity><Text style={s.prof}>👤</Text></TouchableOpacity></Link></View>
      <View style={s.st}>
        <View style={s.si}><Text style={s.sn}>{stats.total}</Text><Text style={s.sl}>Tổng</Text></View>
        <View style={s.si}><Text style={s.sn}>{stats.done}</Text><Text style={s.sl}>Hoàn thành</Text></View>
        <View style={s.si}><Text style={s.sn}>{stats.pending}</Text><Text style={s.sl}>Chưa xong</Text></View>
      </View>
      <TextInput style={s.in} placeholder="Tìm kiếm..." value={search} onChangeText={setSearch} />
      <View style={s.ar}>
        <TextInput ref={inputRef} style={s.in} placeholder="Nhập công việc mới..." value={input} 
        onChangeText={setInput} onSubmitEditing={handleAdd} />
        <TouchableOpacity style={s.ab} onPress={handleAdd}><Text style={s.bt}>Add</Text></TouchableOpacity>
      </View>
      <FlatList data={filtered} keyExtractor={i => i.id} 
      renderItem={({ item }) => <NoteItem note={item} onUpdate={handleUpdate} onDelete={handleDelete} editingId={editingId} 
      setEditingId={setEditingId} />} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchNotes(); }} />} 
    />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#f5f5f5' },
  h: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  t: { fontSize: 18, fontWeight: 'bold' },
  st: { flexDirection: 'row', backgroundColor: '#fff', margin: 16, borderRadius: 4, padding: 12 },
  si: { flex: 1, alignItems: 'center' },
  sn: { fontSize: 20, fontWeight: 'bold' },
  sl: { fontSize: 12, color: '#666' },
  in: { backgroundColor: '#fff', borderRadius: 4, padding: 12, marginHorizontal: 16, marginBottom: 8, 
    borderWidth: 1, borderColor: '#ddd' },
  ar: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8, gap: 8 },
  ab: { backgroundColor: '#000', borderRadius: 4, paddingHorizontal: 16, justifyContent: 'center' },
  bt: { color: '#fff' },
  prof: { fontSize: 24 },
  load: { flex: 1 },
});

