import { useCallback, useState } from "react";
import { api, Note } from "./api";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotes = useCallback(async () => {
    try { setNotes(await api.get()); }
    catch {} finally { setLoading(false); setRefreshing(false); }
  }, []);

  const addNote = useCallback(async (title: string) => {
    try { const d=await api.post(title); setNotes(p=>[...p,d]); return true; }
    catch { return false; }
  }, []);

  const updateNote = useCallback(async (id: string, updates: Partial<Note>) => {
    try { const d=await api.put(id,updates); setNotes(p=>p.map(n=>n.id===id?d:n)); return true; }
    catch { return false; }
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    try { await api.del(id); setNotes(p => p.filter(n => n.id !== id)); return true; }
    catch { return false; }
  }, []);

  const refresh = useCallback(() => { setRefreshing(true); fetchNotes(); }, [fetchNotes]);

  return { notes, loading, refreshing, fetchNotes, addNote, updateNote, deleteNote, refresh };
};
