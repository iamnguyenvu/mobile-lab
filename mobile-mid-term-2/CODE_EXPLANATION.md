# GIẢI THÍCH CHI TIẾT CÁC ĐOẠN CODE

## 📚 MỤC LỤC
1. [API Layer (api.tsx)](#1-api-layer-apitsx)
2. [TypeScript Types (types.tsx)](#2-typescript-types-typestsx)
3. [Navigation Setup (index.tsx)](#3-navigation-setup-indextsx)
4. [Layout (_layout.tsx)](#4-layout-_layouttsx)
5. [Component Patterns](#5-component-patterns)
6. [Event Handling](#6-event-handling)
7. [Styling Patterns](#7-styling-patterns)
8. [Form Handling](#8-form-handling)

---

## 1. API Layer (api.tsx)

### 🎯 Mục đích
Tập trung tất cả logic gọi API vào 1 file. Dễ maintain, dễ test, dễ thay đổi backend.

### 📝 Import & Setup

```typescript
import axios from "axios";
import type { User } from "./types";

const BASE_URL = "https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1"
```

**Giải thích:**
- `axios`: Thư viện HTTP client phổ biến nhất cho React/React Native
- `type { User }`: Import type (chỉ dùng cho TypeScript, không tồn tại khi chạy)
- `BASE_URL`: URL gốc của API (MockAPI.io)

### 📝 Axios Instance

```typescript
export const http = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
})
```

**Giải thích từng dòng:**

1. **`axios.create()`**: Tạo instance axios với config mặc định
   ```typescript
   const http = axios.create({ ... });
   ```
   
2. **`baseURL: BASE_URL`**: 
   - Tất cả request sẽ có prefix này
   - VD: `http.get("/users")` → `https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1/users`
   
3. **`headers: {"Content-Type": "application/json"}`**:
   - Nói với server: "Tôi gửi dữ liệu dạng JSON"
   - Tự động thêm header này vào mọi request
   
4. **`timeout: 5000`**:
   - Request tự động fail sau 5 giây (5000ms)
   - Tránh user chờ mãi nếu server không response

**Tại sao dùng instance thay vì axios trực tiếp?**
```typescript
// ❌ Không dùng instance - Lặp code
await axios.get("https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1/users");
await axios.get("https://68e94b6cf1eeb3f856e3a332.mockapi.io/api/v1/users/123");

// ✅ Dùng instance - Ngắn gọn
await http.get("/users");
await http.get("/users/123");
```

---

### 📝 GET - Lấy danh sách users

```typescript
export const getUsers = async () : Promise<User[]> => {
    const response = await http.get<User[]>("/users");
    return response.data;
}
```

**Giải thích chi tiết:**

1. **Function signature:**
   ```typescript
   async () : Promise<User[]>
   ```
   - `async`: Function bất đồng bộ (có `await` bên trong)
   - `Promise<User[]>`: Return promise chứa mảng User

2. **Generic type `<User[]>`:**
   ```typescript
   http.get<User[]>("/users")
   ```
   - Nói với TypeScript: "Response sẽ có kiểu User[]"
   - TypeScript sẽ check type → code an toàn hơn

3. **Response structure:**
   ```typescript
   response = {
     data: [...],      // ← Dữ liệu thật
     status: 200,
     statusText: "OK",
     headers: {...},
     config: {...}
   }
   ```
   - Chỉ cần `response.data` → return về

4. **`await`:**
   ```typescript
   const response = await http.get(...);
   ```
   - Đợi API response trước khi chạy dòng tiếp theo
   - Không block UI (vẫn có thể scroll, click buttons)

**Sử dụng:**
```typescript
// Component
const users = await getUsers();
console.log(users); // [{id: "1", name: "John", ...}, ...]
```

---

### 📝 POST - Tạo user mới

```typescript
export const createUser = async (name: string, email: string, role: "user"|"admin") : Promise<User> => {
    const response = await http.post<User>("/users", {
        name,
        email,
        role,
        active: true
    })
    return response.data
}
```

**Giải thích chi tiết:**

1. **Parameters:**
   ```typescript
   (name: string, email: string, role: "user"|"admin")
   ```
   - `name`, `email`: String bình thường
   - `role`: Chỉ nhận 2 giá trị: "user" hoặc "admin" (TypeScript union type)

2. **Request body:**
   ```typescript
   {
       name,          // ES6 shorthand: name: name
       email,         // ES6 shorthand: email: email
       role,          // ES6 shorthand: role: role
       active: true   // Mặc định user mới là active
   }
   ```
   
3. **ES6 Shorthand:**
   ```typescript
   // Thay vì viết:
   { name: name, email: email }
   
   // Viết ngắn gọn:
   { name, email }
   ```

4. **POST request:**
   ```typescript
   http.post<User>("/users", body)
   ```
   - Param 1: URL endpoint
   - Param 2: Data gửi lên (body)
   - Generic `<User>`: Response sẽ là 1 User object

**Luồng hoạt động:**
```
User click "Tạo" 
  → createUser("John", "john@email.com", "admin")
  → http.post("/users", {name: "John", email: "john@email.com", role: "admin", active: true})
  → Server nhận request
  → Server tạo user mới với id random
  → Server response: {id: "123", name: "John", email: "john@email.com", role: "admin", active: true, createAt: "2025-10-11"}
  → return response.data
  → Component nhận user mới
```

---

### 📝 PUT - Cập nhật user

```typescript
export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await http.put(`/users/${id}`, data)
    return response.data
}
```

**Giải thích chi tiết:**

1. **`Partial<User>`:**
   ```typescript
   type User = {
     id: string;
     name: string;
     email: string;
     role: "user" | "admin";
     active: boolean;
   }
   
   type Partial<User> = {
     id?: string;      // Optional
     name?: string;    // Optional
     email?: string;   // Optional
     role?: "user" | "admin"; // Optional
     active?: boolean; // Optional
   }
   ```
   - Tất cả properties đều **optional**
   - Có thể update 1 hoặc nhiều fields tùy ý

2. **Template literal:**
   ```typescript
   `/users/${id}`
   ```
   - Nếu `id = "123"` → `/users/123`
   - Nếu `id = "abc"` → `/users/abc`
   - ES6 syntax: `${variable}` trong backticks

3. **PUT vs PATCH:**
   ```typescript
   // PUT - Thay thế TOÀN BỘ object
   http.put("/users/123", { name: "John" })
   // → Server xóa tất cả fields khác, chỉ giữ name
   
   // PATCH - Update một phần
   http.patch("/users/123", { name: "John" })
   // → Server chỉ update name, giữ nguyên fields khác
   ```
   - MockAPI hỗ trợ cả 2
   - Code này dùng PUT nhưng hoạt động như PATCH

**Ví dụ sử dụng:**
```typescript
// Update chỉ name
await updateUser("123", { name: "Jane" });

// Update name và email
await updateUser("123", { name: "Jane", email: "jane@email.com" });

// Toggle active
await updateUser("123", { active: !user.active });
```

---

### 📝 DELETE - Xóa user

```typescript
export const deleteUser = async (id: string): Promise<void> => {
    await http.delete(`/users/${id}`)
}
```

**Giải thích chi tiết:**

1. **`Promise<void>`:**
   ```typescript
   : Promise<void>
   ```
   - Function không return gì cả
   - Chỉ quan tâm thành công hay thất bại

2. **Không return response:**
   ```typescript
   await http.delete(`/users/${id}`)
   // Không có: return response.data
   ```
   - DELETE thường không trả về data
   - Chỉ cần biết thành công (status 200) hay thất bại (error)

3. **Error handling:**
   ```typescript
   try {
     await deleteUser("123");
     console.log("Xóa thành công!");
   } catch (error) {
     console.log("Xóa thất bại:", error);
   }
   ```

**Luồng hoạt động:**
```
User click "Delete" 
  → deleteUser("123")
  → http.delete("/users/123")
  → Server xóa user id="123"
  → Server response: 200 OK (không có body)
  → Function kết thúc
  → Component gọi load() để refresh list
```

---

## 2. TypeScript Types (types.tsx)

### 📝 User Type Definition

```typescript
export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  active: boolean;
  createAt: string;
};
```

**Giải thích từng field:**

1. **`id: string`**
   - ID duy nhất của user
   - MockAPI tự generate: "1", "2", "3", ...
   - Type: string (không phải number)

2. **`name: string`**
   - Tên của user
   - Ví dụ: "John Doe", "Jane Smith"

3. **`email: string`**
   - Email của user
   - Ví dụ: "john@email.com"

4. **`role: "user" | "admin"`**
   - **Union type**: Chỉ nhận 2 giá trị cố định
   - Không thể gán giá trị khác
   ```typescript
   user.role = "user";   // ✅ OK
   user.role = "admin";  // ✅ OK
   user.role = "guest";  // ❌ ERROR! TypeScript báo lỗi
   ```

5. **`active: boolean`**
   - Trạng thái kích hoạt
   - `true`: User đang active
   - `false`: User bị deactivate

6. **`createAt: string`**
   - Thời gian tạo user
   - MockAPI tự generate: "2025-10-11T12:34:56.789Z"
   - Type: string (không phải Date object)

**Tại sao dùng type thay vì interface?**
```typescript
// Type - Ngắn gọn, dùng cho data structure
export type User = { ... }

// Interface - Dùng cho OOP, có thể extend
export interface IUser { ... }
interface Admin extends IUser { ... }
```
- Type phù hợp với data từ API
- Interface phù hợp với classes, OOP patterns

**Type safety:**
```typescript
// ✅ TypeScript check
const user: User = {
  id: "1",
  name: "John",
  email: "john@email.com",
  role: "user",
  active: true,
  createAt: "2025-10-11"
};

// ❌ TypeScript báo lỗi
const badUser: User = {
  id: 1,              // ❌ Phải là string
  name: "John",
  email: "john",
  role: "guest",      // ❌ Chỉ nhận "user" hoặc "admin"
  // active: missing  // ❌ Thiếu field
};
```

---

## 3. Navigation Setup (index.tsx)

### 📝 Import Navigation Libraries

```typescript
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
```

**Giải thích:**
- `createBottomTabNavigator`: Tạo tab bar ở dưới màn hình
- `createNativeStackNavigator`: Tạo stack navigation (push/pop screens)

### 📝 Create Navigators

```typescript
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
```

**Giải thích:**
- `Tab`, `Stack`: Navigator components
- Dùng để wrap screens

### 📝 Stack Navigator (HomeStack)

```typescript
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{ title: "Users" }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ title: "Chi tiết" }} />
      <Stack.Screen name="EditUser" component={EditUser} options={{ title: "Sửa" }} />
    </Stack.Navigator>
  );
}
```

**Giải thích chi tiết:**

1. **Stack Navigation Pattern:**
   ```
   UserList (root)
     ↓ navigate("UserDetail")
   UserDetail
     ↓ navigate("EditUser")
   EditUser
     ↓ goBack()
   UserDetail
     ↓ goBack()
   UserList
   ```

2. **`<Stack.Screen>` props:**
   ```typescript
   name="UserList"        // Route name (dùng để navigate)
   component={UserList}   // Component sẽ render
   options={{ title: "Users" }} // Header title
   ```

3. **Navigation methods:**
   ```typescript
   // Trong UserList component
   navigation.navigate("UserDetail", { user: item }); // Push screen mới
   
   // Trong UserDetail component
   navigation.goBack(); // Pop về screen trước
   
   // Trong EditUser component
   navigation.navigate("UserList"); // Jump về root
   ```

4. **Passing params:**
   ```typescript
   // Navigate với data
   navigation.navigate("UserDetail", { user: item });
   
   // Nhận data
   const user = route.params.user;
   ```

### 📝 Bottom Tab Navigator

```typescript
export default function Index() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Danh sách" }} />
      <Tab.Screen name="AddUser" component={AddUser} options={{ title: "Thêm" }} />
    </Tab.Navigator>
  );
}
```

**Giải thích chi tiết:**

1. **Tab Navigation Structure:**
   ```
   ┌─────────────────────────┐
   │                         │
   │   Tab Content           │
   │   (HomeStack hoặc       │
   │    AddUser screen)      │
   │                         │
   ├─────────────────────────┤
   │  📋 Danh sách  |  ➕ Thêm │ ← Tab bar
   └─────────────────────────┘
   ```

2. **`screenOptions={{ headerShown: false }}`:**
   - Ẩn header của Tab Navigator
   - Stack Navigator vẫn có header riêng
   - Tránh 2 header chồng lên nhau

3. **Home tab:**
   ```typescript
   <Tab.Screen name="Home" component={HomeStack} />
   ```
   - Tab đầu tiên
   - Render `HomeStack` (chứa UserList, UserDetail, EditUser)
   - Click tab → hiển thị UserList screen

4. **AddUser tab:**
   ```typescript
   <Tab.Screen name="AddUser" component={AddUser} />
   ```
   - Tab thứ hai
   - Render trực tiếp `AddUser` component
   - Click tab → hiển thị AddUser screen

**Navigation hierarchy:**
```
Tab Navigator (root)
├── Home Tab
│   └── Stack Navigator (HomeStack)
│       ├── UserList (root screen)
│       ├── UserDetail
│       └── EditUser
└── AddUser Tab
    └── AddUser (screen)
```

**User flow:**
```
1. App khởi động → Tab Navigator render → Home tab active → HomeStack render → UserList hiển thị
2. User click vào user trong list → navigate("UserDetail") → UserDetail hiển thị
3. User click "Sửa" → navigate("EditUser") → EditUser hiển thị
4. User click tab "Thêm" → Switch sang AddUser tab → AddUser screen hiển thị
5. User click tab "Danh sách" → Switch về Home tab → Vẫn đang ở EditUser (stack giữ nguyên)
```

---

## 4. Layout (_layout.tsx)

### 📝 Code

```typescript
export { default } from "./index";
```

**Giải thích chi tiết:**

1. **Expo Router requirement:**
   - Expo Router tìm file `app/_layout.tsx` để render
   - File này phải export React component

2. **Re-export pattern:**
   ```typescript
   export { default } from "./index";
   ```
   - Import default export từ `./index.tsx`
   - Export luôn ra ngoài
   - Tương đương:
   ```typescript
   import Index from "./index";
   export default Index;
   ```

3. **Tại sao không code trực tiếp trong _layout.tsx?**
   ```typescript
   // ❌ Có thể nhưng không hay
   // _layout.tsx
   export default function RootLayout() {
     return <Tab.Navigator>...</Tab.Navigator>
   }
   
   // ✅ Tốt hơn
   // _layout.tsx
   export { default } from "./index";
   
   // index.tsx (chứa logic navigation)
   export default function Index() {
     return <Tab.Navigator>...</Tab.Navigator>
   }
   ```
   - Separation of concerns
   - _layout.tsx chỉ làm entry point
   - index.tsx chứa logic

---

## 5. Component Patterns

### 📝 Functional Component với Props

```typescript
export default function UserList({ navigation }: any) {
  // Component logic
  return (/* JSX */);
}
```

**Giải thích:**
- `{ navigation }`: Destructuring props
- `navigation`: Object từ React Navigation
- `: any`: Type annotation (nên dùng proper type thay vì any)

**Better typing:**
```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;

export default function UserList({ navigation, route }: Props) {
  // TypeScript biết chính xác type của navigation & route
}
```

### 📝 Conditional Rendering

```typescript
if (loading && !users.length) 
  return <SafeAreaView style={s.c}><ActivityIndicator /></SafeAreaView>;
```

**Giải thích:**
- `loading && !users.length`: Đang loading VÀ chưa có data
- Return early → không render main UI
- Hiển thị loading spinner

**Tại sao cần `!users.length`?**
```typescript
// Trường hợp 1: Lần đầu load
loading = true, users = []
→ Hiển thị spinner ✅

// Trường hợp 2: Refresh với data có sẵn
loading = true, users = [user1, user2, ...]
→ Hiển thị list cũ + RefreshControl spinner ✅
→ Không hiển thị fullscreen spinner ❌
```

### 📝 List Rendering với FlatList

```typescript
<FlatList 
  data={filtered}
  keyExtractor={i => i.id}
  renderItem={({ item }) => <UserItem user={item} ... />}
  refreshControl={<RefreshControl ... />}
  contentContainerStyle={s.p}
/>
```

**Giải thích từng prop:**

1. **`data={filtered}`:**
   - Mảng dữ liệu cần render
   - FlatList tự động virtualize (chỉ render items trong viewport)

2. **`keyExtractor={i => i.id}`:**
   - Function return unique key cho mỗi item
   - React dùng key để track items khi update
   ```typescript
   keyExtractor={(item, index) => item.id}
   // item = {id: "1", name: "John", ...}
   // → return "1"
   ```

3. **`renderItem={({ item }) => ...}`:**
   - Function render mỗi item
   - Param: `{ item, index, separators }`
   - Destructure lấy `item`

4. **`refreshControl={<RefreshControl ... />}`:**
   - Component Pull-to-Refresh
   - User kéo xuống → trigger `onRefresh`

5. **`contentContainerStyle={s.p}`:**
   - Style cho container chứa tất cả items
   - Dùng để add padding cho list

**Performance optimization:**
```typescript
// ✅ Good - Dùng memo cho UserItem
export const UserItem = memo(({ user }) => ...);

// ✅ Good - Dùng useCallback cho callbacks
const onPress = useCallback(() => ..., []);

// ❌ Bad - Tạo function mới mỗi lần render
renderItem={({ item }) => <UserItem onPress={() => navigate()} />}

// ✅ Good - Truyền function đã được memoize
renderItem={({ item }) => <UserItem onPress={handlePress} />}
```

---

## 6. Event Handling

### 📝 Button Click (Pressable)

```typescript
<Pressable onPress={() => setRole("user")} style={[s.rb, role === "user" && s.ra]}>
  <Text>User</Text>
</Pressable>
```

**Giải thích:**

1. **`onPress={() => setRole("user")}`:**
   - Arrow function inline
   - Khi click → gọi `setRole("user")`
   - `setRole` là state setter từ `useState`

2. **Dynamic styles:**
   ```typescript
   style={[s.rb, role === "user" && s.ra]}
   ```
   - `[...]`: Mảng styles
   - `s.rb`: Base style (luôn có)
   - `role === "user" && s.ra`: Conditional style
     - Nếu `role === "user"` → add `s.ra`
     - Nếu không → không add gì

3. **How it works:**
   ```typescript
   // role = "user"
   style={[s.rb, true && s.ra]}
   → style={[s.rb, s.ra]} ✅
   
   // role = "admin"
   style={[s.rb, false && s.ra]}
   → style={[s.rb, false]}
   → style={[s.rb]} ✅
   ```

### 📝 Text Input

```typescript
<TextInput 
  style={s.i} 
  placeholder="Nhập tên" 
  onChangeText={t => name.current = t} 
/>
```

**Giải thích:**

1. **`placeholder="Nhập tên"`:**
   - Text hiển thị khi input rỗng
   - Mờ hơn text thật

2. **`onChangeText={t => name.current = t}`:**
   - Callback mỗi khi text thay đổi
   - `t`: Text mới
   - `name.current = t`: Lưu vào useRef

3. **Không dùng `value` prop:**
   ```typescript
   // ❌ Controlled (re-render mỗi keystroke)
   const [text, setText] = useState("");
   <TextInput value={text} onChangeText={setText} />
   
   // ✅ Uncontrolled (không re-render)
   const text = useRef("");
   <TextInput onChangeText={t => text.current = t} />
   ```

### 📝 Stop Propagation

```typescript
<Pressable onPress={(e) => { 
  e.stopPropagation(); 
  onToggle(user.id); 
}} style={s.b}>
  <Text>Toggle</Text>
</Pressable>
```

**Giải thích:**

1. **Event bubbling:**
   ```jsx
   <Pressable onPress={handleParent}>  {/* Parent */}
     <Pressable onPress={handleChild}>  {/* Child */}
       Click me
     </Pressable>
   </Pressable>
   ```
   - Click child → gọi `handleChild` → gọi `handleParent` (bubble up)

2. **`e.stopPropagation()`:**
   - Ngăn event bubble lên parent
   - Click child → CHỈ gọi `handleChild`

3. **Use case trong UserItem:**
   ```typescript
   <Pressable onPress={onPress}>  {/* Parent: Navigate detail */}
     <View>User info</View>
     <Pressable onPress={(e) => { 
       e.stopPropagation();   // ← Quan trọng!
       onToggle(user.id); 
     }}>
       Toggle
     </Pressable>
   </Pressable>
   ```
   - Click "Toggle" → CHỈ toggle, KHÔNG navigate
   - Click user info → Navigate detail

---

## 7. Styling Patterns

### 📝 StyleSheet.create

```typescript
const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: "#fff" },
  f: { padding: 16 },
  // ...
});
```

**Giải thích:**

1. **Tại sao dùng StyleSheet.create?**
   ```typescript
   // ❌ Plain object - Không optimize
   const s = {
     c: { flex: 1 },
   };
   
   // ✅ StyleSheet.create - Optimize bởi React Native
   const s = StyleSheet.create({
     c: { flex: 1 },
   });
   ```
   - StyleSheet.create optimize performance
   - Tạo style IDs thay vì objects
   - Gửi styles qua bridge 1 lần

2. **Short names:**
   ```typescript
   c: container
   f: form
   l: label
   i: input
   b: button
   ```
   - Giảm code length
   - Dễ gõ nhanh trong thi

### 📝 Flexbox Layout

```typescript
{ 
  flexDirection: "row",   // Sắp xếp ngang
  justifyContent: "space-between",  // Space giữa items
  alignItems: "center",    // Center theo trục ngang
}
```

**Giải thích:**

1. **`flexDirection: "row"`:**
   ```
   ┌─────────────────┐
   │ [Item1] [Item2] │ ← Row (ngang)
   └─────────────────┘
   ```

2. **`justifyContent: "space-between"`:**
   ```
   ┌──────────────────────┐
   │ [Item1]      [Item2] │ ← Space giữa
   └──────────────────────┘
   ```

3. **`alignItems: "center"`:**
   ```
   ┌─────────────┐
   │             │
   │ [Item]      │ ← Center theo chiều dọc
   │             │
   └─────────────┘
   ```

### 📝 Absolute Positioning (FAB)

```typescript
{
  position: "absolute",
  right: 16,
  bottom: 16,
  width: 50,
  height: 50,
  borderRadius: 25,
}
```

**Giải thích:**
- `position: "absolute"`: Không theo flow bình thường
- `right: 16, bottom: 16`: Cách góc phải-dưới 16px
- `borderRadius: 25`: width/height = 50 → circle perfect

---

## 8. Form Handling

### 📝 Validation

```typescript
if (!name.current.trim() || !email.current.trim()) return;
```

**Giải thích:**
- `.trim()`: Xóa khoảng trắng đầu/cuối
- `!...`: Nếu rỗng
- `||`: OR logic
- `return`: Dừng function, không submit

**Test cases:**
```typescript
name.current = "John"   → trim() = "John"   → OK ✅
name.current = "  "     → trim() = ""       → FAIL ❌
name.current = "  John" → trim() = "John"   → OK ✅
```

### 📝 Loading State

```typescript
const [loading, setLoading] = useState(false);

const save = async () => {
  setLoading(true);
  try {
    await createUser(...);
  } finally {
    setLoading(false);
  }
};
```

**Giải thích:**
- `setLoading(true)`: Show spinner, disable button
- `try { ... }`: Thực thi code
- `finally { ... }`: Luôn chạy (dù success hay error)
- `setLoading(false)`: Hide spinner, enable button

**UI behavior:**
```typescript
<Pressable disabled={loading} style={[s.b, loading && s.d]}>
  {loading ? <ActivityIndicator /> : <Text>Save</Text>}
</Pressable>
```
- `disabled={loading}`: Không click được khi loading
- `loading && s.d`: Opacity 0.5 khi loading
- Ternary: Loading → spinner, không loading → text

---

## 🎯 TÓM TẮT CÁC PATTERN

| Pattern | Sử dụng | Ví dụ |
|---------|---------|-------|
| **async/await** | Gọi API | `await getUsers()` |
| **try/finally** | Loading state | `try {...} finally {setLoading(false)}` |
| **Conditional render** | Loading, empty | `if (loading) return <Spinner />` |
| **Dynamic styles** | Active state | `[s.base, active && s.active]` |
| **Event bubbling** | Stop propagation | `e.stopPropagation()` |
| **Validation** | Form submit | `if (!name.trim()) return` |
| **Navigation** | Screen flow | `navigation.navigate("Detail", {user})` |
| **Memoization** | Performance | `useCallback`, `useMemo`, `memo` |

---

## 🚀 PERFORMANCE TIPS

1. **FlatList optimization:**
   ```typescript
   <FlatList
     data={data}
     keyExtractor={item => item.id}           // ✅
     renderItem={({item}) => <Item {...} />}  // ✅
     initialNumToRender={10}                  // Render 10 items đầu
     maxToRenderPerBatch={10}                 // Batch render
     windowSize={21}                          // Viewport size
   />
   ```

2. **Image optimization:**
   ```typescript
   <Image
     source={{uri: user.avatar}}
     resizeMode="cover"         // Không stretch
     loadingIndicatorSource     // Loading placeholder
   />
   ```

3. **Avoid inline functions:**
   ```typescript
   // ❌ Bad
   onPress={() => handlePress(id)}
   
   // ✅ Good
   const handlePress = useCallback(() => {...}, [id]);
   onPress={handlePress}
   ```

---

Đọc file này kết hợp với **`HOOKS_EXPLANATION.md`** để hiểu đầy đủ! 🎓
