
import { Text, View } from '@/components/Themed';
import { useProducts } from '@/hooks/useProducts';
import type { RootState } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { setSelected } from '@/store/productSlice';
import type { Product } from '@/types';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import "../global.css"

export default function TabOneScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products, loading, deleteProduct, selectProduct, fetchProducts, searchProduct} = useProducts();
  const cartItems = useSelector((s: RootState) => s.cart.items);
  const inputRef = useRef<TextInput>(null);

  const cartCount = useMemo(() => cartItems.reduce((a, i) => a + i.quantity, 0), [cartItems])

  const [search, setSearch] = useState('');

  const handleAdd = useCallback(() => {selectProduct(null); router.push('/new')}, [selectProduct, router])
  const handleEdit = useCallback((p: Product) => {selectProduct(p); router.push(`/${p.id}`)}, [])
  const handleDelete = useCallback((id: string) => {confirm("Are u sure?") && deleteProduct(id)}, [])
  const handleAddToCart = useCallback((p: Product) => {dispatch(addToCart(p))}, [])

  const handleView = useCallback((p: Product) => {selectProduct(p); router.push(`/${p.id}`)}, [])

  useEffect(() => {fetchProducts()}, [])

  if(loading) {
    return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={"large"} />
    </View>)
  }

  const renderItem = ({item}: {item: Product}) => {
    return (
      <View className='border border-gray-400 p-2 rounded-lg mb-2 gap-2'>
        <View className='flex-row items-center justify-evenly'>
          <Image source={{uri: item.image}} className='w-20 h-20'/>
          <View className=''>
            <Text>Name: {item.name}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        </View>
        
        <View className='gap-2 flex-row items-center justify-center'>
          <Pressable onPress={() => handleAddToCart(item)} className='bg-blue-500 p-2 px-4 rounded-lg'><Text className='text-white'>Add to Cart</Text></Pressable>
          <Pressable onPress={() => {selectProduct(item); router.push(`/${item.id}`)}} className='bg-green-500 p-2 px-4 rounded-lg'><Text className='text-white'>Update</Text></Pressable>
          <Pressable onPress={() => handleDelete(item.id)} className='bg-red-500 p-2 px-4 rounded-lg'><Text className='text-white'>Delete</Text></Pressable>
                    <Pressable onPress={() => handleView(item)} className='bg-green-500 p-2 px-4 rounded-lg'><Text className='text-white'>View Details</Text></Pressable>
        </View>
      </View>
    )
  }

  return (
    <View className='flex-1 gap-2 p-2'>
      <View className="flex-row items-center justify-center">
        <TextInput ref={inputRef} value={search} onChangeText={(text) => {setSearch(text); searchProduct(text)}} className='border rounded-lg p-2 w-80 border-gray-400' placeholder='Search Product...' />
      </View>

      <View className='flex-row items-center justify-end mr-10'>
        <Pressable onPress={() => router.push('/cart')} className='bg-blue-500 p-2 px-4 rounded-lg'>
          <Text className='text-white'>Gio hang {cartCount}</Text>
        </Pressable>
      </View>

      <FlatList data={products} keyExtractor={item => item.id} renderItem={renderItem} className='px-10'/>

      <Pressable onPress={handleAdd} className='w-20 h-20 rounded-full bg-blue-500 absolute z-10 bottom-2 right-2 items-center justify-center'><Text className='text-3xl text-white'>+</Text></Pressable>
    </View>
  );
}
