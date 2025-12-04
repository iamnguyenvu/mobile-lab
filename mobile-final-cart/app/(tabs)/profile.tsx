import { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { s, C } from '../../styles/common';

export default function Profile() {
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [saved, setSaved] = useState<{ name: string; mssv: string } | null>(null);
  const nameRef = useRef<TextInput>(null), mssvRef = useRef<TextInput>(null);

  const isValid = useMemo(() => name.trim().length > 0 && mssv.trim().length > 0, [name, mssv]);

  const handleSave = useCallback(() => {
    if (!isValid) { alert('Vui lòng nhập đầy đủ'); return; }
    setSaved({ name: name.trim(), mssv: mssv.trim() }); alert('Đã lưu!');
  }, [name, mssv, isValid]);

  const handleClear = useCallback(() => { setName(''); setMssv(''); setSaved(null); nameRef.current?.focus(); }, []);
  const handleEdit = useCallback(() => { if (saved) { setName(saved.name); setMssv(saved.mssv); nameRef.current?.focus(); } }, [saved]);

  return (
    <View style={s.f1p}>
      <Text style={s.h1}>Thông tin Sinh viên</Text>
      <Text style={s.lb}>Họ và tên</Text>
      <TextInput ref={nameRef} style={s.inp} value={name} onChangeText={setName} placeholder="Nhập họ tên" returnKeyType="next" onSubmitEditing={() => mssvRef.current?.focus()} />
      <Text style={s.lb}>MSSV</Text>
      <TextInput ref={mssvRef} style={s.inp} value={mssv} onChangeText={setMssv} placeholder="Nhập MSSV" returnKeyType="done" onSubmitEditing={handleSave} />
      <View style={s.btnR}>
        <Pressable style={[s.btnF, !isValid && s.btnOff]} onPress={handleSave}><Text style={s.btnT}>💾 Lưu</Text></Pressable>
        <Pressable style={[s.btnF, { backgroundColor: C.p }]} onPress={handleEdit}><Text style={s.btnT}>✏️ Sửa</Text></Pressable>
        <Pressable style={[s.btnF, s.btnNo]} onPress={handleClear}><Text style={s.btnT}>🗑 Xóa</Text></Pressable>
      </View>
      {saved && <View style={s.card}><Text style={s.cardT}>Thông tin đã lưu:</Text><Text>Họ tên: {saved.name}</Text><Text>MSSV: {saved.mssv}</Text></View>}
    </View>
  );
}
