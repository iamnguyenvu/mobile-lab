# ĐỀ THI CUỐI KỲ - LẬP TRÌNH DI ĐỘNG
## Thời gian: 60 phút

---

## **THÔNG TIN ĐỀ THI**

- **Môi trường**: Expo Project
- **Chạy trên**: Web only (`npm run web`)
- **Ngôn ngữ**: TypeScript

---

## **YÊU CẦU ĐỀ BÀI**

### **Chủ đề: Ứng dụng Giỏ hàng (Shopping Cart)**

Xây dựng ứng dụng quản lý sản phẩm và giỏ hàng đơn giản.

---

## **YÊU CẦU CHỨC NĂNG** (60 điểm)

### 1. Hiển thị danh sách sản phẩm (15 điểm)
- Fetch danh sách products từ MockAPI
- Hiển thị: tên, giá, hình ảnh
- Nút "Thêm vào giỏ" cho mỗi sản phẩm

### 2. Quản lý sản phẩm - CRUD (25 điểm)
- **Thêm** sản phẩm mới (POST)
- **Sửa** thông tin sản phẩm (PUT)
- **Xóa** sản phẩm (DELETE)

### 3. Giỏ hàng (20 điểm)
- Thêm sản phẩm vào giỏ
- Hiển thị số lượng trong giỏ
- Tăng/giảm số lượng
- Xóa sản phẩm khỏi giỏ
- Tính tổng tiền

---

## **YÊU CẦU KỸ THUẬT** (40 điểm)

### 1. Core Components (10 điểm)
- `View`, `Text`, `TextInput`, `Pressable`, `ScrollView`, `Image`

### 2. React Hooks (10 điểm)
- `useState`, `useEffect`
- Custom Hook: `useProducts`

### 3. Fetch API với Axios (10 điểm)
- GET, POST, PUT, DELETE

### 4. Expo Router (5 điểm)
- Điều hướng giữa các màn hình

### 5. Redux Toolkit (5 điểm)
- Quản lý state products và cart

---

## **CẤU TRÚC THƯ MỤC**

```
mobile-final-cart/
├── app/
│   ├── _layout.tsx        # Root layout + Provider
│   ├── index.tsx          # Danh sách sản phẩm
│   ├── cart.tsx           # Giỏ hàng
│   └── [id].tsx           # Thêm/Sửa sản phẩm
├── store/
│   ├── index.ts
│   ├── productSlice.ts
│   └── cartSlice.ts
├── hooks/
│   └── useProducts.ts
├── types/
│   └── index.ts
└── api/
    └── index.ts           # Axios config
```

---

## **MOCKAPI SETUP**

### Resource: `products`
```json
{
  "id": "string",
  "name": "string",
  "price": "number",
  "image": "string"
}
```

### Dữ liệu mẫu:
```json
[
  { "name": "Áo thun", "price": 150000, "image": "https://picsum.photos/200?1" },
  { "name": "Quần jeans", "price": 350000, "image": "https://picsum.photos/200?2" },
  { "name": "Giày sneaker", "price": 500000, "image": "https://picsum.photos/200?3" },
  { "name": "Mũ lưỡi trai", "price": 80000, "image": "https://picsum.photos/200?4" },
  { "name": "Balo", "price": 250000, "image": "https://picsum.photos/200?5" }
]
```

### API URL:
```
https://[PROJECT_ID].mockapi.io/api/products
```

---

## **TIÊU CHÍ CHẤM ĐIỂM**

| Tiêu chí | Điểm |
|----------|------|
| Hiển thị danh sách sản phẩm | 15 |
| Thêm sản phẩm (POST) | 8 |
| Sửa sản phẩm (PUT) | 8 |
| Xóa sản phẩm (DELETE) | 9 |
| Giỏ hàng (thêm/xóa/số lượng/tổng tiền) | 20 |
| Core Components | 10 |
| Hooks (useState, useEffect, custom) | 10 |
| Axios Fetch API | 10 |
| Expo Router | 5 |
| Redux Toolkit | 5 |
| **Tổng** | **100** |

---

**Chúc các bạn làm bài tốt!** 🛒
