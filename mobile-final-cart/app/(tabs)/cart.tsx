import { useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateQuantity, removeFromCart, clearCart } from '../../store/cartSlice';
import { s } from '../../styles/common';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((st: RootState) => st.cart.items);
  const scrollRef = useRef<ScrollView>(null);

  const total = useMemo(() => items.reduce((a, i) => a + i.price * i.quantity, 0), [items]);
  const totalItems = useMemo(() => items.reduce((a, i) => a + i.quantity, 0), [items]);

  const handleQty = useCallback((n: string, d: number) => dispatch(updateQuantity({ name: n, delta: d })), [dispatch]);
  const handleRemove = useCallback((n: string) => dispatch(removeFromCart(n)), [dispatch]);
  const handleClear = useCallback(() => confirm('Xóa tất cả?') && dispatch(clearCart()), [dispatch]);

  return (
    <View style={s.f1}>
      <ScrollView ref={scrollRef} style={s.list}>
        {items.length === 0 ? <Text style={s.emp}>Giỏ hàng trống</Text> : items.map(item => (
          <View key={item.name} style={s.item}>
            <Image source={{ uri: item.image }} style={s.imgS} />
            <View style={s.info}>
              <Text style={s.t1}>{item.name}</Text>
              <Text style={s.t2}>{item.price.toLocaleString()}đ</Text>
            </View>
            <View style={s.row}>
              <Pressable style={s.qB} onPress={() => handleQty(item.name, -1)}><Text style={s.qT}>-</Text></Pressable>
              <Text style={s.qN}>{item.quantity}</Text>
              <Pressable style={s.qB} onPress={() => handleQty(item.name, 1)}><Text style={s.qT}>+</Text></Pressable>
            </View>
            <Pressable style={s.del} onPress={() => handleRemove(item.name)}><Text>🗑</Text></Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={s.foot}>
        <Text style={{ textAlign: 'center', color: '#666' }}>Số lượng: {totalItems}</Text>
        <Text style={s.tot}>Tổng: {total.toLocaleString()}đ</Text>
        {items.length > 0 && <Pressable style={[s.btn, s.btnNo, { marginTop: 12 }]} onPress={handleClear}>
          <Text style={s.btnT}>Xóa tất cả</Text></Pressable>}
      </View>
    </View>
  );
}
