import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { Note } from '../types';

type Props = {
  note: Note;
  onUpdate: (id: string, data: Partial<Note>) => void;
  onDelete: (id: string) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
};

export default function NoteItem({ note, onUpdate, onDelete, editingId, setEditingId }: Props) {
  const [title, setTitle] = useState(note.title);
  const isEditing = editingId === note.id;

  return (
    <View style={s.row}>
      <TouchableOpacity onPress={() => onUpdate(note.id, { status: !note.status })}>
        <Text style={s.icon}>{note.status ? '✅' : '❌'}</Text>
      </TouchableOpacity>
      {isEditing ? (
        <TextInput style={s.input} value={title} onChangeText={setTitle} autoFocus />
      ) : (
        <TouchableOpacity onPress={() => setEditingId(note.id)} style={s.flex}>
          <Text style={[s.text, note.status && s.done]}>{note.title}</Text>
        </TouchableOpacity>
      )}
      {isEditing ? (
        <TouchableOpacity onPress={() => { onUpdate(note.id, { title }); setEditingId(null); }} style={s.btn}>
          <Text style={s.btxt}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Text style={s.icon}>🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, margin: 8, borderRadius: 4 },
  icon: { fontSize: 20, marginHorizontal: 8 },
  flex: { flex: 1 },
  text: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#999' },
  input: { flex: 1, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#000' },
  btn: { backgroundColor: '#000', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, marginLeft: 8 },
  btxt: { color: '#fff' },
});

