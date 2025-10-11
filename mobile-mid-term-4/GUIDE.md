# Note Taking App - Hướng dẫn code nhanh trong 45 phút

## 📁 Cấu trúc siêu gọn (CHỈ 5 FILES!)

```
mobile-mid-term-4/
├── app/
│   ├── _layout.tsx      # 12 dòng - SafeAreaProvider
│   ├── index.tsx        # 60 dòng - Màn hình chính
│   └── profile.tsx      # 42 dòng - Thông tin SV
└── components/
    ├── index.ts         # 2 dòng - Export
    ├── UI.tsx           # 90 dòng - All UI components + styles
    └── NoteItem.tsx     # 40 dòng - Note item
```

**TỔNG: CHỈ 5 FILES, 246 DÒNG CODE!**

## 🚀 Kế hoạch 45 phút (ĐƠN GIẢN NHẤT)

### Bước 1: Copy UI.tsx (10 phút)
```typescript
// File components/UI.tsx chứa TẤT CẢ:
// - Styles (colors + StyleSheet)
// - Header component
// - Stats component  
// - SearchBar component
// - AddNote component
```
✅ Copy nguyên file → Done!

### Bước 2: Copy NoteItem.tsx (5 phút)
```typescript
// File components/NoteItem.tsx
// - Chỉ 1 component NoteItem
```
✅ Copy nguyên file → Done!

### Bước 3: Copy index.ts (1 phút)
```typescript
export { Header, Stats, SearchBar, AddNote, s as styles } from "./UI";
export { NoteItem } from "./NoteItem";
```
✅ Copy 2 dòng → Done!

### Bước 4: Viết index.tsx (20 phút)
```typescript
// Import (2 phút)
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Stats, SearchBar, AddNote, NoteItem, styles } from "../components";

// API + Type (1 phút)
const API = "YOUR_MOCKAPI_URL";
type Note = { id: string; title: string; content: string; status: boolean };

// States (2 phút)
const [notes, setNotes] = useState<Note[]>([]);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [newNote, setNewNote] = useState("");
const [search, setSearch] = useState("");
const [editId, setEditId] = useState<string | null>(null);
const [editTitle, setEditTitle] = useState("");
const inputRef = useRef<TextInput>(null);

// API Functions (10 phút)
const fetchNotes = useCallback(async () => {
  try { 
    const { data } = await axios.get<Note[]>(API);
    setNotes(data);
  } catch {} 
  finally { setLoading(false); setRefreshing(false); }
}, []);

const addNote = useCallback(async () => {
  if (!newNote.trim()) return;
  try {
    const { data } = await axios.post<Note>(API, { title: newNote, content: "", status: false });
    setNotes(prev => [...prev, data]);
    setNewNote("");
    inputRef.current?.clear();
  } catch {}
}, [newNote]);

const updateNote = useCallback(async (id: string, updates: Partial<Note>) => {
  try {
    const { data } = await axios.put<Note>(`${API}/${id}`, updates);
    setNotes(prev => prev.map(n => n.id === id ? data : n));
    setEditId(null);
  } catch {}
}, []);

const deleteNote = useCallback(async (id: string) => {
  try {
    await axios.delete(`${API}/${id}`);
    setNotes(prev => prev.filter(n => n.id !== id));
  } catch {}
}, []);

// Hooks (3 phút)
useEffect(() => { fetchNotes(); }, [fetchNotes]);
const onRefresh = useCallback(() => { setRefreshing(true); fetchNotes(); }, [fetchNotes]);
const filteredNotes = useMemo(() => 
  notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase())),
  [notes, search]
);
const stats = useMemo(() => ({
  total: notes.length,
  completed: notes.filter(n => n.status).length
}), [notes]);

// UI (2 phút)
if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

return (
  <SafeAreaView style={styles.container}>
    <Header />
    <Stats total={stats.total} completed={stats.completed} />
    <SearchBar value={search} onChange={setSearch} />
    <AddNote inputRef={inputRef} value={newNote} onChange={setNewNote} onAdd={addNote} />
    <FlatList
      data={filteredNotes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <NoteItem 
          item={item} editId={editId} editTitle={editTitle}
          setEditTitle={setEditTitle} setEditId={setEditId}
          updateNote={updateNote} deleteNote={deleteNote}
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.list}
    />
  </SafeAreaView>
);
```

