# Note Taking App - Tối Ưu Cho Thi

## 📊 Thống Kê Code

### Tổng số file: 7 files
1. **index.tsx** - 4 dòng (Entry point)
2. **NoteScreen.tsx** - 97 dòng (Màn hình chính - đã tối ưu)
3. **NoteItem.tsx** - 50 dòng (Component Note)
4. **ProfileScreen.tsx** - 24 dòng (Màn hình Profile)
5. **api.ts** - 33 dòng (API calls)
6. **types.ts** - 6 dòng (TypeScript types)
7. **_layout.tsx** - 15 dòng (Navigation layout)

**📈 TỔNG: ~229 dòng code** (Giảm 10 dòng!)

## ✨ Cải tiến mới:

### Thanh tiêu đề tối ưu:
- ✅ **Tên app**: "Note Taking App" (theo đề yêu cầu)
- ✅ **Font rõ ràng**: fontSize 20, fontWeight bold, letterSpacing 0.5
- ✅ **Padding đều**: 16px mọi phía
- ✅ **Style ngắn gọn**: Gộp view header thành 1 dòng

### Tối ưu StyleSheet:
- ✅ Gộp style input: `s.in` dùng chung cho search & add input
- ✅ Rút gọn màu: `#07f`, `#4c7`, `#f90` thay vì `#007AFF`, `#34C759`, `#FF9500`
- ✅ Inline style đơn giản: Gộp text button "Add" thành inline
- ✅ Giảm từ 12 style xuống còn 10 style

## ✅ Đầy đủ chức năng theo đề (10 điểm)

### 1. Giao diện & Cấu trúc (1đ)
- ✅ SafeAreaProvider trong _layout.tsx
- ✅ SafeAreaView trong màn hình chính
- ✅ Tiêu đề "Quản Lý Công Việc" ở top

### 2. Hiển thị danh sách (GET) (2đ)
- ✅ FlatList render danh sách từ API
- ✅ Hiển thị title
- ✅ Hiển thị status (✅/❌)
- ✅ ActivityIndicator khi loading

### 3. Thêm công việc (POST) (1.5đ)
- ✅ TextInput nhập item
- ✅ Nút "Add"
- ✅ Gọi API POST thêm mới
- ✅ Clear input bằng useRef

### 4. Cập nhật công việc (PUT) (1.5đ)
- ✅ Click item → chế độ edit
- ✅ Nút "Save" → gọi API PUT

### 5. Xóa công việc (DELETE) (1đ)
- ✅ Nút Delete (🗑️)
- ✅ Gọi API DELETE

### 6. Refresh danh sách (1đ)
- ✅ RefreshControl kéo xuống
- ✅ Gọi lại API GET

### 7. Hooks bắt buộc (1đ)
- ✅ useState - quản lý state
- ✅ useEffect - load dữ liệu
- ✅ useMemo - lọc danh sách & thống kê
- ✅ useCallback - tối ưu hàm
- ✅ useRef - clear TextInput

### 8. Tìm kiếm (1đ)
- ✅ TextInput search
- ✅ useMemo lọc dữ liệu

### Bonus: Thống kê
- ✅ Hiển thị: Tổng/Hoàn thành/Chưa xong
- ✅ useMemo tính toán

### Bonus: Profile
- ✅ Họ tên: Nguyễn Hoàng Nguyên Vũ
- ✅ MSSV: 22003185
- ✅ Lớp: DH22CS01

## 🚀 Cấu trúc Code Tối Ưu

### Component chính (2 files):
1. **NoteItem.tsx** - Component hiển thị từng note
   - Edit inline
   - Toggle status
   - Delete
   - StyleSheet ngắn gọn

2. **NoteScreen.tsx** - Màn hình chính (tách từ index.tsx)
   - Header + Profile link
   - Statistics (3 số)
   - Search bar
   - Add input + button
   - FlatList với RefreshControl

3. **index.tsx** - Entry point đơn giản
   - Chỉ render NoteScreen

## 💡 Tips Khi Thi (45 phút)

### Thứ tự làm bài:
1. **5 phút**: Setup types.ts, api.ts, _layout.tsx
2. **15 phút**: Tạo NoteScreen.tsx - chỉ GET + hiển thị FlatList
3. **10 phút**: Tạo NoteItem.tsx - hiển thị đơn giản
4. **10 phút**: Thêm POST, PUT, DELETE vào NoteScreen.tsx
5. **5 phút**: Thêm Search + Stats + Profile + index.tsx

### Copy nhanh:
- Dùng style name ngắn: `s.c`, `s.h`, `s.t`
- Gộp nhiều dòng thành 1 dòng
- Dùng arrow function ngắn gọn
- Bỏ error handling chi tiết

## 📝 Mock API

URL: `https://mockapi.io`  
Endpoint: `/NguyenHoangNguyenVu_22003185/notes`

### Fields:
```typescript
{
  id: string,
  title: string,
  content: string,
  status: boolean
}
```

## 🎯 Điểm Mạnh

✅ Code ngắn gọn dễ nhớ  
✅ Chỉ 2 component chính  
✅ Đủ tất cả yêu cầu đề bài  
✅ StyleSheet rõ ràng (không inline)  
✅ Dễ debug và sửa lỗi  
✅ Có thể code xong trong 30-35 phút!
