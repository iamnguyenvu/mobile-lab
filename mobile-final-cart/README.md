# Shopping Cart - Ứng dụng Giỏ hàng

## Chạy ứng dụng (Chỉ Web)
```bash
npm run web
```

## Cấu trúc
```
mobile-final-cart/
├── app/
│   ├── _layout.tsx    # Root layout + Redux Provider
│   ├── index.tsx      # Danh sách sản phẩm
│   ├── cart.tsx       # Giỏ hàng
│   └── [id].tsx       # Thêm/Sửa sản phẩm
├── store/
│   ├── index.ts       # Redux store
│   ├── productSlice.ts
│   └── cartSlice.ts
├── hooks/
│   └── useProducts.ts # Custom hook CRUD
├── api/
│   └── index.ts       # Axios config
└── types/
    └── index.ts
```

## MockAPI Setup
1. Tạo project tại https://mockapi.io
2. Tạo resource `products`:
   - id: string
   - name: string
   - price: number
   - image: string

3. Thêm data mẫu:
```json
[
  { "name": "Áo thun", "price": 150000, "image": "https://picsum.photos/200?1" },
  { "name": "Quần jeans", "price": 350000, "image": "https://picsum.photos/200?2" },
  { "name": "Giày sneaker", "price": 500000, "image": "https://picsum.photos/200?3" }
]
```

4. Cập nhật URL trong `api/index.ts`

## Tính năng
- ✅ CRUD sản phẩm với Axios
- ✅ Giỏ hàng (thêm/xóa/tăng giảm số lượng)
- ✅ Tính tổng tiền
- ✅ Expo Router
- ✅ Redux Toolkit
- ✅ Custom Hook