### Bước 5: Copy profile.tsx (5 phút)
```typescript
// Copy file profile.tsx
// Sửa: Họ tên, MSSV, Lớp
```

### Bước 6: Test (4 phút)
```bash
npm start
```

## ✅ Checklist 10đ

### 1. Giao diện (1đ)
- [ ] SafeAreaProvider ✓ (_layout.tsx)
- [ ] SafeAreaView ✓ (index.tsx)
- [ ] Tiêu đề "Note Taking App" ✓

### 2. Hiển thị danh sách (2đ)
- [ ] FlatList ✓
- [ ] Hiển thị title ✓
- [ ] Status ✅/❌ ✓
- [ ] ActivityIndicator ✓

### 3. Thêm (1.5đ)
- [ ] TextInput ✓
- [ ] Nút Add ✓
- [ ] POST API ✓
- [ ] useRef clear ✓

### 4. Cập nhật (1.5đ)
- [ ] Edit mode ✓
- [ ] PUT API ✓

### 5. Xóa (1đ)
- [ ] Nút Delete ✓
- [ ] DELETE API ✓

### 6. Refresh (1đ)
- [ ] RefreshControl ✓
- [ ] GET API ✓

### 7. Hooks (1đ)
- [ ] useState ✓
- [ ] useEffect ✓
- [ ] useMemo ✓
- [ ] useCallback ✓
- [ ] useRef ✓

### 8. Tìm kiếm (1đ)
- [ ] SearchInput ✓
- [ ] useMemo filter ✓

## 💡 Lợi ích cấu trúc mới

### So sánh:

| Tiêu chí | Trước (10 files) | SAU (5 FILES) | Cải thiện |
|----------|------------------|---------------|-----------|
| Số files | 10 | **5** | ↓ 50% |
| Components | 7 files riêng | **2 files** | ↓ 71% |
| Dòng code | 246 | **246** | Giữ nguyên |
| Thời gian | ~35 phút | **~30 phút** | ↓ 14% |

### Ưu điểm:

✅ **Ít file hơn** → Ít phải tạo file, ít import  
✅ **Gộp UI components** → 1 file chứa tất cả UI + styles  
✅ **Dễ copy** → Copy 2 file components là xong  
✅ **Nhanh hơn** → Giảm 5 phút setup  

## 📝 Template nhanh khi thi

### 1. Tạo components/UI.tsx
```typescript
// Copy toàn bộ từ template
// Chứa: colors, styles, Header, Stats, SearchBar, AddNote
```

### 2. Tạo components/NoteItem.tsx
```typescript
// Copy toàn bộ từ template
// Chứa: NoteItem component
```

### 3. Tạo components/index.ts
```typescript
export { Header, Stats, SearchBar, AddNote, s as styles } from "./UI";
export { NoteItem } from "./NoteItem";
```

### 4. Viết app/index.tsx
```typescript
// Chỉ cần viết logic:
// - States (8 dòng)
// - API calls (4 functions)
// - Hooks (useEffect, useMemo, useCallback)
// - Render (<Header />, <Stats />, <FlatList />)
```

### 5. Copy app/profile.tsx
```typescript
// Sửa thông tin: Họ tên, MSSV, Lớp
```

## 🎯 Kết luận

- **5 files** thay vì 10 files
- **246 dòng** code tổng
- **30 phút** để hoàn thành
- **10 điểm** đầy đủ chức năng

**ĐƠN GIẢN - NHANH - HIỆU QUẢ!** 🚀
