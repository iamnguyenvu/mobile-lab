import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "../api";
import { s } from "./styles";

export const NoteItem = ({ 
  item: i, editId, editTitle, setEditTitle, 
  setEditId, updateNote, deleteNote 
}: {
  item: Note;
  editId: string | null;
  editTitle: string;
  setEditTitle: (text: string) => void;
  setEditId: (id: string | null) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}) => 
  editId === i.id ? (
    <View style={s.card}>
      <TextInput value={editTitle} onChangeText={setEditTitle} style={s.edit} autoFocus />
      <TouchableOpacity onPress={() => updateNote(i.id, { title: editTitle })}>
        <Text style={s.link}>Save</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={s.card}>
      <TouchableOpacity onPress={() => updateNote(i.id, { status: !i.status })}>
        <Text style={s.check}>{i.status ? "✅" : "❌"}</Text>
      </TouchableOpacity>
      <Text style={[s.title, i.status && s.done]}>{i.title}</Text>
      <TouchableOpacity onPress={() => { setEditId(i.id); setEditTitle(i.title); }}>
        <Text style={s.link}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteNote(i.id)}>
        <Text style={s.link}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

export const NoteList = ({
  notes, refreshing, onRefresh, editId, editTitle,
  setEditTitle, setEditId, updateNote, deleteNote, loading
}: {
  notes: Note[];
  refreshing: boolean;
  onRefresh: () => void;
  editId: string | null;
  editTitle: string;
  setEditTitle: (text: string) => void;
  setEditId: (id: string | null) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  loading?: boolean;
}) => {
  if (loading) return <View style={s.center}><ActivityIndicator size="large" /></View>;
  return (
    <FlatList
      data={notes}
      keyExtractor={i => i.id}
      renderItem={({ item: i }) => (
        <NoteItem
          item={i} editId={editId} editTitle={editTitle}
          setEditTitle={setEditTitle} setEditId={setEditId}
          updateNote={updateNote} deleteNote={deleteNote}
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={s.list}
    />
  );
};
