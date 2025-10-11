import { useEffect, useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddNote, Header, NoteList, SearchBar, Stats, s } from "./components";
import { useNotes } from "./useNotes";

export default function Index() {
  const { notes, loading, refreshing, fetchNotes, addNote, updateNote, deleteNote, refresh } = useNotes();
  const [newNote, setNewNote] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleAdd = async () => {
    if (!newNote.trim()) return;
    const success = await addNote(newNote);
    if (success) {
      setNewNote("");
      inputRef.current?.clear();
    }
  };

  const filteredNotes = useMemo(() => 
    notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase())),
    [notes, search]
  );

  const stats = useMemo(() => ({
    total: notes.length,
    completed: notes.filter(n => n.status).length
  }), [notes]);

  return (
    <SafeAreaView style={s.container}>
      <Header />
      <Stats total={stats.total} completed={stats.completed} />
      <SearchBar value={search} onChange={setSearch} />
      <AddNote inputRef={inputRef} value={newNote} onChange={setNewNote} onAdd={handleAdd} />
      <NoteList
        notes={filteredNotes}
        loading={loading}
        refreshing={refreshing}
        onRefresh={refresh}
        editId={editId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        setEditId={setEditId}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </SafeAreaView>
  );
}
