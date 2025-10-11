# 📱 Note Taking App - Cấu trúc tối ưu cho thi

## 🎯 Điểm nổi bật
✅ **Tất cả nằm trong thư mục `app/`** - theo chuẩn Expo Router  
✅ **261 dòng code tổng** - dễ viết trong 45 phút  
✅ **6 files chính** - cấu trúc rõ ràng, dễ nhớ  
✅ **Đủ 10 điểm** - đầy đủ yêu cầu đề thi  

---

## 📂 Cấu trúc thư mục

```
app/
├── _layout.tsx         (12 dòng)  - SafeAreaProvider wrapper
├── api.ts              (9 dòng)   - API layer: get/post/put/del
├── useNotes.ts         (25 dòng)  - Custom hook quản lý state
├── components.tsx      (137 dòng) - Tất cả UI components + styles
├── index.tsx           (50 dòng)  - Màn hình chính
└── profile.tsx         (28 dòng)  - Thông tin sinh viên
```

**Tổng cộng: 261 dòng**

---

## 🔥 Chi tiết từng file

### 1️⃣ **app/_layout.tsx** (12 dòng)
```typescript
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
      </Stack>
    </SafeAreaProvider>
  );
}
```

---

### 2️⃣ **app/api.ts** (9 dòng)
```typescript
import axios from "axios";

const API = "https://68e8b99af2707e6128cbe614.mockapi.io/NguyenHoangNguyenVu_22003185/notes";

export type Note = { id: string; title: string; content: string; status: boolean };

export const api = {
  get: async () => (await axios.get<Note[]>(API)).data,
  post: async (title: string) => (await axios.post<Note>(API, { title, content: "", status: false })).data,
  put: async (id: string, updates: Partial<Note>) => (await axios.put<Note>(`${API}/${id}`, updates)).data,
  del: async (id: string) => await axios.delete(`${API}/${id}`),
};
```

**Chức năng:**
- ✅ Centralized API layer
- ✅ Type-safe với TypeScript
- ✅ 4 methods: GET/POST/PUT/DELETE

---

### 3️⃣ **app/useNotes.ts** (25 dòng)
```typescript
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
```

**Hooks sử dụng:**
- ✅ useState (3 lần)
- ✅ useCallback (5 lần)

---

### 4️⃣ **app/components.tsx** (137 dòng)
Chứa **TẤT CẢ** components và styles:

**Components:**
1. `Header` - Tiêu đề + nút Profile
2. `Stats` - Thống kê Total/Completed/Pending
3. `SearchBar` - Ô tìm kiếm
4. `AddNote` - Ô nhập + nút thêm
5. `NoteItem` - Item note với edit/delete
6. `NoteList` - FlatList với RefreshControl

**Styles:**
- `s` - StyleSheet với 20+ styles
- Màu sắc trong biến `c`

---

### 5️⃣ **app/index.tsx** (50 dòng)
```typescript
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
```

**Hooks sử dụng:**
- ✅ useState (4 lần)
- ✅ useEffect (1 lần)
- ✅ useMemo (2 lần)
- ✅ useRef (1 lần)

---

### 6️⃣ **app/profile.tsx** (28 dòng)
```typescript
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <Row label="Họ tên" value="Nguyễn Hoàng Nguyên Vũ" />
      <Row label="MSSV" value="22003185" />
      <Row label="Lớp" value="DHKTPM17B" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 12, backgroundColor: "#fff", padding: 16, borderRadius: 8 },
  label: { fontSize: 16, fontWeight: "600", width: 100 },
  value: { fontSize: 16, flex: 1 },
});
```

---

## ✅ Checklist 10 điểm

| STT | Yêu cầu | File | Dòng | ✓ |
|-----|---------|------|------|---|
| 1 | SafeAreaProvider | `_layout.tsx` | 6 | ✅ |
| 2 | GET danh sách | `api.ts` | 8 | ✅ |
| 3 | POST thêm mới | `api.ts` | 9 | ✅ |
| 4 | PUT cập nhật | `api.ts` | 10 | ✅ |
| 5 | DELETE xóa | `api.ts` | 11 | ✅ |
| 6 | useState | `index.tsx`, `useNotes.ts` | nhiều | ✅ |
| 7 | useEffect | `index.tsx` | 15 | ✅ |
| 8 | useCallback | `useNotes.ts` | 9-27 | ✅ |
| 9 | useMemo | `index.tsx` | 26-33 | ✅ |
| 10 | useRef | `index.tsx` | 13 | ✅ |

---

## 🚀 Thứ tự code khi thi (45 phút)

### **Giai đoạn 1: Setup cơ bản (5 phút)**
1. `npx create-expo-app@latest mobile-mid-term-4 --template blank-typescript`
2. `npm install axios react-native-safe-area-context`
3. Tạo thư mục `app/`

### **Giai đoạn 2: Core files (15 phút)**
4. **app/_layout.tsx** (12 dòng) - Copy paste
5. **app/api.ts** (9 dòng) - Đổi URL MockAPI
6. **app/useNotes.ts** (25 dòng) - Copy paste

### **Giai đoạn 3: UI Components (15 phút)**
7. **app/components.tsx** (137 dòng) - Copy paste hoặc gõ nhanh

### **Giai đoạn 4: Screens (8 phút)**
8. **app/index.tsx** (50 dòng) - Ghép components
9. **app/profile.tsx** (28 dòng) - Thông tin sinh viên

### **Giai đoạn 5: Test & Debug (2 phút)**
10. `npx expo start` - Kiểm tra lỗi
11. Test các chức năng CRUD

---

## 📝 Ghi chú quan trọng

### **Ưu điểm cấu trúc này:**
1. ✅ **Tất cả trong `app/`** - Theo chuẩn Expo Router
2. ✅ **Tách biệt rõ ràng** - API, hook, components, screens
3. ✅ **Dễ nhớ** - Chỉ 6 files, mỗi file có mục đích rõ ràng
4. ✅ **Code ngắn gọn** - 261 dòng, viết nhanh
5. ✅ **Không duplicate** - API centralized
6. ✅ **TypeScript safe** - Type Note dùng chung

### **So với cấu trúc cũ:**
| Tiêu chí | Cũ | Mới |
|----------|-----|-----|
| Thư mục | 3 (app, components, hooks) | 1 (app) |
| Files | 9 files | 6 files |
| Dòng code | ~240 dòng | 261 dòng |
| Import paths | `../components`, `../hooks` | `./components`, `./useNotes` |
| Cấu trúc | Phân tán | Tập trung |

### **Khi nào dùng cấu trúc này?**
- ✅ Thi 45 phút - cần viết nhanh
- ✅ Project nhỏ < 10 screens
- ✅ Expo Router projects
- ✅ Cần cấu trúc đơn giản, dễ nhớ

---

## 🎓 Tips thi đạt điểm cao

1. **Thuộc cấu trúc 6 files**
2. **Copy paste thông minh** - Có template sẵn
3. **Đổi URL MockAPI** - Quan trọng!
4. **Test từng phần** - Không đợi code xong hết
5. **Đọc kỹ yêu cầu** - Đủ 10 điểm là ok
6. **Quản lý thời gian**:
   - Setup: 5 phút
   - Core: 15 phút  
   - UI: 15 phút
   - Screens: 8 phút
   - Test: 2 phút

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "expo": "~54.0.13",
    "expo-router": "~4.0.16",
    "react": "18.3.1",
    "react-native": "0.76.6",
    "react-native-safe-area-context": "5.6.0",
    "axios": "^1.12.2"
  }
}
```

---

**Good luck! 🍀**
