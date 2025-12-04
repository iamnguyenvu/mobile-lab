import { useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../../hooks/useProducts';
import { addToCart } from '../../store/cartSlice';
import { Product } from '../../types';
import { RootState } from '../../store';
import { s, C } from '../../styles/common';

export default function ProductList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products, loading, fetchProducts, deleteProduct, selectProduct } = useProducts();
  const cartItems = useSelector((st: RootState) => st.cart.items);
  const scrollRef = useRef<ScrollView>(null);

  const cartCount = useMemo(() => cartItems.reduce((a, i) => a + i.quantity, 0), [cartItems]);

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = useCallback(() => { selectProduct(null); router.push('/new'); }, []);
  const handleEdit = useCallback((p: Product) => { selectProduct(p); router.push(`/${p.id}`); }, []);
  const handleDelete = useCallback((id: string) => { confirm('Xóa?') && deleteProduct(id); }, []);
  const handleAddToCart = useCallback((p: Product) => dispatch(addToCart(p)), [dispatch]);

  if (loading) return <View style={s.cen}><ActivityIndicator size="large" color={C.p} /></View>;

  return (
    <View style={s.f1}>
      <Pressable style={s.bar} onPress={() => router.push('/cart')}><Text style={s.btnT}>🛒 Giỏ hàng ({cartCount})</Text></Pressable>
      <ScrollView ref={scrollRef} style={s.list}>
        {products.map(p => (
          <View key={p.name} style={s.item}>
            <Image source={{ uri: p.image }} style={s.img} />
            <View style={s.info}>
              <Text style={s.t1}>{p.name}</Text>
              <Text style={s.t2}>{p.price.toLocaleString()}đ</Text>
            </View>
            <View style={s.row}>
              <Pressable style={s.btnS} onPress={() => handleAddToCart(p)}><Text style={s.btnST}>+🛒</Text></Pressable>
              <Pressable style={[s.btnS, { backgroundColor: C.p }]} onPress={() => handleEdit(p)}><Text style={s.btnST}>Sửa</Text></Pressable>
              <Pressable style={[s.btnS, s.btnNo]} onPress={() => handleDelete(p.name)}><Text style={s.btnST}>Xóa</Text></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable style={s.add} onPress={handleAdd}><Text style={s.btnT}>+ Thêm sản phẩm</Text></Pressable>
    </View>
  );
}
