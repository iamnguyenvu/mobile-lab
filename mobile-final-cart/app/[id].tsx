import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProducts } from '../hooks/useProducts';
import { s } from '../styles/common';

export default function ProductForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selected, createProduct, editProduct } = useProducts();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew && selected) { setName(selected.name); setPrice(selected.price.toString()); setImage(selected.image); }
  }, [selected, isNew]);

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim()) { alert('Vui lòng nhập đầy đủ'); return; }
    const data = { name: name.trim(), price: Number(price), image: image.trim() || 'https://picsum.photos/200' };
    const ok = isNew ? await createProduct(data) : await editProduct(id!, data);
    if (ok) router.back(); else alert('Có lỗi xảy ra');
  };

  return (
    <View style={s.f1p}>
      <Text style={s.lb}>Tên sản phẩm</Text>
      <TextInput style={s.inp} value={name} onChangeText={setName} placeholder="Nhập tên" />
      <Text style={s.lb}>Giá (VNĐ)</Text>
      <TextInput style={s.inp} value={price} onChangeText={setPrice} placeholder="Nhập giá" keyboardType="numeric" />
      <Text style={s.lb}>URL Hình ảnh</Text>
      <TextInput style={s.inp} value={image} onChangeText={setImage} placeholder="https://..." />
      <Pressable style={[s.btn, { marginTop: 24 }]} onPress={handleSubmit}><Text style={s.btnT}>{isNew ? 'Thêm mới' : 'Cập nhật'}</Text></Pressable>
    </View>
  );
}
