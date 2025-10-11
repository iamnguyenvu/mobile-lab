# HƯỚNG DẪN XÂY DỰNG TODO APP - REACT NATIVE EXPO (CẢI TIẾN)

## 📚 MỤC LỤC
1. [Cấu trúc dự án](#cấu-trúc-dự-án)
2. [API Service - CRUD với Axios](#api-service)
3. [Types Definition](#types-definition)
4. [Components](#components)
   - [TodoItem - Hiển thị item](#todoitem-component)
   - [AddTodo - Input form](#addtodo-component)
5. [Screens](#screens)
   - [TodoScreen - Main screen](#todoscreen-main)
   - [EditScreen - Edit todo](#editscreen)
6. [Navigation Layout](#navigation-layout)
7. [Giải thích React Hooks](#giải-thích-hooks)
8. [Tính năng nâng cao](#tính-năng-nâng-cao)

---

## 🗂️ CẤU TRÚC DỰ ÁN (CẢI TIẾN)

```
app/
├── _layout.tsx              # Navigation stack
├── index.tsx                # Entry point
├── api.ts                   # API service (CRUD)
├── types.ts                 # Type definitions
├── components/
│   ├── TodoItem.tsx        # Todo item với edit/delete
│   └── AddTodo.tsx         # Input form tách riêng
└── screens/
    ├── TodoScreen.tsx      # Main todo list screen
    └── EditScreen.tsx      # Edit todo screen
```

**Cải tiến:**
- ✅ Tách logic thành screens riêng biệt
- ✅ Component AddTodo độc lập, tái sử dụng
- ✅ EditScreen riêng cho chỉnh sửa todo
- ✅ Navigation giữa các screens

---

## 🌐 API SERVICE (app/api.ts)

### Mục đích: Quản lý tất cả API calls với MockAPI

```typescript
import axios from "axios";
import type { Todo } from "./types";

const BASE_URL = "https://68e8b99af2707e6128cbe614.mockapi.io/NguyenHoangNguyenVu_22003185/todos";

// Tạo axios instance với config
export const http = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
});

// 📖 GET - Lấy tất cả todos
export const getTodos = async (): Promise<Todo[]> => {
    const response = await http.get<Todo[]>("/");
    return response.data;
};

// ➕ POST - Tạo todo mới
export const createTodo = async (title: string): Promise<Todo> => {
    const response = await http.post<Todo>("/", { 
        title, 
        completed: false 
    });
    return response.data;
};

// ✏️ PUT - Cập nhật todo (toggle completed hoặc edit title)
export const updateTodo = async (id: string, data: Partial<Todo>): Promise<Todo> => {
    const response = await http.put<Todo>(`/${id}`, data);
    return response.data;
};

// 🗑️ DELETE - Xóa todo
export const deleteTodo = async (id: string): Promise<void> => {
    await http.delete(`/${id}`);
};
```

**Giải thích:**
- `axios.create()`: Tạo instance với config chung
- `Partial<Todo>`: Cho phép update 1 phần của object
- `async/await`: Xử lý bất đồng bộ
- `type` import: Import chỉ kiểu, không runtime

---

## 📝 TYPES DEFINITION (app/types.ts)

```typescript
export type Todo = {
    id: string;
    title: string;
    completed: boolean;  // Đổi từ 'done' → 'completed' (chuẩn hơn)
}
```

**Lưu ý:** Dùng `completed` thay vì `done` (naming convention tốt hơn)

---

## 🧩 COMPONENTS

### 1️⃣ TODOITEM COMPONENT (app/components/TodoItem.tsx)

**Mục đích:** Hiển thị 1 todo item với checkbox, edit, delete

```typescript
import { memo, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Todo } from "../types";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (todo: Todo) => void;
};

export const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
    const handleToggle = useCallback(() => onToggle(todo.id), [todo.id, onToggle]);
    const handleDelete = useCallback(() => onDelete(todo.id), [todo.id, onDelete]);
    const handleEdit = useCallback(() => onEdit(todo), [todo, onEdit]);

    return (
        <View style={styles.container}>
            {/* Checkbox + Title */}
            <Pressable style={styles.content} onPress={handleToggle}>
                <View style={[styles.checkbox, todo.completed && styles.checkboxDone]}>
                    {todo.completed && <Text style={styles.check}>✓</Text>}
                </View>
                <Text style={[styles.title, todo.completed && styles.titleDone]}>
                    {todo.title}
                </Text>
            </Pressable>

            {/* Actions */}
            <View style={styles.actions}>
                <Pressable style={styles.btn} onPress={handleEdit}>
                    <Text>✏️</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleDelete}>
                    <Text>🗑️</Text>
                </Pressable>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#999',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    check: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    btn: {
        padding: 6,
    },
});
```

**Cải tiến:**
- ✅ Thêm nút Edit (✏️)
- ✅ useCallback cho mỗi handler để tối ưu
- ✅ memo để tránh re-render
- ✅ Style gọn gàng, dễ đọc

---

### 2️⃣ ADDTODO COMPONENT (app/components/AddTodo.tsx)

**Mục đích:** Input form để thêm todo mới (tách riêng, có thể tái sử dụng)

```typescript
import { useCallback, useRef, useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";

type AddTodoProps = {
    onAdd: (title: string) => Promise<void> | void;
};

export const AddTodo = ({ onAdd }: AddTodoProps) => {
    const [title, setTitle] = useState("");
    const [adding, setAdding] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const handleAdd = useCallback(async () => {
        const trimmed = title.trim();
        if (!trimmed) {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung");
            return;
        }

        setAdding(true);
        try {
            await onAdd(trimmed);
            setTitle("");
            inputRef.current?.focus(); // Focus lại input
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm công việc");
        } finally {
            setAdding(false);
        }
    }, [onAdd, title]);

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Nhập công việc mới..."
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
                editable={!adding}
            />
            <Pressable 
                style={[styles.btn, adding && styles.btnDisabled]} 
                onPress={handleAdd}
                disabled={adding}
            >
                <Text style={styles.btnText}>{adding ? "..." : "➕"}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#2196F3',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnDisabled: {
        backgroundColor: '#ccc',
    },
    btnText: {
        fontSize: 24,
    },
});
```

**Cải tiến:**
- ✅ Component độc lập, tái sử dụng được
- ✅ useRef để auto-focus sau khi thêm
- ✅ Disable button khi đang thêm
- ✅ Loading state rõ ràng

---

## 🏠 MAIN SCREEN (app/index.tsx)

### Mục đích: Screen chính với tất cả logic và React Hooks

```typescript
import { 
    View, 
    Text, 
    TextInput, 
    Pressable, 
    StyleSheet, 
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";

export default function Index() {
    // 📌 useState: Quản lý state
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // 📌 useRef: Lưu reference đến TextInput (không re-render khi thay đổi)
    const inputRef = useRef<TextInput>(null);

    // 📌 useEffect: Side effect - Fetch data khi component mount
    useEffect(() => {
        loadTodos();
    }, []); // Empty array = chỉ chạy 1 lần khi mount

    // Load todos từ API
    const loadTodos = async () => {
        try {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải danh sách công việc");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 📌 useCallback: Memoize function để tránh re-create mỗi lần render
    const handleAddTodo = useCallback(async () => {
        const title = inputValue.trim();
        if (!title) {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung công việc");
            return;
        }

        try {
            setSubmitting(true);
            const newTodo = await createTodo(title);
            setTodos(prev => [newTodo, ...prev]); // Thêm lên đầu
            setInputValue(""); // Clear input
            inputRef.current?.blur(); // Ẩn keyboard
        } catch (error) {
            Alert.alert("Lỗi", "Không thể thêm công việc");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }, [inputValue]); // Chạy lại khi inputValue thay đổi

    // Toggle done/undone
    const handleToggleTodo = useCallback(async (id: string) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        // Optimistic update: Cập nhật UI trước
        setTodos(prev => prev.map(t => 
            t.id === id ? { ...t, done: !t.done } : t
        ));

        try {
            await updateTodo(id, { done: !todo.done });
        } catch (error) {
            // Revert nếu lỗi
            setTodos(prev => prev.map(t => 
                t.id === id ? { ...t, done: todo.done } : t
            ));
            Alert.alert("Lỗi", "Không thể cập nhật công việc");
        }
    }, [todos]);

    // Delete todo
    const handleDeleteTodo = useCallback(async (id: string) => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa công việc này?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        // Optimistic update
                        const deletedTodo = todos.find(t => t.id === id);
                        setTodos(prev => prev.filter(t => t.id !== id));

                        try {
                            await deleteTodo(id);
                        } catch (error) {
                            // Revert nếu lỗi
                            if (deletedTodo) {
                                setTodos(prev => [...prev, deletedTodo]);
                            }
                            Alert.alert("Lỗi", "Không thể xóa công việc");
                        }
                    }
                }
            ]
        );
    }, [todos]);

    // 📌 useMemo: Memoize computed value - chỉ tính lại khi todos thay đổi
    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(t => t.done).length;
        const remaining = total - completed;
        return { total, completed, remaining };
    }, [todos]); // Chỉ tính lại khi todos thay đổi

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                <KeyboardAvoidingView 
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>📝 Todo App</Text>
                        <Text style={styles.stats}>
                            {stats.total} việc • {stats.completed} xong • {stats.remaining} còn lại
                        </Text>
                    </View>

                    {/* Input Form */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Nhập công việc mới..."
                            value={inputValue}
                            onChangeText={setInputValue}
                            onSubmitEditing={handleAddTodo}
                            returnKeyType="done"
                            editable={!submitting}
                        />
                        <Pressable 
                            style={[styles.addButton, submitting && styles.addButtonDisabled]}
                            onPress={handleAddTodo}
                            disabled={submitting}
                        >
                            <Text style={styles.addButtonText}>
                                {submitting ? "..." : "➕"}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Todo List */}
                    <TodoList
                        todos={todos}
                        loading={loading}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    stats: {
        fontSize: 14,
        color: '#666',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        marginRight: 8,
    },
    addButton: {
        backgroundColor: '#2196F3',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonDisabled: {
        backgroundColor: '#ccc',
    },
    addButtonText: {
        fontSize: 24,
    },
});
```

---

## 🧭 NAVIGATION LAYOUT (app/_layout.tsx)

```typescript
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack 
            screenOptions={{
                headerShown: false, // Ẩn header mặc định
            }}
        />
    );
}
```

**Giải thích:**
- `Stack`: Navigation stack từ expo-router
- `headerShown: false`: Ẩn header để dùng custom header

---

## 🎓 GIẢI THÍCH REACT HOOKS

### 1. **useState** - Quản lý state
```typescript
const [value, setValue] = useState(initialValue);
```
- Lưu trữ và cập nhật state
- Khi state thay đổi → component re-render

### 2. **useEffect** - Side effects
```typescript
useEffect(() => {
    // Code chạy sau khi render
    return () => {
        // Cleanup function (optional)
    };
}, [dependencies]); // Chạy lại khi dependencies thay đổi
```
- Fetch data, subscribe events, timers
- `[]` empty array = chỉ chạy 1 lần khi mount

### 3. **useCallback** - Memoize function
```typescript
const memoizedFunction = useCallback(() => {
    // Function logic
}, [dependencies]);
```
- Tránh re-create function mỗi lần render
- Tối ưu performance khi pass function cho child components

### 4. **useMemo** - Memoize computed value
```typescript
const memoizedValue = useMemo(() => {
    return expensiveCalculation();
}, [dependencies]);
```
- Cache kết quả tính toán phức tạp
- Chỉ tính lại khi dependencies thay đổi

### 5. **useRef** - Reference không re-render
```typescript
const ref = useRef(initialValue);
// Access: ref.current
```
- Lưu reference đến DOM element (TextInput)
- Lưu giá trị không trigger re-render

---

## 🎨 REACT NATIVE COMPONENTS

| Component | Mô tả | Tương đương Web |
|-----------|-------|-----------------|
| `View` | Container | `<div>` |
| `Text` | Hiển thị text | `<span>`, `<p>` |
| `TextInput` | Input field | `<input>` |
| `Pressable` | Touchable button | `<button>` |
| `FlatList` | List virtualized | Custom list |
| `ActivityIndicator` | Loading spinner | CSS loader |
| `SafeAreaView` | Safe area | CSS safe-area |
| `StyleSheet` | Styles | CSS |

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] **api.ts**: Implement GET, POST, PUT, DELETE với axios
- [ ] **types.ts**: Đã có sẵn
- [ ] **TodoItem.tsx**: Component hiển thị 1 todo item
- [ ] **TodoList.tsx**: Component hiển thị list todos với FlatList
- [ ] **index.tsx**: Main screen với tất cả React hooks
- [ ] **_layout.tsx**: Navigation layout
- [ ] Test app với `npm start` hoặc `npx expo start`

---

## 🚀 CHẠY ỨNG DỤNG

```bash
# Install dependencies (nếu chưa)
npm install

# Start Expo
npx expo start

# Hoặc
npm start

# Scan QR code bằng Expo Go app (Android/iOS)
```

---

## 💡 LƯU Ý

1. **Optimistic Updates**: Cập nhật UI trước, gọi API sau → UX tốt hơn
2. **Error Handling**: Luôn có try-catch và revert nếu API fail
3. **useCallback & useMemo**: Dùng để tối ưu performance
4. **memo**: Wrap component để tránh re-render không cần thiết
5. **KeyboardAvoidingView**: Tránh keyboard che input trên iOS

---

## 📚 TÀI LIỆU THAM KHẢO

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Hooks](https://react.dev/reference/react)
- [Axios Docs](https://axios-http.com/docs/intro)

---

**Chúc bạn code vui! 🎉**
