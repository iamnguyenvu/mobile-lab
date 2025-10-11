# GIẢI THÍCH CHI TIẾT CÁC HOOKS VÀ CODE PATTERNS

## 📚 MỤC LỤC
1. [useState - Quản lý state](#1-usestate---quản-lý-state)
2. [useEffect - Side effects](#2-useeffect---side-effects)
3. [useCallback - Memoize functions](#3-usecallback---memoize-functions)
4. [useMemo - Memoize values](#4-usememo---memoize-values)
5. [useRef - Reference values](#5-useref---reference-values)
6. [useFocusEffect - React Navigation](#6-usefocuseffect---react-navigation)
7. [memo - Optimize component](#7-memo---optimize-component)

---

## 1. useState - Quản lý state

### 🎯 Mục đích
Tạo và quản lý state (trạng thái) trong functional component. Khi state thay đổi → component re-render.

### 📝 Cú pháp
```typescript
const [state, setState] = useState<Type>(initialValue);
```

### 💡 Ví dụ trong UserList.tsx
```typescript
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
```

**Giải thích:**
- `users`: Mảng chứa danh sách user (state)
- `setUsers`: Function để cập nhật users
- `<User[]>`: TypeScript type - mảng các object User
- `[]`: Giá trị khởi tạo - mảng rỗng

**Khi nào re-render?**
```typescript
setUsers(newUsers);  // ← Component re-render
setLoading(false);   // ← Component re-render
setSearch("john");   // ← Component re-render
```

### 💡 Ví dụ trong AddUser.tsx
```typescript
const [role, setRole] = useState<"user" | "admin">("user");
const [loading, setLoading] = useState(false);
```

**Giải thích:**
- `role`: State lưu role được chọn
- `<"user" | "admin">`: TypeScript union type - chỉ nhận 2 giá trị
- `"user"`: Giá trị mặc định

---

## 2. useEffect - Side effects

### 🎯 Mục đích
Thực thi side effects (gọi API, subscriptions, timers) sau khi component render.

### 📝 Cú pháp
```typescript
useEffect(() => {
  // Code chạy sau mỗi render
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]); // Chạy lại khi dependencies thay đổi
```

### 💡 Ví dụ trong UserList.tsx
```typescript
useEffect(() => { 
  load(); 
}, [load]);
```

**Giải thích:**
1. Component mount (lần đầu render) → gọi `load()`
2. Nếu `load` thay đổi → gọi lại `load()`
3. `[load]` là dependency array

**Luồng hoạt động:**
```
Component mount → useEffect chạy → gọi load() → fetch API → setUsers() → re-render
```

**Các dạng dependency:**
```typescript
useEffect(() => {}, []);        // Chỉ chạy 1 lần khi mount
useEffect(() => {}, [count]);   // Chạy lại khi count thay đổi
useEffect(() => {});            // Chạy sau mỗi render (không nên dùng)
```

---

## 3. useCallback - Memoize functions

### 🎯 Mục đích
Lưu lại (cache) function để tránh tạo function mới mỗi lần re-render → tối ưu performance.

### 📝 Cú pháp
```typescript
const memoizedCallback = useCallback(() => {
  // Function logic
}, [dependencies]);
```

### 💡 Ví dụ trong UserList.tsx

#### Ví dụ 1: load function
```typescript
const load = useCallback(async () => { 
  try { 
    setUsers(await getUsers()); 
  } finally { 
    setLoading(false); 
  } 
}, []);
```

**Giải thích:**
- `useCallback` tạo 1 function và lưu vào memory
- `[]` (empty array) = function không bao giờ thay đổi
- Dù component re-render 100 lần → vẫn dùng cùng 1 function

**Tại sao cần useCallback?**
```typescript
// ❌ KHÔNG dùng useCallback
const load = async () => { ... }
// → Mỗi lần render tạo function MỚI

// ✅ DÙNG useCallback
const load = useCallback(async () => { ... }, []);
// → Chỉ tạo 1 lần, re-render không tạo lại
```

#### Ví dụ 2: toggle function
```typescript
const toggle = useCallback(async (id: string) => { 
  const u = users.find(x => x.id === id); 
  if (u) { 
    await updateUser(id, { active: !u.active }); 
    load(); 
  } 
}, [users, load]);
```

**Giải thích:**
- Dependency: `[users, load]`
- Khi `users` hoặc `load` thay đổi → tạo function mới
- Tại sao? Vì function cần dùng giá trị mới nhất của `users` và `load`

**Luồng hoạt động:**
```
1. User click Toggle button
2. → gọi toggle("123")
3. → find user với id="123" trong mảng users
4. → gọi API updateUser để đảo trạng thái active
5. → gọi load() để fetch lại danh sách mới
```

#### Ví dụ 3: del function
```typescript
const del = useCallback(async (id: string) => { 
  await deleteUser(id); 
  load(); 
}, [load]);
```

**Giải thích:**
- Dependency chỉ có `[load]` vì không dùng `users`
- Xóa user → gọi load() để refresh danh sách

### 💡 Ví dụ trong UserDetail.tsx
```typescript
const toggle = useCallback(async () => { 
  setLoading(true); 
  try { 
    setUser(await updateUser(user.id, { active: !user.active })); 
  } finally { 
    setLoading(false); 
  } 
}, [user]);
```

**Giải thích:**
- Dependency: `[user]` - khi user thay đổi → tạo function mới
- `setUser(await updateUser(...))` - gọi API và cập nhật state luôn trong 1 dòng

---

## 4. useMemo - Memoize values

### 🎯 Mục đích
Cache kết quả tính toán phức tạp để tránh tính lại mỗi lần re-render.

### 📝 Cú pháp
```typescript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependencies]);
```

### 💡 Ví dụ trong UserList.tsx

#### Ví dụ 1: filtered (Search filter)
```typescript
const filtered = useMemo(() => 
  search 
    ? users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
      ) 
    : users, 
  [users, search]
);
```

**Giải thích:**
- **Mục đích:** Lọc users theo search keyword
- **Dependency:** `[users, search]` - chỉ tính lại khi 2 giá trị này thay đổi
- **Logic:**
  - Nếu `search` rỗng → trả về toàn bộ `users`
  - Nếu có `search` → filter users có name hoặc email chứa keyword

**Luồng hoạt động:**
```
User gõ "john" → setSearch("john") → filtered tính lại → FlatList render filtered
```

**Tại sao cần useMemo?**
```typescript
// ❌ KHÔNG dùng useMemo
const filtered = search ? users.filter(...) : users;
// → Mỗi lần render (thậm chí không thay đổi search/users) vẫn filter lại

// ✅ DÙNG useMemo
const filtered = useMemo(() => ..., [users, search]);
// → Chỉ filter lại khi users hoặc search thay đổi
```

#### Ví dụ 2: stats (Statistics)
```typescript
const stats = useMemo(() => ({ 
  t: users.length, 
  a: users.filter(u => u.active).length, 
  i: users.filter(u => !u.active).length, 
  ad: users.filter(u => u.role === "admin").length 
}), [users]);
```

**Giải thích:**
- **Mục đích:** Tính toán thống kê từ mảng users
- **Dependency:** `[users]` - chỉ tính lại khi users thay đổi
- **Output:** Object với 4 properties:
  - `t` (total): Tổng số users
  - `a` (active): Số users active
  - `i` (inactive): Số users inactive
  - `ad` (admin): Số users có role admin

**Tại sao tốn performance?**
```typescript
users.filter(u => u.active)  // Loop qua toàn bộ mảng
users.filter(u => !u.active) // Loop qua toàn bộ mảng
users.filter(u => u.role === "admin") // Loop qua toàn bộ mảng
```
Với 1000 users → 3 lần loop = 3000 operations!

**useMemo giúp:**
- Chỉ tính lại khi `users` thay đổi
- Các lần re-render khác (như scroll, click button) → dùng cached value

---

## 5. useRef - Reference values

### 🎯 Mục đích
Lưu giá trị KHÔNG trigger re-render khi thay đổi. Thích hợp cho input values, timers, previous values.

### 📝 Cú pháp
```typescript
const ref = useRef<Type>(initialValue);
ref.current = newValue; // Update value (không re-render)
```

### 💡 Ví dụ trong AddUser.tsx
```typescript
const name = useRef("");
const email = useRef("");
```

**Giải thích:**
- `name.current`: Lưu giá trị tên user đang nhập
- Khi user gõ vào TextInput → `name.current` thay đổi NHƯNG không re-render
- Tiết kiệm performance so với `useState`

**So sánh useState vs useRef:**
```typescript
// ❌ useState - Re-render MỖI KÝ TỰ GÕ
const [name, setName] = useState("");
<TextInput value={name} onChangeText={setName} />
// User gõ "John" → 4 lần re-render (J, Jo, Joh, John)

// ✅ useRef - KHÔNG re-render khi gõ
const name = useRef("");
<TextInput onChangeText={t => name.current = t} />
// User gõ "John" → 0 lần re-render
```

**Lưu ý quan trọng:**
```typescript
// ✅ ĐỌC giá trị
console.log(name.current); // "John"

// ✅ GHI giá trị
name.current = "Jane";

// ❌ SAI - không có .value
name.value = "Jane"; // ERROR!
```

### 💡 Ví dụ trong AddUser.tsx - Save function
```typescript
const save = async () => {
  if (!name.current.trim() || !email.current.trim()) return;
  setLoading(true);
  try { 
    await createUser(name.current, email.current, role); 
    name.current = ""; 
    email.current = ""; 
    setRole("user"); 
    navigation.navigate("Home"); 
  } finally { 
    setLoading(false); 
  }
};
```

**Giải thích từng bước:**
1. **Validation:** `if (!name.current.trim() ...)`
   - Kiểm tra name và email không rỗng
   - `.trim()` xóa khoảng trắng đầu/cuối

2. **Loading state:** `setLoading(true)`
   - Hiển thị loading spinner, disable button

3. **API call:** `await createUser(...)`
   - Gọi API tạo user mới
   - `await` = đợi API response

4. **Reset form:** `name.current = ""; email.current = "";`
   - Xóa dữ liệu form sau khi tạo thành công

5. **Navigate:** `navigation.navigate("Home")`
   - Chuyển về màn hình Home (UserList)

6. **Finally:** `setLoading(false)`
   - Luôn chạy dù success hay error
   - Tắt loading spinner

### 💡 Ví dụ trong EditUser.tsx
```typescript
const name = useRef(user.name);
const email = useRef(user.email);
```

**Khác biệt với AddUser:**
- AddUser: `useRef("")` - khởi tạo rỗng
- EditUser: `useRef(user.name)` - khởi tạo với giá trị có sẵn

**Tại sao?**
- EditUser cần hiển thị dữ liệu user đang edit
- Dùng `defaultValue={user.name}` trong TextInput

---

## 6. useFocusEffect - React Navigation

### 🎯 Mục đích
Chạy code mỗi khi màn hình được FOCUS (hiển thị). Khác với useEffect - chỉ chạy khi mount.

### 📝 Cú pháp
```typescript
import { useFocusEffect } from "@react-navigation/native";

useFocusEffect(
  useCallback(() => {
    // Code chạy khi màn hình focus
    return () => {
      // Cleanup khi màn hình blur (optional)
    };
  }, [dependencies])
);
```

### 💡 Ví dụ trong AddUser.tsx
```typescript
useFocusEffect(useCallback(() => { 
  name.current = ""; 
  email.current = ""; 
  setRole("user"); 
}, []));
```

**Giải thích:**
- **Khi nào chạy?** Mỗi khi user chuyển sang tab "Thêm" (AddUser screen focus)
- **Làm gì?** Reset form về trạng thái ban đầu
- **Tại sao cần?** 
  - User điền form → chuyển tab khác → quay lại
  - Không reset → form vẫn giữ dữ liệu cũ
  - Có reset → form luôn sạch mỗi lần vào

**So sánh với useEffect:**
```typescript
// ❌ useEffect - CHỈ chạy 1 lần khi mount
useEffect(() => { 
  name.current = ""; 
}, []);
// Lần 1: vào AddUser → reset ✅
// Lần 2: chuyển sang Home → quay lại AddUser → KHÔNG reset ❌

// ✅ useFocusEffect - Chạy MỖI LẦN focus
useFocusEffect(useCallback(() => { 
  name.current = ""; 
}, []));
// Lần 1: vào AddUser → reset ✅
// Lần 2: chuyển sang Home → quay lại AddUser → reset ✅
```

**Kết hợp useCallback:**
```typescript
useFocusEffect(useCallback(() => { ... }, []));
                ^^^^^^^^^^^^^
                Bắt buộc phải có!
```
- React Navigation yêu cầu wrap trong `useCallback`
- Tránh re-register effect không cần thiết

---

## 7. memo - Optimize component

### 🎯 Mục đích
Ngăn component re-render nếu props không thay đổi.

### 📝 Cú pháp
```typescript
import { memo } from "react";

export const Component = memo(({ prop1, prop2 }) => {
  return <View>...</View>;
});
```

### 💡 Ví dụ trong UserItem.tsx
```typescript
export const UserItem = memo(({ user, onPress, onToggle, onDelete }: 
  { user: User; onPress: () => void; onToggle: (id: string) => void; onDelete: (id: string) => void }) => (
  <Pressable style={s.c} onPress={onPress}>
    {/* ... */}
  </Pressable>
));
```

**Giải thích:**
- `memo` wrap component UserItem
- Khi parent (UserList) re-render → UserItem không tự động re-render
- CHỈ re-render nếu props (`user`, `onPress`, `onToggle`, `onDelete`) thay đổi

**Tại sao cần?**
```typescript
// UserList có 100 users
<FlatList data={users} renderItem={({ item }) => 
  <UserItem user={item} ... />
} />
```

**Kịch bản:**
1. User gõ search → `search` state thay đổi
2. UserList re-render
3. **KHÔNG có memo:** 100 UserItem đều re-render (dù props không đổi)
4. **CÓ memo:** Chỉ UserItem nào có props thay đổi mới re-render

**Lợi ích:**
- Giảm số lần re-render
- Tăng performance với danh sách lớn
- Smooth scroll

**Lưu ý:**
```typescript
// ✅ Kết hợp memo + useCallback
const toggle = useCallback(async (id: string) => { ... }, [users, load]);

<UserItem onToggle={toggle} />
// toggle không đổi → UserItem không re-render

// ❌ Không dùng useCallback
const toggle = async (id: string) => { ... };

<UserItem onToggle={toggle} />
// Mỗi lần render tạo function mới → UserItem re-render dù có memo
```

---

## 🎯 TỔNG KẾT CÁC HOOKS

| Hook | Mục đích | Trigger re-render? | Use case |
|------|----------|-------------------|----------|
| **useState** | Quản lý state | ✅ YES | Data thay đổi cần update UI |
| **useEffect** | Side effects (API, timer) | ❌ NO | Fetch data, subscriptions |
| **useCallback** | Cache function | ❌ NO | Tối ưu function không đổi |
| **useMemo** | Cache value | ❌ NO | Tối ưu tính toán phức tạp |
| **useRef** | Lưu value | ❌ NO | Input value, không cần re-render |
| **useFocusEffect** | Code khi screen focus | ❌ NO | Reset form, refresh data |
| **memo** | Tối ưu component | ❌ NO | Ngăn re-render không cần thiết |

---

## 🔥 BEST PRACTICES

### 1. Khi nào dùng useState vs useRef?

```typescript
// ✅ useState - Cần hiển thị trên UI
const [count, setCount] = useState(0);
<Text>{count}</Text> // UI hiển thị count

// ✅ useRef - KHÔNG cần hiển thị trên UI
const count = useRef(0);
// Chỉ dùng trong logic, không render
```

### 2. useCallback dependencies

```typescript
// ✅ ĐÚNG - Liệt kê TẤT CẢ dependencies
const save = useCallback(async () => {
  await createUser(name, email, role);
}, [name, email, role]); // Dùng name, email, role → phải list

// ❌ SAI - Thiếu dependencies
const save = useCallback(async () => {
  await createUser(name, email, role);
}, []); // Bug: dùng giá trị cũ của name, email, role
```

### 3. useMemo cho tính toán PHỨC TẠP

```typescript
// ✅ DÙNG useMemo - Phức tạp (filter, map, reduce)
const filtered = useMemo(() => 
  users.filter(u => u.active), 
  [users]
);

// ❌ KHÔNG cần useMemo - Đơn giản
const title = user.name + " - " + user.email; // Không cần useMemo
```

### 4. memo cho LIST ITEMS

```typescript
// ✅ Dùng memo cho item trong list
export const UserItem = memo(({ user }) => <View>...</View>);

// ❌ KHÔNG dùng memo cho screen component
export default memo(function UserList() { ... }); // Không cần
```

---

## 📊 LUỒNG HOẠT ĐỘNG TỔNG THỂ

### UserList Screen
```
1. Component mount
   ↓
2. useEffect → gọi load()
   ↓
3. load() → getUsers() API
   ↓
4. setUsers(data) → re-render
   ↓
5. useMemo tính filtered & stats
   ↓
6. FlatList render UserItem components
   ↓
7. User nhập search
   ↓
8. setSearch() → re-render
   ↓
9. useMemo tính lại filtered
   ↓
10. FlatList render lại với data mới
```

### AddUser Screen
```
1. Component mount
   ↓
2. useRef khởi tạo name="", email=""
   ↓
3. useFocusEffect reset form (mỗi lần focus)
   ↓
4. User nhập name → name.current = "John"
   ↓
5. User nhập email → email.current = "john@email.com"
   ↓
6. User chọn role → setRole("admin") → re-render
   ↓
7. User click Save → gọi save()
   ↓
8. save() → setLoading(true) → re-render
   ↓
9. createUser API call
   ↓
10. Success → reset form, navigate Home
    ↓
11. setLoading(false) → re-render
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Trước tối ưu:
```typescript
// ❌ Mỗi lần render tạo mới
const toggle = async (id: string) => { ... };
const filtered = users.filter(...);

<UserItem onToggle={toggle} />
// → UserItem re-render dù props không đổi
```

**Vấn đề:**
- 100 users → 100 UserItem re-render
- Mỗi keystroke search → 100 re-renders
- Scroll lag, battery drain

### Sau tối ưu:
```typescript
// ✅ Cache function & value
const toggle = useCallback(async (id: string) => { ... }, [users, load]);
const filtered = useMemo(() => users.filter(...), [users, search]);

export const UserItem = memo(({ onToggle }) => ...);
// → UserItem CHỈ re-render khi props thay đổi
```

**Kết quả:**
- 100 users, search keystroke → CHỈ 0-5 UserItem re-render
- Smooth 60 FPS scroll
- Battery efficient

---

## 💡 TÓM TẮT NGẮN GỌN

1. **useState**: Data cần hiển thị → re-render
2. **useEffect**: Chạy code sau render (API, timer)
3. **useCallback**: Cache function, tối ưu performance
4. **useMemo**: Cache value, tối ưu tính toán
5. **useRef**: Lưu value, KHÔNG re-render (input, timers)
6. **useFocusEffect**: Reset form khi focus screen
7. **memo**: Component không re-render nếu props không đổi
